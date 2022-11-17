<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.1/handlebars.js"></script>
</head>


<body>
	<h2 style="text-align:center">수정 페이지</h2>
	<form style="text-align:center" name="update" method="POST" action="/api/event/update/${ecode}">
		<div>
			<input name="etitle" value="${vo.etitle}" id="etitle" size=80 placeholder="제목을 입력해주세요.">
		</div>
		<div style="margin-top:15px">
			<input style="height:300px" size=80 value="${vo.econtent}" name="econtent" id="econtent" placeholder="내용을 입력해주세요.">
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
			var etitle = $("#etitle").val();
			var econtent = $("#econtent").val();
			if(etitle == ""){
				alert("제목을 입력하세요!")
				document.update.etitle.focus();
				return;
			}
			if(econtent == ""){
				alert("내용을 입력하세요!")
				document.update.econtent.focus();
				return;
			}
			//입력한 데이터를 전송
			document.update.submit();
			alert("수정이 완료되었습니다.")
		});
	});
</script>
</html>