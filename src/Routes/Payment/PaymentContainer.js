import React, { useState, useEffect } from "react";
import PaymentPresenter from "./PaymentPresenter";
import { gql } from "apollo-boost";
import { useQuery,useMutation } from "react-apollo-hooks";
import { withRouter } from "react-router-dom";
import useInput from "../../Hooks/useInput";
const See_Products =gql`

  query seeProducts($id: [String]) {
      seeProducts(id: $id){
        id
        name
        price
        type
        files{
            id
            url
        }
        tags
        colors
        sizes
        count
        shippingFee
    }
}
`;

const ADD_ORDER = gql`
  mutation addOrder($userInput:UserInput, $totalPrice:Int, $selectionId:[SelectionId],$wrapper:[Wrapper],$cartId:[String]){
    addOrder(userInput: $userInput, totalPrice: $totalPrice , selectionId: $selectionId,wrapper :$wrapper, cartId: $cartId)
    
  }

`




const QUERY = gql`
  {
    getOrder @client
  }
`;
const SEE_USER =gql`

  query seeUser {
    seeUser{
        name
        address
        phone
        email   
    }
}
`;

// name
// phone
// email
// recipient
// recipientPhone
// address
// message
// info
// payment

let tmpArr =[];
let tmpArr2 =[];
export default withRouter(({ history}) => {
  const { data:{seeUser}, loading2 } = useQuery(SEE_USER);
  const addOrderMutation = useMutation(ADD_ORDER);
  const {data:{getOrder}} =  useQuery(QUERY);
  const [price, setPrice] = useState([]);
  let item =JSON.parse(getOrder)
  
  const message= useInput("");
  const recipientPhone= useInput("");
  const recipient= useInput("");
  const name= useInput("");
  const email= useInput("");
  const phone= useInput("");
  const address= useInput("");
  const info= useInput("");
  const payment= useInput("");
  
  useEffect(()=>{
    for(let ele in item){
      tmpArr.push({id:item[ele].selectionId});
      tmpArr2.push(item[ele].cartId);
    }
  },[getOrder])

  useEffect(()=>{
    if(seeUser){

      name.setValue(seeUser.name);
      address.setValue(seeUser.address);
      phone.setValue(seeUser.phone);
      email.setValue(seeUser.email);
      recipientPhone.setValue(seeUser.phone);
      recipient.setValue(seeUser.name);
    }
  },[seeUser,loading2]);

  let tmp =[];
  for(let tp in item){
    tmp.push(tp);
  }
  const { data, loading } = useQuery(See_Products, {
    variables: {
     id:tmp
    }
  });

useEffect(()=>{
  
  if(data.seeProducts !==undefined){
    let sum = 0;

    for(let ele of data.seeProducts ){
      // console.log(ele.id)
      sum += item[ele.id].count * ele.price
  
    }
    const shippingFee = data.seeProducts[0].shippingFee || 2500
  
    setPrice([sum, shippingFee, sum+shippingFee])
  }
},[data.seeProducts,loading])

 const onPayment= async()=>{
   if(payment==="" ||name ===""||phone ===""||address ===""||recipient ===""||recipientPhone ===""){
     alert("필수항목을 채워야 합니다.")
     return;
   }

   await addOrderMutation({ variables: {userInput:{
    message: message.value,
    recipientPhone:recipientPhone.value,
    recipient:recipient.value,
    name:name.value,
    email:email.value,
    phone:phone.value,
    address:address.value,
    info:info.value,
    payment:payment.value
   } , 
   selectionId:tmpArr,
   totalPrice:price[2],
   cartId:tmpArr2
     } });
     tmpArr=[];
     tmpArr2=[];
     await localStorage.removeItem("order");
     history.push('/order');
  
 }
 const onPaymentMethod = (e) =>{
  const {target : {value}} =e
  payment.setValue(value);
 }
  
    return (
     
      <PaymentPresenter
      data={data.seeProducts}
      loading={loading}
      loading2={loading2}
      item={item}
      price={price}
      user={seeUser}
      message={message}
      recipientPhone={recipientPhone}
      recipient={recipient}
      name={name}
      email={email}
      phone={phone}
      address={address}
      info={info}
      payment={payment}
      onPaymentMethod={onPaymentMethod}
      onPayment={onPayment}
      />
       
      
      );
    });