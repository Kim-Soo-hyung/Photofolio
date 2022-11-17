package com.example.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.EventDAO;
import com.example.domain.EventVO;

@RestController
@RequestMapping("/api/event")
public class EventRestController {
	
	@Autowired
	EventDAO edao;
	
	@RequestMapping("/list")
	public HashMap<String,Object> list(int page, int num, String searchType, String keyword)throws Exception{
		HashMap<String,Object> map = new HashMap<String,Object>();
		map.put("list", edao.list(page, num, searchType, keyword));
		map.put("total", edao.getTotal(searchType, keyword));
		return map;
	};
	
	@RequestMapping("/read/{ecode}")
	public EventVO read(@PathVariable int ecode){
		return edao.read(ecode);
	}
	
	@RequestMapping(value="/update/{ecode}",method=RequestMethod.POST)
	public void update(EventVO vo){
		edao.update(vo);
	}
	
	@RequestMapping(value="/insert",method=RequestMethod.POST)
	public void insert(EventVO vo){
		edao.insert(vo);
	}
	
	@RequestMapping(value="/delete", method=RequestMethod.POST)
	public void delete(int ecode){
		edao.delete(ecode);
	}
	
	
}
