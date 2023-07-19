package com.bit.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import com.bit.dto.SocketDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class SocketController {
    private final SimpMessageSendingOperations sendingOperations;

    @MessageMapping("/msg")
    // public void msg(String eong){
    public void msg(SocketDto eong){
        System.out.println(eong);
        // switch (msg.getType()) {
        //     case ENTER:
        //         break;
        
        //     default:
        //         break;
        // }
        // sendingOperations.convertAndSend("/sub/stage/"+msg.getStageId(), msg);
    }
}
