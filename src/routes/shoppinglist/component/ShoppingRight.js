import React from "react";
import { Menu, Dropdown, Row, Col, Table, Button, Checkbox } from "antd";
import {
  DownOutlined,
  CalendarOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import productimg from "../../../img/profile.png";
import lefticon from "../../../img/shareicon.png";
import { useNavigate } from "react-router-dom";
const ShoppingRight = () => {
  const navigate = useNavigate();
  const menu = (
    <Menu className="btmdropdown_md">
      <Menu.Item key="0">
        <a href="#">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="#">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  return (
    <div className="rp-right-profile">
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="backbtn-a">
            <h2 onClick={() => navigate(-1)}>
              <LeftOutlined /> Back
            </h2>
          </div>
          <div className="dashboard-hding-sd">
            <div className="personal_title ">
              <h2>challange</h2>
            </div>
            <p className="date-shoplit">from APR 10 to Apr 17 </p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="workouts-heading-md">
            <div className="ingredients-main-inm">
              <div className="pro-ynit-hding">
                <div className="product-puq">
                  <h2>Product</h2>
                </div>
                <div className="unit-puq">
                  <h2>Unit</h2>
                </div>
                <div className="quantity-puq">
                  <h2> Quantity</h2>
                </div>
              </div>
              <div className="Avocado-allb">
                <div className="av-name">
                  <Checkbox onChange={onChange}>
                    <h4>Avocado</h4>
                  </Checkbox>
                </div>
                <b className="av-unit">Unit</b>
                <p className="av-num-u">30</p>
              </div>
              <div className="Avocado-allb Avocado-allb-gray ">
                <div className="av-name">
                  <Checkbox onChange={onChange}>
                    <h4>Tomato</h4>
                  </Checkbox>
                </div>
                <b className="av-unit">Gr</b>
                <p className="av-num-u">500</p>
              </div>
              <div className="Avocado-allb">
                <div className="av-name">
                  <Checkbox onChange={onChange}>
                    <h4>Egg</h4>
                  </Checkbox>
                </div>
                <b className="av-unit">Unit</b>
                <p className="av-num-u">30</p>
              </div>
              <div className="Avocado-allb Avocado-allb-gray ">
                <div className="av-name">
                  <Checkbox onChange={onChange}>
                    <h4>Tomato</h4>
                  </Checkbox>
                </div>
                <b className="av-unit">Gr</b>
                <p className="av-num-u">500</p>
              </div>
              <div className="Avocado-allb">
                <div className="av-name">
                  <Checkbox onChange={onChange}>
                    <h4>Egg</h4>
                  </Checkbox>
                </div>
                <b className="av-unit">Unit</b>
                <p className="av-num-u">30</p>
              </div>
              <div className="Avocado-allb Avocado-allb-gray ">
                <div className="av-name">
                  <Checkbox onChange={onChange}>
                    <h4>Tomato</h4>
                  </Checkbox>
                </div>
                <b className="av-unit">Gr</b>
                <p className="av-num-u">500</p>
              </div>
              {/* <Row
        gutter={[10, 10]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
         <Col xs={9} sm={9} md={9} lg={9}>
          <div></div>
          <div className="ingredients-img-inm">
            <img src={profile} alt="" />
          </div>
        </Col>
        <Col xs={15} sm={15} md={15} lg={15}>
          <div className="ingredients-hding-inm">
            <h2>{item.name}</h2>
            <p>{item.unit || "N/A"} unit</p>
          </div>
        </Col> 
      </Row> */}
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div
            className="trofybutton_tc"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button>
              <img src={lefticon}></img>
              SHARE
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ShoppingRight;
