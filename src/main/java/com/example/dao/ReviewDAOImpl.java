package com.example.dao;

import java.util.HashMap;


import java.util.List;

import javax.mail.Session;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.ReviewVO;



@Repository
public class ReviewDAOImpl implements ReviewDAO{
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.ReviewMapper";
	
	@Override
	public List<ReviewVO> list(int page,int num,String receiver) {
		HashMap<String,Object> map=new HashMap<>();
		map.put("start", (page-1)*num);
		map.put("num", num);
		map.put("receiver", receiver);
		return session.selectList(namespace + ".list",map);
	}
	


	@Override
	public void insert(ReviewVO reviewVO) {
		session.insert(namespace + ".insert",reviewVO);
		
	}


	@Override
	public int total(String receiver) {
		// TODO Auto-generated method stub
		return session.selectOne(namespace+".total",receiver);
	}

	

}
