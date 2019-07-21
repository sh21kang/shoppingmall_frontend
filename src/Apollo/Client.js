import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env)
export default new ApolloClient({
  uri : process.env.REACT_APP_SERVER_ADDRESS,
  // uri : 'http://localhost:4000/',

  clientState: {
    defaults,
    resolvers
  },
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
