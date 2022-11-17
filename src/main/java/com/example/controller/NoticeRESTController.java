package com.example.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.NoticeDAO;
import com.example.domain.NoticeVO;
import com.example.service.NoticeService;

@RestController
@RequestMapping("/api/notice")
public class NoticeRESTController {

	@Autowired
	NoticeDAO ndao;
	
	@Autowired
	NoticeService service;
	
	
	@RequestMapping("/list")
	public HashMap<String,Object> list(int page, int num, String searchType, String keyword)throws Exception{
		HashMap<String,Object> map = new HashMap<String,Object>();
		map.put("list", ndao.list(page, num, searchType, keyword));
		map.put("total", ndao.getTotal(searchType, keyword));
		return map;
	};
	
	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	public void insert1(NoticeVO vo) {
		ndao.insert(vo);
	}
	
	@RequestMapping(value = "/read/{ncode}")
	public NoticeVO read(@PathVariable String ncode) {
		return service.read(ncode);
	}
	
	@RequestMapping(value="/delete", method=RequestMethod.POST)
	public void delete(String ncode){
		ndao.delete(ncode);
	}
	
	@RequestMapping(value="/update", method=RequestMethod.POST)
	public void Update(NoticeVO vo){
		ndao.update(vo);
	}


		

}
