<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.1/handlebars.js"></script>
	<meta charset="UTF-8">
	<title>홍길동의 장터마당</title>
	<link rel="stylesheet" href="/css/home.css">
	<link rel="stylesheet" href="/css/lightbox.css">
	<style>
	.right{
		float: right;
	}
	</style>
</head>
<body>
	<div id="top">
		<img src="/img/back.jpg" width="1300px;" height="600px">
	</div>
	<div id="menu">
		<span class="item"><a href="/">Home</a></span>
		
		
		<span class="item"><a href="/cart/list">장바구니</a></span>
		<c:if test="${uid==null}">
			<span class="item right"><a href="/user/login">로그인</a></span>
		</c:if>
		<c:if test="${uid!=null}">
			<span class="item"><a href="/mall/list">업체목록</a></span>
			<span class="item"><a href="/pro/list">상품관리</a></span>
			<span class="item"><a href="/order/list">주문목록</a></span>
			<span class="item right"><span>어서오세요 ${uid}님  </span><a href="/user/logout">로그아웃</a></span>
		</c:if>

	</div>
	<div id="middle">
		<jsp:include page="${pageName}"></jsp:include>
	</div>
	<div id="bottom">
		<h3>Copyright 2022. 인천일보아카데미 All right reserved</h3>
	</div>	
</body>
</html>