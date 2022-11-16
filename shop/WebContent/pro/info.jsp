<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<style>
	#info{
		overflow: hidden;
		margin-top: 40px;
	}
	#image{
	float: left;
	}
	#content h2{
	text-align: center;
	
	}
	#content .price1{
	margin-top: 20px;
	margin-right: 150px;
	font-size: 30px;
	}
	#content .price2{
	margin-right: 150px;
	font-size: 20px;
	}
	.sold{
		font-weight: bold;
		color: red;
	}
	#mc{
	margin-top: 150px;
	float: right;
	margin-right: 150px;
	}
	#prod{
	margin-right: 200px;
	}
	#buy{
	cursor: pointer;
	}
	#cart{
	cursor: pointer;
	}
</style>
<h1>상품정보</h1>

<div id="info">
	<div id="image">
		<img src="/image/shop/${vo.image}" width=500>
	</div>
	<div id="content">
		<div id="prod">
		<h2>${vo.prod_id}</h2>
		
		<h2>${vo.prod_name}</h2>
		</div>
		<br>
		<div style="float: right;">
		<br>
		<div class="price2"><s><fmt:formatNumber value="${vo.price2}" pattern="#,###원"/></s></div>
		<div class="price1"><fmt:formatNumber value="${vo.price1}" pattern="#,###원"/></div>
		</div>
		<div id="mc">
		<h3>판매처 : ${vo.mall_name}(${vo.mall_id})</h3>
		<h3>제조사 : ${vo.company}</h3>
		</div>
		<div style="margin-top: 100px; float: right; margin-right:200px; font-size: 30px ">
			<div id="buy" style="background-color: black; color: white;">구매하기</div>
			<div id="cart" style="background-color: gray; color: white;">장바구니</div>
			<span class="sold"><c:out value="${vo.prod_del==1 ?'판매중지' : '' }"/></span>
		</div>
		
	</div>
</div>

<script>
	var status="${vo.prod_del}";
	var prod_id="${vo.prod_id}";
	$("#buy").on("click",function(){
		if(status==1){
			alert("판매중지된 상품입니다.");
			return;
		}
	})
	$("#cart").on("click",function(){
		if(status==1){
			alert("판매중지된 상품입니다.");
			return;
		}
		
		$.ajax({
			type:"get",
			url:"/cart/insert",
			data:{id:prod_id},
			success:function(){
				if(!confirm("장바구니로 이동하시겠습니까?"))return;
				location.href="/cart/list";
			}
		})
	})
</script>