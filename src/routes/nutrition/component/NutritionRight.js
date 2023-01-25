import React, { useState } from "react";
import { Row, Col, Button, Modal } from "antd";
import { Player } from "video-react";
import {
  StarOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import videoimg from "../../../img/video.jpg";

const NutritionRight = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="liveview-vl">
      <Row gutter={[0, 0]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="liveimg-vl">
            <img src={videoimg} onClick={showModal} alt="" />
          </div>
          <div>
            <Modal
              title="Basic Modal"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              className="videomodel-0"
            >
              <Player
                playsInline
                poster="/assets/poster.png"
                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              />
            </Modal>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="livetext-vl">
            <div className="Live_vl">
              <Button>Live</Button>
            </div>
            <span className="livemain-vl">
              <h2>Nutrition is key to sports performance</h2>
              <p>Category icon</p>
            </span>
            <p className="livedes-vl">
              Hit your chest, back, shoulders, and arms with more classic
              weightlifting and asymmetrical training.
            </p>

            <div className="icons_btn-vl">
              <p>
                <ClockCircleOutlined />
                00:40:10
              </p>
              <span className="icons-vl">
                <StarOutlined />
                <CalendarOutlined />
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NutritionRight;
