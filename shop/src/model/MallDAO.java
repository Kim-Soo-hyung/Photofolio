package model;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class MallDAO {
	Connection con = Database.CON;
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	DecimalFormat df = new DecimalFormat("#,###");
	
	public JSONObject list(SqlVO vo) {
		JSONObject object = new JSONObject();
		try {
			String sql = "call list('mall ',?,?,?,?,?,?) ";
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
				obj.put("mall_id", rs.getString("mall_id"));
				obj.put("mall_name", rs.getString("mall_name"));
				obj.put("manager", rs.getString("manager"));
				obj.put("address", rs.getString("address"));
				obj.put("tel", rs.getString("tel"));
				obj.put("email", rs.getString("email"));
				
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
