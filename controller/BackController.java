package com.back.controller;

import java.util.List;



import javax.annotation.Resource;


import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.back.service.BackService;
import com.back.vo.BackVo;


import common.base.controller.BaseController;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class BackController extends BaseController{
	Logger log = Logger.getLogger(this.getClass());
	
	@Resource(name="backService")
	BackService backService;
	
	@RequestMapping(value="/back/openBackListPage.do")
	public ModelAndView openBackListPage(BackVo backVo) throws Exception{
		ModelAndView mv=new ModelAndView("/back/back_list_page");
		List<BackVo> list=backService.selectBackList(backVo);
		mv.addObject("list", list);
		
		return mv;
	}
	@ResponseBody
	@RequestMapping(value="/back/BackListPage.do")
	public ModelAndView BackListPage(BackVo backVo) throws Exception{
		ModelAndView mv=new ModelAndView("jsonView");
		
		List<BackVo> list=backService.selectBackList(backVo);
		mv.addObject("list", list);
		return mv;
	}
	
	@RequestMapping(value="/back/openListPage.do")
	public ModelAndView BackListPage(long proSq) throws Exception{
		ModelAndView mv=new ModelAndView("/back/back_detail_page");
		BackVo list=backService.selectbackOne(proSq);
		mv.addObject("list", list);
		return mv;
	}
	//@RequestParam String 변환하는 이유는 null 나오는걸 방지 할려고 한다 
	@RequestMapping("/back/DateBackListPage.do")
	public ModelAndView selectVisitantOne( @RequestParam(value="proSq") String proSq) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		
		BackVo list = backService.selectbackOne(Long.parseLong(proSq));
		
		mv.addObject("list", list);
		
		return mv;
	}
	@RequestMapping("/back/openBackUpdatePage.do")
	public  ModelAndView openBackUpdatePage(long proSq) throws Exception{
		ModelAndView mv=new ModelAndView("/back/back_update_page");
		BackVo list=backService.selectbackOne(proSq);
		mv.addObject("list", list);
		return mv;
	}
	
	//수정
	@ResponseBody
	@RequestMapping("/back/BackUpdatePage.do")
	
	public int BackUpdatePage(BackVo backVo) throws Exception{
		
		int countUpdate = backService.updateBackList(backVo);
		
		return countUpdate;
	}
	//insert open page 기능 
	@RequestMapping("/back/OpenBackinsertPage.do")
	public ModelAndView OpenBackinsertPage() throws Exception{
		ModelAndView mv=new ModelAndView("/back/back_insert_page");
		return mv;
	}
	@RequestMapping("/back/insertBack.do")
	public ModelAndView insertBack(BackVo backVo) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		
		int list = backService.insertBack(backVo);
		
		mv.addObject("list", list);
		return mv;
	}
	
	//delete  page 기능 
	@RequestMapping("/back/BackdeletePage.do")
	public ModelAndView BackdeletePage(long proSq) throws Exception{
		ModelAndView mv=new ModelAndView("jsonView");
		int list=backService.deleteBack(proSq);
		mv.addObject("list",list);
		return mv;
	}
}
