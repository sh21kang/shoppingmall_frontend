import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import { Link} from "react-router-dom";
import {getTime} from "../../utility"
export default ({loading , data})=> {
    
    if (loading === true) {
        return(
            <Wrapper>
            <Loader />
          </Wrapper>
        );
    }else if (!loading && data ){
        return (
        
    <OutWrapper>
        <Ptag>공지사항</Ptag>
       <Tabel>
           <tbody>
              
               <TabelHeader>
               <TabelSub>제목</TabelSub>
               <TabelName>{data.QuestionType}</TabelName>
               </TabelHeader>
               <TabelHeader>
               <TabelSub>날짜</TabelSub>
               <TabelName>{getTime(data.createdAt)}</TabelName>
                </TabelHeader>     
                <TabelHeader>
               <TabelSub>작성자</TabelSub>
               <TabelName>{data.username}</TabelName>
                </TabelHeader>
                {
                    data.product !== null ?

                <TabelHeader>
               <TabelSub>문의상품</TabelSub>
               <TabelName>
               <Link to={`/product/${data.product.id}`}> {data.product.name}
                   </Link>
                   </TabelName>
                </TabelHeader> :null
                }
                <TabelContent>
                    <Content>
                    {data.contents}
                    </Content>
               </TabelContent>
              
                
           </tbody>

       </Tabel>
       {data.answer !==null ?
        <AnswerWrapper>
            <AnswerHeader>
                <AnswerElement>관리자</AnswerElement>
                <AnswerElement>
                    {getTime(data.answer.createdAt)}     
                </AnswerElement>
            </AnswerHeader>
            <AnswerContent>

            {data.answer.contents}
            </AnswerContent>
          
        </AnswerWrapper>
       : null}
    </OutWrapper>
    )

    }
    return(
        <div>Notice</div>
    )
};

const AnswerElement =styled.div`

`
const AnswerContent =styled.div`
padding-left :40px;
padding-right :40px;
`

const AnswerHeader = styled.div`
display:flex;
justify-content: space-between;
padding :30px;
`
const AnswerWrapper = styled.div`
border-top: 1px solid #dedede;
`


const Ptag = styled.p`
padding :7px 0 0;
#939393;
margin-left :50px;
margin-bottom :50px;
`
const TabelContent =styled.tr`
height : 300px;
`
const Content = styled.td`
padding : 50px;
font-size :14px;
`

const TabelSub = styled.td`
width:20%;
font-weight: bold;
padding-left :50px;
color: #555555;
`
const TabelName = styled.td`


`

const OutWrapper = styled.div`

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

`

const TabelHeader = styled.tr`
line-height:35px;
width :80%;
height :35px;
border: 1px solid #dedede;
`