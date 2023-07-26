package com.bit.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import com.bit.dto.SocketDto;
import com.bit.dto.SocketDto.Types;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SocketService {

    @Autowired
    StageService stageService;
    @Autowired
    MemberService memberService;

    private final String prefix = "/sub/stage/";
    private final SimpMessageSendingOperations sendingOperations;
    private final Map<String, String> userPosition;

    private void logging(StompHeaderAccessor headers) {
        System.out.println(headers);
        System.out.println("getCommand : " + headers.getCommand());
        System.out.println("getDestination : " + headers.getDestination());
        System.out.println("getSessionId : " + headers.getSessionId());
        System.out.println("getTimestamp : " + headers.getTimestamp());
        System.out.println("=".repeat(100));
    }

    @EventListener
    public void onConnect(SessionConnectedEvent e) {
        // StompHeaderAccessor headers = StompHeaderAccessor.wrap(e.getMessage());
        // System.out.println("연결이 이루어졌어요");
        // logging(headers);
    }

    private void eong(StompHeaderAccessor headers) {
        try {
            logging(headers);
            System.out.println(userPosition);
            String stageId = userPosition.get(headers.getSessionId());
            userPosition.remove(headers.getSessionId());
            String userNick = stageService.getUserNickInStage(stageId, headers.getSessionId());
            stageService.subUserToStage(stageId, headers.getSessionId());
            SocketDto msg = new SocketDto();
            msg.setType(Types.EXIT);
            msg.setSessionId(headers.getSessionId());
            msg.setUserNick(userNick);
            msg.setStageId(stageId);
            System.out.println(msg);
            SendMsg(msg);
        } catch (Exception ex) {
        }

    }

    @EventListener
    public void onDisconnect(SessionDisconnectEvent e) {
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(e.getMessage());
        eong(headers);
        // System.out.println("연결이 끊겨버렸어요");
        // logging(headers);
    }

    @EventListener
    public void onSubscribe(SessionSubscribeEvent e) {
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(e.getMessage());
        String stageId = headers.getDestination().split(prefix)[1];
        userPosition.put(headers.getSessionId(), stageId);
        stageService.addUserToStage(stageId, headers.getSessionId());
        // System.out.println("구독해요");
        // logging(headers);
    }

    @EventListener
    public void onUnSubscribe(SessionUnsubscribeEvent e) {
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(e.getMessage());
        eong(headers);
        // System.out.println("구취해요");
        // logging(headers);
    }

    public void SendMsg(SocketDto msg) {
        Map<String, Object> data = new HashMap<>();
        switch (msg.getType()) {
            case ENTER:
                if (msg.getUserNick() != null) {
                    stageService.setUserNickInStage(msg.getStageId(), msg.getSessionId(), msg.getUserNick());
                }
                data.put("count", stageService.getUserCount(msg.getStageId()));
                data.put("memberlist", stageService.getMembersListInStage(msg.getStageId()));
                msg.setMsg(data);
                break;
            case EXIT:
                data.put("count", stageService.getUserCount(msg.getStageId()));
                data.put("memberlist", stageService.getMembersListInStage(msg.getStageId()));
                msg.setMsg(data);
                break;
            case SKIP:
                break;
            case VOTE_UP:
                break;
            case VOTE_DOWN:
                break;
            case KICK:
                
                break;
            case BAN:
                break;
            case DELETE:
                break;
            case QUEUE_IN:
                break;
            case QUEUE_OUT:
                break;
            case QUEUE_ORDER_CHANGE:
                break;
            case QUEUE_CHANGE_SONG:
                break;
            case CHAT:
                msg.setImg(memberService.getUserImg(msg.getUserNick()));
                break;
            case PLAY:
                break;
        }
        sendingOperations.convertAndSend("/sub/stage/" + msg.getStageId(), msg);
    }
}
