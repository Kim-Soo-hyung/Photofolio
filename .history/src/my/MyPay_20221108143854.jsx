import axios from 'axios';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const MyPay = () => {
  const { loginUser } = useContext(UserContext);


  //pname하고 pprice를 받아와야 함. 
  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init('imp37385705'); // 결제 데이터 정의
    const data = {
      pg: 'html5_inicis', // PG사 (필수항목)
      pay_method: 'card', // 결제수단 (필수항목)
      merchant_uid: `mid_${new Date().getTime()}`, // 결제금액 (필수항목)
      name: '결제 테스트', // 주문명 (필수항목)
      amount: '1000', // 금액 (필수항목)
      custom_data: { name: '부가정보', desc: '세부 부가정보' },
      buyer_name: loginUser.uname, // 구매자 이름
      buyer_tel: loginUser.utel, // 구매자 전화번호 (필수항목)
      buyer_email: loginUser.uemail, // 구매자 이메일
      buyer_addr: loginUser.uaddress,
    };
    IMP.request_pay(data, callback);
  }

  const callback = async (response) => {
    const { success, error_msg, imp_uid, merchant_uid, buyer_email, buyer_addr, pay_method, paid_amount, status } = response;
    if (success) {
      console.log(response);
      const formData = new FormData();
      formData.append("payprice", paid_amount);
      formData.append("uid", loginUser.uid);
      formData.append("paytype", pay_method);
      formData.append("payaddress", buyer_addr);
      formData.append("payemail", buyer_email);

      //DB insert
      try {
        await axios.post('/pay/insert', formData);
        alert('결제 성공');
      } catch (e) {
        if (e) console.log(e);
      }

    } else {
      alert(`결제 실패 : ${error_msg}`);
    }
  }


  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery); document.head.removeChild(iamport);
    }
  }, []);

  return (
    <>
      <button onClick={onClickPayment}>결제하기</button>
    </>
  );
}

export default MyPay;