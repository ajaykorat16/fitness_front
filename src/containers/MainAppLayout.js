import React from "react";
import { Layout } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import App from "../routes/index";

const MainAppLayout = ({ element }) => {
  return (
    <Layout>
      <Header />
      {element}
      <Footer />
    </Layout>
  );
};

export default MainAppLayout;
