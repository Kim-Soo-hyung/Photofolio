package com.example.dao;

import java.util.List;

import com.example.domain.ChatVO;

public interface ChatDAO {
	public List<ChatVO> list(String sender, String receiver);

	public void insert(ChatVO vo);

	public void delete(int id);
}
