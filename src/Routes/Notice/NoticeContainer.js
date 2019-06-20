import React, { useState } from "react";
import NoticePresenter from "./NoticePresenter";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
const seeAllNotice =gql`

  query seeAllNotice($page: Int!) {
        seeAllNotice(page: $page){
        id
        subject
        createdAt
        
    }
}
`;
const NoticeCount=gql`
  query NoticeCount{
    NoticeCount
  }
`
export default () => {
  const page = 1;
  const { data, loading } = useQuery(seeAllNotice,{variables: {
    page
  }});
  const  payload = useQuery(NoticeCount);
  
   

    return (
        <NoticePresenter
        loading={loading}
        data = {data.seeAllNotice}
        count ={payload.data.NoticeCount}
        />
      );
    };