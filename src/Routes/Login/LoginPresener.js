import React from "react";
import styled from "styled-components";
import { Link} from "react-router-dom";
export default ({
    returnUrl,
    onSubmit,
    username,
    password})=> (
    <Wrapper>
   
    
<Tabel>

    <Ptag>Member Login</Ptag>
    <LoginBox>

        <InfoBox>
            <Info><Input type="text" placeholder="아이디" {...username}/></Info>
            <Info><Input type="password" placeholder="비밀번호" {...password}/></Info>
        </InfoBox>
        <LoginButton onClick={onSubmit}>Login</LoginButton>
    </LoginBox>
    <NaverLoginWrapper>네이버 로그인</NaverLoginWrapper>
    <ButtonBox>
        <Link to="/join">
        <Button color={"#dedede"}>회원가입</Button>
        </Link>
        <Button color={"white"}>아이디 찾기</Button>
        <Button color={"white"}>비밀번호 찾기</Button>
    </ButtonBox>
        {  returnUrl==='/order' ?
        <>
        <Ptag>NoMember Login</Ptag>
        <LoginBox>
    
            <InfoBox>
                <Info><Input type="text" placeholder="주문자명"/></Info>
                <Info><Input type="text" placeholder="주문번호"/></Info>
            </InfoBox>
            <LoginButton>Check</LoginButton>
        </LoginBox> 
        </>:null
    }
     
</Tabel>

</Wrapper>
);

const Ptag = styled.p`
font-size: 18px;
padding :7px 0 0;
color :#939393;
margin-left :30px;
margin-bottom :50px;
`

const Button = styled.div`
background-color : ${props => props.color};
border :${props => props.theme.boxBorder};
width :150px;
height :47px;
line-height: 43px;
margin-left :10px;
font-weight: bold;
text-align: center;
border-radius: 2px;
letter-spacing: 3px;
`
const ButtonArea = styled.div`
margin-top : 50px;
display :flex;

`

const NaverLoginWrapper  =styled.div`
width: 500px;
text-align: center;
margin-top : 40px;
`

const ButtonBox = styled.div`
width: 500px;
border-top: 1px solid #dedede;
margin-top : 40px;
display :flex;
padding :10px;
margin-bottom : 60px;
`

const Input = styled.input`

width :320px;
padding :1px;
margin-left :14px;
text-align :center;
font-size: 13px;
height: 36px;
`

const Info= styled.div`
margin-bottom:10px;
`
const InfoBox=styled.div`

`
const LoginBox =styled.div`
display:flex;
justify-content: space-between;
width: 500px;
font-weight :bold;

`
const LoginButton = styled.div`
width :82px;
height :82px;
text-align: center;
line-height: 82px;
background : black;
color : white;
`

const Wrapper = styled.div`
 
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  margin-top : 100px;
`;

const Tabel = styled.div`
border: 1px solid #dedede;
color: #000;
font-size: 11px;
line-height: 140%;
width:710px;
padding :100px;
`

const TabelHeader = styled.div`
line-height:60px;
width :80%;
height :60px;
border: 1px solid #dedede;
`