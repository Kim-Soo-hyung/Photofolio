import { Card, Grid, TextField } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import { Button, Col, Form, FormLabel, Row } from 'react-bootstrap'

const PboardInsert = () => {
    const [form, setForm] = useState({
        pprice: 0,
        ptitle: '',
        pcontent: '',
        pimage: '',
        file: null,
        fileName: '',
        uid: '',
    })

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
                                name="pcontent"
                                autoComplete="pcontent"
                                type="text"
                            />
                        </Grid>

                        <hr />
                        <Grid item xs={12}>

                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="adresss"
                                label="adresss"
                                name="adresss"
                                autoComplete="adresss"
                            />
                        </Grid>
                        <hr />
                        <Grid>
                           <input type='hidden' /* value={pwriter} *//>
                        </Grid>
                        <hr />
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="uemail"
                                label="Email Address"
                                name="uemail"
                                autoComplete="uemail"
                            />
                        </Grid>

                        <hr />


                        <select
                            variant="outlined"


                            className='form-select' placeholder='성별' id="exampleSelect1">

                            <option>성별</option>

                            <option>남자</option>
                            <option>여자</option>

                        </select>

                        <Form.Control className='my-3'
                            type="file" />
                        <hr />


                        <Button type="submit" style={{ width: '100%' }}>회원가입</Button>

                    </Form>
                </Card>
            </Row>
        </div>
    )
}

export default PboardInsert