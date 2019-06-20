import React, { useState } from "react";
import WritePresenter from "./WritePresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import useInput from "../../Hooks/useInput";
import {withRouter} from "react-router-dom";
const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const writeQuestion = gql`
  mutation writeQuestion(
    $QuestionType: String,
    $productId: String,
    $username: String,
    $password: String,
    $contents: String
  ){
    writeQuestion(
      QuestionType: $QuestionType,
      productId: $productId,
      username: $username,
      password: $password,
      contents: $contents,
    ){
      id
    }
  }
`;



export default withRouter(({history}) =>  {

  const {
    data: { isLoggedIn }
  } =  useQuery(QUERY);

  const QuestionType= useInput("상품문의");
  const password= useInput("");
  const productId= useInput("");
  const username= useInput("");
  const contents= useInput("");
  
  const writeMutation = useMutation(writeQuestion, {
    variables: {
      QuestionType: QuestionType.value,
      productId: productId.value,
      username: username.value,
      password: password.value,
      contents: contents.value
    }
  });
  const onSubmit = async e =>{
    console.log(QuestionType.value,username.value, password.value,contents.value)
    if(isLoggedIn===false && (username.value ==="" || password.value ==="")){
      alert('작성자와 비밀번호를 입력 해야합니다.')
      return;
    }
    if(QuestionType.value ==="" ||contents.value ==="" ){
      alert("필수항목 누락")
      return;
    }
    try{
      await writeMutation();
      history.push('/board/qna');
    }catch(e){
      console.log(e)
    }
  }
  
    return (
        <WritePresenter
        isLoggedIn={isLoggedIn}
        password={password}
        QuestionType={QuestionType}
        productId={productId}
        username={username}
        contents={contents}
        onSubmit={onSubmit}
        />
      );
    });