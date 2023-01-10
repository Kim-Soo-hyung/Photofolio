<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<% request.setCharacterEncoding("UTF-8"); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@ include file="/WEB-INF/jsp/comn/component/include-header.jspf"%>
</head>
<body>
	<div class="wrapper">
		<%@ include file="/WEB-INF/jsp/comn/component/include-sideBar.jspf"%>
		<!-- Content Wrapper. Contains page content -->
		<div class="content-wrapper">
			<!-- Content Header (Page header) -->
			<div class="content-header">
				<div class="container-fluid">
					<div class="row mb-2">
						<div class="col-sm-6">
							<h1 class="m-0 text-dark">정보</h1>
						</div>
						<!-- /.col -->
						<div class="col-sm-6">
							<div class="btn-wrapper float-right">
								<a href='<c:url value="/back/openBackListPage.do" />'
									class="btn btn-info">목록으로</a>
								<button class="btn btn-primary" id="updateBtn">수정</button>
								<button class="btn btn-danger" id="deleteBtn">삭제</button>
							</div>
						</div>
						<!-- /.col -->
					</div>
					<!-- /.row -->
				</div>
				<!-- /.container-fluid -->
			</div>
			<!-- /.content-header -->

			<!-- Main content -->
			<section class="content">
			<div class="container-fluid">
				<div class="row">
					<!-- left column -->
					<div class="col-md-6">
						<!-- general form elements -->
						<div class="card card-primary">
							<div class="card-header">
								<h3 class="card-title">정보</h3>
							</div>
							<!-- /.card-header -->

							<!-- card-body -->
							<div class="card-body">
								<div class="form-group row">
									<label class="col-sm-2 col-form-label">Sq</label> <label
										class="col-sm-4 col-form-label">${ list.proSq }</label>
								</div>
								<div class="form-group row">
									<label class="col-sm-2 col-form-label">직원순번</label> <label
										class="col-sm-4 col-form-label">${ list.proSqq }</label>
								</div>
								<div class="form-group row">
									<label class="col-sm-2 col-form-label">프로젝트이름</label> <label
										class="col-sm-4 col-form-label">${ list.proNm }</label>
								</div>
								<div class="form-group row">
									<label class="col-sm-2 col-form-label">프로젝트유형</label> <label
										class="col-sm-4 col-form-label">${ list.proTyp }</label>
								</div>
								<div class="form-group row">
									<label class="col-sm-2 col-form-label">전화번호</label> <label
										class="col-sm-10 col-form-label">${ list.proAddr }</label>
								</div>


							</div>
							<!-- /.card-body -->
						</div>
						<!-- /.card -->
					</div>
					<!-- right column -->

				</div>
			</div>
			</section>
		</div>
		<!-- </form> -->


	</div>
	<!-- ./wrapper -->

	<%@ include file="/WEB-INF/jsp/comn/component/include-body.jspf"%>
	<script>
		$(document).ready(function() {
			
			//delete 기능
			$("#deleteBtn").on("click", function() {
				if(confirm("정말 삭제하시겠습니까?")) {
					var comAjax = new ComAjax();
					comAjax.setUrl("<c:url value='/back/OpenBackdeletePage.do' />");
					comAjax.addParam("proSq", proSq);
					comAjax.setCallback(fn_deleteCallback);
					comAjax.ajax();
				}
			}); 
				
			
			
			
		function fn_deleteCallback(data) {
				var list = data.list;
				if(list > 0) {
					alert("정상적으로 삭제되었습니다.");
					var comSubmit = new ComSubmit();
					comSubmit.setUrl("<c:url value='/back/openBackListPage.do' />");
					comSubmit.submit();
				}else {
					alert("삭제에 실패하였습니다.");
				}
			} 
		//update 기능
		var proSq = "${list.proSq}";
		$("#updateBtn").on("click", function() {
			var comSubmit = new ComSubmit();
			comSubmit.setUrl("<c:url value='/back/openBackUpdatePage.do' />");
			comSubmit.addParam("proSq", proSq);
			comSubmit.submit();
		});
		
		
			
		});
	</script>
</body>
</html>