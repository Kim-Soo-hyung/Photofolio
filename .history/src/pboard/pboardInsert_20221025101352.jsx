import React from 'react'
import { Form } from 'react-bootstrap'

const pboardInsert = () => {
    return (
        <div>
            <Form>
                <Form.Control
                    type='password'
                    placeholder='가격을 입력하세요' />
                <Form.Control
                    placeholder='제목을 입력하세요' />
                <Form.Control
                    placeholder='내용을 입력하세요' />
                <Form.Control
                    placeholder='이미지를 등록하세요' />
                <Form.Control
                    type='hidden'
                    value={sessionStorage.getItem('uid')} />
            </Form>
        </div>
    )
}

export default pboardInsert