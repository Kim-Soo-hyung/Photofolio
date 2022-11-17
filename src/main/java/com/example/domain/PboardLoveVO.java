package com.example.domain;

public class PboardLoveVO {
	private String unickname,pcode,lcode;
	private boolean lovecondition;
	
	//boolean은 getter setter를 하면 is가 알아서 붙게 됨. 그래서 like와 isLike의 차이가 터진듯.

	@Override
	public String toString() {
		return "PboardLikeVO [unickname=" + unickname + ", pcode=" + pcode + ", lcode=" + lcode + ", lovecondition="
				+ lovecondition + "]";
	}

	public boolean isLovecondition() {
		return lovecondition;
	}

	public void setLovecondition(boolean lovecondition) {
		this.lovecondition = lovecondition;
	}

	public String getUnickname() {
		return unickname;
	}
	public void setUnickname(String unickname) {
		this.unickname = unickname;
	}
	public String getPcode() {
		return pcode;
	}
	public void setPcode(String pcode) {
		this.pcode = pcode;
	}
	public String getLcode() {
		return lcode;
	}
	public void setLcode(String lcode) {
		this.lcode = lcode;
	}
	
	
}