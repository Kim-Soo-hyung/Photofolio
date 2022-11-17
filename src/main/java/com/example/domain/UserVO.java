package com.example.domain;

public class UserVO {
	private String uid;
	private String upass;
	private String uname;
	private String unickname;
	private String uemail;
	private String utel;
	private String uaddress;
	private String uprofile;
	private String ubirth;
	private String ucondition;
	
	
	public String getUbirth() {
		return ubirth;
	}
	public void setUbirth(String ubirth) {
		this.ubirth = ubirth;
	}
	public String getUcondition() {
		return ucondition;
	}
	private String ugender;
	public String getUgender() {
		return ugender;
	}
	public void setUgender(String ugender) {
		this.ugender = ugender;
	}
	public void setUcondition(String ucondition) {
		this.ucondition = ucondition;
	}

	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getUpass() {
		return upass;
	}
	public void setUpass(String upass) {
		this.upass = upass;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	public String getUnickname() {
		return unickname;
	}
	public void setUnickname(String unickname) {
		this.unickname = unickname;
	}
	public String getUemail() {
		return uemail;
	}
	public void setUemail(String uemail) {
		this.uemail = uemail;
	}
	public String getUtel() {
		return utel;
	}
	public void setUtel(String utel) {
		this.utel = utel;
	}
	public String getUaddress() {
		return uaddress;
	}
	public void setUaddress(String uaddress) {
		this.uaddress = uaddress;
	}
	public String getUprofile() {
		return uprofile;
	}
	public void setUprofile(String uprofile) {
		this.uprofile = uprofile;
	}


	@Override
	public String toString() {
		return "UserVO [uid=" + uid + ", upass=" + upass + ", uname=" + uname + ", unickname=" + unickname + ", uemail="
				+ uemail + ", utel=" + utel + ", uaddress=" + uaddress + ", uprofile=" + uprofile + ", ubirth=" + ubirth
				+ ", ugender=" + ugender + ", ucondition=" + ucondition + "]";
	}
	
	
}
