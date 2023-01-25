import React from "react";
import profile from "../../../img/profile.png";
import { Link, useLocation } from "react-router-dom";
import myprofile from "../../../img/user.svg";
import myaccounticon from "../../../img/myaccounticon.svg";
import wellnessicon from "../../../img/wellnessicon.svg";
import nutritionicon from "../../../img/nutritionicon.svg";
import calendaricon from "../../../img/calendaricon.svg";
import uiw_setting from "../../../img/settingicon.svg";
import { useSelector } from "react-redux";
import DashboardProfile from "../../../components/DashboardProfile";
import fixbg from "../../../img/8.svg";
const ProfileSidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="lp-left-profile ">
      <div className="sticky-top">
        <div className="fix-8">
          <img src={fixbg}></img>
        </div>
        <DashboardProfile />

        <div className="lp-leftdetails">
          <ul>
            <li className={pathname === "/my-profile" ? "active" : null}>
              <Link to="/my-profile">
                <i
                  style={{ marginRight: "10px" }}
                  className="fa-solid fa-user-tie "
                ></i>
                My Profile
              </Link>
            </li>
            <li className={pathname === "/my-account" ? "active" : null}>
              <Link to="/my-account">
                <i
                  style={{ marginRight: "10px" }}
                  className="fa-solid fa-receipt"
                ></i>
                My Account
              </Link>
            </li>
            <li className={pathname === "/wellness-profile" ? "active" : null}>
              <Link to="/wellness-profile">
                <i style={{ marginRight: "7px" }} class="fa-solid fa-heart"></i>
                Wellness Profile
              </Link>
            </li>

            <li
              className={pathname === "/nutrition-calculator" ? "active" : null}
            >
              <Link to="/nutrition-calculator">
                <i
                  style={{ marginRight: "10px" }}
                  className="fa-solid fa-calculator"
                ></i>
                Nutrition Calculator
              </Link>
            </li>

            <li className={pathname === "/program" ? "active" : null}>
              <Link to="/program">
                <i
                  style={{ marginRight: "9px" }}
                  className="fa-solid fa-briefcase"
                ></i>
                My plans
              </Link>
            </li>
            <li className={pathname === "/settings" ? "active" : null}>
              <Link to="/settings">
                <i style={{ marginRight: "9px" }} class="fa-solid fa-gear"></i>
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
