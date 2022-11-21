import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import { Form,Button, Row } from 'react-bootstrap';
import { Card, Grid, TextField } from '@material-ui/core';

const PboardRead = ({ history,match }) => {
  const pcode = match.params.pcode;
  const [image,setImage]=useState('');
  const [postRead, setPostRead] = useState({
   ptitle:'', 
   pcontent:'', 
   pwriter:'', 
   pimage:'', 
   viewcnt:'', 
   regDate:'',
  updateDate:''
  });
  const { ptitle, pcontent, pwriter, pimage, viewcnt, regDate, updateDate } = postRead;


  const callPostRead = async () => {
    const result = await axios.get(`/api/pboard/read/${pcode}`)
    setPostRead(result.data);
  }

  const onSubmit_update=async()=>{

  }

  useEffect(() => {
    callPostRead();
  }, [])


  return (
    <div>

            <Row className='d-flex justify-content-center my-5'>
                <Card style={{ width: '30rem' }} className="p-3">
                    <Form>
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
{/*                             <Grid>
                                <input type='hidden' name={pwriter}  value={pwriter}  />
                            </Grid> */}
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
                            <Button onClick={onSubmit_Insert} style={{ width: '100%', margintTop: 300 }}>상품 등록</Button>
                        </div>
                    </Form>
                </Card>
            </Row>
        </div>
  )
}

export default PboardRead