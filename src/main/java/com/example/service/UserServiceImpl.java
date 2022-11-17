    package com.example.service;

import java.io.PrintWriter;
import java.util.Random;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.mail.HtmlEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.dao.UserDAO;
import com.example.domain.UserVO;

@Service
public class UserServiceImpl implements UserService {
	// 비밀번호 찾기 이메일발송
	@Autowired
	UserDAO udao;
	@Autowired
	PasswordEncoder encoder;

	@Override
	public void sendEmail(UserVO vo, String div) throws Exception {
		// Mail Server 설정
		String charSet = "utf-8";
		String hostSMTP = "smtp.gmail.com"; // 네이버 이용시 smtp.naver.com
		String hostSMTPid = "mullonmarket@gmail.com";
		String hostSMTPpwd = "btaa yqrx khuw gbqc";

		// 보내는 사람 EMail, 제목, 내용
		String fromEmail = "okmarket@icia.com";
		String fromName = "물론마켓";
		String subject = "비밀번호 찾기 메일";
		String msg = "test";

		if (div.equals("findpw")) {
			subject = "물론마켓 임시 비밀번호입니다..";
			msg += "<div align='center' style='border:1px solid black; font-family:verdana'>";
			msg += "<h3 style='color: blue;'>";
			msg += vo.getUid() + "님의 임시 비밀번호 입니다. 비밀번호를 변경하여 사용하세요.</h3>";
			msg += "<p>임시 비밀번호 : ";
			msg += vo.getUpass() + "</p></div>";
		}

		// 받는 사람 E-Mail 주소
		String mail = vo.getUemail();
		try {
			HtmlEmail email = new HtmlEmail();
			email.setDebug(true);
			email.setCharset(charSet);
			email.setSSL(true);
			email.setHostName(hostSMTP);
			email.setSmtpPort(465); // 네이버 이용시 587

			email.setAuthentication(hostSMTPid, hostSMTPpwd);
			email.setTLS(true);
			email.addTo(mail, charSet);
			email.setFrom(fromEmail, fromName, charSet);
			email.setSubject(subject);
			email.setHtmlMsg(msg);
			email.send();
			
		} catch (Exception e) {
			System.out.println("메일발송 실패 : " + e);
		}
	}

	// 비밀번호찾기
	@Override
	public int findPw(HttpServletResponse response, UserVO vo) throws Exception {
		response.setContentType("text/html;charset=utf-8");
		UserVO ck = udao.read(vo.getUid());
		int result = 0;
		// 가입된 아이디가 없으면
		if (ck == null) {
			result = 1;

		}
		// 가입된 이메일이 아니면
		else if (!vo.getUemail().equals(ck.getUemail())) {
			result = 2;
		} else {
			// 임시 비밀번호 생성
			String upass = "";
			int leftLimit = 97; // letter 'a'
			int rightLimit = 122; // letter 'z'
			int targetStringLength = 3;
			Random random = new Random();
			String generatedString = random.ints(leftLimit, rightLimit + 1).limit(targetStringLength)
					.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append).toString();
			upass += generatedString;
			for (int i = 0; i < 2; i++) {
				upass += (int) (Math.random() * 26) + 97;
			}

			vo.setUpass(upass);
			sendEmail(vo, "findpw");
			// 비밀번호 변경
			vo.setUpass(encoder.encode(upass));
			udao.updatePw(vo);
			// 비밀번호 변경 메일 발송
			result = 3;
		}
		return result;
	}
}

    
