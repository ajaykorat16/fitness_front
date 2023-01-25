import React from "react";
import { Row, Col, Input, Button } from "antd";
import annerregibster from "../img/banner-register.jpg";
import { ArrowRightOutlined } from "@ant-design/icons";

const RegisterNow = () => {
  return (
    <div className="register-banner-rbb">
      <div className="registarimg-rbb">
        <img src={annerregibster} alt="" />
      </div>
      <div className="registerbanner-text">
        <Row
          gutter={[10, 10]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="regidterbanner-text-rt">
              <h2>Lorem ipsum dolor sit amet</h2>
              <p>
                It has roots in a piece of classical Latin literature from 45
                BC, making it over 2000 years old.
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="regi-btn-rb">
              <Button>
                Register Now <ArrowRightOutlined />
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RegisterNow;
