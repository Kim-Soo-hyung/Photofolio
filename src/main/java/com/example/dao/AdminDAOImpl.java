package com.example.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.AdminVO;

@Repository
public class AdminDAOImpl implements AdminDAO {

	@Autowired
	SqlSession session;
	
	String namespace="com.example.mapper.AdminMapper";
	
	@Override
	public AdminVO read(String aid) {
		return session.selectOne(namespace + ".read", aid);
	}

	@Override
	public void insert(AdminVO insertVO) {
		session.insert(namespace+".insert" , insertVO);		
	}

}
