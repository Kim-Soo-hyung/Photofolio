<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<h1>상품정보</h1>
<form name="frm" enctype="multipart/form-data" method="post">
	<table>
		<tr>
			<td class="title" width=100>상품코드</td>
			<td width=100><input type="text" name="prod_id" value="${vo.prod_id}" readonly="readonly" size=5></td>
			<td class="title" width=100>제조사</td>
			<td width=300><input type="text" name="company" size=35 value="${vo.company}"></td>
			<td class="title" width=100>판매가격</td>
			<td width=100><input type="text" name="price1" size=8 value="${vo.price1}"></td>
		</tr>
		<tr>
         <td class="title">업체코드</td>
         <td colspan=3><select name="mall_id" id="malls"></select></td>

			<td class="title" width=100>일반가격</td>
			<td width=100><input type="text" name="price2" size=8 value="${vo.price2}"></td>
		</tr>
		<tr>
			<td class="title" width=100>상품이름</td>
			<td colspan=3><input type="text" name="prod_name" size=80 value="${vo.prod_name}"></td>
			<td class="title" >판매상태</td>
			<td><input type="checkbox" id="del"<c:out value=" ${vo.prod_del=='1' ? 'checked':'' }" /> >판매중지
			<input type="hidden" name="prod_del" size=80 value="${vo.prod_del}">
			</td>
			
			
		</tr>
		<tr>
			<td class="title" width=100>이미지</td>
			<td colspan=5><img id="image" src="/image/shop/${vo.image }">
			<input type="file" style="display: none" name="image">
			<input type="hidden" style="display: none" name="oldImage" value="${vo.image }">
			</td>
			
		</tr>
		<tr>
			<td class="title" width=100>상품설명</td>
			<td colspan=5><textarea rows="10" cols="100" name="detail" placeholder="상품상세설명">${vo.detail}</textarea></td>
			
		</tr>
	</table>
	<div class="buttons">
		<button>상품수정</button>
		<button type="reset">수정취소</button>
	</div>
</form>

<script id="temp" type="text/x-handlebars-template">
   {{#each array}}
   <option value="{{mall_id}}"{{selected mall_id}}>{{mall_name}}({{mall_id}})</option>
   {{/each}}
</script>
<script >
	var id="${vo.mall_id}";
	Handlebars.registerHelper("selected",function(mall_id){
		if(id==mall_id) return "selected";
	})
</script>

<script>

$("#del").on("click",function(){
	

	if ($(this).is(":checked")) {
			$(frm.prod_del).val("1")
		} else{
			$(frm.prod_del).val("0")
		}
	})

	$(frm).on("submit", function(e) {
		e.preventDefault();
		var prod_name = $(frm.prod_name).val();
		var price1 = $(frm.price1).val();
		var price2 = $(frm.price2).val();
		if (prod_name == "") {
			alert("상품 이름을 입력해주세요!");
			$(frm.prod_name).focus();
			return;

		}
		if (price1.replace(/[0-9]/g, '') || price1 == "") {
			alert("가격을 숫자로 입력해주세요!");
			$(frm.price1).val("");
			$(frm.price1).focus();
			return;
		}
		if (price2.replace(/[0-9]/g, '') || price2 == "") {
			alert("가격을 숫자로 입력해주세요!");
			$(frm.price2).val("");
			$(frm.price2).focus();
			return;
		}
		if (!confirm("상품을 수정하시겠습니까?"))
			return;
		frm.action="/pro/update";
		frm.submit();
	})
	$("#image").on("click", function() {
		$(frm.image).click();
	})

	$(frm.image).on("change", function(e) {
		var reader = new FileReader();
		reader.onload = function(e) {
			$("#image").attr("src", e.target.result);
		}
		reader.readAsDataURL(this.files[0]);
	});

	$.ajax({
		type : "get",
		url : "/mall/list.json",
		data : {
			key : "mall_id",
			word : "",
			per : 100,
			order : "mall_id",
			desc : "asc",
			page : 1
		},
		dataType : "json",
		success : function(data) {
			var temp = Handlebars.compile($("#temp").html());
			$("#malls").html(temp(data));

		}
	})
</script>
