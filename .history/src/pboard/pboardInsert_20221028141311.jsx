import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Card, FormControl, Grid, TextField } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Button, Col, Form, FormLabel, Row } from 'react-bootstrap'

const PboardInsert = () => {
    const [image, setImage] = useState('');
    const [images,setImages]=useState([]);
    const [attfiles,setAttFiles]=useState([]); //여러개니까 배열
    const [attImages,setAttImages]=useState([]);
    const [form, setForm] = useState({
        pwriter: '김태형',
        pprice: '',
        ptitle: '',
        pcontent: '',
        file: null,
        fileName: '',
        pimage: '',
        uid: 'red',
    })

    const { pprice, ptitle, pcontent, pimage, file, pwriter, uid } = form;

    const onChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onChangeFile = (e) => {
        setForm({
            ...form,
            file: e.target.files[0],
        })
        setImage(URL.createObjectURL(e.target.files[0]))
    }


    const onChangeFiles=(e)=>{
        const files=e.target.files; //아까는 [0]번쨰였지만 지금은 전부 다 받아오면 됨. 위에도
        //files라는 state 변수가 있지만 
        const arrFiles=[];
        //아래는 files임. arrFiles로 하면 빈배열의 갯수만큼 반복이니 0개 반복이라 아무 이미지도 못봄.
        for(let i=0;i<files.length;i++){
            arrFiles.push(URL.createObjectURL(files[i])
            )
            setImages(arrFiles);
            setAttFiles(files);
        }
    }
    //pwriter(nickname)도 중복안되게 해야할듯.
    const onSubmit_Insert = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("pcontent", pcontent);
        formData.append("ptitle", ptitle);
        formData.append("pprice", pprice);
        formData.append("pwriter", pwriter);
        formData.append("pimage", pimage);
        await axios.post('/api/pboard/insert', formData);
        alert('등록완료')
    }

    return (
        <div>

            <Row className='d-flex justify-content-center my-5'>
                <Card style={{ width: '30rem' }} className="p-3">
                    <Form><Grid item xs={12}>
                        <p style={{ float: 'left', marginTop: 140 }}>메인이미지</p>
                        <img src={image || 'https://dummyimage.com/100x100'} alt="빈이미지" title='메인이미지' width={300} height={300} />
                    </Grid>
                        <Form.Control className='my-3'
                            type="file"
                            onChange={onChangeFile} />
                        <hr />

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={ptitle}
                                onChange={onChangeForm}
                                label="제목"
                                name="ptitle"
                                autoComplete="ptitle"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField multiline
                                minRows={12}
                                variant="outlined"
                                required
                                fullWidth
                                value={pcontent}
                                onChange={onChangeForm}
                                label="내용은 300자 제한"
                                name="pcontent"
                                autoComplete="pcontent"
                            />
                            {/*                             <Grid>
                                <input type='hidden' name={pwriter}  value={pwriter}  />
                            </Grid> */}
                            <hr />
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="가격"
                                    value={pprice}
                                    onChange={onChangeForm}
                                    name="pprice"
                                    type='number'
                                    autoComplete="pprice"
                                />
                            </Grid>
                            <hr />
                        </Grid>
                        <Form.Group>
                            <Form.Label>첨부파일 선택</Form.Label>
                            <Form.Control
                                type='file'
                                onChange={onChangeFiles} multiple />
                        </Form.Group>
                        <div className='images'>
                    {attImages.map(img=>
                    <>
                    <span className='img'>
                    <img src={`/api/display?fileName=${img.image}`} key={img.id} width={200} height={100}/>
                    <span onClick={()=>onClickdel(img.id,img.image)}
                    className='del'>X</span>
                    </span>
                    </>)}
                </div>
                        <div style={{ marginTop: 30 }}>
                            <Button onClick={onSubmit_Insert} style={{ width: '100%', margintTop: 300 }}>상품 등록</Button>
                        </div>
                    </Form>
                </Card>
            </Row>
        </div>
    )
}

export default PboardInsert