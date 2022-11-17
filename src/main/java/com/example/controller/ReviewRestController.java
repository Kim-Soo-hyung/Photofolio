package com.example.controller;

import java.util.HashMap;
import java.util.UUID;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.ReviewDAO;
import com.example.domain.ReviewVO;
import com.example.service.ReviewService;

@RestController
@RequestMapping("/api/review")
public class ReviewRestController {
	
	@Autowired
	ReviewDAO rdao;
	
	@Autowired
	ReviewService rservice;
	
	@RequestMapping("/list")
	public HashMap<String,Object> list(@Param("page") int page,@Param("num") int num,@Param("receiver") String receiver){
		System.out.println(receiver);
		 HashMap<String,Object> map=new HashMap<String,Object>();
		   map.put("list",rdao.list(page, num,receiver));
		   map.put("total",rdao.total(receiver));
		      return map;
	}
	 
	
	
	@RequestMapping(value="/insert" , method=RequestMethod.POST)
	public void insert(ReviewVO InsertVO){
		
		//넘어온 paycode가 실제로 존재하는 paycode인지 확인하는 절차가 요구됨.
		
		UUID code=UUID.randomUUID();
		InsertVO.setRvcode(code.toString());
		rservice.insert(InsertVO);
	}
	

}
