import React from "react";
import "./App.css";
import logo from "./assets/logo.svg";
import styled from "styled-components";
import Airlines from "./Airlines";

function App() {
  return (
    <div className="app">
      <Header className="app-header">
        <Img src={logo} alt="logo" />
      </Header>
      <Airlines />
    </div>
  );
}

export default App;

const Header = styled.div`
  height: 54px;
  width: 100%;
`;

const Img = styled.img`
  margin-left: 16px;
  margin-top: 19px;
`;
