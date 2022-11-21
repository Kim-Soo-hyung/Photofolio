import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Card, FormControl, Grid, TextField } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Button, Col, Form, FormLabel, Row } from 'react-bootstrap'

const PboardInsert = () => {
    const [image,setImage]=useState('');
    const [form, setForm] = useState({
        pwriter: '김태형',
        pprice: '',
        ptitle: '',
        pcontent: '',
        file: null,
        fileName: '',
        pimage:'',
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

    const onChangeContent = (e) => {
        setForm({
            ...form,
            content: e
        });
    }

    //pwriter(nickname)도 중복안되게 해야할듯.
    const onSubmit = async () => {
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
                    <Form>


                    <Grid item xs={12}>
                            <CKEditor
                            
                                config={{ 
                                    ckfinder: { uploadUrl: '/api/pboard/ckupload' },
                                
                                }}
                                editor={ClassicEditor}
                                data={pcontent}
                                onBlur={(e, editor) => onChangeContent(editor.getData())} />
                        <textarea
                                name="pcontent"
                                onChange={onChangeForm}
                                value={pcontent} /> 
                        <img src={image || 'https://dummyimage.com/100x100'} alt="빈이미지" width={150} height={150} />
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





                        <Grid>
                            <input type='hidden' /*name={pwriter}  value={pwriter} */ />
                        </Grid>
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


                      
                            {/*   <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="내용"
                                value={pcontent}
                                onChange={onChangeForm}
                                name="pcontent"
                                autoComplete="pcontent"
                                type="text"
                            /> */}
                        </Grid>
                        <div style={{ marginTop: 30 }}>
                            <Button onClick={onSubmit} style={{ width: '100%', margintTop: 300 }}>상품 등록</Button>
                        </div>
                    </Form>
                </Card>
            </Row>
        </div>
    )
}

export default PboardInsert