import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import { Link} from "react-router-dom";



const LoginCart = ({data,onCheck}) =>(

    data.map( (ele,i) =>{
       return  <TabelHeader key={ele.id+i}>
        
            <TabelSub><input type="checkbox" id={ele.id} name="foo" onClick={()=>onCheck(ele.id,ele.selection.id)}/></TabelSub>
            {/* <TabelSub></TabelSub> */}
            
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
        }));
        


export default ({loading, data,isLoggedIn,onCheck,onCheckAll, onDelete,onOrder,onOrderAll, price})=> {

    if (loading === true) {
        return(
            <Wrapper>
            <Loader />
          </Wrapper>
        );
    }else if (!loading && data ){
    
    return (
        <Wrapper>
                
            <Ptag>장바구니</Ptag>
            
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
          <LoginCart data={data} onCheck={onCheck}/>
            
        </TbodyStyle>
        </Tabel>
          
            {!data.length ?
                <EmptyWrapper><TabelEmpty>장바구니에 담긴 상품이 없습니다.</TabelEmpty></EmptyWrapper> :null
            }

        <GoBack>

        <Link to="/">쇼핑 계속하기</Link>
        </GoBack>
        {data.length ?
        <CalculatePrice>
            <NamingTag>
                총 상품금액 {" "+price[0]}원
            </NamingTag>
            <NamingTag>
                +
            </NamingTag>
            <NamingTag>
                배송비 {" "+price[1]}원 
            </NamingTag>
            <NamingTag>
               =
            </NamingTag>
            <TotalTag>
            {price[2]}원
            </TotalTag>
         </CalculatePrice>
        :null}
        <ButtonWrapper>
                <DeleteButton onClick={onDelete}>선택 상품 삭제</DeleteButton>
                <TwoButtonWrapper>
                    <SelectOrder onClick={onOrder}>선택 상품 주문</SelectOrder>
                    <AllOrder onClick={onOrderAll}>전체 상품 주문</AllOrder>
                </TwoButtonWrapper>
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
font-weight: bold;
`

const GoBack = styled.div`
margin-top : 10px;
`
const TbodyStyle = styled.tbody`
vertical-align: middle;

`
const AllOrder= styled.div`
background-color:black;

width : 200px;
height : 54px;
line-height:54px;
color :white;
text-align:center;

`
const SelectOrder = styled.div`
color : black;
border: 1px solid #D6D6D6;
width : 200px;
height : 54px;
line-height:54px;
text-align:center;
margin-right:10px;
`

const ButtonWrapper = styled.div`
margin-top :10px;
width : 1100px;
display : flex;
justify-content: space-between;
`
const DeleteButton = styled.div`
border: 1px solid #D6D6D6;
width : 100px;
height : 30px;
line-height:30px;
text-align:center;
`

const TwoButtonWrapper = styled.div`
display:flex;
`

const OptionTag = styled.ul`
`
const NamingTag = styled.ul`
margin-left :30px;
font-size : 15px;
`
const TotalTag = styled.ul`
margin-left :30px;
font-size : 20px;
color : #CC2C2C;
`

const SmallImage= styled.img`
height :78px;
display : inline;
padding-top :10px;
padding-bottom : 10px;

`

const CalculatePrice = styled.div`
border: 1px solid #D6D6D6;
height : 100px;
margin-top : 30px;
width:1100px;
padding: 38px 30px 28px;
display : flex;
font-weight :bold;
justify-content:flex-end;

`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
`;


const Tabel = styled.table`
border: 1px solid #D6D6D6;
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

