package com.example.service;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.NoticeDAO;
import com.example.domain.NoticeVO;

@Service
public class NoticeServiceImpl implements NoticeService {

	@Autowired
	NoticeDAO ndao;
	
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.NoticeMapper";
	
	@Transactional
	@Override
	public NoticeVO read(String ncode) {
		ndao.updateViewcnt(ncode);
		return ndao.read(ncode);
	}

}
