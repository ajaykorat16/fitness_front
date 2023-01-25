import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";

function RequireAuth() {
  const user = useSelector((state) => state.user);
  const { isAuth } = user;
  let location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default RequireAuth;
