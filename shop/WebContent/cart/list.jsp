<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<!DOCTYPE html>
<div id="divCart">
	<h1>장바구니</h1>
	<table id="tbl">
		<tr class="title">
			<td><input type="checkbox" id="all"></td>
			<td width=100>상품코드</td>
			<td width=300>상품이름</td>
			<td width=100>단가</td>
			<td width=150>수량</td>
			<td width=100>합계</td>
			<td width=100>삭제</td>
		</tr>
		<c:forEach items="${carts}" var="vo">
			<tr class="row" pid="${vo.prod_id}" pname="${vo.prod_name}" price="${vo.price1}" qnt="${vo.qnt}">
				<td><input type="checkbox" class="chk"></td>
				<td class="id">${vo.prod_id}</td>
				<td class="name">${vo.prod_name}</td>
				<td class="price"><fmt:formatNumber value="${vo.price1}" pattern="#,###" />원</td>
				<td ><input class="qnt" type="text" value="${vo.qnt}" size=2>
				<button class="update">수정</button></td>
				<td><fmt:formatNumber value="${vo.sum}" pattern="#,###" />원 <span
					class="sum" hidden="">${vo.sum}</span></td>

				<td><button class="delete" id="${vo.prod_id}">삭제</button></td>
			</tr>
		</c:forEach>
		<c:if test="${carts.size()!=0 && carts!=null}">
			<tr id="t">
				<td class="title" colspan=5 style="text-align: center;">합계</td>
				<td id="total"></td>
			</tr>
		</c:if>
		<c:if test="${carts.size()==0 || carts==null}">
			<tr>
				<td colspan=6>장바구니가 비어있습니다.</td>
			</tr>
		</c:if>
	</table>
	<div class="buttons">
		<button id="btnAll">전체상품주문</button>
		<button id="btnChk">선택상품주문</button>
	</div>
