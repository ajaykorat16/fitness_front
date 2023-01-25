import React from "react";
import profile from "../img/profile.png";
import { Link, useLocation } from "react-router-dom";
import about from "../img/about.svg";
import uiw_setting from "../img/uiw_setting.svg";
import { useSelector } from "react-redux";
import myprofile from "../img/user.svg";
import myaccounticon from "../img/myaccounticon.svg";
import wellnessicon from "../img/wellnessicon.svg";
import nutritionicon from "../img/nutritionicon.svg";
import calendaricon from "../img/calendaricon.svg";

const LeftProfile = () => {
  const user = useSelector((state) => state.user);
  const { userDetails, loading } = user;
  const { pathname } = useLocation();

  return (
    <div className="lp-left-profile ">
      <div className="sticky-top">
        <div className="lp-userp">
          <img
            loading={loading}
            src={userDetails.profile_pic || profile}
            alt="avatar"
          />
        </div>
        <div className="dashboardprofile">
          <div className="dashboard_name">
            <h5>John Doe</h5>
            <p>City</p>
            <p>Club Info</p>
            <p className="italic-fnt">Mantra</p>
          </div>
        </div>
        <div className="lp-leftdetails">
          <ul>
            <li className={pathname === "/my-profile" ? "active" : null}>
              <Link to="/my-profile">
                <img src={myprofile} alt="" /> My Profile
              </Link>
            </li>
            <li className={pathname === "/my-account" ? "active" : null}>
              <Link to="/my-account">
                <img src={myaccounticon} alt="" /> My Account
              </Link>
            </li>

            <li className={pathname === "/wellness-profile" ? "active" : null}>
              <Link to="/wellness-profile">
                <img src={wellnessicon} alt="" /> Wellness Profile
              </Link>
            </li>
            <li
              className={pathname === "/nutrition-calculator" ? "active" : null}
            >
              <Link to="/nutrition-calculator">
                <img src={nutritionicon} alt="" /> Nutrition Calculator
              </Link>
            </li>
            <li className={pathname === "/program" ? "active" : null}>
              <Link to="/program">
                <img src={calendaricon} alt="" /> My plans
              </Link>
            </li>
            <li className={pathname === "/settings" ? "active" : null}>
              <Link to="/settings">
                <img src={uiw_setting} alt="" /> Settings
              </Link>
            </li>
          </ul>
        </div>
        {/* <div className="lp-leftdetails">
        <ul>
          <li>
            <Link to="#">
              <img src={user} alt="" /> My Account
            </Link>
          </li>
          <li>
            <Link to="#">
              <img src={about} alt="" /> My Profile
            </Link>
          </li>
          <li>
            <Link to="/program">
              <img src={about} alt="" /> Program
            </Link>
          </li>
          <li>
            <Link to="#">
              <img src={uiw_setting} alt="" /> Settings
            </Link>
          </li>
        </ul>
      </div> */}
      </div>
    </div>
  );
};

export default LeftProfile;
