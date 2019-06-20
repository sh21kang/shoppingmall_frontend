import React, { useState } from "react";
import OrderPresenter from "./OrderPresenter";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
const seeAllOrder =gql`

  query seeAllOrder{
      seeAllOrder{
        id
        orderNumber
        selections{
          id
          
          color
          size
          count
          product{
              id
              name
              price
              files{
                url
              }
            }
        }
        orderNumber
        totalPrice
        status
        createdAt
        
    }
}`;
const NoticeCount=gql`
  query NoticeCount{
    NoticeCount
  }
`
export default () => {
  
  const { data, loading } = useQuery(seeAllOrder);
  console.log(data);
  
   

    return (
        <OrderPresenter
        loading={loading}
        data = {data.seeAllOrder}
        
        />
      );
    };