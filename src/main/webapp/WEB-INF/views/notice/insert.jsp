<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>공지사항 작성</title>

<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
</head>
<body>
	<h2>공지사항 작성</h2>
	<form name="frm" method="post" action="/api/notice/insert">
		<div>
			제목 <input name="ntitle" id="ntitle" size="80"
				placeholder="제목을 입력하세요." />
		</div>
		<div>
			내용
			<textarea name="ncontent" id="ncontent" rows="4" cols="80"
				placeholder="내용을 입력하세요."></textarea>
		</div>
		<div>
			관리자 <input name="nwriter" id="nwriter" value="${aid}" />
		</div>
		<div>
			<button type="submit" id="btnInsert">확인</button>
			<button type="button"><a href="/notice/list?page=1&num=6&searchType=&keyword=">뒤로가기</a></button>
		</div>
	</form>
</body>
<script>
	$(frm).on("submit", function(e) {
		e.preventDafault();
		if (!confirm('공지사항을 등록하실래요?'))
			return;

		var ntitle = $(frm.ntitle).val();
		var ncontent = $(frm.ncontent).val();
		var nwriter = $(frm.nwriter).val();

		frm.submit();
		

	});
</script>
</html>