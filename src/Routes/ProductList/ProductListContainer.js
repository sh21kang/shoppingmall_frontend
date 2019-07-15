import React, { useState } from "react";
import ProductListPresenter from "./ProductListPresenter";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { withRouter } from "react-router-dom";


export default withRouter(({ history,location :{search}}) => {
const type = search.split("&&")[0].split('=')[1];
const tmp = search.split("&&")[1].split('=')[1];
const [page, setPage] =useState(1);


const ProductList_Count = gql`
    query ProductListCount($type: String!) {
        ProductListCount(type: $type)
}
`

const see_ProductList =gql`
    query seeProductList($type: String!, $page: Int!) {
        seeProductList(type: $type, page: $page){
        id
        name
        price
        type
        files{
            url
        }
        tags
    }
}
`;
        const { data :{seeProductList}, loading } = useQuery(see_ProductList,{
            variables:{
                type,
                page 
            }
        });
        const { data :{ProductListCount}, loading2 } = useQuery(ProductList_Count,{
            variables:{
                type,
            }
        });
        
    const changeLink = (pag)=>{
        setPage(pag);
        
    }
    
    return (
        <ProductListPresenter
            loading={loading}
            loading2={loading2}
           data={seeProductList}
           count={ProductListCount}
           type={type}
           page={page}
           changeLink={changeLink}
        />
      );
});