package com.bit.Interceptor;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.ChannelInterceptor;

import lombok.extern.slf4j.Slf4j;


@Configuration
@Slf4j
public class SocketInterceptor implements ChannelInterceptor {

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        log.info("eong");
        System.out.println("-".repeat(50));
        System.out.println(message);
        System.out.println("-".repeat(50));
        System.out.println(channel);
        System.out.println("-".repeat(50));
        return message;
    }


}