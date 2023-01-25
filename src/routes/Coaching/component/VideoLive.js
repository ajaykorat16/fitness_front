import React, { useEffect, useState } from "react";
import { Row, Col, Image, Modal, Button, Calendar, message } from "antd";
import {
  StarOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import imgvideo from "../../../img/unsplash_lrQPTQs7nQQ.jpg";

const VideoLive = ({ data }) => {
  return (
    <div className="coaching-video liveview-vl">
      <Row gutter={[0, 0]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div
            className="liveplayvideo-lg0"
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <img src={imgvideo}></img>
            <div className="live-top-lt">
              <div className="livevideo-design">
                <p>LIVE</p>
              </div>
            </div>
            <div className="icons_btn-vltop">
              <p>
                <ClockCircleOutlined />
                00:00:00
              </p>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="livetext-vl">
            <span className="livemain-vl-hd">
              <h2>DAILY WELLNESS JOURNAL TEMPLATE</h2>
              <p class="livedes-para">
                Workout Description Workout Description Workout Description
                Workout Description Workout Description...
              </p>
              <div className="icons_btn-vl">
                <div className="Ashley-name-c">
                  <b>Coach</b>
                  <p>Ashley</p>
                </div>
                <span className="icons-vl">
                  <StarOutlined />
                  <EyeOutlined />
                  <CalendarOutlined />
                </span>
              </div>
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default VideoLive;
