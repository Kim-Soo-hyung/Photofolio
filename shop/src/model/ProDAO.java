package model;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class ProDAO {
	Connection con = Database.CON;
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	DecimalFormat df = new DecimalFormat("#,###");
	
	public void update(ProVO vo) {
		try {
			String sql = "update product set prod_name=?,company=?,mall_id=?,price1=?,price2=?,detail=?,image=?,prod_del=? where prod_id=?";
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setString(9, vo.getProd_id());
			ps.setString(1, vo.getProd_name());
			ps.setString(2, vo.getCompany());
			ps.setString(3, vo.getMall_id());
			ps.setInt(4, vo.getPrice1());
			ps.setInt(5, vo.getPrice2());
			ps.setString(6, vo.getDetail());
			ps.setString(7, vo.getImage());
			ps.setString(8, vo.getProd_del());
			ps.execute();
		}catch(Exception e) {
			System.out.println("상품수정"+e.toString());
		}
	}
	
	
	public ProVO read(String prod_id) {
		ProVO vo = new ProVO();
		try {
			String sql = "select * from pro_mall where prod_id=?";
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setString(1, prod_id);
			ResultSet rs = ps.executeQuery();
			if(rs.next()) {
				vo.setProd_id(rs.getString("prod_id"));
				vo.setProd_name(rs.getString("prod_name"));
				vo.setCompany(rs.getString("company"));
				vo.setMall_id(rs.getString("mall_id"));
				vo.setImage(rs.getString("image"));
				vo.setProd_del(rs.getString("prod_del"));
				vo.setDetail(rs.getString("detail"));
				vo.setPrice1(rs.getInt("price1"));
				vo.setPrice2(rs.getInt("price2"));
				vo.setMall_name(rs.getString("mall_name"));
			}
		}catch(Exception e) {
			System.out.println("상품정보"+e.toString());
		}
		
		
		return vo;
	}
	
	public void insert(ProVO vo) {
		try {
			String sql = "insert into product(prod_id,prod_name,company,mall_id,price1,price2,detail,image) values(?,?,?,?,?,?,?,?)";
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setString(1, vo.getProd_id());
			ps.setString(2, vo.getProd_name());
			ps.setString(3, vo.getCompany());
			ps.setString(4, vo.getMall_id());
			ps.setInt(5, vo.getPrice1());
			ps.setInt(6, vo.getPrice2());
			ps.setString(7, vo.getDetail());
			ps.setString(8, vo.getImage());
			ps.execute();
		}catch(Exception e) {
			System.out.println("상품등록"+e.toString());
		}
	}
	
	public String getCode() {
		String code="";
		try {
			String sql="select concat('P',max(substring(prod_id,2,3))+1) code from product";
			PreparedStatement ps = con.prepareStatement(sql);
			ResultSet rs= ps.executeQuery();
			if(rs.next()) {
				code=rs.getString("code");
			}
		}catch(Exception e) {
			System.out.println("마지막코드"+e.toString());
		}
		return code;
	}
	
	public JSONObject list(SqlVO vo) {
		JSONObject object = new JSONObject();
		try {
			String sql = "call list('pro_mall ',?,?,?,?,?,?) ";
			CallableStatement cs =  con.prepareCall(sql);
			cs.setString(1, vo.getKey());
			cs.setString(2, vo.getWord());
			cs.setString(3, vo.getOrder());
			cs.setString(4, vo.getDesc());
			cs.setInt(5, vo.getPage());
			cs.setInt(6, vo.getPer());
			cs.execute();
			ResultSet rs=cs.getResultSet();
			JSONArray jArray = new JSONArray();
			while(rs.next()) {
				JSONObject obj = new JSONObject();
				obj.put("prod_id", rs.getString("prod_id"));
				obj.put("prod_name", rs.getString("prod_name"));
				obj.put("company", rs.getString("company"));
				obj.put("fprice", df.format(rs.getInt("price1")) );
				obj.put("image", rs.getString("image"));
				obj.put("mall_id", rs.getString("mall_id"));
				obj.put("mall_name", rs.getString("mall_name"));
				obj.put("prod_del", rs.getString("prod_del"));
				
				
				jArray.add(obj);
			}
			object.put("array", jArray);
			
			cs.getMoreResults();
			rs=cs.getResultSet();
			int total = 0;
			if(rs.next()) {
				total = rs.getInt("total");
			}
			object.put("total", total);
			
			int last=total%vo.getPer()==0? total/vo.getPer() : total/vo.getPer()+1;
			object.put("last", last); 
		}catch(Exception e) {
			System.out.println("업체목록"+e.toString());
		}
		return object;
	}
}
