<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>공지사항 수정</title>

<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
</head>
<body>
	<h2>공지사항 수정</h2>
	<form style="text-align:center" name="update" method="POST" action="/api/notice/update/${ncode}">
		<div>
			<input name="ntitle" value="${vo.ntitle}" id="ntitle" size=80 placeholder="제목을 입력해주세요.">
		</div>
		<div style="margin-top:15px">
			<input style="height:300px" size=80 value="${vo.ncontent}" name="ncontent" id="ncontent" placeholder="내용을 입력해주세요.">
		</div>
		<div>
			<button type="button" id="btnSave">수정</button>
			<button type="reset">취소</button>
		</div>
	</form>
</body>
<script>
	$(document).ready(function(){
		$("#btnSave").click(function(){
			var ntitle = $("#ntitle").val();
			var ncontent = $("#ncontent").val();
			if(ntitle == ""){
				alert("제목을 입력하세요!")
				document.update.ntitle.focus();
				return;
			}
			if(ncontent == ""){
				alert("내용을 입력하세요!")
				document.update.ncontent.focus();
				return;
			}
			//입력한 데이터를 전송
			document.update.submit();
			alert("수정이 완료되었습니다.")
			location.href="/notice/list?page=1&num=6&searchType=&keyword=";
		});
	});
</script>
</html>