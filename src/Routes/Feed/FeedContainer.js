import React, { useState,useEffect } from "react";
import FeedPresenter from "./FeedPresenter";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";


export default () => {
    
    const [main, setMain] = useState([]);
    const [weekly, setWeekly] = useState([]);
    const [best, setBest] = useState([]);
    const [newP, setNewP] = useState([]);
    const [type, setType] =useState('outer');

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
        const { data :{seeMain}, loading } = useQuery(See_Main);

        useEffect(() => {
            
            if(seeMain !==undefined){

                setMain(seeMain.filter(ele=> ele.tags==='main'));
                setWeekly(seeMain.filter(ele=> ele.tags==='weekly'));
                setBest(seeMain.filter(ele=> ele.tags==='best'&& ele.type===type));
                setNewP(seeMain.filter(ele=> ele.tags==='new'));
            }
        }, [seeMain, loading])
     
     const ChangeBest = (typ) =>{
        setBest(seeMain.filter(ele=> ele.tags==='best'&& ele.type===typ))
        setType(typ)
     }

    

    return (
        <FeedPresenter
            loading={loading}
            main={main}
            weekly={weekly}
            best={best}
            newP={newP}
            ChangeBest={ChangeBest}
            type={type}
        />
      );
};