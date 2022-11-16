package model;

public class CartVO extends ProVO {
	private String prod_id;
	private int qnt;
	private int sum;
	public String getProd_id() {
		return prod_id;
	}
	public void setProd_id(String prod_id) {
		this.prod_id = prod_id;
	}
	public int getQnt() {
		return qnt;
	}
	public void setQnt(int qnt) {
		this.qnt = qnt;
	}
	public int getSum() {
		return sum;
	}
	public void setSum(int sum) {
		this.sum = sum;
	}
	@Override
	public String toString() {
		return "CartVO [prod_id=" + prod_id + ", qnt=" + qnt + ", sum=" + sum + "]";
	}
	
}
