import React from 'react'

const ReviewInsert = () => {
  return (
    <Row className='d-flex justify-content-center my-5'>
        <Card style={{ width: '30rem' }} className="p-3">
          <Form>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="id"
                value={uid}
                name="uid"
                helperText="15자 이하로 기입"
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                onChange={onChange}
              />
            </Grid>

            <Button onClick={onCheckUid} className='mt-3'>아이디 중복 확인</Button>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                helperText="8-10자 영문대소문자와 숫자를 조합"
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                value={upass}
                name="upass"
                autoComplete="upass"
                type="password"
                onChange={onChange}
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="upass"
                label="confirm Password"
                /*   error={pass1!==upass}
                  helperText={pass1!==upass ? '비밀번호가 일치하지 않습니다.' : '비밀번호가 일치합니다'} */
                value={pass1}
                name="upass"
                autoComplete="upass"
                type="password"
                onChange={(e) => setPass1(e.target.value)}
              />
            </Grid>
            {message && <Alert>{message}</Alert>}
            <Button onClick={onConfirmPassword} className='mt-3'>패스워드 일치 확인</Button>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="uname"
                value={uname}
                name="uname"
                autoComplete="uname"
                onChange={onChange}
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField
                type='date'
                variant="outlined"
                maxLength='6'
                required
                fullWidth
                id="ubirth"
                value={ubirth}
                name="ubirth"
                autoComplete="ubirth"
                onChange={onChange}
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="unickname"
                label="unickname"
                value={unickname}
                name="unickname"
                onChange={onChange}
              />
            </Grid>

            <Button className='mt-3' onClick={onCheckUnickanme}>닉네임 중복확인</Button>

            <hr />
            <Grid item xs={12}>
              <TextField
                value={address}
                variant="outlined"
                required
                fullWidth
                id="adresss"
                label="adresss"
                name="uaddress"
                autoComplete="uaddress"
                onChange={onChange}
              />
            </Grid>

            <Button type='button'
              style={{ marginRight: 60, marginTop: 25 }}
              onClick={() => setIsPopupOpen(true)}>우편번호 검색</Button>
            <Button className='postCode_btn'
              style={{ marginLeft: 60, marginTop: 25 }}
              type='button'
              onClick={() => setIsPopupOpen(false)} >닫기</Button>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="utel"
                label="utel"
                value={utel}
                helperText='010-0000-0000 or 010-000-0000'
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                name="utel"
                autoComplete="utel"
                onChange={onChange}
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField

                variant="outlined"
                required
                fullWidth
                id="uemail"
                label="Email Address"
                helperText="rrri@daum.net or 222iIek@velog.io"
                value={uemail}
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                name="uemail"
                autoComplete="uemail"
                onChange={onChange}
              />
            </Grid>

            <hr />
            <TextField
              select
              label='성별을 선택하세요'
              fullWidth
              value={ugender}
              name='ugender'
              onChange={onChange}>
              <MenuItem value='성별'>성별</MenuItem>
              <MenuItem value='남자'>남자</MenuItem>
              <MenuItem value='여자'>여자</MenuItem>
            </TextField>

            프로필 사진등록
            <br/>

            <img src={image} width={100} />
            <Form.Control className='my-3'
              onChange={onChangeFile}
              type="file" />
            <hr />
            <Button onClick={onSubmitRegister} type="submit" style={{ width: '100%' }}>회원가입</Button>
          </Form>
        </Card>
      </Row>
  )
}

export default ReviewInsert