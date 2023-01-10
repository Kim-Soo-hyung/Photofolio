package com.back.vo;

import common.base.vo.BaseVo;

public class BackVo extends BaseVo {
	
	int proSq; //순번
	String proSqq;//직원순번
	String proNm;//프로젝트이름
	String proTyp;//프로젝트유형
	String proAddr;//프로젝트주소
	
	public int getProSq() {
		return proSq;
	}
	public void setProSq(int proSq) {
		this.proSq = proSq;
	}
	public String getProSqq() {
		return proSqq;
	}
	public void setProSqq(String proSqq) {
		this.proSqq = proSqq;
	}
	public String getProNm() {
		return proNm;
	}
	public void setProNm(String proNm) {
		this.proNm = proNm;
	}
	public String getProTyp() {
		return proTyp;
	}
	public void setProTyp(String proTyp) {
		this.proTyp = proTyp;
	}
	public String getProAddr() {
		return proAddr;
	}
	public void setProAddr(String proAddr) {
		this.proAddr = proAddr;
	}

	
	
	
	
}
