package com.example.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.PayVO;

@Repository
public class PayDAOImpl implements PayDAO {

	@Autowired
	SqlSession session;

	String namespace = "com.example.mapper.PayMapper";

	@Override
	public void insert(PayVO payVO) {
		session.insert(namespace + ".insert",payVO);
	}

}
