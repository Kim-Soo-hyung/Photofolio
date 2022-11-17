package com.example.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.PboardLoveVO;
import com.example.domain.PboardVO;

@Repository
public class PboardDAOImpl implements PboardDAO {
	@Autowired
	SqlSession session;
	String namespace = "com.example.mapper.PboardMapper";

	@Override
	public void insert(PboardVO vo) {
		session.insert(namespace + ".insert", vo);
	};

	@Override
	public void update(PboardVO vo) {
		session.update(namespace + ".update", vo);
	};

	@Override
	public PboardVO read(String pcode) {
		return session.selectOne(namespace + ".read", pcode);
	};

	@Override
	public void updateViewcnt(String pcode) {
		session.update(namespace + ".updateViewcnt", pcode);
	};

	@Override
	public int getTotal(String searchType, String keyword) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return session.selectOne(namespace + ".getTotal", map);
	}

	@Override
	public void delete(String pcode) {
		session.delete(namespace + ".delete", pcode);
	}

	@Override
	public List<PboardVO> best() {
		return session.selectList(namespace + ".best");
	}

	@Override
	public List<PboardVO> list(int page, int num, String searchType, String keyword) throws Exception {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("start", (page - 1) * num);
		map.put("num", num);
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return session.selectList(namespace + ".list", map);
	};

	@Override
	public void updateLove() {
		// TODO Auto-generated method stub
		session.update(namespace + ".updateLove");
	}

	@Override
	public void updateSold(String pcode) {
		// TODO Auto-generated method stub
		session.update(namespace+".updateSold",pcode);
	}


}
