package com.example.controller;

import java.io.File;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.dao.UserDAO;
import com.example.domain.UserVO;
import com.example.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserRestController {

	@Autowired
	UserDAO udao;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	UserService uservice;

	@RequestMapping("/read/{uid}")
	public UserVO read(@PathVariable String uid) {
		return udao.read(uid);
	}

	@RequestMapping(value = "/findpw", method = RequestMethod.POST)
	public int findPwPOST(HttpServletResponse response, @RequestBody UserVO vo) throws Exception {
		int result = uservice.findPw(response, vo);
		return result;
	}

	@RequestMapping(value = "/check")
	public int chk(String unickname) {
		int result = 0;
		String CheckUnickname = udao.readUnickname(unickname);

		// when result=1, no duplicate
		if (!unickname.equals("") && CheckUnickname == null)
			result = 1;

		return result;
	}
	
	@RequestMapping(value = "/restore", method = RequestMethod.POST)
	public void restore(UserVO restoreVO) {
		udao.restore(restoreVO);
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public int login(@RequestBody UserVO loginVO) {
		int result = 0;
		UserVO ReadVO = udao.read(loginVO.getUid());
		if (ReadVO != null) {
			if (ReadVO.getUcondition().equals("0")) {
				result = 1;
			} else if (encoder.matches(loginVO.getUpass(), ReadVO.getUpass())) {
				result = 2;
			} else {
				result = 3;
			}
		}
		return result;
	}

	@RequestMapping(value = "/findid")
	public String search(String uemail, String uname) {
		String result = "";
		System.out.println(uemail);
		String search = udao.readUemail(uemail, uname);
		System.out.println(search);

		// when result=1, no duplicate
		if (search != null) {
			result = search;
		}
		return result;
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public void update(MultipartHttpServletRequest multi, UserVO updateVO) throws Exception {
		if (multi.getFile("file") != null) {

			String path = "c:/upload/project/";
			MultipartFile file = multi.getFile("file");

			// 파일의 확장자가 jpg,png인지 확인
			String contentType = file.getContentType();
			if (contentType.contains("image/png") || contentType.contains("image/jpeg")) {

				System.out.println("성공");
			} else {
				throw new Exception("이미지 파일은 jpg,png만 가능합니다. ");

			}

			File newFile = new File(path + file.getOriginalFilename());
			if (!newFile.exists())
				file.transferTo(newFile);
			updateVO.setUprofile("/upload/project/" + file.getOriginalFilename());
		}
		
		Pattern patternTel = Pattern.compile("\\d{3}-\\d{3,4}-\\d{4}");
		Matcher matcherTel = patternTel.matcher(updateVO.getUtel());
		if (matcherTel.matches()==false) {
			throw new Exception("틀 지키셈");
		}

		Pattern patternEmail = Pattern.compile("^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$");
		Matcher matcherEmail = patternEmail.matcher(updateVO.getUemail());
		if (matcherEmail.matches()==false) {
			throw new Exception("틀 지키셈");
		}

	
		udao.update(updateVO);

	}

	@RequestMapping(value = "/deactivate", method = RequestMethod.POST)
	public void deactivate(UserVO deactivateVO) {
		udao.deactivate(deactivateVO);
	}

	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	public void insert(MultipartHttpServletRequest multi, UserVO insertVO) throws Exception {
		if (multi.getFile("file") != null) {

			String path = "c:/upload/project/";
			MultipartFile file = multi.getFile("file");

			// 파일의 확장자가 jpg,png인지 확인
			String contentType = file.getContentType();
			if (contentType.contains("image/png") || contentType.contains("image/jpeg")) {
				System.out.println("성공");
			} else {
				throw new Exception("이미지 파일은 jpg,png만 가능합니다. ");
			}

			File newFile = new File(path + file.getOriginalFilename());
			if (!newFile.exists())
				file.transferTo(newFile);
			insertVO.setUprofile("/upload/project/" + file.getOriginalFilename());
		}
		
		Pattern patternPassword = Pattern.compile("^(?=.*[a-zA-Z])(?=.*[0-9]).{8,10}$");
		Matcher matcherPassword = patternPassword.matcher(insertVO.getUpass());
		if (matcherPassword.matches()==false) {
			throw new Exception("틀 지키셈");
		}
		
		insertVO.setUpass(encoder.encode(insertVO.getUpass()));

		Pattern patternTel = Pattern.compile("\\d{3}-\\d{3,4}-\\d{4}");
		Matcher matcherTel = patternTel.matcher(insertVO.getUtel());
		if (matcherTel.matches()==false) {
			throw new Exception("틀 지키셈");
		}

		Pattern patternEmail = Pattern.compile("^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$");
		Matcher matcherEmail = patternEmail.matcher(insertVO.getUemail());
		if (matcherEmail.matches()==false) {
			throw new Exception("틀 지키셈");
		}

		
		udao.insert(insertVO);

	}

	@RequestMapping(value = "/updatepw", method = RequestMethod.POST)
	public int updatePw(UserVO updatepwVO) throws Exception {
		Pattern patternPassword = Pattern.compile("^(?=.*[a-zA-Z])(?=.*[0-9]).{8,10}$");
		Matcher matcherPassword = patternPassword.matcher(updatepwVO.getUpass());
		if (matcherPassword.matches()==false) {
			throw new Exception("틀 지키셈");
		}
		
		updatepwVO.setUpass(encoder.encode(updatepwVO.getUpass()));
		return udao.updatePw(updatepwVO);
	}
	
	@RequestMapping("/sendAuthSMS")
	public String sendAuthSMS(String utel) {
		Random randomNum = new Random();	// ���� ����
		String authNum = "";
		
		
		for(int i = 0; i < 6; i++) {	//10 digits six number
			String random = Integer.toString(randomNum.nextInt(10));
			authNum += random;
		}
		System.out.println("UserRestController - sendAuthSMS : " + authNum);
		udao.authPhoneNumber(utel, authNum);
		
		return authNum;
	}

}
