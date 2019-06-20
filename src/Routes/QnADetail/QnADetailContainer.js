import React, { useState } from "react";
import QnADetailPresenter from "./QnADetailPresenter";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { withRouter } from "react-router-dom";
import Popup from "../../Components/Popup"
import useInput from "../../Hooks/useInput";
const seeFullQuestion =gql`

  query seeFullQuestion($id: String!, $password: String!) {
    seeFullQuestion(id: $id,password: $password){
      
      QuestionType
      username
      contents
      createdAt
      answer{
        contents
        createdAt
      }
      product{
        id
        name  
      }
    }
}
`;



const Middle = ({id, password, validate})=>{
  var {data, loading} = useQuery(seeFullQuestion,{
    variables: {
      id,
      password
    }
  });
  if(data.seeFullQuestion ===null){
    validate.setValue(false);
    alert('비밀번호가 틀립니다.')
  }
  
  return(
    <QnADetailPresenter
        data={data.seeFullQuestion} loading={loading}/>
  )
}



export default withRouter(({ location :{pathname}}) => {
  const id = pathname.split("/")[3];
  // const password="mciahels"
  const password= useInput("");
  const validate= useInput(false);
  
  
  const onSubmit= async e=>{
    if(e.key ==="Enter"){
      validate.setValue(true);
    }
  }
  
    return (<>
      {validate.value===true? 
        <Middle
        id={id} password={password.value} validate={validate}
        />  :<Popup password={password} onSubmit={onSubmit}/>
      }
      </>
      );
    });