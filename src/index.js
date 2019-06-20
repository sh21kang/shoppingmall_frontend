import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import Client from "./Apollo/Client";
import { ApolloProvider } from "react-apollo-hooks";
require('dotenv').config()
ReactDOM.render(<ApolloProvider client={Client}>
    <App />
  </ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

