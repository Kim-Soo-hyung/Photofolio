package com.example.dao;

import com.example.domain.AdminVO;

public interface AdminDAO {
	public AdminVO read(String aid);
	public void insert(AdminVO insertVO);
}
