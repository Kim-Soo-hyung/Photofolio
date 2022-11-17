<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!-- 타일을 사용하기 위한 라이브러리 -->
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<!-- 브라우저 탭의 작은 아이콘 설정 -->
</head>
<body>
	<div id="header">
		<!-- Header Tiles -->
		<tiles:insertAttribute name="header" />
	</div>


	<div id="section">
		<!-- Body Tiles -->
		<tiles:insertAttribute name="body" />
	</div>

	<div id="footer">
		<tiles:insertAttribute name="footer" />
	</div>
</body>
</html>
