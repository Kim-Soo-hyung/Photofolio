import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2'

const MyPay = ({ history, match }) => {
  const { loginUser } = useContext(UserContext);
  const [paycode, setPaycode] = useState('');
  const pcode = match.params.pcode;
  const [productInfo, SetProductInfo] = useState({});

  const callPboardRead = async () => {
    const result = await axios.get(`/api/pboard/read/${pcode}`)
    SetProductInfo(result.data);

  }

  const { pwriter, pprice, pname } = productInfo;

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init('imp37385705'); // 결제 데이터 정의
    const data = {
      pg: 'html5_inicis', // PG사 (필수항목)
      pay_method: 'card', // 결제수단 (필수항목)
      merchant_uid: `pay_${new Date().getTime()}`, // 주문번호 (필수항목)
      name: pname, // 주문명 (필수항목)
      amount: pprice, // 금액이고 반드시 숫자로 써야함. (필수항목)
      custom_data: { name: '부가정보', desc: '세부 부가정보' },
      buyer_name: loginUser.uname, // 구매자 이름
      buyer_tel: loginUser.utel, // 구매자 전화번호 (필수항목)
      buyer_email: loginUser.uemail, // 구매자 이메일
      buyer_addr: loginUser.uaddress,
    };
    IMP.request_pay(data, callback);
  }

  const callback = async (response) => {
    const { success, error_msg, imp_uid, merchant_uid, buyer_email, pay_method, paid_amount } = response;
    try {
      const result = await axios.post(`/pay/complete/${imp_uid}`);

      //verify forgery
      if (result.data.response.amount === paid_amount) {
        console.log('검증 완료')
      } else {
        Swal.fire({
          text: "위변조 검증이 성공적으로 이뤄지지 않았습니다. 다시 결제를 시도해주세요",
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        })
      }

    } catch (e) {
      if (e) {
        Swal.fire({
          text: "예상치 못한 오류가 발생하였습니다.",
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        })
      }
    }

    //pay done
    if (success) {
      const formData = new FormData();
      formData.append("payprice", paid_amount);
      formData.append("seller", pwriter);
      formData.append("buyer", loginUser.unickname);
      formData.append("paytype", pay_method);
      formData.append("payemail", buyer_email);
      formData.append("paycode", merchant_uid);
      formData.append("pcode", pcode);

      //pay + review insert
      try {
        await axios.post('/pay/insert', formData);

        Swal.fire({
          title: '결제 완료!',
          text: "리뷰를 쓰러 가시겠습니까?",
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '이동',
          cancelButtonText: '취소'
        }).then(async (result) => {
          if (result.isConfirmed) {
            history.push(`/my/review/insert/${merchant_uid}?seller=${pwriter}&buyer=${loginUser.unickname}&pcode=${pcode}`)
          }
          else if (result.isDismissed) {
           history.push('/my/menu')
          }
        })

      } catch (e) {
        if (e) {
          Swal.fire({
            text: "예상치 못한 오류가 발생하였습니다.",
            icon: 'error',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
          })
        }
      }


    } else {
      Swal.fire({
        text: `결제가 실패하였습니다 : ${error_msg}`,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      })
    }
  }

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    callPboardRead();
    return () => {
      document.head.removeChild(jquery); document.head.removeChild(iamport);
    }

  }, []);

  return (
    <div className='pay'>
      <div className='img23'>
        <img
          size='10px'
          className="d-block w-100"
          src="/image/image23.jpg"
        />
      </div>
      <div className='img21'>
        <img
          size='10px'
          className="d-block w-100"
          src="/image/img21.jpg"
        />
      </div>

      <Button variant="warning" style={{ width: '200px', height: '100px' }} className='pay' onClick={onClickPayment}>결제하기</Button>
      <div className='animate__animated animate__fadeInUp'>
        <img
          size='10px'
          className="d-block w-100"
          src="/image/image24.jpg"
        />
      </div>

      {paycode &&
        <Button style={{ marginTop: 200 }}
          onClick={() => history.push(`/my/review/insert/${paycode}`)}>리뷰 쓰기</Button>}

    </div>
  );
}

export default MyPay;