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

const GETORDER_QUERY = gql`
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
const QUERY = gql`
  {
    isLoggedIn @client
  }
`;


let tmpArr = [];
let tmpArr2 = [];


const LoggedInContainer = ({productList,item,setItem,setPrice,price,message,recipientPhone,recipient,name,email,phone,address,info,payment,onPaymentMethod,onPayment}) =>{
  let { data : {seeUser}} = useQuery(SEE_USER);

useEffect(()=>{
    if(seeUser){

      name.setValue(seeUser.name);
      address.setValue(seeUser.address);
      phone.setValue(seeUser.phone);
      email.setValue(seeUser.email);
      recipientPhone.setValue(seeUser.phone);
      recipient.setValue(seeUser.name);
    }
  },[seeUser]);


  const { data:{seeProducts}, loading } = useQuery(See_Products, {
    variables: {
     id:  productList
    }
  });

  

useEffect(()=>{
  console.log(item)
  if(seeProducts !==undefined && seeProducts.length !==0 &&item !== undefined){
    let sum = 0;
    
      const tmp = item.map(ele=>{
        const tmp2  = seeProducts.find(ele2 => ele2.id === ele.productId)
        sum+= ele.count * tmp2.price
        return {
          ...ele,
          files : tmp2.files,
          name : tmp2.name,
          price : tmp2.price,
          shippingFee : tmp2.shippingFee
        }
      })

    const shippingFee = seeProducts[0].shippingFee || 2500
    setItem(tmp)
    setPrice([sum, shippingFee, sum+shippingFee])
  }
},[seeProducts,loading])

  return ( <PaymentPresenter
    data={seeProducts}
    item={item}
    price={price}
    loading ={loading}
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
    />)
}

const LoggedOutContainter = ({productList,item,setItem,setPrice,price,message,recipientPhone,recipient,name,email,phone,address,info,payment,onPaymentMethod,onPayment}) =>{


  const { data:{seeProducts}, loading } = useQuery(See_Products, {
    variables: {
     id:  productList
    }
  });

  

useEffect(()=>{
  console.log(item)
  if(seeProducts !==undefined && seeProducts.length !==0 &&item !== undefined){
    let sum = 0;
    
      const tmp = item.map(ele=>{
        const tmp2  = seeProducts.find(ele2 => ele2.id === ele.productId)
        sum+= ele.count * tmp2.price
        return {
          ...ele,
          files : tmp2.files,
          name : tmp2.name,
          price : tmp2.price,
          shippingFee : tmp2.shippingFee
        }
      })

    const shippingFee = seeProducts[0].shippingFee || 2500
    setItem(tmp)
    setPrice([sum, shippingFee, sum+shippingFee])
  }
},[seeProducts,loading])



return ( <PaymentPresenter
  data={seeProducts}
  item={item}
  price={price}
  loading ={loading}
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
  />)
}


export default withRouter(({ history}) => {
  const {data : {isLoggedIn}} =  useQuery(QUERY);
 
  const addOrderMutation = useMutation(ADD_ORDER);
  const {data:{getOrder}, loading2} =  useQuery(GETORDER_QUERY);
  const [price, setPrice] = useState([]);
  const [item , setItem]  = useState([]);
  const [productList, setProductList] = useState([]);
  

  useEffect(()=>{
    if(getOrder!==undefined){

      const tmp = JSON.parse(getOrder)
      let tmp2 = []
        setItem(tmp)
        console.log(tmp)
        for(let ele of tmp){
          tmpArr.push({id: ele.selectionId})
          tmpArr2.push( ele.cartId);
          tmp2.push(ele.productId)
        }
        
        setProductList(tmp2)
    }

  },[getOrder,loading2])
  
  const message= useInput("");
  const recipientPhone= useInput("");
  const recipient= useInput("");
  const name= useInput("");
  const email= useInput("");
  const phone= useInput("");
  const address= useInput("");
  const info= useInput("");
  const payment= useInput("");
  
  
 const onPayment= async()=>{
   if(payment==="" ||name ===""||phone ===""||address ===""||recipient ===""||recipientPhone ===""){
     alert("필수항목을 채워야 합니다.")
     return;
   }
   const boolSelId = tmpArr[0].id.substring(0,2) !=='id'
   
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
   selectionId:boolSelId? tmpArr : null,
   totalPrice: price[2],
   cartId:boolSelId? tmpArr2 : null,
   wrapper: item.map(ele=>{
     return {
      productId : ele.productId,
      color: ele.color,
      size : ele.size,
      count : ele.count
     }
   })
  
  
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

    return isLoggedIn ? LoggedInContainer({productList,item,setItem,setPrice,price,message,recipientPhone,recipient,name,email,phone,address,info,payment,onPaymentMethod,onPayment}) :
    LoggedOutContainter({productList,item,setItem,setPrice,price,message,recipientPhone,recipient,name,email,phone,address,info,payment,onPaymentMethod,onPayment})
    });