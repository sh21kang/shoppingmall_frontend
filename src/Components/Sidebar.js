import React from "react";
import styled from "styled-components";
import { Link, withRouter,Redirect } from "react-router-dom";


export default withRouter(({ history, isLoggedIn}) => {
  
    return (
      <SideWrapper>
          <Link to="/">
            <SubWrapper>
                <Image src={require("Images/main.png")} alt="상단 로고" title="상단 로고"/>
            </SubWrapper>
          </Link>
          <Link to="/productList?type=outer&&page=1">
          <RowWrapper>OUTER</RowWrapper>
          </Link>
          <Link to="/productList?type=top&&page=1">
          <RowWrapper>TOP</RowWrapper>
          </Link>
          <Link to="/productList?type=bottom&&page=1">
          <RowWrapper>BOTTOM</RowWrapper>
          </Link>
          <Link to="/productList?type=dress&&page=1">
          <RowWrapper>DRESS</RowWrapper>
          </Link>
    </SideWrapper>
    );
  });

  const SideWrapper = styled.div`
  position : fixed;
  z-index: 8;
  width :200px;
  border-right : solid 1px;
  height : 100%;
  top :0;
  `
  const RowWrapper = styled.div`
    height : 30px;
    text-align : center;
  `
  const Image = styled.img`
  width: 80%;
  max-width: 800px;
  `
  const SubWrapper = styled.div`
  display: flex;
  justify-content : center;
  width : 100%;
  margin-top :70px;

  `