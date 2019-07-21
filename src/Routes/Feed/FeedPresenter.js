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

const MainWrapper = styled.div`
width :100%;
display :flex;
justify-content: center;

`

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
const BestWrapper = styled.div`
width :100%;
display :grid;
grid-template-columns: auto auto auto;
grid-row-gap: 2em;

`
const WeeklyWrapper = styled.div`
display:flex;
justify-content: space-between;
width :100%;
padding : 10px;
`

const WeeklyImage = styled.img`
width :170px;
`

const BigImage = styled.img`
width :340px;
`
const MainImage = styled.img`

`
const Subject = styled.h2`
width :100%;
text-align :center;
margin: 15px 0;
font-size: 12px;
color: ${props => props.theme.subjectColor};

`

const BestMenu = styled.div`
height: 49px;
margin: 0 0 35px;
display: flex;
justify-content: center;
`

const SmallDiv = styled.div`
width:25%;
text-align : center;
vertical-align: middle;
line-height: 49px;
font-weight :${props => props.truth ? 'bold' : 'normal'};
`

const WeeklyItemWrapper= styled.div`
width :170px;
`

const ItemWrapper = styled.div`

width :340px;
`

const Price =styled.div`
padding:3px 0 0;
text-align: center;

`
const Name= styled.div`
    text-align: center;
    margin : 4px 0 0;
    color :${props => props.theme.productNameColor};;

`
const NameWrapper =({name}) =>{
    return <Name>
        <strong>{name}</strong>
    </Name>
}



export default ({ loading, main,weekly,best,newP,ChangeBest,type})=> {
        
    if (loading === true) {
        return(
            <Wrapper>
            <Loader />
          </Wrapper>
        );
    }else if (!loading && main &&weekly){
        return(<Wrapper>
        <Helmet>
            <title>Dear Rose</title>
        </Helmet>
        <CommonWrapper>
            <MainWrapper>
                {main[0] !==undefined ?
                <Link to={`/product/${main[0].id}`} >
                    <MainImage src={main[0].files[0].url} alt="main"/>
                </Link>
                    : null}
            </MainWrapper>
        </CommonWrapper>
        <CommonWrapper>
            <Subject>WEEKLY BEST</Subject>
            <WeeklyWrapper>
            {weekly.map(ele=>
            <WeeklyItemWrapper key={ele.id}>

            
            <Link to={`/product/${ele.id}`} >
            <WeeklyImage  src={ele.files[0].url} alt="weekly"/>
            </Link>
            <NameWrapper name={ele.name}/>
                        <Price>{ele.price}원</Price>
            </WeeklyItemWrapper>
            )}
            </WeeklyWrapper>
            
        </CommonWrapper>
        <CommonWrapper>
            <Subject>NEW ITEMS</Subject>

            <Newrapper>
                {newP.map(ele=>
                <ItemWrapper key={ele.id}>
                    <Link to={`/product/${ele.id}`} >
                        <BigImage  src={ele.files[0].url} alt="new"/>
                    </Link>
                    <NameWrapper name={ele.name}/>
                        <Price>{ele.price}원</Price>
                </ItemWrapper>
                )}
            </Newrapper>
        </CommonWrapper>

        <CommonWrapper>
            <Subject>BEST ITEMS</Subject>
                <BestMenu>
                    <SmallDiv truth={type==='outer'}><span onClick={()=>ChangeBest('outer')} value='outer'>OUTER</span></SmallDiv>
                    <SmallDiv truth={type==='top'}><span onClick={()=>ChangeBest('top')} value='top'>TOP</span></SmallDiv>
                    <SmallDiv truth={type==='bottom'}><span onClick={()=>ChangeBest('bottom')} value='bottom'>BOTTOM</span></SmallDiv>
                    <SmallDiv truth={type==='dress'}><span onClick={()=>ChangeBest('dress')} value='dress'>DRESS</span></SmallDiv>
                </BestMenu>
                <BestWrapper>
                    {best.map(ele=>
                        <ItemWrapper key={ele.id}>

                        <Link to={`/product/${ele.id}`} >
                        <BigImage  src={ele.files[0].url} alt="best"/>
                        </Link>
                        <NameWrapper name={ele.name}/>
                        <Price>{ele.price}원</Price>
                        </ItemWrapper>
                        )}
                </BestWrapper>

        </CommonWrapper>
   

    </Wrapper>);

    }
    return null
;
}
