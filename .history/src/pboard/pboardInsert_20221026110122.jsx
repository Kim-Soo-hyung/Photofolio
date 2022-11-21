import { Card, Grid, TextField } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Button, Col, Form, FormLabel, Row } from 'react-bootstrap'

const PboardInsert = () => {
    const [form, setForm] = useState({
        pwriter:'등록자',
        pprice: 0,
        ptitle: '',
        pcontent: '',
        pimage: '',
        file: null,
        fileName: '',
        uid: 'test',
    })

const {pprice,ptitle,pcontent,pimage,file,uid}=form;

    const onChnageForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onChangeFile = (e) => {
        setForm({
            ...form,
            file: e.target.files[0],
            pimage:URL.createObjectURL(e.target.files[0])
        })
    }

    const onSubmit=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("file",file);
        formData.append("pcontent",pcontent);
        formData.append("ptitle",ptitle);
        formData.append("pprice",pprice);
        await axios.post('/api/pboard/insert',formData);
        alert('등록완료')
    }

    return (
        <div>

            <Row className='d-flex justify-content-center my-5'>
                <Card style={{ width: '30rem' }} className="p-3">
                    <Form onSubmit={onSubmit}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                onChange={onChnageForm}
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
                                label="내용"
                                onChange={onChnageForm}
                                name="pcontent"
                                autoComplete="pcontent"
                                type="text"
                            />
                        </Grid>

                        <hr />
                 
                        <Grid>
                           <input type='hidden' /*name={pwriter}  value={pwriter} *//>
                        </Grid>
                        <hr />
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="가격"
                                onChange={onChnageForm}
                                name="pprice"
                                type='number'
                                autoComplete="pprice"
                            />
                        </Grid>

                        <hr />
                
                        <Form.Control className='my-3'
                            type="file" 
                            onChange={onChangeFile}/>
                        <hr />
                        <img src={pimage || 'https://dummyimage.com/100x100'} alt="빈이미지" width={150} height={150}/>

                        <div style={{marginTop:30}}>
                        <Button type="submit" style={{ width: '100%',margintTop:300 }}>상품 등록</Button>
                        </div>
                    </Form>
                </Card>
            </Row>
        </div>
    )
}

export default PboardInsert