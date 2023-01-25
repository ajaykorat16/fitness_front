import React, { useEffect } from "react";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    if (isAuth) {
      return <Navigate to="/dashboard" />;
    } else {
      return <Navigate to="/login" />;
    }
  }, [isAuth]);

  return <Spin />;
};

export default LandingPage;
