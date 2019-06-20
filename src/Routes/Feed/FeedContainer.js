import React, { useState } from "react";
import FeedPresenter from "./FeedPresenter";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
export default () => {

const See_Main =gql`
{
        seeMain{
        id
        name
        price
        type
        files{
            url
        }
        tags
}
}`;
        const { data, loading } = useQuery(See_Main);
        if(data.seeMain !==undefined){
            var main = data.seeMain.filter(ele=> ele.tags==='main');
            var weekly = data.seeMain.filter(ele=> ele.tags==='weekly');
            var best = data.seeMain.filter(ele=> ele.tags==='best');
            var newP = data.seeMain.filter(ele=> ele.tags==='new');
        }
    return (
        <FeedPresenter
            loading={loading}
            main={main}
            weekly={weekly}
            best={best}
            newP={newP}
        />
      );
};