package com.example.service;

import com.example.domain.PboardLoveVO;
import com.example.domain.PboardVO;

public interface PboardService {
	public PboardVO read(String pcode);
	public void love(PboardLoveVO loveVO);
	public void dislove(PboardLoveVO disloveVO);
}
