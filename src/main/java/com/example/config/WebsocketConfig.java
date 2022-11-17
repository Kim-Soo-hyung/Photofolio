package com.example.config;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.converter.MessageConverter;
import org.springframework.messaging.handler.invocation.HandlerMethodArgumentResolver;
import org.springframework.messaging.handler.invocation.HandlerMethodReturnValueHandler;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@EnableWebSocketMessageBroker
public class WebsocketConfig implements WebSocketMessageBrokerConfigurer {



	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		registry.setApplicationDestinationPrefixes("/app");
		registry.enableSimpleBroker("/chatroom","/user");
		registry.setUserDestinationPrefix("/user");
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/ws").setAllowedOrigins("*").withSockJS();
		
	}

	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> arg0) {
		
	/*	//mandatory implements, So call nouse method
		  throw new UnsupportedOperationException();*/
		
	}

	@Override
	public void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> arg0) {
		 /* throw new UnsupportedOperationException();*/
	}

	@Override
	public void configureClientInboundChannel(ChannelRegistration arg0) {
//		  throw new UnsupportedOperationException();
		
	}

	@Override
	public void configureClientOutboundChannel(ChannelRegistration arg0) {
//		  throw new UnsupportedOperationException();
		
	}


	@Override
	public boolean configureMessageConverters(List<MessageConverter> arg0) {
		  throw new UnsupportedOperationException();
	}

	@Override
	public void configureWebSocketTransport(WebSocketTransportRegistration arg0) {
//		  throw new UnsupportedOperationException();
		
	}


}
