<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Shopping Login</title>
    <link rel="stylesheet" href="/css/login.css" >
  </head>
  <body>
    <div class="wrapper">
      <div class="title">Login</div>
      <form name="frm" >
        <div class="field">
          <input type="text" required name="uid">
          <label>ID</label>
        </div>
        <div class="field">
          <input type="password" required name="pass">
          <label>Password</label>
        </div>
        <div class="content">
          <div class="checkbox">
            <input type="checkbox" id="remember-me">
            <label for="remember-me">��й�ȣ���</label>
          </div>
          <div class="pass-link"><a href="#">�н����� ã��</a></div>
        </div>
        <div class="field">
          <input type="submit" value="Login">
        </div>
        <div class="signup-link">ȸ���� �ƴϽŰ���? <a href="#">ȸ������</a></div>
      </form>
    </div>
	
  </body>
  <script>
	$(frm).on("submit",function(e){
		e.preventDefault();
		var uid=$(frm.uid).val();
		var pass=$(frm.pass).val();
		
		$.ajax({
			type:"get",
			url:"/user/login.json",
			data:{uid:uid},
			dataType:"json",
			success:function(data){
				if(data.uid==null){
					alert("���̵� �������� �ʽ��ϴ�.");
					$(frm.uid).focus();
				}else if(data.pass!=pass) {
					alert("��й�ȣ�� ��ġ���� �ʽ��ϴ�.");
				}else{
					//alert("����");
					location.href="/";
				}
				
			}
		})
		
	})
</script>
</html>

