import React, { useEffect, useState } from "react";
import { Modal, Progress, Row, Col, Input, Form, Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import DashboardProfile from "./DashboardProfile";

import water from "../img//watericon.svg";
import waters from "../img//glass.png";
import step from "../img/stepnew.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyPlanSideBar,
  getSetps,
  SetpsProgress,
  StepsProgressSet,
} from "../redux/actions/dashboardAction";
import moment from "moment";

const StepModal = ({ filterDates }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stepsValue, setStepsValue] = useState(null);
  const [stepsGoal, setStepsGoal] = useState(null);
  const [stepsStatus, setStepsStatus] = useState(false);
  const dispatch = useDispatch();
  const { steps } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (steps) {
      setStepsValue(
        Math.trunc(
          steps &&
            steps.daily_steps_progress &&
            steps.daily_steps_progress.stepsprogress
        ) || 0
      );
      setStepsGoal(Math.trunc(steps && steps.dailygoal));
    }
  }, [steps]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setStepsStatus(false);
  };

  const submitSteps = async () => {
    await dispatch(SetpsProgress({ dailygoal: stepsGoal }));
    let payload = {
      start_date:filterDates || moment(new Date()).format("YYYY-MM-DD"),
      end_date:filterDates || moment(new Date()).format("YYYY-MM-DD")
    };
    let data = {
      stepsprogress: stepsValue,
    };
    await dispatch(StepsProgressSet(data));
    await dispatch(getSetps(payload));
    dispatch(getMyPlanSideBar({ local: moment.tz.guess() }));
    setStepsStatus(false);
    setIsModalVisible(false);
  };

  return (
    <div>
      <div className="activity-box" onClick={showModal}>
        <h3>Steps</h3>
        <Row gutter={[10, 10]}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="border-progrss-bp">
              <div
                className="prograss-bar-0"
                style={{
                  "--value": Math.trunc(steps && steps.percentage) || 0,
                  // (((steps && steps.stepsprogress) || 0) /
                  //   ((steps && steps.dailygoal) || 0)) *
                  // 100,
                }}
              >
                <div className="step-img">
                  <img src={step} alt="" />
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="activity-text-2">
              <h6 className="activity-completed">Completed</h6>
              <h5>{Math.trunc(steps && steps.total_step_progress) || 0}</h5>
              <p>Daily goal</p>
              <h6 className="activity-time">
                {Math.trunc(steps && steps.total_goal) || 0}
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
        <div className="modelbx-activity-mba">
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={24} md={10} lg={10}>
              <div
                className="stepmodel-sm"
                style={{
                  width: "325px",
                  height: "280px",
                }}
              >
                <h3
                  style={{
                    marginTop: "21px",
                  }}
                >
                  STEPS
                </h3>
                <Row
                  gutter={[10, 10]}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "28px",
                  }}
                >
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <div className="border-progrss-bp">
                      <div
                        className="prograss-bar-0"
                        style={{
                          "--value": Math.trunc(steps && steps.percentage) || 0,
                        }}
                      >
                        <div className="step-img">
                          <img src={step} alt="" />
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <div className="activity-text">
                      <h6
                        style={{ color: "rgba(167, 8, 173, 1)" }}
                        className="activity-completed"
                      >
                        Completed
                      </h6>
                      <h5 style={{ color: "rgba(167, 8, 173, 1)" }}>
                        {Math.trunc(steps && steps.total_step_progress) || 0}
                      </h5>
                      <p
                        style={{
                          color: "rgba(149, 144, 160, 1)",
                        }}
                      >
                        Daily goal
                      </p>
                      {stepsStatus ? (
                        <input
                          style={{ width: "40%", border: "none" }}
                          value={stepsGoal}
                          onChange={(e) => setStepsGoal(e.target.value)}
                        />
                      ) : (
                        <h6
                          className="activity-time"
                          style={{ color: "rgba(149, 144, 160, 1)" }}
                          onClick={() => setStepsStatus(true)}
                        >
                          {Math.trunc(steps && steps.total_goal) || 0}
                        </h6>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs={24} sm={24} md={14} lg={14}>
              <h2
                className="bold_class"
                style={{
                  textAlign: "center",
                  paddingTop: "10px",
                  paddingBottom: "20px",
                  letterSpacing: "3px",
                  marginTop: "20px",
                }}
              >
                ENTER STEPS
              </h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "20px",
                  height: "100px",
                }}
              >
                <Row
                  style={{
                    marginLeft: "18%",
                  }}
                >
                  <Col xs={12} sm={12} md={9} lg={9}>
                    <div
                      style={{
                        display: "flex",
                        background: "#fff",
                        marginRight: "10px",
                      }}
                    >
                      <Input
                        style={{
                          padding: "10px",
                          border: "none",
                          textAlign: "center",
                        }}
                        value={stepsValue}
                        onChange={(e) => setStepsValue(e.target.value)}
                        type="text"
                        placeholder="3.742"
                        suffix="STEPS"
                      />
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
                      onClick={submitSteps}
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

export default StepModal;
