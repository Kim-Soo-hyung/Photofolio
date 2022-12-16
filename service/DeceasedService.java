package com.erp.dev.deceased.service;

import java.util.List;
import java.util.Map;

import com.erp.admin.management.company.vo.ErpCompanyVo;
import com.erp.dev.deceased.vo.DeceasedVo;
import com.skill.vo.SkillVo;
import com.visitant.vo.VisitantVo;



public interface DeceasedService {
	/** 퇴사자목록 조회 */
	public List<DeceasedVo> selectDeceasedList(DeceasedVo DeceasedVo) throws Exception;
	/** 퇴사자 단일 조회*/
	public DeceasedVo selectDeceasedOne(long deceSq) throws Exception;

	
	/** 퇴사자 추가 */
	public int insertDeceased(DeceasedVo DeceasedVo) throws Exception;
	
	
	

	/** 퇴사자 삭제*/
	public int deleteDeceased(long deceSq) throws Exception;
	
	/** 퇴사자 수정*/
	public int updateDeceased(DeceasedVo DeceasedVo) throws Exception;
	
}
