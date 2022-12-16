package com.erp.dev.deceased.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.equipment.vo.EquipmentVo;
import com.erp.admin.management.company.vo.ErpCompanyVo;
import com.erp.dev.deceased.service.DeceasedService;
import com.erp.dev.deceased.vo.DeceasedVo;
import com.project.vo.ProjectVo;
import com.projectskill.vo.ProjectSkillVo;
import com.skill.vo.SkillVo;

import common.base.controller.BaseController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class DeceasedController extends BaseController {
	// slf4j 을 사용하여 내가 로그를 남길 클래스에 선언을 해주고 메소드 내에서 사용 요즘 실무에서 이걸 많이 쓴다 
	Logger log = Logger.getLogger(this.getClass());
	// 어노테이션은 빈의 이름을 이용해서 주입할 객체를 검색한다
	@Resource(name = "DeceasedService")
	DeceasedService deceasedService;

	// 메인 Page
	@RequestMapping(value = "/erp/dev/deceased/openDeceasedDetailPage.do")
	//Vo로 실행해서 requst요청하는것이다.
	public ModelAndView openDeceasedDetailPage(HttpServletRequest request, DeceasedVo DeceasedVo) throws Exception {
		// ModelAndView 는 응답할  list jsp정보를 가져와서 mv 변수 저장한다.
		ModelAndView mv = new ModelAndView("/erp/dev/deceased/deceased_list_page");
		//Vo값을 list 변수에 값을 저장한다.
		List<DeceasedVo> list = deceasedService.selectDeceasedList(DeceasedVo);
		// ModelAndView 값을 불러오기위해 key value 지정한것이다.
		mv.addObject("list", list);
		// mv 변수를 리턴할려고 한다.
		return mv;
	}

	// 앞서 살펴봤던 클라이언트와 서버 간의 HTTP 통신에서 요청과 응답을 보낼 때, 필요한 데이터를 담아서 보내는 공간이 바로 body입니다.
	@ResponseBody
	//요청이 왔을 때 어떤 컨트롤러가 호출이 되어야 하는지 알려주는 지표이다.
	@RequestMapping("/erp/dev/deceased/selectDeceasedOne.do")
	public ModelAndView selectDeceasedOne(long deceSq) throws Exception {
		// ModelAndView 는 응답할  detail jsp정보를 가져와서 mv 변수 저장한다.
		ModelAndView mv = new ModelAndView("/erp/dev/deceased/deceased_detail_page");
		//Vo 시퀀스 하나정보를 불러오기 위해 @Resource  list 변수에 저장한다
		DeceasedVo list = deceasedService.selectDeceasedOne(deceSq);
		// ModelAndView 값을 불러오기위해 key value 지정한것이다.
		mv.addObject("list", list);
		//mv 변수에 지정한것을 리턴하기 위해 선언했다.
		return mv;
	}

	// insert 메인 등록 패이지
	// 요청이 왔을 때 어떤 컨트롤러가 호출이 되어야 하는지 알려주는 지표이다.
	@RequestMapping("/erp/deceased/openDeceasedinsertPage.do")
	public ModelAndView openDeceasedinsertPage() throws Exception {
		// ModelAndView 는 응답할  list jsp정보를 가져와서 mv 변수 저장한다.
		ModelAndView mv = new ModelAndView("/erp/dev/deceased/deceased_insert_page");
		//mv 변수에 지정한것을 리턴하기 위해 선언했다.
		return mv;
	}

	// insert 상세 등록 패이지
	// 요청이 왔을 때 어떤 컨트롤러가 호출이 되어야 하는지 알려주는 지표이다.
	@RequestMapping("/erp/deceased/insertDeceased.do")
	//Vo로 실행해서 requst요정허는것이다.
	public ModelAndView insertDeceased(HttpServletRequest request, DeceasedVo DeceasedVo) throws Exception {
		//db에 insert 선언한 값을 mv 변수에 저장한다.
		ModelAndView mv = new ModelAndView("jsonView");
		// Vo 선언한것을   result 변수에 저장한다.
		int result = deceasedService.insertDeceased(DeceasedVo);
		// code(key) result(value)  
		mv.addObject("code", result);
		//mv 변수 리턴
		return mv;
	}

	@RequestMapping("/erp/deceased/deleteDeceased.do")
	public ModelAndView deleteDeceased(HttpServletRequest request, long deceSq) throws Exception {
		// JSON 데이터를 가독성있게 볼 수 있도록 해주는 확장프로그램
		ModelAndView mv = new ModelAndView("jsonView");
		// Vo 선언한것을   result 변수에 저장한다.
		int result = deceasedService.deleteDeceased(deceSq);
		// code(key) result(value)  
		mv.addObject("code", result);
		//mv 변수 리턴
		return mv;
	}

	// update 상세 등록 패이지
	@ResponseBody
	// 요청이 왔을 때 어떤 컨트롤러가 호출이 되어야 하는지 알려주는 지표이다.
	@RequestMapping("/erp/dev/deceased/upDeceasedPage.do")
	public ModelAndView DeceasedDetailPage(long deceSq) throws Exception {
		// ModelAndView 는 응답할  update  jsp정보를 가져와서 mv 변수 저장한다.
		ModelAndView mv = new ModelAndView("/erp/dev/deceased/deceased_update_page");
		// dedeSq 시퀸스 를 하나의 정보를 받아 list 변수 저장한다
		DeceasedVo list = deceasedService.selectDeceasedOne(deceSq);
		//list(key) list(value)선언
		mv.addObject("list", list);
		//mv 변수 저장한 값을 다시 리턴한다.
		return mv;
	}
	//update 기능 
	
	@ResponseBody
	@RequestMapping("/erp/deceased/updateDeceased.do")
	public ModelAndView updateDeceased(HttpServletRequest request, DeceasedVo DeceasedVo) throws Exception {
		//db에  선언한 값을 mv 변수에 저장한다.
		ModelAndView mv = new ModelAndView("jsonView");
		//DeceasedVo로 값을 선언 후  result 변수에 저장한다.
		int result = deceasedService.updateDeceased(DeceasedVo);
		//list(code) list(result)선언
		mv.addObject("code", result);
		//mv 변수 리턴한다
		return mv;
	}

}
