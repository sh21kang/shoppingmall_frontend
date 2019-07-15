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

const getCartQUERY = gql`
  {
    getCart @client
  }
`;

const SEE_PRODUCTS = gql`
  query seeProducts($id: [String]){
      seeProducts(id: $id){
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
`


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

 function  LoggedInContainter ({cartId,setCartId,selectionId,setSelectionId,price, item,setItem,isLoggedIn,onCheck,onCheckAll,onOrder,onOrderAll}){
  
  const {data:{seeCart}, loading} = useQuery(SEE_CART);
  
  const deleteCartMutation = useMutation(Delete_Cart, {
    variables:{
      cartId ,
      selectionId
    }
  });
  useEffect(()=>{
    if(seeCart!==undefined && seeCart.length !==0){
      setItem(seeCart);
    }
  },[seeCart,loading])
  
  

  const onDelete= async e =>{
    console.log(cartId)
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
      setSelectionId([]);
    }catch(e){
      console.log(e);
    }
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

} 

function  LoggedOutContainter ({cartId,setCartId,price,item,setItem,isLoggedIn,onCheck,onCheckAll,onOrder,onOrderAll}){
  
  
  let payload = JSON.parse(localStorage.getItem("cart"));
  const {data:{seeProducts},loading} = useQuery(SEE_PRODUCTS,{
    variables :{
      id : payload !==null && payload !==undefined ?  payload.map(ele=>ele.productId) : null
    },
  });
  useEffect(()=>{
    if(seeProducts!==undefined && seeProducts.length !==0){
      const tmp = payload.map((ele, i)=>{
        return {
          id: 'id'+i,
          selection :{
            id : 'id'+i,
            color  : ele.color,
            size : ele.size,
            count : ele.count,
            product : seeProducts.find(ele2=>ele2.id === ele.productId )
          }
        }
      })
      setItem(tmp);
    }
  },[seeProducts,loading])
  
  
  const onDelete= async e =>{
    console.log(cartId)
    if(!cartId.length){
      alert('체크박스를 선택하세요.')
      return;
    }
    try{
      
      
      const tmp= item.filter(ele=> {
        for(let id of cartId){
            if(ele.id ===id){
              return false
            }
        }
        return true
      })
      console.log(tmp)
      const arr = tmp.map((ele)=>{
        return {
          productId : ele.selection.product.id,
          count : ele.selection.count,
          size : ele.selection.size,
          color : ele.selection.size
        }
      });
      
      if(arr.length !==0 ){
        localStorage.setItem('cart',JSON.stringify(arr))
      }else{
        localStorage.removeItem('cart');
      }
      setItem(tmp);
      setCartId([]);

    }catch(e){
      console.log(e);
    }
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


}


export default withRouter(({history}) =>  {
  
  const localOrderMutation = useMutation(LOCAL_ORDER);
  
  const [item, setItem] = useState([]); // 상품 자체
  const [price, setPrice] = useState([]); // 체크한 상품들의 가격 정보
  const [cartId, setCartId] = useState([]); // 체크한 상품 id
  const [selectionId, setSelectionId] = useState([]); // 체크한 상품들의 selection id (삭제 및 order로 이동할 때 이용)
  const {data : {isLoggedIn}} =  useQuery(QUERY);

  useEffect(()=>{
    onCalculate();
  },[cartId])

  const onCalculate= ()=>{
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


  const onCheckAll = ()=>{
    const x= document.getElementById('all');
    const checkboxes = document.getElementsByName('foo');
    for(let checkbox of checkboxes){
      checkbox.checked = x.checked;
    }
    if(x.checked){
      let tmp = [];
      let tmp2 = [];
      for(let tp of item){
        tmp.push(tp.id);
        if(tp.selection)
          tmp2.push(tp.selection.id);
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
    console.log(id, x,cartId)
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

  

  const onOrder = async e =>{
    if(!cartId.length){
      alert('체크박스를 선택하세요.')
      return;
    }
    
    
    const arr = cartId.map((ele)=>{
      const tmp  = item.find(ele2=> ele2.id === ele);
      
      return{
        cartId :tmp.id,
        selectionId : tmp.selection.id,
        productId : tmp.selection.product.id,
        color : tmp.selection.color,
        count : tmp.selection.count,
        size : tmp.selection.size
      }
    })
    localStorage.removeItem('cart');
    await localOrderMutation({ variables: { order:JSON.stringify(arr) } });
    history.push('/payment');
  }

  const onOrderAll =async e =>{
    const arr = item.map((ele)=>{
      
      
      return{
        cartId :ele.id,
        selectionId : ele.selection.id,
        productId : ele.selection.product.id,
        color : ele.selection.color,
        count : ele.selection.count,
        size : ele.selection.size
      }
    })
    localStorage.removeItem('cart');
    await localOrderMutation({ variables: { order:JSON.stringify(arr) } });
    history.push('/payment');
  }
  
  return isLoggedIn ?
LoggedInContainter({cartId,setCartId,selectionId,setSelectionId,price, item,setItem,isLoggedIn,onCheck,onCheckAll,onOrder,onOrderAll}):
LoggedOutContainter({cartId,setCartId,price,item,setItem,isLoggedIn,onCheck,onCheckAll,onOrder,onOrderAll});
    });