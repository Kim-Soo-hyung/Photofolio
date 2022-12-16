package com.erp.dev.deceased.vo;







import common.base.vo.BaseVo;

public class DeceasedVo extends BaseVo{
	//퇴사자 메인 페이지
	long deceSq; //시퀀스
	String deceNM1;//퇴사 직원명1
	String deceAs1;//부서명1
	String deceDp;//직급1
	String decePh;// 퇴사자 번호1
	String deceCn;//회사 비상 연락망1
	String deceNc; // 가족 비상연락망
	String deceAddr;// 주소1
	String deceSon;//퇴사사유
	public long getDeceSq() {
		return deceSq;
	}
	public void setDeceSq(long deceSq) {
		this.deceSq = deceSq;
	}
	public String getDeceNM1() {
		return deceNM1;
	}
	public void setDeceNM1(String deceNM1) {
		this.deceNM1 = deceNM1;
	}
	public String getDeceAs1() {
		return deceAs1;
	}
	public void setDeceAs1(String deceAs1) {
		this.deceAs1 = deceAs1;
	}
	public String getDeceDp() {
		return deceDp;
	}
	public void setDeceDp(String deceDp) {
		this.deceDp = deceDp;
	}
	public String getDecePh() {
		return decePh;
	}
	public void setDecePh(String decePh) {
		this.decePh = decePh;
	}
	public String getDeceCn() {
		return deceCn;
	}
	public void setDeceCn(String deceCn) {
		this.deceCn = deceCn;
	}
	public String getDeceNc() {
		return deceNc;
	}
	public void setDeceNc(String deceNc) {
		this.deceNc = deceNc;
	}
	public String getDeceAddr() {
		return deceAddr;
	}
	public void setDeceAddr(String deceAddr) {
		this.deceAddr = deceAddr;
	}
	public String getDeceSon() {
		return deceSon;
	}
	public void setDeceSon(String deceSon) {
		this.deceSon = deceSon;
	}
	

	
}
