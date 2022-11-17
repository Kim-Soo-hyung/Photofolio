package com.example.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.EventVO;

@Repository
public class EventDAOImpl implements EventDAO{
	
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.EventMapper";
	
	@Override
	public List<EventVO> list(int page, int num, String searchType, String keyword) throws Exception {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("start", (page - 1) * num);
		map.put("num", num);
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return session.selectList(namespace + ".list", map);
	};
	
	@Override
	public int getTotal(String searchType, String keyword) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return session.selectOne(namespace + ".getTotal", map);
	}

	@Override
	public EventVO read(int ecode) {
		return session.selectOne(namespace+".read",ecode);
	}

	@Override
	public void insert(EventVO vo) {
		session.insert(namespace+".insert",vo);
	}

	@Override
	public void update(EventVO vo) {
		session.update(namespace+".update",vo);
		
	}

	@Override
	public void delete(int ecode) {
		session.delete(namespace+".delete",ecode);
		
	}

}
