package com.bit.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.bit.dto.SocketDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SocketService {

    @Autowired
    StageService stageService;
    @Autowired
    MemberService memberService;

    private final SimpMessageSendingOperations sendingOperations;

    public void SendMsg(SocketDto msg) {
        switch (msg.getType()) {
            case ENTER:
                break;
            case EXIT:
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
        }
        sendingOperations.convertAndSend("/sub/stage/" + msg.getStageId(), msg);
    }
}
