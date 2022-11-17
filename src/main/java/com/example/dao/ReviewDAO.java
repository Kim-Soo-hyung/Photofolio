package com.example.dao;

import java.util.List;

import com.example.domain.ReviewVO;

public interface ReviewDAO {
	public List<ReviewVO> list(int page,int num,String receiver);
	public void insert(ReviewVO reviewVO);
	public int total(String receiver); 
}
