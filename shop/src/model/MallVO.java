package model;

public class MallVO {
	private String mall_id;
	 private String mall_name;
	 private String manager;
	 private String address;
	 private String tel;
	 private String email;
	 private String detail;
	public String getMall_id() {
		return mall_id;
	}
	public void setMall_id(String mall_id) {
		this.mall_id = mall_id;
	}
	public String getMall_name() {
		return mall_name;
	}
	public void setMall_name(String mall_name) {
		this.mall_name = mall_name;
	}
	public String getManager() {
		return manager;
	}
	public void setManager(String manager) {
		this.manager = manager;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	@Override
	public String toString() {
		return "MallVO [mall_id=" + mall_id + ", mall_name=" + mall_name + ", manager=" + manager + ", address="
				+ address + ", tel=" + tel + ", email=" + email + ", detail=" + detail + "]";
	}
	
}
