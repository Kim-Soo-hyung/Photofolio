package model;

public class ProVO extends MallVO {
	   private String prod_id;
	   private String prod_name;
	   private String company;
	   private int price1;
	   private int price2;
	   private String detail;
	   private String image;
	   private String prod_del;
	public String getProd_id() {
		return prod_id;
	}
	public void setProd_id(String prod_id) {
		this.prod_id = prod_id;
	}
	public String getProd_name() {
		return prod_name;
	}
	public void setProd_name(String prod_name) {
		this.prod_name = prod_name;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public int getPrice1() {
		return price1;
	}
	public void setPrice1(int price1) {
		this.price1 = price1;
	}
	public int getPrice2() {
		return price2;
	}
	public void setPrice2(int price2) {
		this.price2 = price2;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getProd_del() {
		return prod_del;
	}
	public void setProd_del(String prod_del) {
		this.prod_del = prod_del;
	}
	@Override
	public String toString() {
		return "ProVO [prod_id=" + prod_id + ", prod_name=" + prod_name + ", company=" + company + ", price1=" + price1
				+ ", price2=" + price2 + ", detail=" + detail + ", image=" + image + ", prod_del=" + prod_del + "]";
	}
}
