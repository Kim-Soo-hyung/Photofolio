package com.example.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.PboardLoveDAO;
import com.example.domain.PboardLoveVO;
import com.example.service.PboardService;

@RestController
@RequestMapping("/api/pboardlove")
public class PboardLoveRESTController {

	@Autowired
	PboardLoveDAO pldao;

	@Autowired
	PboardService service;

	@RequestMapping(value = "/love", method = RequestMethod.POST)
	public void like(PboardLoveVO loveVO) {
		// 랜덤아이디를 부여하는 것으로는 안될 듯.

		if (loveVO.getLcode() == null) {
			UUID code = UUID.randomUUID();
			loveVO.setLcode(code.toString());
		}
		service.love(loveVO);
	}

	@RequestMapping(value = "/dislove", method = RequestMethod.POST)
	public void dislike(PboardLoveVO disloveVO) {
		service.dislove(disloveVO);
	}

	@RequestMapping("/isloveread")
	public PboardLoveVO isLoveRead(String pcode, String unickname) {
		return pldao.isLoveRead(pcode, unickname);
	}

}
