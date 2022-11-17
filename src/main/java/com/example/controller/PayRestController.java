package com.example.controller;

import java.io.IOException;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.domain.PayVO;
import com.example.service.PayService;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

@RestController
@RequestMapping("/pay")
public class PayRestController {

	@Autowired
	PayService paservice;

	private IamportClient api;
	
	public PayRestController() {
    	// REST API 키와 REST API secret 를 아래처럼 순서대로 입력한다.
		this.api = new IamportClient("3766738282401126","cvQ9Bb92gsKkhmUVoAzKJWqZBIN5qL9IS0yNr9X8fQt46FQ7PmkNAddqRVDtqm5AHf2ezN8QtBgOjtU0");
	}

	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	public void insert(String pcode,PayVO insertVO) {
		paservice.insert(pcode, insertVO);
	}

	@RequestMapping(value = "/complete/{imp_uid}", method = RequestMethod.POST)
	public IamportResponse<Payment> paymentByImpUid(HttpSession session, @PathVariable String imp_uid)
			throws IamportResponseException, IOException {
		return api.paymentByImpUid(imp_uid);
	}

}
