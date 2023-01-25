import React from "react";
import { Menu, Col, Row, Layout, Dropdown } from "antd";
import {
  TwitterOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import facebook from "../../src/img/rr.png";
import youtube from "../../src/img/a.png";
import insta from "../../src/img/g.png";
import p from "../../src/img/u.png";
import tiktok from "../../src/img/l.png";
import b from "../../src/img/gg.png";

function Footer() {
  return (
    <div className="footerSec">
      <div className="new_container">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <div className="icons_footer">
              <ul>
                {/* <li>
                  <FacebookOutlined />
                </li>

                <li>
                  <YoutubeOutlined />
                </li>
                <li>
                  <InstagramOutlined />
                </li>
                <li>
                  <TwitterOutlined />
                </li> */}
                <li>
                  <img src={facebook} alt="r" />
                </li>
                <li>
                  <img src={youtube} alt="r" />
                </li>
                <li>
                  <img src={insta} alt="r" />
                </li>

                <li>
                  <img src={p} alt="r" />
                </li>

                <li>
                  <img src={tiktok} alt="r" />
                </li>

                <li>
                  <img src={b} alt="r" />
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24}>
            <div className="text_footer">
              <ul>
                <li>Contact Us/FAQ</li>

                <li>Terms of Use</li>
                <li>Privacy</li>
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="copyrightf">
              <p>Copyright © R.A.W. 2022</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="copyrightr">
              <p>
                Powered by <span> EyeUniversal</span>
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default Footer;
