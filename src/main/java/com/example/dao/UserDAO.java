package com.example.dao;

import java.util.List;

import com.example.domain.UserVO;

public interface UserDAO {
	public UserVO read(String uid);
	public String readUnickname(String unickname);
	public void update(UserVO updateVO);
	public void insert(UserVO insertVO);
	public void deactivate(UserVO deactivateVO);
	public void restore(UserVO restoreVO);
	public int updatePw(UserVO vo) throws Exception;
	public String readUemail(String uemail,String uname);
	public void updateUpoint(String receiver);
	public void authPhoneNumber(String utel, String authNum);

}
