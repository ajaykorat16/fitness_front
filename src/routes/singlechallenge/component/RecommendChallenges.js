import React from "react";
import { Row, Col, Button } from "antd";
import { RightOutlined } from "@ant-design/icons";

import docthumnail from "../../../img/unsplash_lg_T5aatVdo.svg";
import imgicon from "../../../img/Recurso4@2x.png";
const RecommendChallenges = ({ data }) => {
  return (
    <div className="active-hour-ah">
      <Row gutter={[0, 0]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="menuthumnail_img">
            <img src={docthumnail} alt="" />
            <div class="recp_hding-rh">
              <img src={imgicon}></img>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="livetext-vl">
            <span className="livemain-vl">
              <h2></h2>
            </span>
            <p className="livedes-vl">
              Lorem Ipsum is simply dummy text of the printing and is simply
              dummy text of the printing and
            </p>
            <span className="liveequip-vl">
              <b>START DATE | END DATE</b>
            </span>
            <div
              className="trofybutton_tc"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button>
                Leave Challenge <RightOutlined />
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RecommendChallenges;
