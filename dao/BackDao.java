package com.back.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.back.vo.BackVo;


import common.dao.AbstractDAO;

@Repository("BackDao")
public class BackDao extends AbstractDAO {

	@SuppressWarnings("unchecked")
	public List<BackVo> selectBackList(BackVo backVo) throws Exception {
		
		Map<String, Object> paramMap = backVo.toMap();
		
		List<BackVo> list = (List<BackVo>) selectList("back.selectbackList", paramMap);

		return list;
	}

	public BackVo selectbackOne(long proSq) throws Exception {
		return (BackVo) selectOne("back.selectbackOne", new Long(proSq));
	}
	public int updateBackList(BackVo backVo) throws Exception {
		
		return (int) update("back.updateBack", backVo);
	}
	public int insertBack(BackVo backVo) throws Exception {
		
		return (int) insert("back.insertBack", backVo);
	}
	public int deleteBack(long proSq) throws Exception {
		return (int) delete("back.deleteBack", proSq);
	}
}
