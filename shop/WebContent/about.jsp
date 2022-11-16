<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <style>
    	#condition{
    	overflow: hidden;
    	}
    	#condition form{
    	float: left;
    	margin-left: 150px
    	}
    	#condition #right{
    	float: right;
    	margin-right: 100px
    	}
    	#products{
    	overflow: hidden;
    	}
    	#products .box{
    	margin: 20px;
    	width: 280px;
    	float: left;
    	cursor: pointer;
    	}
    	.box .name{
    	width: 200px;
    	}
    	.box .price{
    	margin-left: 10px;
    	}
    	.box{
    	font-weight: bold;
    	box-shadow: 0px 0px 5px black;
    	cursor: pointer;
    	}
    	#none{
    	color: black;
    	font-weight: bold;
    	font-size: large;
    	text-align: center;
    	}
    	#new{
    	overflow: hidden;
    	}
    	.box{
    	margin: 15px;
    	width: 220px;
    	float: left;
    	cursor: pointer;
    	}
    	#best{
    	overflow: hidden;
    	}
    	.status{
    	color: red;
    	}
    	
    </style>
<h1>상품소개</h1>

<div id="condition">
	<form name="frm">
		<select id="key">
			<option value="prod_name">상품명</option>
			<option value="company">제조사</option>
			<option value="mall_name">판매업체</option>			
		</select>
		<input type="text" id="word" placeholder="검색어">
		<button>검색</button>
		검색수 :<span id="total"></span>
	</form>
	<div id="right">
		<select id="order">
			<option value="price1">가격</option>
			<option value="prod_name">상품명</option>
		</select>
		<select id="desc">
			<option value="asc" selected="selected">오름차순</option>
			<option value="desc">내림차순</option>
		</select>
	</div>
</div>

<div id="products"></div>
<script id = "ptemp" type = "text/x-handlebars-template">
	{{#each array}}
		<div class="box" onclick="location.href='/pro/info?prod_id={{prod_id}}'">
			<img src="/image/shop/{{image}}" width=250>
			<div class="name ellipsis">{{prod_name}}</div>
			<div class="price">{{fprice}}원
			<span class="status">{{status prod_del}}</span>
		</div>	
		</div>
	{{/each}}
</script>	
<script>
	Handlebars.registerHelper("status",function(prod_del){
		if(prod_del==1) return "판매중지";
	})
</script>
<div class="buttons">
	<button id="prev">이전</button>
	<span id="page">1/4</span>
	<button id="next">다음</button>
</div>
<h2>최근상품</h2>
<div id="new"></div>
<script id = "ntemp" type = "text/x-handlebars-template">
	{{#each array}}
		<div class="box" onclick="location.href='/pro/info?prod_id={{prod_id}}'">
			<img src="/image/shop/{{image}}" width=200>
			<div class="name ellipsis">{{prod_id}}({{fprice}}원)</div>
		</div>
	{{/each}}
</script>
<h2>베스트상품</h2>
<div id="best"></div>


<script>
	var page=1;
	getProducts();
	$("#next").on("click",function(){
		page++;
		getProducts();
	})
	$("#prev").on("click",function(){
		page--;
		getProducts();
	})
	
	getNew();
	getbest();
	
	function getNew(){
	 $.ajax ({
	         type : "get",
	         url : "/pro/list.json",
	         data : {key:"prod_id",word:"",order:"prod_id",per:5,desc:"desc",page:1},
	         dataType : "json",
	         success : function(data) {
	            var temp = Handlebars.compile($("#ntemp").html());
	            $("#new").html(temp(data));
	         }
	 });
	}
	function getbest(){
	 $.ajax ({
	         type : "get",
	         url : "/pro/list.json",
	         data : {key:"prod_id",word:"",order:"price1",per:5,desc:"asc",page:1},
	         dataType : "json",
	         success : function(data) {
	            var temp = Handlebars.compile($("#ntemp").html());
	            $("#best").html(temp(data));
	         }
	 });
	}
	
	
	function getProducts(){
		var key= $("#key").val();
		var word= $("#word").val();
		var per= 8;
		var order= $("#order").val();
		var desc= $("#desc").val();
		 $.ajax ({
	         type : "get",
	         url : "/pro/list.json",
	         data : {key:key,word:word,order:order,per:per,desc:desc,page:page},
	         dataType : "json",
	         success : function(data) {
	            var temp = Handlebars.compile($("#ptemp").html());
	            $("#products").html(temp(data));
	            $("#total").html(data.total);
	            if(data.total==0){
	            	 var str="<tr ><td colspan=5 id='none'>검색된 상품이 없습니다</td></tr>"
	            	 $("#products").append(str);
	             }else{
	                 $("#page").html(page + "/" + data.last);
	                 
	                 if(page==1) $("#prev").attr("disabled", true);
	                 else $("#prev").attr("disabled", false);
	                 
	                 if(page==data.last) $("#next").attr("disabled", true);
	                 else $("#next").attr("disabled", false);
	                 $(".buttons").show();
	              }
	         }
	      });      
	}
	$(frm).on("submit", function(e){
		e.preventDefault();
		page=1;
		getProducts();
	})
	$("#order, #desc").on("change",function(){
		page=1;
		getProducts();
	})
</script>









