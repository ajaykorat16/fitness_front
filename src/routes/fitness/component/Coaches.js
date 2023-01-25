import React, { useEffect, useState } from "react";
import { Row, Col, Image, Modal, Button, Calendar, message } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import coachesimg from "../../../img/Captura-de-pantalla.jpg";

import moment from "moment";

const Coaches = () => {
  return (
    <div>
      <div className="coaches-cwd active">
        <Row
          gutter={[10, 10]}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Col xs={24} sm={24} md={5} lg={5}>
            <div className="coaches-img-cwd">
              <img src={coachesimg}></img>
            </div>
          </Col>
          <Col xs={24} sm={24} md={19} lg={19}>
            <div className="coaches-text-cwd">
              <h2>joE</h2>
              <p>
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book when an unknown
                printer took a galley of type and scrambled it to
              </p>
              <div className="soclicon">
                <p>
                  <i className="fa fa-facebook-square" aria-hidden="true"></i>
                </p>
                <p>
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </p>
                <p>
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </p>
                <p>
                  <i className="fa fa-pinterest" aria-hidden="true"></i>
                </p>
                <p>
                  <i className="fa fa-youtube-play" aria-hidden="true"></i>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="coaches-cwd ">
        <Row
          gutter={[10, 10]}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Col xs={24} sm={24} md={19} lg={19}>
            <div className="coaches-text-cwd text-right-cwd">
              <h2>Ashley</h2>
              <p>
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book when an unknown
                printer took a galley of type and scrambled it to
              </p>
              <div className="soclicon">
                <p>
                  <i className="fa fa-facebook-square" aria-hidden="true"></i>
                </p>
                <p>
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </p>
                <p>
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </p>
                <p>
                  <i className="fa fa-pinterest" aria-hidden="true"></i>
                </p>
                <p>
                  <i className="fa fa-youtube-play" aria-hidden="true"></i>
                </p>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={5} lg={5}>
            <div className="coaches-img-cwd">
              <img src={coachesimg}></img>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Coaches;
