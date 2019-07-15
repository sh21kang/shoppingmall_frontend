import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import { Link} from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

const CommonWrapper = styled.div`
margin-top : 50px;
width :100%;
justify-content: center;

`
const Newrapper = styled.div`
width :100%;
display: grid;
grid-template-columns: auto auto auto;

grid-row-gap: 2em;

`

const BigImage = styled.img`
width :340px;
`

const Subject = styled.h2`
width :100%;
text-align :center;
margin: 15px 0px;
margin : 30px;
font-size: 14px;
color: ${props => props.theme.subjectColor};
font-weight : bold;

`

const ItemWrapper = styled.div`
width : 340px;

`

const Price =styled.div`
padding:3px 0 0;
text-align: center;

`
const Name= styled.div`
    text-align: center;
    
    color :${props => props.theme.productNameColor};;

`
const NameWrapper =({name}) =>{
    return <Name>
        <strong>{name}</strong>
    </Name>
}

const NavWrapper = styled.nav`
margin : 30px 0px;
display : flex;

`

const LiStyle = styled.li`
list-style: none;
width :28px;
height :28px;
padding-top : 5px;
border : ${props=> props.truth ? '1px' : '0px'} solid gray;
text-align : center;
`

export default ({ loading, data, type,loading2,count,page,changeLink})=> {
       
    if (loading === true) {
        return(
            <Wrapper>
            <Loader />
          </Wrapper>
        );
    }else if (!loading && data ){
        
        let tmp =[];
        for(let i =1 ; i<= count; i++){
            
            tmp.push(
                <Link  key={'id'+i} to={`/productList?type=${type}&&page=${i}`}>
            <LiStyle
            onClick={()=>changeLink(i)}
             truth={i===page}>{i}</LiStyle>
          </Link>
            )
        }

        return(<Wrapper>
        
        <CommonWrapper>
            <Subject>{type}</Subject>

            <Newrapper>
                {data.map(ele=>
                <ItemWrapper key={ele.id}>
               
                
                {ele.files[0] !== undefined ? 

                    <Link to={`/product/${ele.id}`} >
                        <BigImage  src={ele.files[0].url} alt="new"/>
                    </Link>
                :null}
                    <NameWrapper name={ele.name}/>
                        <Price>{ele.price}원</Price>
                </ItemWrapper>
                )}
            </Newrapper>
        </CommonWrapper>
        
        <NavWrapper> 
        {tmp}

        </NavWrapper>
      
        

    </Wrapper>);

    }
    return null
;
}
