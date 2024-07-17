import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from "./Components/SignIn";
import Register from "./Components/Register";
import Header from "./Components/Header";
import HomePage from "./Components/HomePage";
import ListPage from "./Components/ListPage";
import ListContentPage from "./Components/ListContentPage";
// import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<SignIn />}></Route>
          <Route path="/register" exact element={<Register />}></Route>
          <Route path="/header" exact element={<HomePage />}></Route>
          <Route path="/listpage" exact element={<ListPage />}></Route>
          <Route
            path="/listPage/:listId"
            exact
            element={<ListContentPage />}
          ></Route>

          {/* <Route path="/reset-password" exact element={<ForgotPassword />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
