package com.example.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.PboardLoveVO;

@Repository
public class PboardLoveDAOImpl implements PboardLoveDAO {

	@Autowired
	SqlSession session;

	String namespace = "com.example.mapper.PboardLoveMapper";

	@Override
	public void love(PboardLoveVO loveVO) {
		session.update(namespace + ".love", loveVO);
	}

	@Override
	public void dislove(PboardLoveVO disloveVO) {
		session.update(namespace + ".dislove", disloveVO);
	}

	@Override
	public PboardLoveVO isLoveRead(String pcode, String unickname) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("pcode", pcode);
		map.put("unickname", unickname);
		return session.selectOne(namespace + ".isLoveRead", map);
	}


	
}
