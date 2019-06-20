
import React, { useState,useEffect } from "react";
import WishListPresenter from "./WishListPresenter";
import { useQuery,useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";

const Delete_WishList = gql`
  mutation deleteWishList($wishId: [String], $selectionId: [String]){
    deleteWishList(wishId: $wishId, selectionId: $selectionId)
  }

`
const MoveToCart= gql`
  mutation moveToCart($wishId: [String], $selectionId: [String]){
      moveToCart(wishId: $wishId, selectionId: $selectionId )
  }
`

const See_WishList =gql`

  query seeWishList{
    seeWishList{
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



export default withRouter(({history}) =>  {
  const { data: {seeWishList}, loading } = useQuery(See_WishList);
  
  const [item, setItem] = useState([]);
  const [wishId, setWishId] = useState([]);
  const [selectionId, setSelectionId] = useState([]);
  const deleteWishlistMutation = useMutation(Delete_WishList, {
    variables:{
      wishId,
      selectionId
    }
  });
  const moveToCartMutation = useMutation(MoveToCart, {
    variables:{
      wishId ,
      selectionId
    }
  });
  useEffect(()=>{
    setItem(seeWishList);
  },[seeWishList,loading])

  const onCheckAll = ()=>{
    const x= document.getElementById('all');
    const checkboxes = document.getElementsByName('goo');
    for(let checkbox of checkboxes){
      checkbox.checked = x.checked;
    }
    if(x.checked){
      let tmp = [];
      for(let tp of seeWishList){
        tmp.push(tp.id);
      }
      setWishId(tmp);
    }else{
      setWishId([]);
    }


  }

  const onCheck =(id,sid) =>{
    const x= document.getElementById(id);
    setSelectionId([...selectionId,sid])
    if(x.checked){
      setWishId([...wishId,id]);
      setSelectionId([...selectionId,sid])
    }
    else{
      const tmp = wishId.filter((ele)=>ele!==id);
      const tmp2 = selectionId.filter((ele)=>ele!==sid);
      setWishId([...tmp]);
      setSelectionId([...tmp2]);
    }

  }


  const onDelete= async e =>{
    if(!wishId.length){
      alert('체크박스를 선택하세요.')
      return;
    }
    try{
      deleteWishlistMutation();
      const tmp= item.filter(ele=> {
        for(let id of wishId){
            if(ele.id ===id){
              return false
            }
        }
        return true
      })
      setItem(tmp);
      setWishId([]);

    }catch(e){
      console.log(e);
    }
  }

  const onMove = async e =>{
    if(!wishId.length){
      alert('체크박스를 선택하세요.')
      return;
    }
    try{
      await moveToCartMutation();
      history.push('/cart');
    }catch(e){
      console.log(e);
    }
  }
  console.log(item)
    return (
        <WishListPresenter
        data={item}
        loading={loading}
        onDelete={onDelete}
        onCheck={onCheck}
        onCheckAll={onCheckAll}
        onMove={onMove}
        />
      );
    });