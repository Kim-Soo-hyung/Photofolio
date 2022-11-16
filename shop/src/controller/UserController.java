package controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;

import model.UserDAO;
import model.UserVO;


@WebServlet(value= {"/user/login","/user/logout","/user/login.json"})
public class UserController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	UserDAO dao = new UserDAO();
  
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		RequestDispatcher dis = request.getRequestDispatcher("/home.jsp");
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();
		switch(request.getServletPath()){
		case "/user/login":
			request.setAttribute("pageName", "/user/login.jsp");
			dis.forward(request, response);
			break;
		case "/user/login.json":
			UserVO vo = dao.login(request.getParameter("uid"));
			JSONObject obj = new JSONObject();
			obj.put("uid", vo.getUid());
			obj.put("pass", vo.getPass());
			obj.put("uname", vo.getUname());
			out.println(obj);
			session.setAttribute("uid", vo.getUid());
			break;
		case "/user/logout":
			session.invalidate();
			response.sendRedirect("/");
			break;
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

}
