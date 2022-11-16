<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<h1>상품등록</h1>
<form name="frm" enctype="multipart/form-data" method="post">
	<table>
		<tr>
			<td class="title" width=100>상품코드</td>
			<td width=100><input type="text" name="prod_id" value="${code}" readonly="readonly" size=5></td>
			<td class="title" width=100>제조사</td>
			<td width=300><input type="text" name="company" size=35></td>
			<td class="title" width=100>판매가격</td>
			<td width=100><input type="text" name="price1" size=8></td>
		</tr>
		<tr>
         <td class="title">업체코드</td>
         <td colspan=3><select name="mall_id" id="malls"></select></td>

			<td class="title" width=100>일반가격</td>
			<td width=100><input type="text" name="price2" size=8></td>
		</tr>
		<tr>
			<td class="title" width=100>상품이름</td>
			<td colspan=5><input type="text" name="prod_name" size=80></td>
			
		</tr>
		<tr>
			<td class="title" width=100>이미지</td>
			<td colspan=5><img id="image" src="https://dummyimage.com/300x300">
			<input type="file" style="display: none" name="image">
			</td>
			
		</tr>
		<tr>
			<td class="title" width=100>상품설명</td>
			<td colspan=5><textarea rows="10" cols="100"></textarea></td>
			
		</tr>
	</table>
	<div class="buttons">
		<button>상품등록</button>
		<button type="reset">등록취소</button>
	</div>
</form>

<script id="temp" type="text/x-handlebars-template">
   {{#each array}}
   <option value="{{mall_id}}">{{mall_name}}({{mall_id}})</option>
   {{/each}}
</script>

<script>
$(frm).on("submit",function(e){
	e.preventDefault();
	var prod_name=$(frm.prod_name).val();
	var price1=$(frm.price1).val();
	var price2=$(frm.price2).val();
	if(prod_name==""){
		alert("상품 이름을 입력해주세요!");
		$(frm.prod_name).focus();
		return;
		
	}
	if(price1.replace(/[0-9]/g,'')|| price1==""){
		alert("가격을 숫자로 입력해주세요!");
		$(frm.price1).val("");
		$(frm.price1).focus();
		return;
	}
	if(price2.replace(/[0-9]/g,'')|| price2==""){
		alert("가격을 숫자로 입력해주세요!");
		$(frm.price2).val("");
		$(frm.price2).focus();
		return;
	}
	if(!confirm("새로운 가구를 등록하시겠습니까?")) return;
    frm.submit();
})
$("#image").on("click",function(){
	$(frm.image).click();
})

$(frm.image).on("change", function(e){
      var reader = new FileReader();
      reader.onload=function(e){ 
         $("#image").attr("src", e.target.result); 
      }
      reader.readAsDataURL(this.files[0]);
   });


$.ajax ({
    type : "get",
    url : "/mall/list.json",
    data:{key:"mall_id",word:"",per:100,order:"mall_id",desc:"asc",page:1},
    dataType : "json",
    success : function(data) {
   	 var temp = Handlebars.compile($("#temp").html());
        $("#malls").html(temp(data));
        
    }
    })

</script>







