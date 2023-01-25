import React from "react";
import { Row, Col } from "antd";
import NutritionCalculator from "../myprofile/component/NutritionCalculator";
import ProfileSidebar from "./component/ProfileSidebar";
import {useLocation} from 'react-router-dom';

const NutritionContainer = () => {
  const location = useLocation();
  const path = location && location.state && location.state.path || "normal"
  return (
    <div>
      <div className="side_container">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={6} lg={6}>
            <ProfileSidebar />
          </Col>
          <Col xs={24} sm={24} md={18} lg={18}>
            <NutritionCalculator path={path} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NutritionContainer;
