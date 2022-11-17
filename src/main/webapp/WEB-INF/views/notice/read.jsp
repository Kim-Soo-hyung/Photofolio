<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>공지사항</title>
	
	<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
</head>
<body>
	<h1>공지사항</h1>
	<h3>${vo.ncode} : ${vo.ntitle}</h3>
	<h3>${vo.regDate}</h3>
	<p>${vo.ncontent}</p>
	<hr>
	<button id="update">수정하기</button>
	<button id="list">목록으로</button>
</body>
<script>
	$("#list").on("click", function(){
		location.href="/notice/list?page=1&num=6&searchType=&keyword=";
	});
	
	$("#update").on("click", function(){
		location.href="/notice/update?ncode=" + ${vo.ncode}
	});
</script>	
</html>