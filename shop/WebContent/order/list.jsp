<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
    <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
	<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<style>
#olist {
	overflow: hidden;
}
#olist form{
    	text-align: center;
    	width:980px; 
    	background:white; 
    	box-shadow:10px 10px 10px blak; 
    	margin:auto;
    }
#olist #right{
	float: right;
	margin-right: 50px;
}

</style>
<h1>주문목록</h1>
<div id="olist">
	<form name="frm">
		<select id="key">
			<option value="order_id">주문번호</option>
			<option value="name" selected="selected">주문자이름</option>
			<option value="address">주문자주소</option>
			<option value="tel">주문자전화번호</option>
			<option value="status">주문상태</option>
		</select>
		<input type="text" id="word" placeholder="검색어">
		<select id="per">
			<option value="2">2행</option>
			<option value="3">3행</option>
			<option value="5" selected="selected">5행</option>
			<option value="10">10행</option>
		</select>
		<button>검색</button>
		검색 수 :<span id="total"></span>
	</form>
	<div id="right">
	<select id="order">
			<option value="order_id">주문번호</option>
			<option value="name">주문자이름</option>
			<option value="address">주문자주소</option>
			<option value="tel">주문자전화번호</option>
		</select>
		<select id="desc">
			<option value="asc">오름차순</option>
			<option value="desc" selected="selected">내림차순</option>

		</select>
	</div>
</div>
<table id="tbl"></table>
<script id = "temp" type = "text/x-handlebars-template">
  <tr class="title">
    <td width=70>주문자번호</td>
    <td width=100>주문자이름</td>
    <td width=250>주소</td>
    <td width=200>전화</td>
    <td width=100>주문일</td>
	<td width=50>구매정보</td>
  </tr>
	{{#each array}}
  	<tr class="row">
    	<td>{{order_id}}</td>
    	<td>{{name}}</td>
    	<td>{{address}}</td>
    	<td>{{tel}}</td>
    	<td>{{pdate}}</td> 
		<td><button id="{{order_id}}">구매정보</button></td>
  	</tr>
	{{/each}}
</script>
<div class="buttons">
	<button id="prev">이전</button>
	<span id="page">1/4</span>
	<button id="next">다음</button>
</div>

<div id="tbl1"></div>
<script id = "temp1" type = "text/x-handlebars-template">
<h1>구매자정보</h1>	

	<table>
	<tr>
		<td class="title" width=100>이름</td>
		<td width=100>{{pur.name}}(<b>{{pur.order_id}}</b>)</td>
		<td class="title" width=100>전화</td>
		<td width=100>{{pur.tel}}</td>
		<td class="title" width=100>이메일</td>
		<td width=100>{{pur.email}}</td>
		<td class="title" width=100>주문일</td>
		<td width=180>{{pur.pdate}}</td>
	</tr>
	<tr>
		<td class="title">주소</td>
		<td colspan=3>{{pur.address}}</td>
		<td class="title">결제</td>
		<td >{{outPayType pur.payType}}</td>
		<td class="title">상태</td>
		
		<td >
			<select id="status">
				<option value="0">주문확인</option>
				<option value="1">배송준비중</option>
				<option value="2">처리완료</option>
			</select>
			<button id="btnStatus" order="{{pur.order_id}}">수정</button>
		</td>
	</tr>
</table>
<table>
	<tr>
		<td width=100>이미지</td>
		<td width=100>상품코드</td>
		<td width=300>상품명</td>
		<td width=100>제조사</td>
		<td width=100>가격</td>
		<td width=100>수량</td>
		<td width=100>금액</td>
	</tr>
	{{#each array}}
	<tr class="row"> 
	<td>
	<a href="/pro/info?prod_id={{prod_id}}"></a>
	<img src ="/image/shop/{{image}}" width=70</td>
	<td>{{prod_id}}</td>
	<td>{{prod_name}}</td>
	<td>{{company}}</td>
	<td>{{prcie}}</td>
	<td>{{qnt}}</td>
	<td>{{sum}}</td>
	</tr>
	{{/each}}
	<tr class="title" style="text-align:center;">
		<td colspan=7>합계: <b>{{total}} </b></td>
	</tr>
</table>
</script>
<script>
Handlebars.registerHelper("outPayType", function(payType) {
    if(payType == '0') return "무통장";
    else return "카드";
 });

</script>

<script>
	var page = 1;

	getList();

	
	
	$("#tbl1").on("click", " button ", function() {
		var order_id = $(this).attr("order");
		var status = $("#status").val();
		if (!confirm(order_id + "번의 주문 상태를 " + status + "로 변경하시겠습니까?"))
			return;
		$.ajax({

			type : "get",
			url : "/update/status",
			data : {
				id : order_id,
				status : status
			},
			dataType : "json",
			success : function() {
				alert("상태가 변경되었습니다.")
			}
		})
	})

	$("#tbl").on("click", ".row button", function() {
		var id = $(this).attr("id");
		$.ajax({

			type : "get",
			url : "/order/read.json",
			data : {
				id : id
			},
			dataType : "json",
			success : function(data) {
				var temp = Handlebars.compile($("#temp1").html());
				$("#tbl1").html(temp(data));
				$("#status").val(data.pur.status).prop("selected", true)
			}
		})

	})

	$("#next").on("click", function() {
		page++;
		getList();
	})
	$("#prev").on("click", function() {
		page--;
		getList();
	})
	$("#per", "#order", "#desc").on("change", function() {
		page = 1;
		getList();
	})
	$(frm).on("submit", function(e) {
		e.preventDefault();
		page = 1;
		getList();
	})
	function getList() {
		var key = $("#key").val();
		var word = $("#word").val();
		var per = $("#per").val();
		var order = $("#order").val();
		var desc = $("#desc").val();
		$.ajax({
			type : "get",
			url : "/order/list.json",
			data : {
				page : page,
				key : key,
				word : word,
				per : per,
				order : order,
				desc : desc
			},
			dataType : "json",
			success : function(data) {
				var temp = Handlebars.compile($("#temp").html());
				$("#tbl").html(temp(data));
				$("#total").html(data.total);
				if (data.total == 0) {
					var str = "<tr><td colspan=5 >검색된 주문이 없습니다</td></tr>"
					$("#tbl").append(str);
				} else {
					$("#page").html(page + "/" + data.last);

					if (page == 1)
						$("#prev").attr("disabled", true);
					else
						$("#prev").attr("disabled", false);

					if (page == data.last)
						$("#next").attr("disabled", true);
					else
						$("#next").attr("disabled", false);
					$(".buttons").show();
				}
			}
		})
	}
</script>

