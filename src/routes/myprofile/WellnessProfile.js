import React from "react";
import { Row, Col } from "antd";
import WellnessQuestionnaire from "../myprofile/component/WellnessQuestionnaire";
import ProfileSidebar from "./component/ProfileSidebar";

const WellnessProfile = () => {
  return (
    <div>
      <div className="side_container">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={6} lg={6}>
            <ProfileSidebar />
          </Col>
          <Col xs={24} sm={24} md={18} lg={18}>
            <WellnessQuestionnaire />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default WellnessProfile;
