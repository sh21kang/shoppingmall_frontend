import React, {useEffect} from "react";
import ProfilePresenter from "./ProfilePresenter";
import { gql } from "apollo-boost";
import { useQuery,useMutation } from "react-apollo-hooks";
import {withRouter} from "react-router-dom";
import useInput from "../../Hooks/useInput";
const seeUser =gql`

  query seeUser {
    seeUser{
        id
        name
        username
        password
        address
        phone
        email   
    }
}
`;

const editUser = gql`
  mutation editUser(
    $password: String!,
    $email: String!,
    $name: String!,
    $phone: String,
    $address: String
  ){
    editUser(
      password: $password,
      email: $email,
      name: $name,
      phone: $phone,
      address: $address,
    ){
      id
    }
  }
`;



let flag =1;

export default  withRouter(({history}) =>  {
  const { data, loading } = useQuery(seeUser);
  
  
    const password= useInput(data.password);
    const name= useInput(data.name);
    const email= useInput(data.email);
    const phone= useInput(data.phone);
    const address= useInput(data.address);
    const editUserMutation = useMutation(editUser, {
      variables: {
        password: password.value,
        name: name.value,
        email: email.value,
        phone: phone.value,
        address: address.value
      }
    });
    
    useEffect(()=>{
      flag =1;
    })
  const onSubmit = async e => {
    
    if(password.value ==="" ||name.value ==="" ||email.value ==="" ){
      console.log("필수항목 누락")
      return;
    }
    try{
      await editUserMutation();
      history.push('/mypage');
    }catch(e){
      console.log(e)
    }
  };

  const onCancle = ()=>{
    history.push('/mypage');
  
  }
  
  if(!loading && data.seeUser.password!==undefined && flag ===1){
    password.setValue(data.seeUser.password);
    name.setValue(data.seeUser.name)
    email.setValue(data.seeUser.email)
    phone.setValue(data.seeUser.phone)
    address.setValue(data.seeUser.address)
    flag=0;
  }

    return (
        <ProfilePresenter
        loading={loading}
        data = {data.seeUser}
        onSubmit={onSubmit}
        onCancle={onCancle}
        password={password}
        name={name}
        email={email}
        phone={phone}
        address={address}
        />
      );
  });
  