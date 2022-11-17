package com.example.dao;

import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.UserVO;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Repository
public class UserDAOImpl implements UserDAO{
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.UserMapper";

	@Override
	public UserVO read(String uid) {
		return session.selectOne(namespace+".read" ,uid);
	}

	@Override
	public void update(UserVO updateVO) {
		session.update(namespace+".update",updateVO);
	}

	@Override
	public void insert(UserVO insertVO) {
		session.insert(namespace+".insert" , insertVO);
	}
	
	@Override
	public void deactivate(UserVO deactivateVO) {
		session.update(namespace + ".deactivate" , deactivateVO);
	}

	@Override
	public void restore(UserVO restoreVO) {
		// TODO Auto-generated method stub
		session.update(namespace + ".restore" , restoreVO);
		
	}
	
	@Override
	public int updatePw (UserVO vo) throws Exception{
		return session.update(namespace+".updatePw", vo);
	}

	@Override
	public String readUnickname(String unickname) {
		// TODO Auto-generated method stub
		return session.selectOne(namespace+".readUnickname",unickname);
	}
	
	@Override
	public String readUemail(String uemail,String uname) {
		HashMap<String,Object>map=new HashMap<>();
		map.put("uemail", uemail);
		map.put("uname", uname);
		return session.selectOne(namespace+".readUemail",map);
	}

	@Override
	public void updateUpoint(String receiver) {
		session.update(namespace+".updateUpoint",receiver);
		
	}

	@Override
	public void authPhoneNumber(String utel, String authNum) {
		String api_key = "NCSMCV56UK5PEOAS";
		String api_secret = "OGMHGG1T3JCBITC9FWHORKVFI8BLGDIW";
		Message coolSMS = new Message(api_key, api_secret);
		HashMap<String, String> params = new HashMap<>();
		params.put("to", utel);		// ���� ��ȭ ��ȣ
		params.put("from", "010-7591-3370");	// �׽�Ʈ �� ���� ��ȣ �Է�
		params.put("type", "SMS");
		params.put("text", "인증번호는 [ " + authNum + " ]입니다.");	// ���� ����
		params.put("app_version", "test app 1.2");				// application name and version
		
		try {
			JSONObject object = (JSONObject)coolSMS.send(params);
			System.out.println("UserDAOImpl - authPhoneNumber/object : " + object.toString());
		} catch(CoolsmsException e) {
			System.out.println("UserDAOImpl - authPhoneNumber/errormessgae : " + e.getMessage());
			System.out.println("UserDAOImpl - authPhoneNumbe/errorcode : " + e.getCode());
		}
		

		
	}

	
}
