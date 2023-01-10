package com.back.service;

import java.util.List;


import com.back.vo.BackVo;

public interface BackService {

	public List<BackVo> selectBackList(BackVo backVo) throws Exception;
	
	
	public BackVo selectbackOne(long proSq) throws Exception;
	
	public int updateBackList(BackVo backVo) throws Exception;
	
	public int insertBack(BackVo backVo) throws Exception;
	
	public int deleteBack(long proSq) throws Exception;
}
