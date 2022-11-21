import { Card, Grid, TextField } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import Swal from 'sweetalert2'

const PboardInsert = ({ history, match }) => {
    const unickname = match.params.unickname;
    const [image, setImage] = useState('');
    const [form, setForm] = useState({
        pwriter: unickname,
        pprice: '',
        ptitle: '',
        pcontent: '',
        pname: '',
        file: null,
        pimage: ''
    })

    const { pname, pprice, ptitle, pcontent, pimage, file, pwriter } = form;

    //등록 form 바꾸기
    const onChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    //file 바꾸기
    const onChangeFile = (e) => {
        setForm({
            ...form,
            file: e.target.files[0],
        })
        setImage(URL.createObjectURL(e.target.files[0]))
    }

    //등록하기
    const onSubmitInsert = async () => {

        const formData = new FormData();
        formData.append("file", file);
        formData.append("pcontent", pcontent);
        formData.append("ptitle", ptitle);
        formData.append("pprice", pprice);
        formData.append("pwriter", pwriter);
        formData.append("pimage", pimage);
        formData.append("pname", pname);

        try {
            await axios.post('/api/pboard/insert', formData);
            Swal.fire({
                text: "등록이 완료되었습니다",
                icon: 'success',
                confirmButtonColor: '#3085d6',
            })
            sessionStorage.removeItem('unickname');
            history.push('/pboard/list')
        } catch (e) {

            //이미지파일 제한조건 달기
            if (e.message === 'Request failed with status code 500') {
                Swal.fire({
                    text: "이미지 파일의 확장자는 jpg, png만 가능합니다.",
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                })
            } else {
                Swal.fire({
                    text: "알 수 없는 오류가 발생하였습니다.",
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                })
            }
        }
    }


    // 새로고침 막기(조건 부여 가능)
    useEffect(() => {
        window.onbeforeunload = function () {
            return true;
        };
        return () => {
            window.onbeforeunload = null;
        };
    }, [])

    return (
        <div>

            <Row className='d-flex justify-content-center my-5'>
                <Card style={{ width: '60rem' }} className="p-3">
                    <Form>
                        <Grid item xs={12}>
                            <p style={{ width: "100%" }}>이미지</p>
                            <img src={image || 'https://dummyimage.com/300x300'}
                                alt="빈이미지" title='메인이미지' />
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
                        <hr />
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="상품명"
                                value={pname}
                                onChange={onChangeForm}
                                name="pname"
                            />
                        </Grid>
                        <hr />
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
                        <div style={{ marginTop: 30 }}>
                            <Button onClick={onSubmitInsert} style={{ width: '20%', margintTop: 100 }}>상품 등록</Button>
                            <Button onClick={() => history.go(-1)} style={{ width: '20%', marginLeft: 200 }}>뒤로가기</Button>



                        </div>

                    </Form>
                </Card>
            </Row>
        </div>
    )
}

export default PboardInsert



