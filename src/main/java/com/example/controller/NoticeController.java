package com.example.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.dao.NoticeDAO;
import com.example.domain.NoticeVO;

@Controller
@RequestMapping("/notice")
public class NoticeController {

	@Autowired
	NoticeDAO ndao;

	@RequestMapping(value = "/list")
	public String list(int page, int num, String searchType, String keyword,Model model) {
		List<NoticeVO> list = ndao.list(page, num, searchType, keyword);
		int last=(ndao.getTotal(searchType,keyword)%6)==0 ?(ndao.getTotal(searchType,keyword)/6):(ndao.getTotal(searchType,keyword)/6)+1;
        model.addAttribute("list", list);
        model.addAttribute("page", page);
        model.addAttribute("keyword", keyword);
        model.addAttribute("num", 6);
        model.addAttribute("last", last);
		return "notice/list";
	}

	@RequestMapping(value = "/read/{ncode}", method = RequestMethod.GET)
	public String read(Model model, @PathVariable String ncode) {
		model.addAttribute("vo", ndao.read(ncode));
		return "notice/read";
	}

	@RequestMapping(value = "/insert", method = RequestMethod.GET)
	public String insert(Model model, NoticeVO vo, HttpSession session) {
		model.addAttribute("aid",session.getAttribute("aid"));
		return "notice/insert";
	}

	@RequestMapping(value = "/update")
	public String update(Model model, String ncode) {
		model.addAttribute("vo", ndao.read(ncode));
		return "notice/update";
	}

}
