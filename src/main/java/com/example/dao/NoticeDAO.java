package com.example.dao;

import java.util.List;

import com.example.domain.NoticeVO;

public interface NoticeDAO {

	public List<NoticeVO> list(int page, int num, String searchType, String keyword);
	public void insert(NoticeVO vo);
	public NoticeVO read(String ncode);
	public void update(NoticeVO vo);
	public void updateViewcnt(String ncode);
	public void delete(String ncode);
	public int getTotal(String searchType, String keyword);

	
}
