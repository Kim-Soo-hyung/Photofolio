<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<!DOCTYPE html>
<div id="divCart">
	<h1>��ٱ���</h1>
	<table id="tbl">
		<tr class="title">
			<td><input type="checkbox" id="all"></td>
			<td width=100>��ǰ�ڵ�</td>
			<td width=300>��ǰ�̸�</td>
			<td width=100>�ܰ�</td>
			<td width=150>����</td>
			<td width=100>�հ�</td>
			<td width=100>����</td>
		</tr>
		<c:forEach items="${carts}" var="vo">
			<tr class="row" pid="${vo.prod_id}" pname="${vo.prod_name}" price="${vo.price1}" qnt="${vo.qnt}">
				<td><input type="checkbox" class="chk"></td>
				<td class="id">${vo.prod_id}</td>
				<td class="name">${vo.prod_name}</td>
				<td class="price"><fmt:formatNumber value="${vo.price1}" pattern="#,###" />��</td>
				<td ><input class="qnt" type="text" value="${vo.qnt}" size=2>
				<button class="update">����</button></td>
				<td><fmt:formatNumber value="${vo.sum}" pattern="#,###" />�� <span
					class="sum" hidden="">${vo.sum}</span></td>

				<td><button class="delete" id="${vo.prod_id}">����</button></td>
			</tr>
		</c:forEach>
		<c:if test="${carts.size()!=0 && carts!=null}">
			<tr id="t">
				<td class="title" colspan=5 style="text-align: center;">�հ�</td>
				<td id="total"></td>
			</tr>
		</c:if>
		<c:if test="${carts.size()==0 || carts==null}">
			<tr>
				<td colspan=6>��ٱ��ϰ� ����ֽ��ϴ�.</td>
			</tr>
		</c:if>
	</table>
	<div class="buttons">
		<button id="btnAll">��ü��ǰ�ֹ�</button>
		<button id="btnChk">���û�ǰ�ֹ�</button>
	</div>
</div>
<div id = "divOrder">
	<h1>�ֹ�����</h1>
	<table id="tbl1"></table>
	<script id = "temp1" type = "text/x-handlebars-template">
		<tr class="title">
			<td width=100>��ǰ�ڵ�</td>
			<td width=300>��ǰ��</td>
			<td width=100>��ǰ����</td>
			<td width=100>��ǰ����</td>
			<td width=100>�ݾ�</td>
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
				<td width=100 class = "title">�ֹ��� ����</td>
				<td width=750><input type="text" name="name" value="ȫ�浿"></td>
			</tr>
			<tr>
				<td width=100 class = "title">����� �ּ�</td>
				<td width=750>
				<input type="text" name="address1" size=100; readonly="readonly" placeholder="�ּҰ˻�">
				<input type="text" name="address2" size=100; placeholder="���ּ�">
				</td>
			</tr>
			<tr>
				<td width=100 class = "title">�̸���</td>
				<td width=750><input type="text" name="email" size=50 value="hong1412@icia.net"></td>
			</tr>
			<tr>
				<td width=100 class = "title">��ȭ��ȣ</td>
				<td width=750><input type="text" name="tel" size=50 value="010-1111-1111"></td>
			</tr>
			<tr>
				<td width=100 class = "title">�������</td>
				<td width=750>
				<input type="radio" name="payType" value="0" checked="checked">������
				<input type="radio" name="payType" value="0">ī��
				</td>
			</tr>
		</table>
		<div class="buttons">
			<button>�ֹ��ϱ�</button>
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
		      
		      if(!confirm("�� ��ǰ���� �ֹ��ϽǷ���?")) return;
		      
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
		            alert(oid+"�ֹ��� �Ϸ�Ǿ����ϴ�.");
		            location.href="/";
		         }
		      })
		   });
	
	$("#btnChk").on("click",function(){
		var chk = $("#tbl .row .chk:checked").length;
		if(chk==0){
			alert("�ֹ��� ��ǰ���� �����ϼ���!");
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
		$("#total1").html("�հ�: "+total);
			
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
		$("#total1").html("�հ�: "+total);
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
			alert("������ ���ڷ� �Է��ϼ���");
			row.find(".qnt").val("");
			row.find(".qnt").focus();
			return;
		}
		if (!confirm(id + "��ǰ�� ������ " + qnt + " ���� �����Ͻðڽ��ϱ�?"))
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
		if (!confirm(id + "��ǰ�� ��ٱ��Ͽ��� �����Ͻðڽ��ϱ�?"))
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
