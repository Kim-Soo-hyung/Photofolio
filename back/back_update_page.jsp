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
							<h1 class="m-0 text-dark">수정</h1>
						</div>
						<!-- /.col -->
						<div class="col-sm-6">
							<div class="btn-wrapper float-right">
								<a href='<c:url value="/back/openBackListPage.do" />'
									class="btn btn-info">목록으로</a>
								<button class="btn btn-primary" id="updateBtn">수정</button>
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
									<label for="inputNm" class="col-sm-2 col-form-label">Sq</label>
									<div class="col-sm-4">
										<input type="text" class="form-control" id="proSq"
											name="proSq" value="${ list.proSq }">
									</div>
								</div>
								<div class="form-group row">
									<label for="inputDt" class="col-sm-2 col-form-label">직원순번</label>
									<div class="col-sm-4">
										<input type="text" class="form-control" name="proSqq"
											id="proSqq" value="${ list.proSqq }">
									</div>
								</div>
							</div>
							<div class="form-group row">
								<label for="inputSt" class="col-sm-2 col-form-label">프로젝트이름</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" name="proNm" id="proNm"
										value="${ list.proNm }">
								</div>
							</div>
							<div class="form-group row">
								<label for="inputEn" class="col-sm-2 col-form-label">프로젝트유형</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" name="proTyp"
										id="proTyp" value="${ list.proTyp }">
								</div>
							</div>


							<div class="form-group row">
								<label for="inputTem" class="col-sm-2 col-form-label">주소</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" name="proAddr"
										id="proAddr" value="${ list.proAddr }">
								</div>
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

		
			//수정버튼
			$("#updateBtn").on("click", function() {
				
				
				var comAjax = new ComAjax();
				comAjax.setUrl("<c:url value='/back/BackUpdatePage.do' />"); //프로그램 URI
				
				
				var proSq  	 = 	 $("#proSq").val();  
				var proSqq   =   $("#proSqq").val(); 
				var proNm    =   $("#proNm").val();
				var proTyp   =   $("#proTyp").val(); 
				var proAddr  =   $("#proAddr").val();
				
				comAjax.addParam("proSq",proSq);
				comAjax.addParam("proSqq",proSqq);
				comAjax.addParam("proNm",proNm);
				comAjax.addParam("proTyp",proTyp);
				comAjax.addParam("proAddr",proAddr);
				
				comAjax.setCallback(fn_updateBackCallBack);//콜백 선언
				comAjax.ajax();
				
				
			});
				
			function fn_updateBackCallBack(data) {
				
                console.log(data);
				if(data > 0) {
					alert("수정 완료");
					
					location.href = "/back/openBackListPage.do";
				}else{
					alert("실패");
				}
			
			}
			
				function fn_updateBackCallBack_temp(data) {
				
				var list = data.list;
				if(list > 0) {	// 정상 추가시 방문자 목록 화면으로 이동
					alert(" 수정이 정상적으로 완료되었습니다.");
					var comSubmit = new ComSubmit();
					comSubmit.setUrl("<c:url value='/back/openListPage.do' />");
					comSubmit.addParam('proSq', proSq);
					comSubmit.submit();
				}else {
					alert("수정에 실패하였습니다.");
				}
		
			}
	
	</script> 
</body>
</html>