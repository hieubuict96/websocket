package com.example.websocket.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //Tạo path để client connect
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }

    //set path message private and public
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        //tiền tố kết hợp với MessageMapping tạo thành path phục vụ cho việc send message từ client
        registry.setApplicationDestinationPrefixes("/app");
        //Tiền tố của nơi được server gửi đến
        registry.enableSimpleBroker("/chatroom", "/user");
        //Tiền tố phục vụ cho việc subscribe nhận message private từ client
        registry.setUserDestinationPrefix("/user");
    }
}
