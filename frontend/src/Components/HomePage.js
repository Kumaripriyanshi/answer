import React from "react";
import Header from "./Header";
import ShowAllImages from "./ShowAllImages";
import { Box } from "@mui/material";

const HomePage = ({ children }) => {
  return (
    <>
      <Header />
      <ShowAllImages />
    </>
  );
};

export default HomePage;
