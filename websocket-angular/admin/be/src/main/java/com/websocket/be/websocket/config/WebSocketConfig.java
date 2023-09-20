package com.websocket.be.websocket.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.util.StringUtils;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.util.List;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
//    public static final String AUTHORIZATION_HEADER = "Authorization";

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/websocket").setAllowedOrigins("http://localhost:4200", "http://localhost:4201").withSockJS();
    }

//    @Override
//    public void configureClientInboundChannel(ChannelRegistration registration) {
//        registration.interceptors(new ChannelInterceptor() {
//            @Override
//            public Message<?> preSend(Message<?> message, MessageChannel channel) {
//                StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
//                List<String> tokenList = accessor.getNativeHeader(AUTHORIZATION_HEADER);
//                String bearerToken = null;
//                if (tokenList == null || tokenList.size() < 1) {
//                    return message;
//                } else {
//                    bearerToken = tokenList.get(0);
//                    if (bearerToken == null) {
//                        return message;
//                    }
//                }
//
//                String jwtToken = bearerToken.substring(7);
//
//                if (StringUtils.hasText(jwtToken) && tokenProvider.validateToken(jwtToken)) {
//                    Authentication authentication = tokenProvider.getAuthentication(jwtToken);
//                    accessor.setUser(authentication);
//                }
//
//                return message;
//            }
//        });
//    }
}
