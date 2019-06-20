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

width :80%;
height :35px;
border: 1px solid #dedede;
`

const TabelSub = styled.td`
width:490px;
font-weight: bold;
padding-left :50px;
color: #555555;
vertical-align: middle;
border-right: 1px solid #dedede;
`

const TabelSmall = styled.td`
width :108px;
text-align :center;
vertical-align: middle;
border-right: 1px solid #dedede;
justify-content: center;
`

const Ptag = styled.p`
padding :7px 0 0;
#939393;
margin-left :50px;
margin-bottom :50px;
`

const SelectionWrapper = styled.div`

`

const SmallImage = styled.img`
height :80px;
margin-top :1.5px;
`

const Selection = styled.div`
display :flex;

`

const ProductInfo = styled.div`
padding :10px;
padding-left : 30px;

width : 100%;
height :100%;
`

const Info = styled.div`
margin-top : 5px;
`

const Price = styled.div`
margin-top : 5px;
font-size : 14px;
font-weight : bold;

`

const Status = styled.div`
font-weight : bold;
font-size: 14px;
`
export default ({loading, data})=> {

    if (loading === true) {
        return(
            <Wrapper>
            <Loader />
          </Wrapper>
        );
    }else if (!loading && data ){
    //날짜	상품정보  주문상태
    return (
        <Wrapper>
            

            <Ptag>주문내역</Ptag>
            
        <Tabel>
            
            <TabelName>
                <TabelHeader>
                <TabelSmall>날짜</TabelSmall>
                <TabelSub>상품정보</TabelSub>
                <TabelSmall>주문상태</TabelSmall>
                </TabelHeader>
            </TabelName>

           
            <tbody>

        {data.map(ele=>
        <TabelHeader key={ele.id}>
            <TabelSmall>
                <ProductInfo>
                <Info>{getTime(ele.createdAt)}</Info>
                <Price>{ele.totalPrice}원</Price>
                <Info>주문상세보기</Info>
                </ProductInfo>
            </TabelSmall>
            <TabelSub>
                <SelectionWrapper>
                    {ele.selections.map(ele2=>
                        <Selection key={ele2.id}>
                         <Link to={`/product/${ele2.product.id}`}>
                            <SmallImage src={ele2.product.files[0].url} alt="img"></SmallImage>
                            </Link>
                            <ProductInfo>
                                <Link to={`/product/${ele2.product.id}`}>
                                    <Info>{ele2.product.name}</Info>
                                </Link>
                                <Info>{ele2.count}개 / {ele2.color} / {ele2.size} / 주문번호 : {ele.orderNumber}</Info>
                                <Price>{ele2.product.price}원</Price>
                            </ProductInfo>
                        </Selection>
                    )}
                </SelectionWrapper>   
            </TabelSub>
            <TabelSmall>
                <Status>{ele.status}</Status>
            </TabelSmall>
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


