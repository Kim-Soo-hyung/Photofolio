import { Card, Grid, TextField } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'

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
        formData.append("pname", pname);
        formData.append("pwriter", pwriter);
        formData.append("pimage", pimage);

        try {
            await axios.post('/api/pboard/insert', formData);
            alert('등록성공')
            sessionStorage.removeItem('unickname');
            history.push('/pboard/list')
        } catch (e) {

            //이미지파일 제한조건 달기
            if (e.message === 'Request failed with status code 500') {
                alert('이미지 파일의 확장자는 jpg, png만 가능합니다.')
            } else {
                alert('알 수 없는 오류가 발생하였습니다.')
            }
        }
    }

    //페이지 이동 막기. 새로고침은 못 막음. 제목 띄우고 내용 띄우게 하기. 
    useEffect(() => {
        const unblock = history.block('지금 페이지에서 나가게 되면 입력 사항이 초기화됩니다.');
       history.push('/pboard/list') ?
            ''
            :
            unblock()

    }, [history]);


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
                    <Form><Grid item xs={12}>
                        <p style={{ float: 'left', marginTop: 140 }}>메인이미지</p>
                        <img src={image || 'https://dummyimage.com/200x200'} alt="빈이미지" title='메인이미지' width={200} height={200} />
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
                                helperText="50자 이하로 기입"
                                FormHelperTextProps={{ style: { fontSize: 15 } }}
                                name="ptitle"
                                autoComplete="ptitle"
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
                                label="내용"
                                helperText="300자 이하로 기입"
                                FormHelperTextProps={{ style: { fontSize: 15 } }}
                                name="pcontent"
                                autoComplete="pcontent"
                            />
                        </Grid>
                        <hr />
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={pname}
                                onChange={onChangeForm}
                                helperText="30자 이하로 기입"
                                FormHelperTextProps={{ style: { fontSize: 15 } }}
                                label="상품이름"
                                name="pname"
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
                            <Button onClick={onSubmitInsert} style={{ width: '30%', margintTop: 300 }}>상품 등록</Button>
                        </div>
                    </Form>
                </Card>
            </Row>
        </div>
    )
}

export default PboardInsert

