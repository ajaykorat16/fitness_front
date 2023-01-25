import React, { useState } from "react";
import { Row, Col, Progress, Button, Modal } from "antd";
import trophy from "../img/Recurso6@2x1.png";
import trophy1 from "../img/Recurso3@2x.png";
import trophy2 from "../img/Recurso2@2x.png";
import trophy3 from "../img/Recurso4@2x.png";

import { ArrowRightOutlined, RightOutlined } from "@ant-design/icons";
import { S3_BUCKET_URL } from "../config/constants";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const RightDashboard = (item) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
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
    <Row gutter={[10, 10]} style={{ height: "100%" }}>
      <Col xs={24} sm={24} md={24} lg={24}>
        <div className="trophy-case-tc">
          <h2>Trophy Case</h2>
          <div className="activechallenges-tc"></div>

          <div className="trophy-case">
            <ul>
              {item &&
                item.challenge &&
                item.challenge.trophies &&
                item.challenge.trophies.map((data, i) =>
                  i < 3 ? (
                    <li key={i}>
                      <p>
                        <img
                          src={
                            data && data.trophy
                              ? S3_BUCKET_URL + data.trophy
                              : ""
                          }
                          alt=""
                        />
                      </p>
                    </li>
                  ) : null
                )}
              <li>
                {item && item.challenge && item.challenge.trophies != 0 ? (
                  <p className="trophy-caseback" onClick={showModal}>
                    <RightOutlined />
                  </p>
                ) : null}
                <div className="modelbox_rd" style={{ background: "red" }}>
                  <Modal
                    title="Trophy case"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    className="modelbox_rd0"
                    footer={null}
                  >
                    <div>
                      <Row
                        gutter={[10, 10]}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item &&
                          item.challenge &&
                          item.challenge.trophies &&
                          item.challenge.trophies.map((data, i) => (
                            <Col xs={24} sm={24} md={4} lg={4} key={i}>
                              <div className="trophy-model-tm">
                                <span className="imgtropy">
                                  <img
                                    src={
                                      data && data.trophy
                                        ? S3_BUCKET_URL + data.trophy
                                        : ""
                                    }
                                    alt=""
                                  />
                                </span>
                                <p>{data.label}</p>
                                <h5>
                                  {moment(data.activated_date).format(
                                    "DD-MM-yyyy"
                                  )}
                                </h5>
                              </div>
                            </Col>
                          ))}
                      </Row>
                    </div>
                  </Modal>
                </div>
              </li>
            </ul>
          </div>
          <div className="activechallenges-tc">
            <h4
              style={{
                fontSize: 14,
                fontFamily: "Montserrat",
                fontWeight: 700,
                marginTop: "20px ",
              }}
            >
              ACTIVE RAW CHALLENGES
            </h4>
            <p></p>
          </div>
          {console.log(
            "item.challenge.activeChallange------",
            item && item.challenge && item.challenge.activeChallange
          )}
          {item && item.challenge && item.challenge.activeChallange
            ? item.challenge.activeChallange.map((data, i) => (
                <div className="trofyg_tc" key={i}>
                  <Row gutter={[10, 10]}>
                    <Col xs={24} sm={24} md={6} lg={6}>
                      <div className="trofyimg_tc">
                        {Boolean(data.trophy) ? (
                          <img
                            src={S3_BUCKET_URL + data.trophy}
                            alt=""
                            height={50}
                            onClick={() =>
                              navigate(`/challenge-details/${data.id}`)
                            }
                          />
                        ) : (
                          <img src={trophy} alt="" />
                        )}
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18}>
                      <div className="trofytext_tc">
                        <h2>{data.title}</h2>
                        <h6>{data.additionalinfo.substring(0, 30)}</h6>
                        <p
                          style={{
                            marginBottom: "-6px",
                          }}
                        >
                          {moment(data.start_date).format("DD-MM-yyyy")} to{" "}
                          {moment(data.end_date).format("DD-MM-yyyy")}{" "}
                        </p>
                        <Progress
                          strokeLinecap="square"
                          percent={data.percentage}
                          showInfo={false}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              ))
            : null}

          {/* <div className="trofyg_tc">
            <Row gutter={[10, 10]}>
              <Col xs={24} sm={24} md={6} lg={6}>
                <div className="trofyimg_tc">
                  <img src={trophy} alt="" />
                </div>
              </Col>
              <Col xs={24} sm={24} md={18} lg={18}>
                <div className="trofytext_tc">
                  <h2>June Running Distance Challenge </h2>
                  <h6>How far can you run this month?</h6>
                  <p>Jun 1, 2021 to Jun 30, 2021 </p>
                  <Progress strokeLinecap="square" percent={75} />
                </div>
              </Col>
            </Row>
          </div>
           */}

          <div className="trofybutton_tcc">
            <Button onClick={() => navigate("/all-challenges")}>
              View more
              <RightOutlined />
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default RightDashboard;
