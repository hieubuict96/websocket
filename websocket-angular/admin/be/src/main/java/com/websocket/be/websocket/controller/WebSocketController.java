package com.websocket.be.websocket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class WebSocketController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/test1")
    @SendTo("/topic/socket")
    public Map<String, String> sendMessage(@Payload Map<String, String> map) {
        return map;
    }

    @MessageMapping("/test")
    public void sendMessage1(@Payload Map<String, String> map) {

    }
}
