import React, { useEffect, useState } from "react";
import { Menu, Col, Row, Dropdown, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import logo from "../img/logoraw.png";
import profile from "../img/profile.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import Item from "antd/lib/list/Item";
import myaccounticon from "../img/dr5.png";
import wellnessicon from "../img/dr2.png";
import nutritionicon from "../img/dr3.png";
import calendaricon from "../img/dr6.png";
import myprofile from "../img/dr1.png";
import uiw_setting from "../img/uiw_setting.svg";
import logos from "../../src/img/Vector.svg";
import { LogoutOutlined } from "@ant-design/icons";

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [current, setCurrent] = useState("/");

  const user = useSelector((state) => state.user);
  const { isAuth, userDetails, loading } = user;

  const logoutSession = async () => {
    await dispatch(logout());
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("login");
    }
  }, [isAuth]);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  const menu = (
    <Menu className="dropdown_header0">
      <Menu.Item className={pathname === "/my-profile" ? "active" : null}>
        <Link to="/my-profile">
          {/* <img src={myprofile} alt="" />  */}
          <i style={{ marginRight: "10px" }} class="fa-solid fa-user-tie "></i>
          My Profile
        </Link>
      </Menu.Item>
      <Menu.Item className={pathname === "/my-account" ? "active" : null}>
        <Link to="/my-account">
          {/* <img src={myaccounticon} alt="" />  */}
          <i style={{ marginRight: "10px" }} class="fa-solid fa-receipt"></i>
          My Account
        </Link>
      </Menu.Item>

      <Menu.Item
        className={pathname === "/nutrition-calculator" ? "active" : null}
      >
        <Link to="/nutrition-calculator">
          {/* <img src={nutritionicon} alt="" />  */}
          <i style={{ marginRight: "10px" }} class="fa-solid fa-calculator"></i>
          Nutrition Calculator
        </Link>
      </Menu.Item>
      <Menu.Item className={pathname === "/wellness-profile" ? "active" : null}>
        <Link to="/wellness-profile">
          {/* <img src={wellnessicon} alt="" /> */}
          <i style={{ marginRight: "10px" }} class="fa-solid fa-heart"></i>
          Wellness Profile
        </Link>
      </Menu.Item>
      <Menu.Item className={pathname === "/program" ? "active" : null}>
        <Link to="/program">
          {/* <img src={calendaricon} alt="" /> */}
          <i style={{ marginRight: "10px" }} class="fa-solid fa-briefcase"></i>
          My plans
        </Link>
      </Menu.Item>
      <Menu.Item key="/settings">
        <Link to="/settings">
          {/* <img src={uiw_setting} alt="" />  */}
          <i style={{ marginRight: "10px" }} class="fa-solid fa-gear"></i>
          Settings
        </Link>
      </Menu.Item>
      <Menu.Item key="/logout" onClick={() => logoutSession()}>
        <Item>
          {" "}
          <p style={{ margin: "0px" }}>
            {" "}
            <LogoutOutlined /> Logout{" "}
          </p>
        </Item>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="headerSec">
      <Row
        gutter={[10, 10]}
        // style={{
        //   position: "sticky",
        //   top: "0",
        // }}
        style={{
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: "0",
        }}
      >
        <Col xs={4} sm={4} md={6} lg={6}>
          <div className="headerlogo">
            <img src={logos} alt="logo" />
          </div>
        </Col>
        <Col xs={15} sm={15} md={16} lg={16}>
          <div className="navsec">
            <Menu mode="horizontal">
              <Menu.Item
                key="/dashboard"
                className={
                  current === "/dashboard" ||
                  current.includes("/my-account") ||
                  current.includes("/my-profile") ||
                  current.includes("/nutrition-calculator") ||
                  current.includes("/wellness-profile") ||
                  current.includes("/program") ||
                  current.includes("/settings")
                    ? "active"
                    : ""
                }
              >
                <Link to="/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item
                key="/workouts"
                className={
                  current === "/workouts" ||
                  current.includes("/workout-details")
                    ? "active"
                    : ""
                }
              >
                <Link to="/workouts">Workouts</Link>
              </Menu.Item>
              <Menu.Item
                key="/recipes"
                className={
                  current === "/recipes" || current.includes("/recipe-details")
                    ? "active"
                    : ""
                }
              >
                <Link to="/recipes">Recipes</Link>
              </Menu.Item>

              <Menu.Item
                key="/coaching"
                className={current === "/coaching" ? "active" : ""}
              >
                <Link to="/coaching">Coaching</Link>
              </Menu.Item>
              <Menu.Item
                key="/calendar"
                className={current === "/calendar" ? "active" : ""}
              >
                <Link to="/calendar">My Plan</Link>
              </Menu.Item>
              <Menu.Item
                key="/store"
                className={current === "/store" ? "active" : ""}
              >
                Store
              </Menu.Item>
              <Menu.Item
                key="/blog"
                className={current === "/blog" ? "active" : ""}
              >
                blog
              </Menu.Item>
            </Menu>
          </div>
        </Col>
        <Col xs={5} sm={5} md={2} lg={2}>
          <div className="navIcons0">
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <span className="nav-dropname">
                {/* <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  {userDetails.name || userDetails.email} <DownOutlined />
                </a> */}
                <div className="nav-dropimg">
                  <img
                    loading={loading}
                    src={userDetails.profile_pic || profile}
                    alt=""
                  />
                </div>
              </span>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default Header;
