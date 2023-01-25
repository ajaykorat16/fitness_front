import React, { useState } from "react";

import { Button, Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import black from "../../../img/doc-thumnail.png";
const Recipes = () => {
  return (
    <div className="menuthumnail_mt recipes-wellness-rwr">
      <Row gutter={[0, 0]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="menuthumnail_img">
            <img src={black} alt="" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="menuthumnail-text">
            <span className="livemain-vl">
              <h2>Lorem Ipsum has been the industry's.</h2>
            </span>
            <Row gutter={[5, 5]}>
              <Col xs={12} sm={12} md={12} lg={12}>
                <p className="gluten-free">Gluten-Free</p>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>
                <p className="gluten-free">High-Protein</p>
              </Col>
            </Row>
            <div className="recipeswellness-para-rwr">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="menuthumnail-num-mt">
              <div className="menuthumnail-minutes-mt">
                <h4>35</h4>
                <p>Minutes</p>
              </div>
              <div className="menuthumnail-minutes-mt">
                <h4>650</h4>
                <p>Calories</p>
              </div>
            </div>

            <Row gutter={[5, 5]}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="trofybutton_tc">
                  <Button>
                    View recipe
                    <ArrowRightOutlined />
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Recipes;
