import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
`;


const Tabel = styled.table`
border: 1px solid #dedede;
color: #000;
font-size: 11px;
line-height: 140%;
width:1100px;
`


const TabelHeader = styled.tr`
line-height:50px;
width :80%;
height :50px;
border: 1px solid #dedede;
`

const TabelSub = styled.th`
width:20%;
font-weight: bold;

color: #555555;
vertical-align: middle;
background-color: #F9F9F9;

`

const TabelValue = styled.td`
width :80%;
padding-left : 30px;
vertical-align: middle;
`

const Ptag = styled.p`
padding :7px 0 0;
margin-left :50px;
margin-bottom :50px;
`
const PhoneInput = styled.input`
height  :31px;
width : 300px;
`

const ButtonWrapper = styled.div`
display: flex;
justify-content: center;
margin-top : 60px;
`
const BackButton =styled.div`
width : 130px;
height : 40px;
line-height : 40px;
border: 1px solid #999999;
text-align : center;
`
const UpdateButton =styled.div`
background-color :#999999;
margin-left : 15px;
color : white;
width : 130px;
text-align : center;
height : 40px;
line-height : 40px;
`
export default ({loading, data,onSubmit,onCancle,
    password,
    name,
    email,
    phone,
    address})=> {

    if (loading === true) {
        return(
            <Wrapper>
            <Loader />
          </Wrapper>
        );
    }else if (!loading && data ){
    
    return (
        <Wrapper>
            

            <Ptag>개인정보수정</Ptag>
            
        <Tabel>
            
            <tbody>
                <TabelHeader>
                <TabelSub>아이디</TabelSub>
                <TabelValue>{data.username}</TabelValue>
                </TabelHeader>
                <TabelHeader>
                <TabelSub>비밀번호</TabelSub>
                <TabelValue><PhoneInput type="password" {...password}></PhoneInput></TabelValue>
                </TabelHeader>
                <TabelHeader>
                <TabelSub>이름</TabelSub>
                <TabelValue><PhoneInput type="text" {...name}></PhoneInput></TabelValue>
                </TabelHeader>
                <TabelHeader>
                <TabelSub>이메일</TabelSub>
                <TabelValue><PhoneInput type="email" {...email}></PhoneInput></TabelValue>
                </TabelHeader>
                <TabelHeader>
                <TabelSub>휴대폰번호</TabelSub>
                <TabelValue><PhoneInput {...phone}></PhoneInput></TabelValue>
                </TabelHeader>
                  <TabelHeader>
                <TabelSub>주소</TabelSub>
                <TabelValue><PhoneInput type="address" {...address}></PhoneInput></TabelValue>
                </TabelHeader>
           
            </tbody>
        </Tabel>

        <ButtonWrapper>
            
            <BackButton onClick={onCancle}>취소</BackButton>
            
            <UpdateButton onClick={onSubmit}>정보수정</UpdateButton>
        </ButtonWrapper>
      </Wrapper>
    );
    }
    
    
    return(
        <div>
            cart
        </div>
    
    );
}


