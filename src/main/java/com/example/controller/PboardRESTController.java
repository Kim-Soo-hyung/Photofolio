package com.example.controller;

import java.io.File;

import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.dao.PboardDAO;
import com.example.domain.PboardVO;
import com.example.service.PboardService;

import net.coobird.thumbnailator.Thumbnailator;

@RestController
@RequestMapping("/api/pboard")
public class PboardRESTController {
	@Autowired
	PboardDAO pdao;

	@Autowired
	PboardService service;

	/*
	 * CKEditor 이미지 업로드
	 * 
	 * @RequestMapping(value="/ckupload",method=RequestMethod.POST) public
	 * HashMap<String, Object> ckUpload(String code, MultipartHttpServletRequest
	 * multi) throws IllegalStateException, IOException{
	 * 
	 * HashMap<String, Object>map=new HashMap<>(); //받을 때 반드시 upload라는 이름으로 받아야만
	 * 함. 그게 규칙인듯. MultipartFile file=multi.getFile("upload");
	 * 
	 * if(!file.isEmpty()){
	 * 
	 * //파일 이름과 경로 지정. String path="/upload/shop/ckupload"; String
	 * name=file.getOriginalFilename();
	 * 
	 * //파일 경로 X => 경로 창출 File newPath = new File("c:"+path);
	 * if(!newPath.exists()) newPath.mkdir();
	 * 
	 * //파일 이름 중복 X => 파일 복제 File newFile=new File("c:"+path+"/"+name);
	 * if(!newFile.exists()) file.transferTo(new File("c:"+path+"/"+name));
	 * 
	 * //map은 CKfinder를 처리하는 데 필요함. url이라는 이름이 CKeditor에서 정해진 규칙이며, uploaded가
	 * 성공했을 때 1을 넣어주어야만 파일 이름을 받아올 수 있음. map.put("url", path+"/"+name);
	 * map.put("uploaded", 1);
	 * 
	 * }
	 * 
	 * 
	 * return map; }
	 */

	
	@RequestMapping("/list")
	public HashMap<String,Object> list(@Param("page") int page, @Param("num")int num, @Param("searchType")String searchType,@Param("keyword") String keyword)throws Exception{
		HashMap<String,Object> map = new HashMap<String,Object>();
		map.put("list", pdao.list(page, num, searchType, keyword));
		map.put("total", pdao.getTotal(searchType, keyword));
		return map;
	};

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public void update(PboardVO updateVO, MultipartHttpServletRequest multi) throws Exception {
		if (multi.getFile("file") != null) {

			String path = "c:/upload/project/";
			MultipartFile file = multi.getFile("file");

			// 파일의 확장자가 jpg,png인지 확인
			String contentType = file.getContentType();
			if (contentType.contains("image/png") || contentType.contains("image/jpeg")) {
				System.out.println("성공");
			} else {
				throw new Exception("이미지 파일은 jpg,png만 가능합니다. ");
			}

			File newFile = new File(path + file.getOriginalFilename());
			if (!newFile.exists()) {
				FileOutputStream thumnail = new FileOutputStream(newFile);
				Thumbnailator.createThumbnail(file.getInputStream(), thumnail, 300, 300);
				thumnail.close();
			}
			updateVO.setPcode(updateVO.getPcode());
			updateVO.setPimage("/upload/project/" + file.getOriginalFilename());
		}
		pdao.update(updateVO);
	};

	// PboardService�� ��ȸ�� viewcnt�� +1���ִ� �޼ҵ�����
	@RequestMapping("/read/{pcode}")
	public PboardVO read(@PathVariable String pcode) {
		if(pdao.read(pcode)!=null){
			return service.read(pcode);
		}else{
			return null;
		}
	};

	// insert �۾� ����� pcode�� �ڵ������Ǿ� ����
	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	public void insert(PboardVO insertVO, MultipartHttpServletRequest multi) throws Exception {
		if (multi.getFile("file") != null) {

			String path = "c:/upload/project/";
			MultipartFile file = multi.getFile("file");

			// 파일의 확장자가 jpg,png인지 확인
			String contentType = file.getContentType();
			if (contentType.contains("image/png") || contentType.contains("image/jpeg")) {
				System.out.println("성공");
			} else {
				throw new Exception("이미지 파일은 jpg,png만 가능합니다. ");
			}

			File newFile = new File(path + file.getOriginalFilename());

			if (!newFile.exists())
				file.transferTo(newFile);
			UUID code = UUID.randomUUID();
			insertVO.setPcode(code.toString());
			insertVO.setPimage("/upload/project/" + file.getOriginalFilename());
		}
		pdao.insert(insertVO);
	};
	
	@RequestMapping("/best")
	public List<PboardVO> best(){
		return pdao.best();
	}
	
	@RequestMapping(value="/delete", method=RequestMethod.POST)
	public void delete(String pcode){
		pdao.delete(pcode);
	}

	

}
