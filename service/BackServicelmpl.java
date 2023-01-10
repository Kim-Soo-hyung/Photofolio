package com.back.service;

import java.util.ArrayList;


import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.back.dao.BackDao;
import com.back.vo.BackVo;



@Service(value="backService")
public class BackServicelmpl implements BackService {
	Logger log = Logger.getLogger(this.getClass());
	
	@Resource(name="BackDao")
	BackDao backdao;
	
	
	
	@Override
	public List<BackVo> selectBackList(BackVo backVo) throws Exception {
		 List<BackVo> list =new ArrayList<BackVo>();
		 
		 try {
			 list=backdao.selectBackList(backVo);
		 }catch (Exception e) {
			log.info("list open페이지 기능 오류");
		}
		return list;
	}

	@Override
	public BackVo selectbackOne(long proSq) throws Exception {
		BackVo list=new BackVo();
		try {
			list = backdao.selectbackOne(proSq);
		}catch (Exception e) {
			log.info("list 페이지 기능 오류");
		}
		return list;
	}

	@Override
	public int updateBackList(BackVo backVo) throws Exception {
		int result=0;
		
		try {
			result=backdao.updateBackList(backVo);
			System.out.println(result);
		}catch (Exception e) {
			log.info("update 페이지 기능 오류");
		}
		return result;
	}
	
	@Override
	public int insertBack(BackVo backVo) throws Exception {
		int list = 0;
		try {
			list=backdao.insertBack(backVo);
		}catch (Exception e) {
			log.info("insert 페이지 기능 오류");
		}
		return 0;
	}

	@Override
	public int deleteBack(long  proSq) throws Exception {
		int result = 0;
		try {
			result=backdao.deleteBack(proSq);
		}catch (Exception e) {
			log.info("delete 페이지 기능 오류");
		}
		return result;
	}

}
