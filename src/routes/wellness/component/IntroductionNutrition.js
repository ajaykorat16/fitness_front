import React, { useState } from "react";

import { Button, Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
const IntroductionNutrition = () => {
  return (
    <div className="introducation-main-inm">
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="introducation-video-inv">
            <iframe
              src="https://www.youtube.com/embed/W9nZ6u15yis"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="introducation-test-itv">
            <h2>Introduction to Nutrition</h2>
            <p>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book
            </p>
            <div className="trofybutton_tc">
              <Button>
                Read More
                <ArrowRightOutlined />
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default IntroductionNutrition;
