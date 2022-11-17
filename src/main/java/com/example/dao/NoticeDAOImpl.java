package com.example.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.NoticeVO;

@Repository
public class NoticeDAOImpl implements NoticeDAO {

	@Autowired
	SqlSession session;
	String namespace = "com.example.mapper.NoticeMapper";

	@Override
	public List<NoticeVO> list(int page, int num, String searchType, String keyword) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("start", (page - 1) * num);
		map.put("num", num);
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return session.selectList(namespace + ".list", map);
	}

	@Override
	public void insert(NoticeVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public NoticeVO read(String ncode) {
		return session.selectOne(namespace + ".read", ncode);
	}

	@Override
	public void updateViewcnt(String ncode) {
		session.update(namespace + ".updateViewcnt", ncode);

	}

	@Override
	public void update(NoticeVO vo) {
		session.update(namespace + ".update", vo);
	}

	@Override
	public void delete(String ncode) {
		session.delete(namespace + ".delete", ncode);
	}

	@Override
	public int getTotal(String searchType, String keyword) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return session.selectOne(namespace + ".getTotal", map);
	}

}
