import React from "react";
import { gql } from "apollo-boost";
import styled, { ThemeProvider } from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Routes from "./Routes";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
const QUERY = gql`
  {
    isLoggedIn @client
  }
`;
const Wrapper = styled.div`
  margin: 10px 0 0;
  width: ${window.innerWidth- 220}px;
  /* max-width: ${props => props.theme.maxWidth}; */
  /* width: 100%; */
  float: right;
`;

function App({client}) {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <>
            <Sidebar/>
            <Wrapper>
            <Header isLoggedIn={isLoggedIn}/>
              <Routes isLoggedIn={isLoggedIn} client={client}/>
              <Footer />
            </Wrapper>
          </>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );
}

export default App;
