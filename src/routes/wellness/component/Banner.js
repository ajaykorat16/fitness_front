import React, { useState } from "react";

import { Row, Col, Button } from "antd";
import { CheckCircleOutlined, ArrowRightOutlined } from "@ant-design/icons";

import banner from "../../../img/recipesbg.jpg";
const Banner = () => {
  return (
    <div className="banner-wellness">
      <img src={banner}></img>
      <div className="bannertext-wn">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={15} lg={15}>
            <div className="wl-bannertext">
              <h2>SERIOUSLY COLORFUL + TASTY SUMMER SALADS</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Tristique arcu a nisi, semper. Ut cras odio ac sem ac.
              </p>
            </div>
            <div className="bestlistpara-blp">
              <span className="best-list-bl">
                <CheckCircleOutlined className="icon-bl" />
                <p>Best and timely diagnosis</p>
              </span>
              <span className="best-list-bl">
                <CheckCircleOutlined className="icon-bl" />
                <p>Advanced medical equipments</p>
              </span>
              <span className="best-list-bl">
                <CheckCircleOutlined className="icon-bl" />
                <p>Experienced Professionals</p>
              </span>
            </div>
            <div className="trofybutton_tc">
              <Button>
                Register Now
                <ArrowRightOutlined />
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Banner;
