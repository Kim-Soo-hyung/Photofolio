package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.dao.PboardDAO;

@Controller
@RequestMapping("/pboard")
public class PboardController {
	
	@Autowired
	PboardDAO pdao;

	
	@RequestMapping(value="/list")
	public String list(Model model,int page, String searchType, String keyword) throws Exception {
		int last=(pdao.getTotal(searchType,keyword)%6)==0 ?(pdao.getTotal(searchType,keyword)/6):(pdao.getTotal(searchType,keyword)/6)+1;
		model.addAttribute("last",last);
		model.addAttribute("page",page);
		model.addAttribute("keyword",keyword);
		model.addAttribute("list", pdao.list(page, 6,searchType, keyword));
		return "pboard/list";
	}
	
	

	

}
