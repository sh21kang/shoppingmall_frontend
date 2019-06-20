import React from "react";
import LoginPresener from "./LoginPresener";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import { withRouter } from "react-router-dom";
import useInput from "../../Hooks/useInput";
const LOGIN = gql`
  mutation login($username: String!,$password: String!){
    login(username: $username,password: $password){
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

export default withRouter(({history,location :{search}}) => {
 let returnUrl = search.split("=")[1];
 if(returnUrl===undefined)
     returnUrl ='/';
 const username= useInput("");
 const password= useInput("");

 const login = useMutation(LOGIN, {
  variables: {
    username: username.value,
    password: password.value,
  }
});
const localLogInMutation = useMutation(LOCAL_LOG_IN);
  const onSubmit =async e=>{
    try{
      const {data:{login :{ok , token}}} = await login();
      if(ok===true && token !== null){
          await localLogInMutation({ variables: { token } });
          history.push(returnUrl);
      }else{
          alert('비밀번호가 불일치합니다.')
      }
    }catch(e){
      console.log(e);
    }
  }

    return (
        <LoginPresener
        returnUrl={returnUrl}
        onSubmit={onSubmit}
        username={username}
        password={password}
        />
)});