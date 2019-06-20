import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  uri: 'https://shoppingmallbackend.herokuapp.com/',
  clientState: {
    defaults,
    resolvers
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});