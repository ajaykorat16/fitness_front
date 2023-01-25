import React, { useState } from "react";

import { Button, Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import recipes from "../../../img/recipes.png";
const Kitchen = () => {
  return (
    <div className="introducation-main-inm">
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="galeryrecipesheading-grh">
            <p>RAW</p>
            <h2>Kitchen</h2>
          </div>
          <div className="introducation-test-itv">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas
              semper at integer et. At aliquam tortor lectus commodo ut lectus
              sed fermentum. Cursus in tincidunt cursus maecenas. Praesent
              feugiat dolor ipsum pharetra laoreet vulputate pellentesque sed.
            </p>
            <div className="trofybutton_tc">
              <Button>
                Contact Now
                <ArrowRightOutlined />
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="introducation-video-inv">
            <img src={recipes}></img>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Kitchen;
