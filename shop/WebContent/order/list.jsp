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
<h1>�ֹ����</h1>
<div id="olist">
	<form name="frm">
		<select id="key">
			<option value="order_id">�ֹ���ȣ</option>
			<option value="name" selected="selected">�ֹ����̸�</option>
			<option value="address">�ֹ����ּ�</option>
			<option value="tel">�ֹ�����ȭ��ȣ</option>
			<option value="status">�ֹ�����</option>
		</select>
		<input type="text" id="word" placeholder="�˻���">
		<select id="per">
			<option value="2">2��</option>
			<option value="3">3��</option>
			<option value="5" selected="selected">5��</option>
			<option value="10">10��</option>
		</select>
		<button>�˻�</button>
		�˻� �� :<span id="total"></span>
	</form>
	<div id="right">
	<select id="order">
			<option value="order_id">�ֹ���ȣ</option>
			<option value="name">�ֹ����̸�</option>
			<option value="address">�ֹ����ּ�</option>
			<option value="tel">�ֹ�����ȭ��ȣ</option>
		</select>
		<select id="desc">
			<option value="asc">��������</option>
			<option value="desc" selected="selected">��������</option>

		</select>
	</div>
</div>
<table id="tbl"></table>
<script id = "temp" type = "text/x-handlebars-template">
  <tr class="title">
    <td width=70>�ֹ��ڹ�ȣ</td>
    <td width=100>�ֹ����̸�</td>
    <td width=250>�ּ�</td>
    <td width=200>��ȭ</td>
    <td width=100>�ֹ���</td>
	<td width=50>��������</td>
  </tr>
	{{#each array}}
  	<tr class="row">
    	<td>{{order_id}}</td>
    	<td>{{name}}</td>
    	<td>{{address}}</td>
    	<td>{{tel}}</td>
    	<td>{{pdate}}</td> 
		<td><button id="{{order_id}}">��������</button></td>
  	</tr>
	{{/each}}
</script>
<div class="buttons">
	<button id="prev">����</button>
	<span id="page">1/4</span>
	<button id="next">����</button>
</div>

<div id="tbl1"></div>
<script id = "temp1" type = "text/x-handlebars-template">
<h1>����������</h1>	

	<table>
	<tr>
		<td class="title" width=100>�̸�</td>
		<td width=100>{{pur.name}}(<b>{{pur.order_id}}</b>)</td>
		<td class="title" width=100>��ȭ</td>
		<td width=100>{{pur.tel}}</td>
		<td class="title" width=100>�̸���</td>
		<td width=100>{{pur.email}}</td>
		<td class="title" width=100>�ֹ���</td>
		<td width=180>{{pur.pdate}}</td>
	</tr>
	<tr>
		<td class="title">�ּ�</td>
		<td colspan=3>{{pur.address}}</td>
		<td class="title">����</td>
		<td >{{outPayType pur.payType}}</td>
		<td class="title">����</td>
		
		<td >
			<select id="status">
				<option value="0">�ֹ�Ȯ��</option>
				<option value="1">����غ���</option>
				<option value="2">ó���Ϸ�</option>
			</select>
			<button id="btnStatus" order="{{pur.order_id}}">����</button>
		</td>
	</tr>
</table>
<table>
	<tr>
		<td width=100>�̹���</td>
		<td width=100>��ǰ�ڵ�</td>
		<td width=300>��ǰ��</td>
		<td width=100>������</td>
		<td width=100>����</td>
		<td width=100>����</td>
		<td width=100>�ݾ�</td>
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
		<td colspan=7>�հ�: <b>{{total}} </b></td>
	</tr>
</table>
</script>
<script>
Handlebars.registerHelper("outPayType", function(payType) {
    if(payType == '0') return "������";
    else return "ī��";
 });

</script>

<script>
	var page = 1;

	getList();

	
	
	$("#tbl1").on("click", " button ", function() {
		var order_id = $(this).attr("order");
		var status = $("#status").val();
		if (!confirm(order_id + "���� �ֹ� ���¸� " + status + "�� �����Ͻðڽ��ϱ�?"))
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
				alert("���°� ����Ǿ����ϴ�.")
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
					var str = "<tr><td colspan=5 >�˻��� �ֹ��� �����ϴ�</td></tr>"
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

