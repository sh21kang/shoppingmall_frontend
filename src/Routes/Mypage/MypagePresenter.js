import React from "react";
import styled from "styled-components";
import { Link} from "react-router-dom";
export default ()=> (
    <Wrapper>
        <RowWrapper>
            <Link to={"/order"}>
            <BigButton>Order</BigButton>
            </Link>
            <Link to={"/profile"}>
            <BigButton>Profile</BigButton>
            </Link>
            <Link to={"/wishlist"}>
            <BigButton>Wish List</BigButton>
            </Link>
        </RowWrapper>
        <RowWrapper>
            <BigButton>Mileage</BigButton>
            <BigButton>Coupon</BigButton>
            <BigButton>Board</BigButton>
        </RowWrapper>
    </Wrapper>
);

const RowWrapper = styled.div`
display : flex;
justify-content : center;
`
const Wrapper = styled.div`
    margin-top : 40px;
  display: flex;
  flex-direction: column;
  min-height: 80vh;
`;

const BigButton = styled.div`
background-color: #515151;
color : white;
width : 130px;
height: 80px;
line-height: 80px;
margin : 10px;
text-align : center;

`