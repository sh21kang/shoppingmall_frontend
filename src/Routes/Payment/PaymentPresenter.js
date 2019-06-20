import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import { Link} from "react-router-dom";


const LogoutCart = () =>{

    

}

const LoginCart = ({data,item}) =>(

    data.map((ele, i)=>
        <TabelHeader key={ele.id}>
        
           
            {/* <TabelSub></TabelSub> */}
            <TabelSub align="center"><Link to={`/product/${ele.id}`}>
              
               <SmallImage src={ele.files[0].url} alt="img"></SmallImage>
                </Link></TabelSub>
            <TabelSub align="center"> 
            <Link to={`/product/${ele.id}`}>
            {ele.name}
            </Link>
            <OptionTag><div>옵션 :{" "+item[ele.id].color}/{item[ele.id].size} </div></OptionTag>
            </TabelSub>
            <TabelSub> {ele.price}</TabelSub>
            <TabelSub> {item[ele.id].count}</TabelSub>
            <TabelSub> {ele.price/100}</TabelSub>
            <TabelSub> {ele.shippingFee ||2500}원</TabelSub>
            <TabelSub> {ele.shippingFee||2500 + item[ele.id].count*ele.price}원</TabelSub>
        </TabelHeader>
        ));
        


export default ({loading,loading2, data,price,onPayment, item,
    message,
    recipientPhone,
    recipient,
    name,
    email,
    phone,
    address,
    info,
    onPaymentMethod})=> {

    if (loading === true) {
        return(
            <Wrapper>
            <Loader />
          </Wrapper>
        );
    }else if (!loading && data &&!loading2){
    
    return (
        <Wrapper>
                
            <Ptag>결제</Ptag>
            
        <Tabel>
        <TbodyStyle>
            <TabelHeader>
                
                    <TabelSub>이미지</TabelSub>
                    <TabelSub>상품정보</TabelSub>
                    <TabelSub>판매가</TabelSub>
                    <TabelSub>수량</TabelSub>
                    <TabelSub>적립금</TabelSub>
                    <TabelSub>배송비</TabelSub>
                    <TabelSub>합계</TabelSub>
            
            </TabelHeader>
          <LoginCart data={data} item={item}/>
            
            </TbodyStyle>
        </Tabel>
            

        <GoBack>

        <Link to="/">쇼핑 계속하기</Link>
        </GoBack>
        
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
        
        <ContentWrapper>
            <BigSubject>주문자 정보</BigSubject>
            <Tabel>
            
            <tbody>
                <TabelHeader>
                <TabelSub>주문하시는 분</TabelSub>
                <TabelValue><PhoneInput type="text" {...name}></PhoneInput></TabelValue>
                </TabelHeader>
                <TabelHeader>
                <TabelSub>휴대폰 번호</TabelSub>
                <TabelValue><PhoneInput type="phone" {...phone}></PhoneInput></TabelValue>
                </TabelHeader>
                <TabelHeader>
                <TabelSub>이메일</TabelSub>
                <TabelValue><PhoneInput type="email" {...email}></PhoneInput></TabelValue>
                </TabelHeader>
              
           
            </tbody>
        </Tabel>

            <BigSubject>배송정보</BigSubject>
            <Tabel>
            
            <tbody>
                <TabelHeader>
                <TabelSub>받으실분</TabelSub>
                <TabelValue><PhoneInput type="text" {...recipient}></PhoneInput></TabelValue>
                </TabelHeader>
                <TabelHeader>
                <TabelSub>휴대폰 번호</TabelSub>
                <TabelValue><PhoneInput type="phone" {...recipientPhone}></PhoneInput></TabelValue>
                </TabelHeader>
                <TabelHeader>
                <TabelSub>받으실 곳</TabelSub>
                <TabelValue><MessageInput type="text" {...address}></MessageInput></TabelValue>
                </TabelHeader>
                <TabelHeader>
                <TabelSub>남기실 말씀</TabelSub>
                <TabelValue><MessageInput type="text" {...message}></MessageInput></TabelValue>
                </TabelHeader>
           
            </tbody>
        </Tabel>
            <BigSubject>추가정보</BigSubject>
            <Tabel>
            <tbody>
                <TabelHeader>
                <TabelValue2>(선택) 무통장입금시 환불 가능한 계좌번호,은행을 체크해주세요 :) (은행,성함,계좌 빠짐없이 기재 부탁드려요!)</TabelValue2>
                </TabelHeader>
                <TabelHeader>
                <TabelValue2><MessageInput type="text" {...info}></MessageInput></TabelValue2>
                </TabelHeader>
            </tbody>
        </Tabel>
            <BigSubject>결제수단</BigSubject>
        <PaymentMethod>
            <RadioInput onClick={onPaymentMethod} name="pay" type="radio" value="card"/><label>카드결제</label>
            <RadioInput onClick={onPaymentMethod} name="pay" type="radio" value="realtime"/><label>실시간 계좌이체</label>
            <RadioInput onClick={onPaymentMethod} name="pay" type="radio" value="bankTransfer"/><label>무통장입금</label>
            <RadioInput onClick={onPaymentMethod} name="pay" type="radio" value="phone"/><label>핸드폰</label>
        </PaymentMethod>
        </ContentWrapper>



        <ButtonWrapper>
                
                    <AllOrder onClick={onPayment} >결제하기</AllOrder>
                
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
const RadioInput = styled.input`
margin-left : 15px;

`

const PaymentMethod = styled.div`
margin-top :15px;
`

const TabelValue2= styled.td`
width :100%%;
padding-left : 30px;
vertical-align: middle;
`

const TabelValue = styled.td`
width :80%;
padding-left : 30px;
vertical-align: middle;
`

const PhoneInput = styled.input`
height  :31px;
width : 300px;
`
const BigSubject = styled.h3`

`
const MessageInput = styled.input`
height  :31px;
width : 600px;
`


const ContentWrapper = styled.div`
margin-top :40px;


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


const ButtonWrapper = styled.div`
margin-top :10px;
width : 1100px;
display : flex;
justify-content: center;
`
const DeleteButton = styled.div`
border: 1px solid #D6D6D6;
width : 100px;
height : 30px;
line-height:30px;
text-align:center;
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
margin-top : 15px;
margin-bottom :30px;
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

