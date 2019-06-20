import React, { useState,useEffect } from "react";
import CartPresenter from "./CartPresenter";
import { useQuery,useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
const Delete_Cart = gql`
  mutation deleteCart($cartId: [String], $selectionId: [String]){
        deleteCart(cartId: $cartId, selectionId: $selectionId )
  }

`
const LOCAL_ORDER = gql`
  mutation setOrder($order: String) {
    setOrder(order: $order) @client
  }
`;

const getOrderQUERY = gql`
  {
    getOrder @client
  }
`;


const SEE_CART =gql`

  query seeCart{
        seeCart{
          id
          selection{
            id
            color
            size
            count
            product{
              id
              name
              price
              files{
                id
                url
              }
              shippingFee
            }
            
          }
          createdAt
    }
}
`;


  const QUERY = gql`
  {
    isLoggedIn @client
  }
`;


export default withRouter(({history}) =>  {
  
  const localOrderMutation = useMutation(LOCAL_ORDER);
  const [price, setPrice] = useState([]);
  const [item, setItem] = useState([]);
  const {data:{seeCart}, loading} = useQuery(SEE_CART);
  const [cartId, setCartId] = useState([]);
  const [selectionId, setSelectionId] = useState([]);
  const deleteCartMutation = useMutation(Delete_Cart, {
    variables:{
      cartId ,
      selectionId
    }
  });
  
  const payload =  useQuery(QUERY);
  const isLoggedIn = payload.data.isLoggedIn;
  let payload2 =  useQuery(getOrderQUERY);


  

  useEffect(()=>{
    setItem(seeCart);
  },[seeCart,loading])

  useEffect(()=>{
    onCalculrate();
  },[cartId])

  const onCheckAll = ()=>{
    const x= document.getElementById('all');
    const checkboxes = document.getElementsByName('foo');
    for(let checkbox of checkboxes){
      checkbox.checked = x.checked;
    }
    if(x.checked){
      let tmp = [];
      let tmp2 = [];
      for(let tp of seeCart){
        tmp.push(tp.id);
        tmp2.push(tp.selection.id)
      }
      setCartId(tmp);
      setSelectionId(tmp2)
    }else{
      setCartId([]);
      setSelectionId([])
    }


  }

  const onCheck =(id,sid) =>{
    const x= document.getElementById(id);
    
    if(x.checked){
      setCartId([...cartId,id]);
      setSelectionId([...selectionId,sid])
    }
    else{
      const tmp = cartId.filter((ele)=>ele!==id);
      const tmp2 = selectionId.filter((ele)=>ele!==sid);
      setCartId([...tmp]);
      setSelectionId([...tmp2])
    }

  }

  const onDelete= async e =>{
    if(!cartId.length){
      alert('체크박스를 선택하세요.')
      return;
    }
    try{
      deleteCartMutation();
      const tmp= item.filter(ele=> {
        for(let id of cartId){
            if(ele.id ===id){
              return false
            }
        }
        return true
      })
      setItem(tmp);
      setCartId([]);

    }catch(e){
      console.log(e);
    }
  }
  const onOrder = async e =>{
    if(!cartId.length){
      alert('체크박스를 선택하세요.')
      return;
    }
    
    const obj = {};
    for(let ele of item){
      for(let id of cartId){
        if(ele.id ===id){
          obj[ele.selection.product.id]={
            cartId :ele.id,
            selectionId : ele.selection.id,
            productId : ele.selection.product.id,
            color : ele.selection.color,
            count : ele.selection.count,
            size : ele.selection.size
          }
        }
        }
      }
    

    await localOrderMutation({ variables: { order:JSON.stringify(obj) } });
    history.push('/payment');
  }

  const onOrderAll =async e =>{
    const obj = {};
    for(let ele of item){
      obj[ele.selection.product.id]={
            cartId :ele.id,
            selectionId : ele.selection.id,
            productId : ele.selection.product.id,
            color : ele.selection.color,
            count : ele.selection.count,
            size : ele.selection.size
          }
    }
    await localOrderMutation({ variables: { order:JSON.stringify(obj) } });
    history.push('/payment');
  }
  const onCalculrate= ()=>{
    const tmp= item.filter(ele=> {
      for(let id of cartId){
          if(ele.id ===id){
            return true
          }
      }
      return false
    })
    let sum =0;
    let shippingFee=0;
    if(tmp.length>0){

      shippingFee = tmp[0].selection.product.shippingFee || 2500
      
      for(let ele of tmp){
        sum += ele.selection.product.price * ele.selection.count
      }
    }
    // price.appendChild("price");
    setPrice([sum, shippingFee, sum+shippingFee])
    
  }
    return (
        <CartPresenter
        isLoggedIn={isLoggedIn}
        data={item}
        price={price}
        loading={loading}
        onDelete={onDelete}
        onCheck={onCheck}
        onCheckAll={onCheckAll}
        onOrder={onOrder}
        onOrderAll={onOrderAll}
        
        />
      );
    });