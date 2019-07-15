import React from "react";
import styled from "styled-components";
export default () => {
   
    return (
      <Wrapper><SmallWrapper>

        <Footer2 src={require("Images/footer2.png")} alt="footer"/>
      </SmallWrapper>
        <SmallWrapper>

        <Footer1 src={require("Images/footer.png")} alt="footer"/>
        </SmallWrapper>
      </Wrapper>
    );
  };


  const Wrapper =styled.div`
  margin-top :130px;
  width : 100%;
  display : flex;
  flex-direction : column;
  justify-content :center;
  
  `
  const Footer1 =styled.img`
  width : 100%;
  max-width: 500px;
  max-height : 500px;
  `

const Footer2 =styled.img`
width: 800px;



`

const SmallWrapper = styled.div`
display : flex;
  justify-content :center;
`