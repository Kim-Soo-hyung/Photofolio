import React from 'react'
import { Form } from 'react-bootstrap'

const pboardInsert = () => {
  return (
    <div>
        <Form>
      <Form.Control
                    type='password'
                    placeholder='가격을 입력하세요'/>
      <Form.Control 
                    placeholder='제목을 입력하세요'/>
              </Form>                  
    </div>
  )
}

export default pboardInsert