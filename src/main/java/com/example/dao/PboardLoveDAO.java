package com.example.dao;

import java.util.List;

import com.example.domain.PboardLoveVO;

public interface PboardLoveDAO {
	public void love(PboardLoveVO likeVO);
	public void dislove(PboardLoveVO dislikeVO);
	public PboardLoveVO isLoveRead(String pcode, String unickname);
	
}
