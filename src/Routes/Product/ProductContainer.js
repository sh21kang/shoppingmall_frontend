import React, { useState,useEffect } from "react";
import ProductPresenter from "./ProductPresenter";
import { gql } from "apollo-boost";
import { useQuery,useMutation } from "react-apollo-hooks";
import { withRouter } from "react-router-dom";
const LOCAL_ORDER = gql`
  mutation setOrder($order: String) {
    setOrder(order: $order) @client
  }
`;
const LOCAL_CART = gql`
  mutation setCart($cart: String) {
    setCart(cart: $cart) @client
  }
`;


const QUERY = gql`
  {
    isLoggedIn @client
  }
`;


const ADD_TO_CART=gql`
  
  mutation addCart($wrapper: [Wrapper]){
    addCart(wrapper: $wrapper)
  }
`

const ADD_TO_WISHLIST=gql`
    
  mutation addWishList($wrapper: [Wrapper]){
    addWishList(wrapper: $wrapper)
  }
`

const See_Product =gql`

  query seeProduct($id: String!) {
        seeProduct(id: $id){
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


export default withRouter(({ history,location :{pathname}}) => {
  const localOrderMutation = useMutation(LOCAL_ORDER);
  const localCartMutation = useMutation(LOCAL_CART);
  const id = pathname.split("/")[2];
  const [item, setItem] = useState([]);
  const [check , setCheck] = useState(["",""]);
  const [total, setTotal] = useState(0);
  const payload =  useQuery(QUERY);
  const isLoggedIn = payload.data.isLoggedIn;
  
  const addCartMutation = useMutation(ADD_TO_CART, {
    variables:{
      wrapper: item
    }
  });
  const addWishListMutation = useMutation(ADD_TO_WISHLIST, {
    variables:{
      wrapper: item
    }
  });
  const { data:{seeProduct}, loading } = useQuery(See_Product, {
    variables: {
      id
    }
  });
  
  const onCheck = (e) =>{
    const color = document.getElementById("color").value;
    const size = document.getElementById("size").value;
    if(color!==check[0]){
      document.getElementById("size").value= ""
    }
    
    if(size!=="" && color!=="" && size!==check[1]){
      let flag =1;
      
      for(let ele of item){
        if((ele.color ===color && ele.size ===size)){
          alert('이미 선택되어있는 옵션입니다.')
          flag=0;
        }
      }
    
      if(flag===1){
        setItem([...item,{
          productId : seeProduct.id,
          color,
          size,
          count:1
        }])
      }
    }
    setCheck([color,size])
  }

    useEffect(()=>{
      if(seeProduct!==undefined){

        let tmp =0 ;
        for(let ele of item){
          tmp = tmp+ parseInt(ele.count);
        }
        setTotal(
          tmp*seeProduct.price
        )
      }
    },[item])
  

  const BuyNow = async ()=>{
    const tmp = item.map((ele,i)=>{
      return {
        ...ele,
        cartId : 'id'+i,
        selectionId : 'id'+i,
      }
    })

    await localOrderMutation({ variables: { order:JSON.stringify(tmp) } });
    history.push('/payment');
  }


  const AddToCart = async ()=>{
    if(item.length===0){
      alert('필수 옵션을 선택해야 합니다.')
      return;
    }
    await  localCartMutation({ variables: { cart:JSON.stringify(item) } });
    if(!isLoggedIn){
      console.log(item)
      history.push('/cart');
      return;
    }
    await addCartMutation();
    history.push('/cart');
  }


  const AddToWishList = async ()=>{
    if(!isLoggedIn){
      alert('로그인해야 이용할 수 있는 서비스입니다.')
      return;
    }
    if(item.length===0){
      alert('필수 옵션을 선택해야 합니다.')
      return;
    }

    await addWishListMutation();
    alert("상품을 찜목록에 담았습니다.")
  }
  const onCount = (e, idx) =>{
    const{
      target :{value}
    } = e;
    item[idx].count = parseInt(value)
    setItem([
      ...item
    ])
  }

  const DeleteItem = (idx) =>{
    const tmp = item.filter((_,i)=> i!==idx);
    setItem(tmp);
  }
  
    return (
        <ProductPresenter
        loading={loading} 
        data={seeProduct}
        onCheck={onCheck}
        item={item}
        total={total}
        DeleteItem={DeleteItem}
        onCount={onCount}
        AddToCart={AddToCart}
        BuyNow={BuyNow}
        AddToWishList={AddToWishList}
        />
      );
    });