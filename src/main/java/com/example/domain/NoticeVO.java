package com.example.domain;

public class NoticeVO {

	private String ncode, regDate, ntitle, ncontent, nwriter ;

	public String getNcode() {
		return ncode;
	}

	public void setNcode(String ncode) {
		this.ncode = ncode;
	}

	public String getRegDate() {
		return regDate;
	}

	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}

	public String getNtitle() {
		return ntitle;
	}

	public void setNtitle(String ntitle) {
		this.ntitle = ntitle;
	}

	public String getNcontent() {
		return ncontent;
	}

	public void setNcontent(String ncontent) {
		this.ncontent = ncontent;
	}

	public String getNwriter() {
		return nwriter;
	}

	public void setNwriter(String nwriter) {
		this.nwriter = nwriter;
	}

	@Override
	public String toString() {
		return "NoticeVO [ncode=" + ncode + ", regDate=" + regDate + ", ntitle=" + ntitle + ", ncontent=" + ncontent
				+ ", nwriter=" + nwriter + "]";
	}

	
}
