<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% request.setCharacterEncoding("UTF-8"); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@ include file="/WEB-INF/jsp/comn/component/include-header.jspf"%>
</head>
<body >
	<div class="wrapper">
		<%@ include file="/WEB-INF/jsp/comn/component/include-sideBar.jspf"%>
		<!-- Content Wrapper. Contains page content -->
			<div class="content-wrapper">
				<!-- Content Header (Page header) -->
				<div class="content-header">
					<div class="container-fluid">
						<div class="row mb-2">
							<div class="col-sm-6">
								<h1 class="m-0 text-dark"> 추가</h1>
							</div>
							<!-- /.col -->
							<div class="col-sm-6">
								<button class="btn btn-primary float-right" id="insertButton">추가</button>
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
									<h3 class="card-title"> 정보</h3>
								</div>
								<!-- /.card-header -->

								<!-- card-body -->
								<div class="card-body">
									<div class="form-group row">
										<label for="proSq" class="col-sm-2 col-form-label">Sq</label>
										<div class="col-sm-4">
											<input type="text" class="form-control" id="proSq"
												name="proSq">
										</div>
									</div>
									<div class="form-group row">
										<label for="proSqq" class="col-sm-2 col-form-label">직원순번</label>
										<div class="col-sm-4">
											<input type="text" class="form-control" name="proSqq"
												id="proSqq">
										</div>
									</div>
							
									<div class="form-group row">
										<label for="proNm" class="col-sm-2 col-form-label">프로젝트 이름</label>
										<div class="col-sm-4">
											<input type="text" class="form-control" name="proNm"
												id="proNm" >
										</div>
									</div>
									
									<div class="form-group row">
										<label for="proTyp" class="col-sm-2 col-form-label">프로젝트 유형</label>
										<div class="col-sm-4">
											<input type="text" class="form-control" name="proTyp"
												id="proTyp" >
										</div>
									</div>
									
									<div class="form-group row">
										<label for="proAddr" class="col-sm-2 col-form-label">주소</label>
										<div class="col-sm-4">
											<input type="text" class="form-control" name="proAddr"
												id="proAddr" >
										</div>
									</div>
									
								</div>
								<!-- /.card-body -->
							</div>
							<!-- /.card -->
						</div>
					</div>
				</div>
				</section>
			</div>
		<!-- </form> -->
	</div>
	<!-- ./wrapper -->


	<%@ include file="/WEB-INF/jsp/comn/component/include-body.jspf"%>
	<script>
	$("#insertButton").on("click", function() {
		// 유효성 검사
		var nm = $("#proSq").val();
		var dt = $("#proSqq").val();
		var st = $("#proNm").val();
		var en = $("#proTyp").val();
		var tem = $("#proAddr").val();
	
		
		
		if(gfn_isNull(nm)) {
			alert("sq을  입력해주세요.");
			return false;
		}
		
	
		if(gfn_isNull(dt)) {
			alert("직원순번을 선택해주세요.");
			return false;
		}
		
		
		if(gfn_isNull(st)) {
			alert("프로젝트이름을 입력해주세요.");
			return false
		}
		
		
		if(gfn_isNull(en)) {
			alert("프로젝트유형을 입력해주세요.");
			return false;
		}
	
	
		if(gfn_isNull(tem)) {
			alert("프로젝트주소을 입력해주세요.");
			return false;
		}
	
		
			
		

	function fn_insertBackCallBack(data) {
		var list = data.list;
		 console.log(data);
		if(list > 0) {	// 정상 추가시 회원 목록 화면으로 이동
			alert(" 추가가 정상적으로 완료되었습니다.");
			var comSubmit = new ComSubmit();
			comSubmit.setUrl("<c:url value='/back/openBackListPage.do' />");
			comSubmit.submit();
		}else {
			alert(" 추가에 실패하였습니다.");
		}
	}
	
	
	
	
		
		
		
		var comAjax = new ComAjax();
		comAjax.setUrl("<c:url value='/back/insertBack.do' />"); //프로그램 URI
		
		
		
		/* addParam 필수값만 셋팅 후 나머지는 값 있을시 추가 */
		comAjax.addParam("proSq", nm);
		comAjax.addParam("proSqq", dt);
		comAjax.addParam("proNm", st);
		comAjax.addParam("proTyp", en);
	
		comAjax.addParam("proAddr", tem);
	
		
		
		comAjax.setCallback(fn_insertBackCallBack);//콜백 선언
		comAjax.ajax();
	});

		
	</script>
</body>
</html>