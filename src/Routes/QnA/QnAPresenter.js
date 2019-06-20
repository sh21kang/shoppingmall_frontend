import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import {getTime} from "../../utility"
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
const TabelName = styled.thead`

text-align :center;
`

const TabelHeader = styled.tr`
line-height:35px;
width :80%;
height :35px;
border: 1px solid #dedede;
`

const TabelSub = styled.td`
width:55%;
font-weight: bold;
padding-left :50px;
color: #555555;
text-align :center;
`

const TabelTime = styled.td`
width :15%;
text-align :center;
`

const Ptag = styled.p`
padding :7px 0 0;
margin-left :50px;
margin-bottom :50px;
`

const WriteButton = styled.div`

border: 1px solid #D6D6D6;
width : 140px;
height : 40px;
line-height:40px;
text-align:center;
margin-right:10px;
`

const ButtonWrapper = styled.div`
display :flex;
width: 1100px;
justify-content: space-between;

`
export default ({loading, data})=> {

    if (loading === true) {
        return(
            <Wrapper>
            <Loader />
          </Wrapper>
        );
    }else if (!loading && data ){
    
    return (
        <Wrapper>
           
        <ButtonWrapper><Ptag>문의 게시판</Ptag>
            <Link to={"/board/write"}>
           <WriteButton>1:1 문의하기</WriteButton>
            </Link>
           </ButtonWrapper>
            
        <Tabel>
            <TabelName>
                <TabelHeader>
                <TabelTime>날짜</TabelTime>
                <TabelSub>제목</TabelSub>
                <TabelTime>작성자</TabelTime>
                <TabelTime>문의상태</TabelTime>
                </TabelHeader>
            </TabelName>
            <tbody>

        {data.map(ele=>
        <TabelHeader key={ele.id}>
        <TabelTime>{getTime(ele.createdAt)}</TabelTime>
            <TabelSub>
                    <Link to={`/board/qna/${ele.id}`}>
                    {ele.QuestionType}
                        </Link>
            </TabelSub>
            <TabelTime>{ele.username}</TabelTime>
            <TabelTime>{ele.answer!==null ? "답변완료": "문의접수"}</TabelTime>
        </TabelHeader>)
        
        
        }
            </tbody>
        </Tabel>
      </Wrapper>
    );
    }
    
return <div>tmp</div>
}


