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
width:80%;
font-weight: bold;
padding-left :50px;
color: #555555;
`

const TabelTime = styled.td`
width :20%;
text-align :center;
`

const Ptag = styled.p`
padding :7px 0 0;
#939393;
margin-left :50px;
margin-bottom :50px;
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
            

            <Ptag>공지사항</Ptag>
            
        <Tabel>
            <TabelName>
                <TabelHeader>
                <TabelSub>제목</TabelSub>
                <TabelTime>날짜</TabelTime>
                </TabelHeader>
            </TabelName>
            <tbody>

        {data.map(ele=>
        <TabelHeader key={ele.id}>
        
            
            <TabelSub>
                <Link to={`/board/notice/${ele.id}`}>
                    {ele.subject}
                </Link>
            </TabelSub>
            
            <TabelTime>{getTime(ele.createdAt)}</TabelTime>
        </TabelHeader>)
        
        
        }
            </tbody>
        </Tabel>
      </Wrapper>
    );
    }
    
    
    return(
        <div>
            cart
        </div>
    
    );
}


