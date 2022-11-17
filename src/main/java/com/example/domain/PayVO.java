package com.example.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class PayVO {
	private int payprice;
	private String paytype,payemail,uid,paycode;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date regDate;
	@Override
	public String toString() {
		return "PayVO [payprice=" + payprice + ", paytype=" + paytype + ", payemail=" + payemail + ", uid=" + uid
				+ ", paycode=" + paycode + ", regDate=" + regDate + "]";
	}
	public int getPayprice() {
		return payprice;
	}
	public void setPayprice(int payprice) {
		this.payprice = payprice;
	}
	public String getPaytype() {
		return paytype;
	}
	public void setPaytype(String paytype) {
		this.paytype = paytype;
	}
	public String getPayemail() {
		return payemail;
	}
	public void setPayemail(String payemail) {
		this.payemail = payemail;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getPaycode() {
		return paycode;
	}
	public void setPaycode(String paycode) {
		this.paycode = paycode;
	}
	public Date getRegDate() {
		return regDate;
	}
	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}
	
	
	

	
	
	

}
