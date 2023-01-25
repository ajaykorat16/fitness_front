import React from "react";
import { Row, Col } from "antd";
import NutritionRight from "./component/NutritionRight";
import RecipeFilter from "../../components/RecipeFilter";
const Nutrition = () => {
  return (
    <div>
      <div className="new_container">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={6} lg={6}>
            <RecipeFilter />
          </Col>
          <Col xs={24} sm={24} md={18} lg={18}>
            <div className="livesessions-f">
              <h2>Live Sessions</h2>
            </div>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={8} lg={8}>
                <NutritionRight />
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <NutritionRight />
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <NutritionRight />
              </Col>
            </Row>
            <div className="livesessions-f">
              <h2>Video galery</h2>
            </div>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={8} lg={8}>
                <NutritionRight />
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <NutritionRight />
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <NutritionRight />
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <NutritionRight />
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <NutritionRight />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Nutrition;
