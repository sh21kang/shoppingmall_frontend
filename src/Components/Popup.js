import React from "react";
import styled from "styled-components";



export default ({password, onSubmit}) => (
    <OutWrapper>

  <Wrapper>
      <InputWrapper>
        <Message>이 글은 비밀글입니다. 비밀번호를 입력하여 주세요.</Message>
      </InputWrapper>
    <InputWrapper>
        <Input type="password" {...password} onKeyDown={onSubmit}/>
    </InputWrapper>
        
  </Wrapper>

    </OutWrapper>
);
const InputWrapper = styled.div`
display: flex;
justify-content: center;
width : 100%;
`
const OutWrapper = styled.div`
width :100%;
height : 100%;

display: flex;
justify-content: center;

`

const Message = styled.div`
height : 20px;
top : 10px;
`

const Input = styled.input`
width : 200px;
height : 30px;
justify-content: center;

`

const Wrapper = styled.div`
width: 300px;
height : 200px;
display: flex;
flex-direction:column;
justify-content: center;
line-height: 200px;

`

