import React from "react";
import { Row, Col } from "antd";
import Banner from "./component/Banner";
import Recipes from "./component/Recipes";
import IntroductionNutrition from "./component/IntroductionNutrition";
import NutritionVideo from "../../components/NutritionVideo";
import Kitchen from "./component/Kitchen";
import RegisterNow from "../../components/RegisterNow";
const WellNess = () => {
  return (
    <div>
      <Banner />
      <div className="new_container">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <div className="galeryrecipesheading-grh">
              <p>Galery</p>
              <h2>Recipes</h2>
            </div>
          </Col>
        </Row>
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={4} lg={4}>
            <Recipes />
          </Col>
          <Col xs={24} sm={24} md={4} lg={4}>
            <Recipes />
          </Col>
          <Col xs={24} sm={24} md={4} lg={4}>
            <Recipes />
          </Col>
          <Col xs={24} sm={24} md={4} lg={4}>
            <Recipes />
          </Col>
          <Col xs={24} sm={24} md={4} lg={4}>
            <Recipes />
          </Col>
          <Col xs={24} sm={24} md={4} lg={4}>
            <Recipes />
          </Col>
        </Row>
      </div>
      <div className="full_container-bg">
        <IntroductionNutrition />
      </div>
      <div className="new_container">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <div className="galeryrecipesheading-grh">
              <p>Galery</p>
              <h2>Nutrition</h2>
            </div>
          </Col>
        </Row>
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={6} lg={6}>
            <NutritionVideo />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6}>
            <NutritionVideo />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6}>
            <NutritionVideo />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6}>
            <NutritionVideo />
          </Col>
        </Row>
      </div>
      <div className="full_container-bg">
        <Kitchen />
      </div>
      <div>
        <RegisterNow />
      </div>
    </div>
  );
};

export default WellNess;
