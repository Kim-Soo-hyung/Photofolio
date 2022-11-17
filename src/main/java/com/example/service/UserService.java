package com.example.service;

import javax.servlet.http.HttpServletResponse;

import com.example.domain.UserVO;
public interface UserService {
	
	
	//�̸��Ϲ߼�
	public void sendEmail(UserVO vo, String div) throws Exception;

	//��й�ȣã��
	public int findPw(HttpServletResponse resp, UserVO vo) throws Exception;
}
