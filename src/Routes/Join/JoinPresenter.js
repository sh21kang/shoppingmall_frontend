import React from "react";
import styled from "styled-components";
import { Link} from "react-router-dom";
export default ({
    onSubmit, 
    username,
    password,
    repassword,
    name,
    email,
    phone,
    address})=> (
    
    
    <Wrapper>
        <PtagWrapper><Ptag>기본정보</Ptag></PtagWrapper>
        
    <Tabel>
    <tbody>
        
        <TabelHeader>
        <TabelSub>아이디</TabelSub>
        <TabelName><Input type="text" {...username}/></TabelName>
        </TabelHeader>
        <TabelHeader>
        <TabelSub>비밀번호</TabelSub>
        <TabelName><Input type="password" {...password}/></TabelName>
         </TabelHeader>   
         <TabelHeader>
        <TabelSub>비밀번호 확인</TabelSub>
        <TabelName><Input type="password" {...repassword}/></TabelName>
         </TabelHeader>   
         <TabelHeader>
        <TabelSub>이름</TabelSub>
        <TabelName><Input type="text" {...name}/></TabelName>
         </TabelHeader>  
         <TabelHeader>
        <TabelSub>이메일</TabelSub>
        <TabelName><Input type="email" {...email}/></TabelName>
         </TabelHeader>          
         <TabelHeader>
        <TabelSub>휴대폰번호</TabelSub>
        <TabelName><Input type="text" {...phone}/></TabelName>
         </TabelHeader> 
         <TabelHeader>
        <TabelSub>주소</TabelSub>
        <TabelName><Input type="text" {...address}/></TabelName>
         </TabelHeader> 
         
    </tbody>

</Tabel>
    <ButtonArea>
    <Button color={"#dedede"} onClick={onSubmit}>회원가입</Button>
    <Link to="/">
    <Button color={"white"}>취소</Button>
    </Link>
    </ButtonArea>
    </Wrapper>
    
);
const Button = styled.div`
background-color : ${props => props.color};
border :${props => props.theme.boxBorder};
width :200px;
height :54px;
line-height: 50px;
margin-left :10px;
font-size: 13px;
text-align: center;
border-radius: 2px;
letter-spacing: 3px;
`
const ButtonArea = styled.div`
margin-top : 50px;
display :flex;

`

const Input = styled.input`
height:30px;
width :320px;
padding :1px;
margin-left :14px;
`


const PtagWrapper = styled.div`
width: 736px;
`


const Ptag = styled.p`
font-size: 18px;
padding :7px 0 0;
#939393;
margin-left :30px;
margin-bottom :50px;
`

const TabelSub = styled.td`
width:160px;

font-weight: bold;
padding-left :50px;
color: #555555;
background: #f9f9f9
`
const TabelName = styled.td`
width :570px;

`


const Wrapper = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

const Tabel = styled.table`
border-top: 1px solid #dedede;
color: #000;
font-size: 11px;
line-height: 140%;
width:736px;
`

const TabelHeader = styled.tr`
line-height:60px;
width :80%;
height :60px;
border: 1px solid #dedede;
`