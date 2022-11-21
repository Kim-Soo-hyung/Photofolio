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
            <Form>
                <Col className='d-flex justify-content-center'>
                   
                        <FormLabel>
                            가격
                        </FormLabel>
                        <Form.Control
                            className='input-lg'
                            type='number'
                            placeholder='가격을 입력하세요'
                            name='pprice'
                            onChange={onChnageForm} />
              
                    <FormLabel>
                            제목
                        </FormLabel>
                    <Form.Control
                        placeholder='제목을 입력하세요'
                        name='ptitle'
                        onChange={onChnageForm} />
                     
                </Col>
                {/* <Form.Control
                    placeholder='내용은 300자까지 입력가능합니다'
                    name='pcontent'
                    onChange={onChnageForm} />
                <Form.Control
                    type='file'
                    placeholder='이미지를 등록하세요'
                    onChange={onChangeFile} />
                <Form.Control
                    type='hidden'
                    value={sessionStorage.getItem('uid')}
                    name='uid' /> */}
                <Button type='submit'>등록하기</Button>
            </Form>
        </div>
    )
}

export default PboardInsert