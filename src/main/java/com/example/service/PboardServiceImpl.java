package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.PboardDAO;
import com.example.dao.PboardLoveDAO;
import com.example.domain.PboardLoveVO;
import com.example.domain.PboardVO;

@Service
public class PboardServiceImpl implements PboardService {
	@Autowired
	PboardDAO pdao;

	@Autowired
	PboardLoveDAO pldao;

	// ��ȸ�� ��ȸ��1����
	@Transactional
	@Override
	public PboardVO read(String pcode) {
		pdao.updateViewcnt(pcode);
		return pdao.read(pcode);
	}

	@Transactional
	@Override
	public void love(PboardLoveVO loveVO) {
		pldao.love(loveVO);
		pdao.updateLove();
	}
	
	@Transactional
	@Override
	public void dislove(PboardLoveVO disloveVO) {
		pldao.dislove(disloveVO);
		pdao.updateLove();

	}

}
