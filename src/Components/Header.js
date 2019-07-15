import React from "react";
import styled from "styled-components";
import { Link, withRouter,Redirect } from "react-router-dom";
import {  useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import {  Logo } from "./Icons";
const Header = styled.div`
  width: 100%;
  border: 0;
  /* position: fixed; */
  top: 0px;
  left: 0;
  background-color: white;
  margin-bottom : 30px;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 25px;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;
const HeaderColumn = styled.div`
  width: 33%;
  color: #3897f0;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;
const ColumnWrapper = styled.div`

width: 33%;
display: flex;

`;

const ImageWrapper = styled.div`

width: 100%;
display: flex;
justify-content: center;
`;
const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export default withRouter(({ history, isLoggedIn}) => {
  const logOut = useMutation(LOG_OUT);
    return (
      <>
      <Header>
      <HeaderWrapper>
        <ColumnWrapper>
          
          {!isLoggedIn &&
          <HeaderColumn>
                <Link to="/login">
                  Login
                </Link>
          </HeaderColumn>}
          {!isLoggedIn &&
          <HeaderColumn>
              <Link to="/join">
                  Join
              </Link>
          </HeaderColumn>}
          {isLoggedIn &&
          <HeaderColumn onClick={logOut}>
                  Logout
          </HeaderColumn>}
          
          <HeaderColumn>
              <Link to="/cart">
                  Cart
              </Link>
          </HeaderColumn>
          <HeaderColumn>
              <Link to="/order">
                  Order
              </Link>
          </HeaderColumn>
          <HeaderColumn>
              <Link to="/mypage">
                  Mypage
              </Link>
          </HeaderColumn>
        </ColumnWrapper>
        <ColumnWrapper>
        </ColumnWrapper>
        <ColumnWrapper>

          <HeaderColumn>
              <Link to="/board/notice">
                  Notice
              </Link>
          </HeaderColumn>
          <HeaderColumn>
              <Link to="/board/qna">
                  QnA
              </Link>
          </HeaderColumn>
          <HeaderColumn onClick ={()=>window.location.href ="https://www.instagram.com/_dear.rose/"}>
                  <Logo />
          </HeaderColumn>
        </ColumnWrapper>
      </HeaderWrapper>
    </Header>
    {/* <ImageWrapper>
      <Link to="/">
      <SubWrapper>

        <Image src={require("Images/main.png")} alt="상단 로고" title="상단 로고"/>
      </SubWrapper>
      </Link>
    </ImageWrapper> */}
    </>
    );
  });

  const Image = styled.img`
  width: 80%;
  max-width: 800px;
  `
  const SubWrapper = styled.div`
  display: flex;
  justify-content : center;
  width : 100%;

  `