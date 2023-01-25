import React from "react";
import { Row, Col } from "antd";
import RightProfile from "../myprofile/component/RightProfile";
import ProfileSidebar from "./component/ProfileSidebar";
import {useLocation} from 'react-router-dom';

const MyProfile = () => {
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
            <RightProfile path={path} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MyProfile;
