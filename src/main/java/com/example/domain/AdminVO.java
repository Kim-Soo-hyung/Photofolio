package com.example.domain;

public class AdminVO {
	private String aid, apass, aname;

	public String getAid() {
		return aid;
	}

	public void setAid(String aid) {
		this.aid = aid;
	}

	public String getApass() {
		return apass;
	}

	public void setApass(String apass) {
		this.apass = apass;
	}

	public String getAname() {
		return aname;
	}

	public void setAname(String aname) {
		this.aname = aname;
	}

	@Override
	public String toString() {
		return "AdminVO [aid=" + aid + ", apass=" + apass + ", aname=" + aname + "]";
	}
	
	

}