</div>
<div id = "divOrder">
	<h1>주문정보</h1>
	<table id="tbl1"></table>
	<script id = "temp1" type = "text/x-handlebars-template">
		<tr class="title">
			<td width=100>상품코드</td>
			<td width=300>상품명</td>
			<td width=100>상품가격</td>
			<td width=100>상품수량</td>
			<td width=100>금액</td>
		</tr>
		{{#each .}}
		<tr class="row" pid="{{pid}}" price="{{price}}" qnt="{{qnt}}">
			<td>{{pid}}</td>
			<td>{{pname}}</td>
			<td>{{price}}</td>
			<td>{{qnt}}</td>
			<td>{{sum}}</td>
		</tr>
		{{/each}}
		<tr class="title" style="text-align:right;">
			<td colspan=5 id="total1"></td>
		</tr>
	</script>
	<form name="frm" method="post">
		<table id = "tbl2">
			<tr>
				<td width=100 class = "title">주문자 성명</td>
				<td width=750><input type="text" name="name" value="홍길동"></td>
			</tr>
			<tr>
				<td width=100 class = "title">배송지 주소</td>
				<td width=750>
				<input type="text" name="address1" size=100; readonly="readonly" placeholder="주소검색">
				<input type="text" name="address2" size=100; placeholder="상세주소">
				</td>
			</tr>
			<tr>
				<td width=100 class = "title">이메일</td>
				<td width=750><input type="text" name="email" size=50 value="hong1412@icia.net"></td>
			</tr>
			<tr>
				<td width=100 class = "title">전화번호</td>
				<td width=750><input type="text" name="tel" size=50 value="010-1111-1111"></td>
			</tr>
			<tr>
				<td width=100 class = "title">결제방법</td>
				<td width=750>
				<input type="radio" name="payType" value="0" checked="checked">무통장
				<input type="radio" name="payType" value="0">카드
				</td>
			</tr>
		</table>
		<div class="buttons">
			<button>주문하기</button>
		</div>
	</form>
</div>

<script>
	var total = 0;
	$("#divOrder").hide();
	$("#divCart").show();
	
	
	
	$(frm.address1).on("click", function(){
	      new daum.Postcode({
	         oncomplete: function(data) {
	            //console.log(data)
	            $(frm.address1).val(data.address); //data.roadAddress, data.jibunAddress, data.zonecode
	         }
	      }).open();   
	   });
	
	   $(frm).on("submit", function(e){
		      e.preventDefault();
		      var name=$(frm.name).val();
		      var tel=$(frm.tel).val();
		      var address=$(frm.address1).val() + $(frm.address2).val();
		      var email=$(frm.email).val();
		      var payType=$(frm.payType).val();
		      
		      if(!confirm("위 상품들을 주문하실래요?")) return;
		      
		      $.ajax({
		         type:"get",
		         url:"/pur/insert",
		         dataType:"json",
		         data:{name:name, tel:tel, address:address, email:email, payType:payType},
		         success:function(data){
		            //alert(data.code);
		            var oid=data.code;
		            $("#tbl1 .row").each(function(){
		            	var pid = $(this).attr("pid");
		            	var price = $(this).attr("price");
		            	var qnt = $(this).attr("qnt");
		            	//alert(pid);
		            $.ajax({
			         type:"get",
			         url:"/order/insert",
			         data:{pid:pid,oid:oid,price:price,qnt:qnt},
			         success:function(){
			        	 $.ajax({
			        		 type:"get",
			        		 url:"/cart/delete",
			        		 data:{id:pid},
			        		 success:function(){}
			        	 })
			         }
		            	})
		            })
		            alert(oid+"주문이 완료되었습니다.");
		            location.href="/";
		         }
		      })
		   });
	
	$("#btnChk").on("click",function(){
		var chk = $("#tbl .row .chk:checked").length;
		if(chk==0){
			alert("주문할 상품들을 선택하세요!");
			return;
		}
		else{
		$("#divOrder").show();
		$("#divCart").hide();
		var total=0;
		var array=[];
		$("#tbl .row .chk:checked").each(function(){
			var row =$(this).parent().parent();
			var pid =row.attr("pid");
			var pname =row.attr("pname");
			var price =row.attr("price");
			var qnt =row.attr("qnt");
			var sum = parseInt(price)*parseInt(qnt);
			total +=sum;
			var data = {pid:pid,pname:pname,price:price,qnt:qnt,sum:sum,};
			array.push(data);
			
		})
		var temp = Handlebars.compile($("#temp1").html());
		$("#tbl1").html(temp(array));
		$("#total1").html("합계: "+total);
			
		}
	})
	
	$("#btnAll").on("click", function() {
		$("#divOrder").show();
		$("#divCart").hide();
		var total=0;
		var array=[];
		$("#tbl .row").each(function(){
			var pid =$(this).attr("pid");
			var pname =$(this).attr("pname");
			var price =$(this).attr("price");
			var qnt =$(this).attr("qnt");
			var sum = parseInt(price)*parseInt(qnt);
			total +=sum;
			var data = {pid:pid,pname:pname,price:price,qnt:qnt,sum:sum,};
			array.push(data);
			
		})
		var temp = Handlebars.compile($("#temp1").html());
		$("#tbl1").html(temp(array));
		$("#total1").html("합계: "+total);
	})

	$("#tbl").on("click", "#all", function() {
		if ($(this).is(":checked")) {
			$("#tbl .row .chk").each(function() {
				$(this).prop("checked", true);
			})
		} else {
			$("#tbl .row .chk").each(function() {
				$(this).prop("checked", false);
			})
		}
	})

	$("#tbl").on("click", ".row .chk", function() {
		var all = $("#tbl .row .chk").length;
		var chk = $("#tbl .row .chk:checked").length;
		if (all == chk) {
			$("#tbl #all").prop("checked", true);
		} else {
			$("#tbl #all").prop("checked", false);
		}
	})

	$("#tbl").on("click", ".row .update", function() {
		var row = $(this).parent().parent();
		var id = row.find(".id").html();
		var qnt = row.find(".qnt").val();
		if (qnt.replace(/[0-9]/g, '') || qnt == "") {
			alert("수량을 숫자로 입력하세요");
			row.find(".qnt").val("");
			row.find(".qnt").focus();
			return;
		}
		if (!confirm(id + "상품의 수량을 " + qnt + " 개로 수정하시겠습니까?"))
			return;
		$.ajax({
			type : "get",
			url : "/cart/update",
			data : {
				id : id,
				qnt : qnt
			},
			success : function() {
				location.href = "/cart/list";
			}
		})
	})

	$("#tbl .row .sum").each(function() {
		total += parseInt($(this).html());
	});

	$("#total").html(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));

	$("#tbl").on("click", ".row .delete", function() {
		var id = $(this).attr("id");
		if (!confirm(id + "상품을 장바구니에서 삭제하시겠습니까?"))
			return;
		$.ajax({
			type : "get",
			url : "/cart/delete",
			data : {
				id : id
			},
			success : function() {
				location.href = "/cart/list";
			}
		})
	})
</script>
