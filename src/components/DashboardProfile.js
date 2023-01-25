import React from "react";
import { Form, Input, Button, Row, Col } from "antd";

import profile from "../img/profile.png";
import { useSelector } from "react-redux";

const DashboardProfile = () => {
  const user = useSelector((state) => state.user);
  const { userDetails, loading } = user;
  return (
    <div>
      <div className="lp-userp">
        <img
          loading={loading}
          src={userDetails.profile_pic || profile}
          alt="avatar"
        />
      </div>
      <div className="dashboardprofile">
        <div className="dashboard_name">
          <h5>{userDetails.name || ""}</h5>
          <p>{userDetails.city || ""}</p>
          <p>{userDetails.club_info || ""}</p>
          <p className="italic-fnt">{userDetails.mantra || ""}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
