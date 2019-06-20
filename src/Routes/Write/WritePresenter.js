import React from "react";
import styled from "styled-components";
import { Link} from "react-router-dom";
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
const ContentInput = styled.input`
height  :300px;
width : 500px;
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

const SelectStyle = styled.select`
width : 200px;
height : 20px;
`
export default ({isLoggedIn,
        password,
        QuestionType,
        productId,
        username,
        contents,
        onSubmit})=> {


    return (
        <Wrapper>
            

            <Ptag>QnA</Ptag>
            
        <Tabel>
            
            <tbody>
                <TabelHeader>
                <TabelSub>상품문의</TabelSub>
                <TabelValue>
                    <SelectStyle {...QuestionType}>
                        <option>상품문의</option>
                        <option>배송문의</option>
                        <option>기타문의</option>
                    </SelectStyle>
                    </TabelValue>
                </TabelHeader>
                {isLoggedIn ===false? 
                <TabelHeader>
                <TabelSub>작성자</TabelSub>
                <TabelValue><PhoneInput type="text" {...username}></PhoneInput></TabelValue>
                </TabelHeader>:null}
                {isLoggedIn===false? 
                <TabelHeader>
                <TabelSub>비밀번호</TabelSub>
                <TabelValue><PhoneInput type="password" {...password}></PhoneInput></TabelValue>
                </TabelHeader>:null}
                    
                
                <TabelHeader>
                <TabelSub>본문</TabelSub>
                <TabelValue><ContentInput type="text" {...contents}></ContentInput></TabelValue>
                </TabelHeader>
               
           
            </tbody>
        </Tabel>

        <ButtonWrapper>
            <Link to="/board/qna">
            <BackButton>취소</BackButton>
            </Link>
            <UpdateButton onClick={onSubmit}>저장</UpdateButton>
        </ButtonWrapper>
      </Wrapper>
    );
    
}


