package com.example.dao;

import java.util.List;

import com.example.domain.EventVO;

public interface EventDAO {
	public List<EventVO> list(int page, int num, String searchType, String keyword) throws Exception;
	public EventVO read(int ecode);
	public void insert(EventVO vo);
	public void update(EventVO vo);
	public void delete(int ecode);
	public int getTotal(String searchType, String keyword);
}
