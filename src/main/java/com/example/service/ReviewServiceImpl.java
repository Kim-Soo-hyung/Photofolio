package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dao.ReviewDAO;
import com.example.dao.UserDAO;
import com.example.domain.ReviewVO;

@Service
public class ReviewServiceImpl implements ReviewService{
	

	@Autowired
	ReviewDAO rdao;

	@Autowired
	UserDAO udao;
	
	
	@Override
	public void insert(ReviewVO vo) {
		rdao.insert(vo);
		udao.updateUpoint(vo.getReceiver());
	}

}
