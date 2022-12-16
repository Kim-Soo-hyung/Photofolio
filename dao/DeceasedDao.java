package com.erp.dev.deceased.dao;



import java.util.List;

import java.util.Map;

import org.springframework.stereotype.Repository;


import com.erp.dev.deceased.vo.DeceasedVo;


import common.dao.AbstractDAO;

@Repository("DeceasedDao")
public class DeceasedDao extends AbstractDAO {

	// 컴파일 경고를 사용하지 않도록 설정해주는 것으로 한마디로 이클립스에서 노란색 표시줄이 나타내는것
	@SuppressWarnings("unchecked")
	public List<DeceasedVo> selectDeceasedList(DeceasedVo DeceasedVo) throws Exception {
		//map을 통해 key value를 통해 vo  값을 가지고 온다
		Map<String, Object> paramMap = DeceasedVo.toMap();// 아래 ErpDeceasedsMapperErpDeceasedsMapper mapper 가저온것
		List<DeceasedVo> out = (List<DeceasedVo>) selectList("ErpDeceasedsMapper.selectDeceasedList", paramMap);
		//위에 선언한 out 변수를  다시 리턴 한다.
		return out;
	}


	//상세 페이지 정보를 가져오기 위해 지정했다 
	
	public DeceasedVo selectDeceasedOne(long deceSq) throws Exception {
		// 아래 ErpDeceasedsMapperselectDeceasedOne mapper 가저온것   
		return (DeceasedVo) selectOne("ErpDeceasedsMapper.selectDeceasedOne",new Long(deceSq));//시퀀스 long 지정함
	}
	//insert 기능 페이지 
	public int insertDeceased(DeceasedVo DeceasedVo) throws Exception {
		// 아래 ErpDeceasedsMapperinsertDeceased mapper 가저온것  
		 insert("ErpDeceasedsMapper.insertDeceased", DeceasedVo);
		 //mapper 에서 vo를 선언한것을 다시 리턴한다
		 return (int)insert("ErpDeceasedsMapper.insertDeceased",DeceasedVo);
	}
	
	
	//delete 페이지
	public int deleteDeceased(long deceSq) throws Exception {
		// 아래 ErpDeceasedsMapperdeleteDeceased mapper 통해 새로운 시퀀스 리턴
		return (int) delete("ErpDeceasedsMapper.deleteDeceased", new Long(deceSq));
	}
	
	//update 페이지
	public int updateDeceased(DeceasedVo DeceasedVo) {
		
		//VO를 Map 형태로 전화해서 Mapper ParameterType을 hashmap으로 지정하여 데이터를 넣는다.
		Map<String, Object> paramMap = DeceasedVo.toMap();
		// 아래 ErpDeceasedsMapperupdateDeceasedDeceased 다시 리턴한다
		return (int)update("ErpDeceasedsMapper.updateDeceased",DeceasedVo);
	}

}
