package com.erp.dev.deceased.service;

import java.util.ArrayList;

import java.util.List;


import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;


import com.erp.dev.deceased.dao.DeceasedDao;
import com.erp.dev.deceased.vo.DeceasedVo;


@Service(value = "DeceasedService")
public class DeceasedServiceImpl implements DeceasedService {
	// slf4j 을 사용하여 내가 로그를 남길 클래스에 선언을 해주고 메소드 내에서 사용
	Logger log = Logger.getLogger(this.getClass());
	// 어노테이션은  이름을 이용해서 DeceasedDao 주입할 객체를 검색한다
	@Resource(name = "DeceasedDao")
	DeceasedDao DeceasedDao;

	// 메인페이지 정보
	@Override
	public List<DeceasedVo> selectDeceasedList(DeceasedVo DeceasedVo) throws Exception {
		// 새로운 arrayList 선언 후 list 변수에 지정한다.
		List<DeceasedVo> list = new ArrayList<DeceasedVo>();
		//try catch 선언한 이유는  예외처리 하기위해 쓴것이다   예외발생할 가능성이 있는 list 
		try {
			list = DeceasedDao.selectDeceasedList(DeceasedVo);
		} catch (Exception e) {// 이를 처리하지 위한 문장적는다
			log.info("############t Failed!!! [" + e.getMessage() + "]");
		}
		//list 선언한것을 return 실행한다  
		return list;
	}

	// 상세페이지정보
	@Override
	//vo 시퀸스  selectDeceasedOne 받아서  메서드 내에서 예외처리를 하지 않고 해당 메서드를 사용한 곳에서 예외 처리를 하도록  것
	public DeceasedVo selectDeceasedOne(long deceSq) throws Exception {
		//새로운  visi 변수를 만들고 
		DeceasedVo visi = new DeceasedVo();

		try {//예외발생할 가능성이 있는 visi
			visi = DeceasedDao.selectDeceasedOne(deceSq);
		} catch (Exception e) { //오류를 처리 하기 위해서 쓴다
			log.info("############## ! [" + e.getMessage() + "]");//오류문장출력한다 
		}
		//visi 선언한것을 return 실행한다  
		return visi;
	}

	@Override
	// Vo 선언한 데이터를 insertDeceased 지정후 int 타입을 선언해서 throws Exception 한후 
	public int insertDeceased(DeceasedVo DeceasedVo) throws Exception {
		// 숫자 0 을 변수에 저장한다
		int result = 0;
		try {//예외발생할 가능성이 있는
			result = DeceasedDao.insertDeceased(DeceasedVo);
		} catch (Exception e) {//오류를 처리 하기 위해서 쓴다
			log.info("############## inset Failed!!! [" + e.getMessage() + "]");
		}
		//result 리턴한다
		return result;
	}

	@Override
	// Vo 선언한 시퀀스 데이터를 deleteDeceased 지정후 int 타입을 선언해서 throws Exception 한후 
	public int deleteDeceased(long deceSq) throws Exception {
		//숫자 0을 변수 저장한후 
		int result = 0;
		//예외처리 한다 
		try {//예외가 발생할 가능성 있는경우 
			result = DeceasedDao.deleteDeceased(deceSq);
		} catch (Exception e) {//오류를 처리 하기 위해서 쓴다
			log.info("############## dt Failed!!! [" + e.getMessage() + "]");
		}
		// 리턴값
		return result;
	}

	@Override
	// Vo 선언한  데이터를 updateDeceased 지정후  throws Exception 한후  
	public int updateDeceased(DeceasedVo DeceasedVo) throws Exception {
		//숫자 0을 변수 저장한후 
		int result = 0;

		try {//예외가 발생할 가능성 있는경우 
			result = DeceasedDao.updateDeceased(DeceasedVo);
		} catch (Exception e) {//오류를 처리 하기 위해서 쓴다
			log.info("############## upd Failed!!! [" + e.getMessage() + "]");// 이것은 실무에서 많이 쓴다 나도 잘모르겠지만 
		}
		// 리턴값
		return result;
	}

}
