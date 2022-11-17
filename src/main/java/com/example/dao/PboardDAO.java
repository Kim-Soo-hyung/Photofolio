package com.example.dao;

import java.util.List;

import com.example.domain.PboardVO;

public interface PboardDAO {
	public void insert(PboardVO vo);
	public void update(PboardVO vo);
	public PboardVO read(String pcode);
	public void updateViewcnt(String pcode);
	public int getTotal(String searchType, String keyword);
	public void delete(String pcode);
	public List<PboardVO> best();
	 public List<PboardVO> list(
			   int page, int num, String searchType, String keyword) throws Exception;
	 public void updateLove();
	 public void updateSold(String pcode);

}
