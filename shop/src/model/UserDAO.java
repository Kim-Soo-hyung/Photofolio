package model;

import java.sql.*;

public class UserDAO {

	
	//로그인체크
	public UserVO login(String uid) {
		UserVO vo = new UserVO();
		try {
			String sql = "select * from users where uid=?";
			PreparedStatement ps =Database.CON.prepareStatement(sql);
			ps.setString(1,	uid);
			ResultSet rs = ps.executeQuery();
			if(rs.next()) {
				vo.setUid(rs.getString("uid"));
				vo.setPass(rs.getString("pass"));
				vo.setUname(rs.getString("uname"));
			}
		}catch(Exception e) {
			System.out.println("로그인"+e.toString());
		}
		
		return vo;
	}
}
