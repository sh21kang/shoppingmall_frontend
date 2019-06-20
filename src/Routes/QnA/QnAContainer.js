import React, { useState } from "react";
import QnAPresenter from "./QnAPresenter";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
const seeAllQuestion =gql`

  query seeAllQuestion($page: Int!) {
    seeAllQuestion(page: $page){
        id
        QuestionType
        username
        createdAt
        answer{
          id
        }
    }
}
`;
const QuestionCount=gql`
  query QuestionCount{
    QuestionCount
  }
`
export default () => {
  const page = 1;
  const { data, loading } = useQuery(seeAllQuestion,{variables: {
    page
  }});
  const  payload = useQuery(QuestionCount);
    console.log(data);

    return (
        <QnAPresenter
        loading={loading}
        data = {data.seeAllQuestion}
        count= {payload.data.QuestionCount}
        />
      );
    };