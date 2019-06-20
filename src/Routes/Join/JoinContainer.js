import React, { useState } from "react";
import JoinPresenter from "./JoinPresenter";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!,
    $password: String!,
    $email: String!,
    $name: String!,
    $phone: String,
    $address: String
  ){
    createAccount(
      username: $username,
      password: $password,
      email: $email,
      name: $name,
      phone: $phone,
      address: $address,
    ){
      ok
      error
      token
    }
  }
`;

const LOCAL_LOG_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;


export default () => {
  const username= useInput("");
  const password= useInput("");
  const repassword= useInput("");
  const name= useInput("");
  const email= useInput("");
  const phone= useInput("");
  const address= useInput("");
  const createAccountMutation = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: username.value,
      password: password.value,
      name: name.value,
      email: email.value,
      phone: phone.value,
      address: address.value
    }
  });

  const localLogInMutation = useMutation(LOCAL_LOG_IN);
  const onSubmit = async e => {
    
    if(password.value !==repassword.value){
      console.log('비밀번호 불일치')
      return;
    }
    if(username.value ==="" || password.value ==="" ||repassword.value ===""||name.value ==="" ||email.value ==="" ){
      console.log("필수항목 누락")
      return;
    }
    
    try{
      const {  data: { createAccount: {token , ok }} }=  await createAccountMutation();
      if(ok===true &&token !== null){

        localLogInMutation({ variables: { token } });
      }else{
        alert('동일한 아이디가 존재합니다.');
      }
    }catch(e){
      console.log(e)
    }

  };


    return (
        <JoinPresenter
        onSubmit={onSubmit}
        username={username}
        password={password}
        repassword={repassword}
        name={name}
        email={email}
        phone={phone}
        address={address}

        />
      );
    };