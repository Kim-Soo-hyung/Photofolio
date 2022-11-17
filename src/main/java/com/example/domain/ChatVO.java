package com.example.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ChatVO extends UserVO{
	 private int id; 
	 private String sender; 
	 private String receiver;
	 private String message;
	 @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="Asia/Seoul")
	 private Date regDate; 
	 @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="Asia/Seoul")
	 private Date readDate;
	 private Status status;


	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "ChatVO [id=" + id + ", sender=" + sender + ", receiver=" + receiver + ", message=" + message
				+ ", regDate=" + regDate + ", readDate=" + readDate + ", status=" + status + "]";
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getReceiver() {
		return receiver;
	}
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Date getRegDate() {
		return regDate;
	}
	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}
	public Date getReadDate() {
		return readDate;
	}
	public void setReadDate(Date readDate) {
		this.readDate = readDate;
	}
	 
	 
	 
}
