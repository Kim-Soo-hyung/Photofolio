<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	request.setCharacterEncoding("UTF-8");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@ include file="/WEB-INF/jsp/comn/component/include-header.jspf"%>
</head>
<body >
<div class="wrapper">
	<div class="content-wrapper">
			<!-- Content Header (Page header) -->
			<div class="content-header">
				<div class="container-fluid">
					<div class="row mb-2">
						<div class="col-sm-6">
							<h1 class="m-0 text-dark">목록</h1>
						</div>
						<!-- /.col -->
						<div class="col-sm-6">
							<!-- 다음 액션 버튼 -->
						 <a
								href='<c:url value="/back/OpenBackinsertPage.do" />'
								class="btn btn-primary float-right"> 등록</a> 

						</div>
						<!-- /.col -->
					</div>
					<!-- /.row -->
				</div>
				<!-- /.container-fluid -->
			</div>
			<!-- /.content-header -->
			<!-- Main Board -->
			<section class="content">
			<div class="container-fluid">
				<div class="row">
					<div class="col-12">
						<div class="card">
							<div class="card-header">
								<h3 class="card-title"> 목록</h3>
								<div class="card-tools">

									<div class="input-group input-group-sm" style="width: 600px;">
									</div>


								</div>
							</div>



							<!-- /.card-header -->
							<div class="card-body">
								<div style="height: 400px; overflow: auto;">
									<table id="deceased_table"
										class="table table-hover table-striped table-bordered text-nowrap">
										<thead>
											<tr>
												
												<th>sq</th>
												<th>직원순번</th>
												<th>프로젝트이름</th>
												<th>프로젝트 유형</th>
												<th>프로젝트 주소</th>
											</tr>
										</thead>
										 <tbody>
											<c:choose>

												<c:when test="${ fn:length(list) == 0 }">
													<tr>
														<td colspan="7">조회 결과가 없습니다</td>
													</tr>
												</c:when>
												<c:otherwise>
													<c:forEach var="list" items="${ list }">
														<tr class="list-row">
															<td class="sq">
																<c:out value="${list.proSq}" /></td>
																<td>
																<a href="/back/openListPage.do?proSq=${ list.proSqq }"><c:out
																						value="${ list.proSqq }" /></a>
																</td>
																<td><c:out value="${list.proNm}" /></td>
																<td><c:out value="${list.proTyp}" /></td>
																<td><c:out value="${list.proAddr}" /></td>
																
															</tr>
													</c:forEach>
												</c:otherwise>
											</c:choose>
										</tbody> 
									</table>
								</div>
							</div>
							

						</div>
						<!-- /.card -->
					</div>
				</div>
				<!-- /.row -->
			</div>
			<!-- /.container-fluid --> </section>
		</div>
</div>
</body>
</html>