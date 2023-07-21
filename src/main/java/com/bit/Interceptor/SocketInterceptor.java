package com.bit.Interceptor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import com.bit.dto.SocketDto;
import com.bit.service.StageService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
// @RequiredArgsConstructor
public class SocketInterceptor implements ChannelInterceptor {

    @Autowired
    StageService stageService;

    // private final SimpMessageSendingOperations sendingOperations;

    Map<String, String> userPosition = new HashMap<>();

    final String SUB_PREFIX = "/sub/stage/";

    // GenericMessage [payload=byte[0], headers={simpMessageType=SUBSCRIBE,
    // stompCommand=SUBSCRIBE, nativeHeaders={id=[sub-0],
    // destination=[/sub/stage/asdf]}, simpSessionAttributes={},
    // simpHeartbeat=[J@1d2c1ee7, simpSubscriptionId=sub-0, simpSessionId=bxmtk03v,
    // simpDestination=/sub/stage/asdf}]
    /*
     * simpMessageType -> CONNECT, SUBSCRIBE, MESSAGE, DISCONNECT, UNSUBSCRIBE
     * simpSessionId
     * simpDestination
     */

    @Override
    public void postSend(Message<?> message, MessageChannel channel, boolean sent) {

    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        // ChannelInterceptor.super.postSend(message, channel, sent);
        // StompDecoder a;
        // a.decode(message.getPayload().);
        System.out.println(message);
        // System.out.println(message.getPayload().toString());
        byte[] payloadBytes = (byte[]) message.getPayload();
        SocketDto sDto = new SocketDto();
        try {
            String r = new String(payloadBytes, "UTF-8");
            ObjectMapper m = new ObjectMapper();
            sDto = m.readValue(r, SocketDto.class);
            System.out.println(sDto);
        } catch (Exception e) {
        }
        
        String type = message.getHeaders().get("simpMessageType").toString();
        Object sessionId = message.getHeaders().get("simpSessionId");
        Object dest = message.getHeaders().get("simpDestination");
        String destStr;

        switch (type) {
            case "CONNECT":
                break;
            case "SUBSCRIBE":
                destStr = dest.toString().split(SUB_PREFIX)[1];
                userPosition.put(sessionId.toString(), destStr);
                stageService.addUser(destStr, sessionId.toString());
                // System.out.println(destStr + stageService.getUserCount(destStr));
                break;
            case "MESSAGE":
                break;
            case "DISCONNECT":
                destStr = userPosition.get(sessionId.toString());
                userPosition.remove(sessionId.toString());
                stageService.subUser(destStr, sessionId.toString());
                // System.out.println(destStr + stageService.getUserCount(destStr));
                break;
            case "UNSUBSCRIBE":
                break;

            default:
                break;
        }
        return message;
    }

}