import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import SearchParams from "./SearchParams";


const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">Unchained</Link>
      </header>
      <Routes>
        <Route path="/" element={<SearchParams />} />
      </Routes>
    </BrowserRouter>
  );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);

