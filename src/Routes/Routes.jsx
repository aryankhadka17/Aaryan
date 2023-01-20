import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import DetailCategory from "../Pages/DetailCategory";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/your-feed" element={<DetailCategory />} />
      </Routes>
    </>
  );
};

export default Router;
