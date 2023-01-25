import React from "react";
import { Row, Col } from "antd";

import LeftDashboard from "../../components/LeftDashboard";
import ShoppingRight from "./component/ShoppingRight";
import RightDashboard from "../../components/RightDashboard";

const ShoppingList = () => {
  return (
    <div>
      <div className="side_container">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={6} lg={6}>
            <LeftDashboard />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <ShoppingRight />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6}>
            <RightDashboard />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ShoppingList;
