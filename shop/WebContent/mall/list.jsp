<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<style>
#mlist {
	overflow: hidden;
}
#mlist form{
    	text-align: center;
    	width:980px; 
    	background:white; 
    	box-shadow:10px 10px 10px blak; 
    	margin:auto;
    }
#mlist #right{
	float: right;
	margin-right: 50px;
}
</style>
 
<h1>��ü���</h1>
<div id="mlist">
	<form name="frm">
		<select id="key">
			<option value="mall_id">��ü�ڵ�</option>
			<option value="mall_name">��ü�̸�</option>
			<option value="address">��ü�ּ�</option>
			<option value="tel">��ü��ȭ��ȣ</option>
		</select>
		<input type="text" id="word" placeholder="�˻���">
		<select id="per">
			<option value="2">2��</option>
			<option value="3">3��</option>
			<option value="5" selected="selected">5��</option>
			<option value="10">10��</option>
		</select>
		<button>�˻�</button>
		�˻� �� :<span id="total"></span>
	</form>
	<div id="right">
	<select id="order">
			<option value="mall_id">��ü�ڵ�</option>
			<option value="mall_name">��ü�̸�</option>
			<option value="address">��ü�ּ�</option>
			<option value="tel">��ü��ȭ��ȣ</option>
		</select>
		<select id="desc">
			<option value="asc">��������</option>
			<option value="desc">��������</option>

		</select>
	</div>
</div>
<table id="tbl"></table>
<script id = "temp" type = "text/x-handlebars-template">
  <tr class="title">
    <td width=50>�ڵ�</td>
    <td width=100>��ü��</td>
    <td width=100>������</td>
    <td width=250>�ּ�</td>
    <td width=150>��ȭ</td>
    <td width=100>�̸���</td>
  </tr>
	{{#each array}}
  	<tr class="row">
    	<td>{{mall_id}}</td>
    	<td>{{mall_name}}</td>
    	<td>{{manager}}</td>
    	<td>{{address}}</td>
    	<td>{{tel}}</td>
    	<td>{{email}}</td> 
  	</tr>
	{{/each}}
</script>
<div class="buttons">
<a href="/mall/insert"><button >��ü���</button></a>
	<button id="prev">����</button>
	<span id="page">1/4</span>
	<button id="next">����</button>
</div>

<script>
	var page = 1;
	getList();
	
	$("#next").on("click",function(){
		page++;
		getList();
	})
	$("#prev").on("click",function(){
		page--;
		getList();
	})
	$("#per","#order","#desc").on("change",function(){
		page=1;
		getList();
	})
	$(frm).on("submit",function(e){
		e.preventDefault();
		page=1;
		getList();
	})
	function getList(){
		var key = $("#key").val();
		var word = $("#word").val();
		var per = $("#per").val();
		var order = $("#order").val();
		var desc = $("#desc").val();
		 $.ajax ({
	         type : "get",
	         url : "/mall/list.json",
	         data : {page : page, key:key, word:word, per:per, order:order, desc:desc},
	         dataType : "json",
	         success : function(data) {
	        	 var temp = Handlebars.compile($("#temp").html());
	             $("#tbl").html(temp(data));
	             $("#total").html(data.total);
	             if(data.total==0){
	            	 var str="<tr><td colspan=5 >�˻��� ��ü�� �����ϴ�</td></tr>"
	            	 $("#tbl").append(str);
	             }else{
	                 $("#page").html(page + "/" + data.last);
	                 
	                 if(page==1) $("#prev").attr("disabled", true);
	                 else $("#prev").attr("disabled", false);
	                 
	                 if(page==data.last) $("#next").attr("disabled", true);
	                 else $("#next").attr("disabled", false);
	                 $(".buttons").show();
	              }
	         }
		 })
	}
</script>










