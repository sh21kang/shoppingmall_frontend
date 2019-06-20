import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import { Link} from "react-router-dom";

export default ({loading, data,onCheck,onCheckAll, onDelete,onMove})=> {

    if (loading === true) {
        return(
            <Wrapper>
            <Loader />
          </Wrapper>
        );
    }else if (!loading && data ){
    
    return (
        <Wrapper>
                
            <Ptag>찜리스트</Ptag>
            
        <Tabel>
        <TbodyStyle>
            <TabelHeader>
                <TabelSub><input type="checkbox" id="all" onClick={()=>onCheckAll()}/></TabelSub>
                    <TabelSub>이미지</TabelSub>
                    <TabelSub>상품정보</TabelSub>
                    <TabelSub>판매가</TabelSub>
                    <TabelSub>수량</TabelSub>
                    <TabelSub>적립금</TabelSub>
                    <TabelSub>배송비</TabelSub>
                    <TabelSub>합계</TabelSub>
            
            </TabelHeader>
         
            {data.map(ele=>
                <TabelHeader key={ele.id}>
                
                    <TabelSub><input type="checkbox" id={ele.id} name="goo" onClick={()=>onCheck(ele.id,ele.selection.id)}/></TabelSub>
                    
                    <TabelSub align="center"><Link to={`/product/${ele.selection.product.id}`}>
                    
                    <SmallImage src={ele.selection.product.files[0].url} alt="img"></SmallImage>
                        </Link></TabelSub>
                    <TabelSub align="center"> 
                    <Link to={`/product/${ele.selection.product.id}`}>
                    {ele.selection.product.name}
                    </Link>
                    <OptionTag><div>옵션 :{" "+ele.selection.color}/{ele.selection.size} </div></OptionTag>
                    </TabelSub>
                    <TabelSub> {ele.selection.product.price}</TabelSub>
                    <TabelSub> {ele.selection.count}</TabelSub>
                    <TabelSub> {ele.selection.product.price/100}</TabelSub>
                    <TabelSub> {ele.selection.product.shippingFee ||2500}원</TabelSub>
                    <TabelSub> {ele.selection.product.shippingFee||2500 + ele.selection.count*ele.selection.product.price}원</TabelSub>
                </TabelHeader>
                )}

            </TbodyStyle>
        </Tabel>
        {!data.length ?
                <EmptyWrapper><TabelEmpty>찜목록이 비었습니다.</TabelEmpty></EmptyWrapper> :null
            }
       
        <CalculatePrice> </CalculatePrice>
        <ButtonWrapper>
            <Ptext>선택상품을</Ptext>
                <DeleteButton onClick={onDelete}>DELETE</DeleteButton>
                <DeleteButton onClick={onMove}>ADD TO CART</DeleteButton>
                
        </ButtonWrapper>
      </Wrapper>
    );
    }
    
    
    return(
        <Wrapper>
            <Loader />
          </Wrapper>
    
    );
}

const EmptyWrapper = styled.div`
margin-top :40px;
display :flex
justify-content:center;
`

const TabelEmpty = styled.div`
width :100%
text-align :center;
font-weight :bold;
`
const Ptext = styled.p`
height : 30px;
line-height:30px;
font-size : 11px;
`
const DeleteButton = styled.div`
border: 1px solid #D6D6D6;
width : 100px;
height : 30px;
line-height:30px;
text-align:center;
margin-left : 10px;
font-size : 10px;
`

const ButtonWrapper = styled.div`
margin-top :10px;
width : 1100px;
display : flex;

`
const TbodyStyle = styled.tbody`
vertical-align: middle;

`

const OptionTag = styled.ul`
`

const SmallImage= styled.img`
height :160px;
display : inline;
padding-top :10px;
padding-bottom : 10px;
`

const CalculatePrice = styled.div`
`

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
height :35px;
border: 1px solid #dedede;
`

const TabelSub = styled.td`
justify-content:center;
vertical-align: middle;
font-weight: bold;
padding-left :50px;
color: #555555;
`




const Ptag = styled.p`
padding :7px 0 0;
#939393;
margin-left :50px;
margin-bottom :50px;
`

