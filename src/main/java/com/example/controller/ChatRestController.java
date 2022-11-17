package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.ChatDAO;
import com.example.domain.ChatVO;

@RestController
public class ChatRestController {
	
	@Autowired
	private SimpMessagingTemplate template;


	@MessageMapping("/message")
	private ChatVO receivePublicMessage(@Payload ChatVO vo) {
		return vo;
	}
	
	@MessageMapping("/private-message")
	@SendTo("/user")
	private ChatVO receivePrivateMessage(@Payload ChatVO vo) {
		//   front에서  /user/${unickname}/private으로 하면 그 unickname과 1:1 채팅 ㄱㄱ
		template.convertAndSendToUser(vo.getReceiver(), "/private", vo);
		return vo;
	}
}
