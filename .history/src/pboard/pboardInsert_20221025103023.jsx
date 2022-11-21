import React from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap'

const pboardInsert = () => {
    const [form,setForm]=useState({
        pprice:0,
        ptitle:'',
        pcontent:'',
        pimage:'',
        file:null,
        fileName:'',
        uid:'',
    })

const onChnageForm=(e)=>{
    setForm({
        ...form,
        [e.target.name]:e.target.value
    })
}

    return (
        <div>
            <Form>
                <Form.Control
                    type='number'
                    placeholder='가격을 입력하세요'
                    name='price' />
                <Form.Control
                    placeholder='제목을 입력하세요'
                    name='title' />
                <Form.Control
                    placeholder='내용은 300자까지 입력가능합니다' />
                <Form.Control
                    type='file'
                    placeholder='이미지를 등록하세요' />
                <Form.Control
                    type='hidden'
                    value={sessionStorage.getItem('uid')} />
            </Form>
        </div>
    )
}

export default pboardInsert