import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";



export default new ApolloClient({
  uri: 'https://shoppingmallbackend.herokuapp.com/',


  

  clientState: {
    defaults,
    resolvers
  },

  // uri : 'http://localhost:4000/',
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("token")}`
  // }

  request : async operation =>{
    const token = await localStorage.getItem("token");
    operation.setContext({
      headers: {
          Authorization: token ? `Bearer ${localStorage.getItem("token")}` : ''
        }
    })
  }
});
