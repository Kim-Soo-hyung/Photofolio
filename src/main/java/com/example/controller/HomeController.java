package com.example.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.dao.AdminDAO;


@Controller
public class HomeController {
	
	@Autowired
	AdminDAO adao;
	
	
	@RequestMapping("/")
	public String tiles( Model model,HttpSession session) {
		model.addAttribute("login_info",adao.read((String) session.getAttribute("aid")));
		//밑의 home은 /가 붙어있는데 그 이유는 tiles.XML에서 /를 안붙였기 때문. 또한  *.tiles는 아래 return의 /home.tiles로
		//*는 home이 되며 첫번째 *가 바로 {1}임. 다시말해 requestMapping이랑은 무관하고
		//controller의 return이랑 관련있음. 따라서 header와 footer가 달린 home.jsp가 출력됨. 문제는 read,
		//insert, list 등 너무 다양한 것들이 header가 달려야 하는데 url이 다 제각각임.
		return "home.tiles";
	}
	

}
