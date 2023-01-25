import React, { useEffect, useState } from "react";
import { Modal, Progress, Row, Col, Input, Form, Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import DashboardProfile from "./DashboardProfile";

import waters1 from "../img//watericon.svg";
import waters from "../img//glass.png";
import {
  getMyPlanSideBar,
  getWater,
  WaterProgress,
  WaterProgressSet,
} from "../redux/actions/dashboardAction";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const WaterModal = ({ filterDates }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [waterValue, setWaterValue] = useState(null);
  const [waterGoal, setWaterGoal] = useState(null);
  const [stepsStatus, setStepsStatus] = useState(false);
  const [StepsActive, setStepsActive] = useState("");

  const { water } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setStepsActive("");
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  useEffect(() => {
    if (water) {
      // setWaterValue(
      //   Math.trunc(
      //     water &&
      //       water.total_water_progress
      //   ) || 0
      // );
      setWaterGoal(Math.trunc(water && water.total_goal));
    }
  }, [water]);

  // useEffect(() => {
  //   if (stepsStatus && waterGoal) {
  //     setTimeout(()=>{
  //       submitSteps();
  //     },2000)
  //   }
  // }, [waterGoal]);

  const updateWater = async () => {
    let data = {
      waterprogress: Number(waterValue),
    };
    let payload = {
      start_date: filterDates || moment().format("Y-MM-D"),
      end_date: filterDates || moment().format("Y-MM-D"),
    };
    await dispatch(WaterProgress({ dailygoal: waterGoal }));
    await dispatch(WaterProgressSet(data));
    setIsModalVisible(false);
    dispatch(getWater(payload));
    setStepsActive("");
    setWaterValue(0);
    setStepsStatus(false);
  };

  const submitSteps = async () => {
    await dispatch(WaterProgress({ dailygoal: waterGoal }));
    let payload = {
      date: filterDates || moment(new Date()).format("YYYY-MM-DD"),
    };
    // let data = {
    //   waterprogress: waterValue,
    // };

    // await dispatch(WaterProgressSet(data))

    await dispatch(
      getWater({ start_date: filterDates, end_date: filterDates })
    );

    dispatch(
      getMyPlanSideBar({ start_date: filterDates, end_date: filterDates })
    );
    setStepsActive("");
    setStepsStatus(false);
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <div className="activity-box" onClick={showModal}>
        <h3>Water</h3>
        <Row gutter={[10, 10]}>
          <Col xs={12} sm={12} md={12} lg={12}>
            {/* <div className="step-img">
              <img src={water} alt="" />
            </div> */}
            <div className="water-progrss-bp">
              <div
                className="prograss-water-0"
                style={{
                  "--value": Math.trunc(water && water.percentage) || 0,
                }}
              >
                <div className="step-img">
                  <img src={waters1} alt="" />
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="activity-text-2">
              <h6 className="activity-completed">Completed</h6>
              <h5>{Math.trunc(water && water.total_water_progress) || 0}</h5>
              <p style={{ color: " #8CF4FF" }}>Daily goal</p>
              <h6 className="activity-time" style={{ color: " #8CF4FF" }}>
                {Math.trunc(water && water.total_goal) || 0}
              </h6>
            </div>
          </Col>
        </Row>
      </div>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="model-box-ds"
        footer={null}
      >
        <div className="modelbx-step">
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={24} md={10} lg={10}>
              <div
                className="stepmodel-sm"
                style={{
                  width: "355px",
                  height: "301px",
                }}
              >
                <h3
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Water
                </h3>
                <Row
                  gutter={[10, 10]}
                  style={{
                    marginTop: "53px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <div className="water-progrss-bp">
                      <div
                        className="prograss-water-0"
                        style={{
                          "--value": Math.trunc(water && water.percentage) || 0,
                        }}
                      >
                        <div className="step-img">
                          <img src={waters1} alt="" />
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <div className="activity-text">
                      <h6 className="activity-completed">Completed</h6>

                      <h5>
                        {Math.trunc(water && water.total_water_progress) || 0}
                      </h5>

                      <p style={{ color: " #29B8C4" }}>Daily goal</p>
                      <h6
                        className="activity-time"
                        style={{ color: "#29B8C4" }}
                      >
                        {stepsStatus ? (
                          <input
                            style={{ width: "40%", border: "none" }}
                            value={Number(waterGoal)}
                            onChange={(e) => setWaterGoal(e.target.value)}
                          />
                        ) : (
                          <h5 onClick={() => setStepsStatus(true)}>
                            {Math.trunc(water && water.total_goal) || 0}
                          </h5>
                        )}
                      </h6>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs={24} sm={24} md={14} lg={14}>
              <h3
                className="bold_class"
                style={{
                  textAlign: "center",
                  paddingTop: "10px",
                  paddingBottom: "20px",
                  letterSpacing: "3px",
                }}
              >
                ENTER WATER{" "}
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "20px",
                }}
              >
                <Row
                  style={{
                    marginTop: "50px",
                    marginLft: "30px",
                  }}
                >
                  <Col xs={12} sm={12} md={5} lg={5}>
                    <div
                      className="paragrap  "
                      style={{
                        display: "flex",
                        height: "43px",
                        background: "#fff",
                        marginRight: "10px",
                        border: StepsActive == 1 ? "2px solid #86E9F3" : "none",
                      }}
                      onClick={() => {
                        setStepsActive(1);
                        setWaterValue(300);
                      }}
                    >
                      {/* <Input
                        style={{ padding: "10px", border: "none" }}
                        type="text"
                        placeholder="300"
                        suffix="ml"
                      /> */}
                      <p
                        style={{
                          marginTop: "12px",

                          marginLeft: "13px",
                          width: "200px",
                        }}
                      >
                        300 ml
                      </p>
                      <img style={{ padding: "10px" }} src={waters} alt="" />
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={5} lg={5}>
                    <div
                      style={{
                        display: "flex",
                        background: "#fff",
                        height: "43px",
                        marginRight: "10px",
                        border: StepsActive == 2 ? "2px solid #86E9F3" : "none",
                      }}
                      onClick={() => {
                        setStepsActive(2);
                        setWaterValue(600);
                      }}
                    >
                      {/* <Input
                        style={{ padding: "10px", border: "none" }}
                        type="text"
                        placeholder="600"
                        suffix="ml"
                        // disabled={true}
                      /> */}
                      <p
                        style={{
                          width: "200px",

                          marginTop: "12px",
                          marginLeft: "13px",
                        }}
                      >
                        600 ml
                      </p>
                      <img style={{ padding: "10px" }} src={waters} alt="" />
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={5} lg={5}>
                    <div
                      style={{
                        display: "flex",
                        height: "43px",
                        background: "#fff",
                        marginRight: "10px",
                        border: StepsActive == 3 ? "2px solid #86E9F3" : "none",
                      }}
                      onClick={() => {
                        setStepsActive(3);
                        setWaterValue(700);
                      }}
                    >
                      {/* <Input
                        style={{ padding: "10px", border: "none" }}
                        type="text"
                        placeholder="700"
                        suffix="ml"
                      /> */}
                      <p
                        style={{
                          width: "200px",
                          marginTop: "12px",
                          marginLeft: "13px",
                        }}
                      >
                        700 ml
                      </p>
                      {/* <img style={{ padding: "10px" }} src={waters} alt="" /> */}
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={5} lg={5}>
                    <Button
                      style={{
                        height: "43px",
                        color: "#fff",
                        backgroundColor: "#000",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                      }}
                      onClick={() => updateWater()}
                    >
                      Submit{" "}
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default WaterModal;
