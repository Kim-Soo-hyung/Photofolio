package com.example.domain;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ReviewVO {
	
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date regDate;
	private String rvcode;
	private String rvcontent;
	private String receiver;
	private String sender;
	private String paycode;
	private double point;
	
	public Date getRegDate() {
		return regDate;
	}
	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}
	public String getRvcode() {
		return rvcode;
	}
	public void setRvcode(String rvcode) {
		this.rvcode = rvcode;
	}
	public String getRvcontent() {
		return rvcontent;
	}
	public void setRvcontent(String rvcontent) {
		this.rvcontent = rvcontent;
	}
	public String getReceiver() {
		return receiver;
	}
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getPaycode() {
		return paycode;
	}
	public void setPaycode(String paycode) {
		this.paycode = paycode;
	}
	public double getPoint() {
		return point;
	}
	public void setPoint(double point) {
		this.point = point;
	}
	
	@Override
	public String toString() {
		return "ReviewVO [regDate=" + regDate + ", rvcode=" + rvcode + ", rvcontent=" + rvcontent + ", receiver="
				+ receiver + ", sender=" + sender + ", paycode=" + paycode + ", point=" + point + "]";
	}
	
	
	
	
	
}
