package com.example.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.dao.EventDAO;
import com.example.domain.EventVO;

@Controller
@RequestMapping("/event")
public class EventController {
	@Autowired
	EventDAO edao;

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(int page, int num, String searchType, String keyword,Model model) throws Exception{
		List<EventVO> list = edao.list(page, num, searchType, keyword);
		int last=(edao.getTotal(searchType,keyword)%6)==0 ?(edao.getTotal(searchType,keyword)/6):(edao.getTotal(searchType,keyword)/6)+1;
        model.addAttribute("list", list);
        model.addAttribute("page", page);
        model.addAttribute("keyword", keyword);
        model.addAttribute("num", 6);
        model.addAttribute("last", last);
        
        return "event/list";
	}
	
	@RequestMapping(value="/read/{ecode}",method=RequestMethod.GET)
	public String read(Model model,@PathVariable int ecode){
		model.addAttribute("vo",edao.read(ecode));
		
		return "event/read";
	}
	
	@RequestMapping(value="/insert",method=RequestMethod.GET)
	public String insert(Model model, EventVO eventvo,HttpSession session){
		model.addAttribute("aid",session.getAttribute("aid"));
		return "event/insert";
	}
	
	
	
	
	
	
	
}
