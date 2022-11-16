<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>

<style>
#plist {
	overflow: hidden;
}
#plist form{
    	text-align: center;
    	width:980px; 
    	background:white; 
    	box-shadow:10px 10px 10px blak; 
    	margin:auto;
    }
#plist #right{
	float: right;
	margin-right: 50px;
}
</style>
 
<h1>상품목록</h1>
<div id="plist">
	<form name="frm">
		<select id="key">
			<option value="prod_id">상품코드</option>
			<option value="prod_name">상품이름</option>
			<option value="company">제조사</option>
			
		</select>
		<input type="text" id="word" placeholder="검색어">
		<select id="per">
			<option value="2">2행</option>
			<option value="3">3행</option>
			<option value="5"selected="selected">5행</option>
			<option value="10">10행</option>
		</select>
		<button>검색</button>
		검색 수 :<span id="total"></span>
	</form>
	<div id="right">
	<select id="order">
			<option value="prod_id">상품코드</option>
			<option value="prod_name">상품이름</option>
			<option value="company">제조사</option>
			<option value="price1">상품가격</option>
		</select>
		<select id="desc">
			<option value="asc" >오름차순</option>
			<option value="desc" selected="selected">내림차순</option>

		</select>
	</div>
</div>
<<table id="tbl"></table>
<script id = "temp" type = "text/x-handlebars-template">
  <tr class="title">
    <td width=50>상품코드</td>
    <td width=250>상품이름</td>
    <td width=100>제조사</td>
    <td width=150>가격</td>
    <td width=150>이미지</td>
    <td width=200>업체코드</td>
  </tr>
	{{#each array}}
  	<tr class="row" onclick="location.href='/pro/read?prod_id={{prod_id}}'">
    	<td>{{prod_id}}</td>
    	<td class="ellipsis">{{prod_name}}</td>
    	<td>{{company}}</td>
    	<td>{{price1}}원</td>
    	<td><img src="/image/shop/{{image}}" width=100></td> 
		<td>{{mall_id}}({{mall_name}})</td>
  	</tr>
	{{/each}}
</script>
<div class="buttons">
<a href="/pro/insert"><button >상품등록</button></a>
	<button id="prev">이전</button>
	<span id="page">1/4</span>
	<button id="next">다음</button>
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
	         url : "/pro/list.json",
	         data : {page : page, key:key, word:word, per:per, order:order, desc:desc},
	         dataType : "json",
	         success : function(data) {
	        	 var temp = Handlebars.compile($("#temp").html());
	             $("#tbl").html(temp(data));
	             $("#total").html(data.total);
	             if(data.total==0){
	            	 var str="<tr><td colspan=4 >검색된 상품이 없습니다</td></tr>"
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










