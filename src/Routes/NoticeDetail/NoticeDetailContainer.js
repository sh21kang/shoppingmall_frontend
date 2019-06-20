import React, { useState } from "react";
import NoticeDetailPresenter from "./NoticeDetailPresenter";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { withRouter } from "react-router-dom";
const seeFullNotice =gql`

  query seeFullNotice($id: String!) {
    seeFullNotice(id: $id){
      
      subject
      contents
      createdAt
    }
}
`;

export default withRouter(({ location :{pathname}}) => {
  const id = pathname.split("/")[3];
  const { data, loading } = useQuery(seeFullNotice, {
    variables: {
      id
    }
  });

console.log(data);
    return (
        <NoticeDetailPresenter
        loading={loading} data={data.seeFullNotice}
        />
      );
    });