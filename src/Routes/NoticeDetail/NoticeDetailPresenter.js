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
               <TabelName>{data.subject}</TabelName>
               </TabelHeader>
               <TabelHeader>
               <TabelSub>날짜</TabelSub>
               <TabelName>{getTime(data.createdAt)}</TabelName>
                </TabelHeader>          
                <TabelContent>
                    <Content>
                    {data.contents}
                    </Content>
               </TabelContent>
           </tbody>

       </Tabel>
        

    </OutWrapper>
    )

    }
    return(
        <div>Notice</div>
    )
};

const Ptag = styled.p`
padding :7px 0 0;
#939393;
margin-left :50px;
margin-bottom :50px;
`
const TabelContent =styled.tr`
height : 500px;
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
width:1100px;
`

const TabelHeader = styled.tr`
line-height:35px;
width :80%;
height :35px;
border: 1px solid #dedede;
`