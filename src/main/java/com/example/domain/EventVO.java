package com.example.domain;



import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class EventVO {
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date regDate;
	private int ecode;
	private String etitle;
	private String econtent;
	private String ewriter;
	
	
	public Date getRegDate() {
		return regDate;
	}
	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}
	public int getEcode() {
		return ecode;
	}
	public void setEcode(int ecode) {
		this.ecode = ecode;
	}
	public String getEtitle() {
		return etitle;
	}
	public void setEtitle(String etitle) {
		this.etitle = etitle;
	}
	public String getEcontent() {
		return econtent;
	}
	public void setEcontent(String econtent) {
		this.econtent = econtent;
	}
	public String getEwriter() {
		return ewriter;
	}
	public void setEwriter(String ewriter) {
		this.ewriter = ewriter;
	}
	@Override
	public String toString() {
		return "NoticeVO [regDate=" + regDate + ", ecode=" + ecode + ", etitle=" + etitle + ", econtent=" + econtent
				+ ", ewriter=" + ewriter + "]";
	}
	
	
	
}
