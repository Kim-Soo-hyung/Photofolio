import { Card, Grid, TextField } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import { Button, Col, Form, FormLabel, Row } from 'react-bootstrap'

const PboardInsert = () => {
const [image,setImage]=useState(' https://dummyimage.com/100x100');
    const [form, setForm] = useState({
        pprice: 0,
        ptitle: '',
        pcontent: '',
        pimage: '',
        file: null,
        fileName: '',
        uid: '',
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
            file: e.target.files[0]
        })
        setImage(URL.createObjectURL(e.target.files[0]));

    }

    return (
        <div>

            <Row className='d-flex justify-content-center my-5'>
                <Card style={{ width: '30rem' }} className="p-3">
                    <Form>
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
                        <img src={image} alt="빈이미지" width={150} height={150}/>


                        <Button type="submit" style={{ marginTop:30 }}>상품 등록</Button>
                    </Form>
                </Card>
            </Row>
        </div>
    )
}

export default PboardInsert