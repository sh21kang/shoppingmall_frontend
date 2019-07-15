import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import { Link} from "react-router-dom";


export default ({loading , data, onCheck, item,total, DeleteItem,onCount,AddToCart,
    BuyNow,
    AddToWishList})=> {
    if (loading === true) {
        return(
            <Wrapper>
            <Loader />
          </Wrapper>
        );
    }else if (!loading && data ){
       
    return (

    <OutWrapper>
        <DetailArea>
            <ProductMain src={data.files[0].url} alt="main"/>

            <InfoArea>
                <SubjectHeader>{data.name}</SubjectHeader>
                <ItemWrapper>
                    <ListDiv> <ListSubject> 판매가</ListSubject>  <ListValue> {data.price}원</ListValue></ListDiv>
                    <ListDiv> <ListSubject> 배송비</ListSubject>  <ListValue> {data.shippingFee || 3000}원</ListValue></ListDiv>
                    {
                        data.colors.length>0 ? <ListDiv>
                            <ListSubject> 색상</ListSubject>
                            <SelectStyle id="color" onChange={onCheck}>
                            <option value="">[필수] 옵션을 선택해 주세요</option>
                            {data.colors.map(ele=><option value={ele} key={ele}>{ele}</option>)}

                            </SelectStyle >
                            </ListDiv> :null
                    }
                    {
                        data.sizes.length>0 ? <ListDiv>
                            <ListSubject> 사이즈</ListSubject>
                            <SelectStyle id="size" onChange={onCheck}> 
                            <option value="">[필수] 옵션을 선택해 주세요</option>
                            {data.sizes.map(ele=><option value={ele} key={ele}>{ele}</option>)}

                            </SelectStyle>
                            
                            </ListDiv> :null
                    }
                </ItemWrapper>
                {item.length >0 ? 
                   <>{
                       item.map((ele,i)=>
                       <ItemBottom key={i}>
                       <ItemWrapper2 >

                      
                            <TextBox>
                            {ele.color}/{ele.size}
                            </TextBox>
                                

                      <CountInput type="number"  onChange={(e)=>onCount(e,i)} value={ele.count} min="1"></CountInput>
                      
                      <DeleteButton 
                      onClick={()=>DeleteItem(i)}
                      src="http://img.echosting.cafe24.com/design/skin/default/product/btn_price_delete.gif" alt="삭제"></DeleteButton>
                      <TextBox>{data.price*ele.count}원</TextBox>
                       </ItemWrapper2>
                       </ItemBottom>
                       )}</>

                   : null}

                <ItemBottom>
                    <Total>{`Total : ${total}원`}  </Total>
                </ItemBottom>


                    <ButtonWrapper>
                        <Button onClick={BuyNow}><span>BUY NOW</span></Button>
                        <Button onClick={AddToCart}>ADD TO CART</Button>
                        <Button onClick={AddToWishList}>WISH LIST</Button>
                    </ButtonWrapper>


            </InfoArea>
        </DetailArea>



    <ContentWrapper>
        {data.files.map(ele=>
        <ImageWrapper key={ele.id}>

        <ContentImage src={ele.url} >

        </ContentImage>
        </ImageWrapper>
        )}
    </ContentWrapper>

    </OutWrapper>
    )
    
    
    }
};


const TextBox = styled.div`
min-width: 70px;
font-weight :bold;
`

const CountInput = styled.input`
margin-left : 60px;
text-align : center;
`

const DeleteButton = styled.img`
margin-left : 40px;
margin-right : 60px;
background-color: black;
width :20px;

`

const ImageWrapper = styled.div`
display: flex;
justify-content: center;
`

const ContentImage = styled.img`

`



const Button = styled.div`
background-color : ${props => props.theme.buttonColor};
width :33%;
height :48px;
line-height: 48px;
margin-left :5px;
font-size: 10px;
text-align: center;
border-radius: 2px;
letter-spacing: 3px;


`
const ButtonWrapper = styled.div`
margin-top :100px;
display : flex;
`

const SelectStyle = styled.select`
margin-left : 100px;
`

const ListSubject = styled.div`
vertical-align: middle;
font-weight: bold;
width :37px;
`

const ListValue = styled.strong`
vertical-align: middle;
margin-left : 100px;
color: ${props => props.theme.listValue};
font-family: arial;
font-size: 12px;
`

const ListDiv = styled.div`
height :40px;
display :flex;

`

const SubjectHeader =  styled.h2`
color: ${props => props.theme.productNameColor};
vertical-align: middle;
font-size: 20px;
margin-bottom : 20px;
`

const ItemWrapper =styled.div`
padding : 20px;
border-top: ${props => props.theme.boaderStyle};
border-bottom: ${props => props.theme.boaderStyle};

`

const ItemBottom =styled.div`
padding : 20px;

border-bottom: ${props => props.theme.boaderStyle};

`


const ProductMain = styled.img`

height :390px;

`

const OutWrapper = styled.div`

`

const DetailArea = styled.div`
display : flex;
margin :30px;
left :30px;
margin-bottom : 100px;
`

const InfoArea = styled.div`
width: 450px;
margin-left : 100px;

`

const ContentWrapper = styled.div`

`
const Wrapper = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

const ItemWrapper2 =styled.div`
display :flex;
`

const Total = styled.div`

display :flex;
font-weight : bold;
`