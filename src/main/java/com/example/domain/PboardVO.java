package com.example.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class PboardVO {
	private String pcode;
	private String ptitle;
	private String pcontent;
	private String pwriter;
	private String pimage;
	private String pname;
	private double upoint;
	private int pprice;
	private int pcondition;
	private int viewcnt;
	private int plike;
	private int replycnt;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date regDate;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date updateDate;
	
	public String getPcode() {
		return pcode;
	}
	public void setPcode(String pcode) {
		this.pcode = pcode;
	}
	public String getPtitle() {
		return ptitle;
	}
	public void setPtitle(String ptitle) {
		this.ptitle = ptitle;
	}
	public String getPcontent() {
		return pcontent;
	}
	public void setPcontent(String pcontent) {
		this.pcontent = pcontent;
	}
	public String getPwriter() {
		return pwriter;
	}
	public void setPwriter(String pwriter) {
		this.pwriter = pwriter;
	}
	public String getPimage() {
		return pimage;
	}
	public void setPimage(String pimage) {
		this.pimage = pimage;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	public double getUpoint() {
		return upoint;
	}
	public void setUpoint(double upoint) {
		this.upoint = upoint;
	}
	public int getPprice() {
		return pprice;
	}
	public void setPprice(int pprice) {
		this.pprice = pprice;
	}
	public int getPcondition() {
		return pcondition;
	}
	public void setPcondition(int pcondition) {
		this.pcondition = pcondition;
	}
	public int getViewcnt() {
		return viewcnt;
	}
	public void setViewcnt(int viewcnt) {
		this.viewcnt = viewcnt;
	}
	public int getPlike() {
		return plike;
	}
	public void setPlike(int plike) {
		this.plike = plike;
	}
	public int getReplycnt() {
		return replycnt;
	}
	public void setReplycnt(int replycnt) {
		this.replycnt = replycnt;
	}
	public Date getRegDate() {
		return regDate;
	}
	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	@Override
	public String toString() {
		return "PboardVO [pcode=" + pcode + ", ptitle=" + ptitle + ", pcontent=" + pcontent + ", pwriter=" + pwriter
				+ ", pimage=" + pimage + ", pname=" + pname + ", upoint=" + upoint + ", pprice=" + pprice
				+ ", pcondition=" + pcondition + ", viewcnt=" + viewcnt + ", plike=" + plike + ", replycnt=" + replycnt
				+ ", regDate=" + regDate + ", updateDate=" + updateDate + "]";
	}
	

	

}
