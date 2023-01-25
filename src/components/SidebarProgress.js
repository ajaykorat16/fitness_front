import React, { useEffect, useState } from "react";
import { Modal, Button, Progress, Row, Col } from "antd";

import DashboardProfile from "./DashboardProfile";
import step from "../img/step.svg";
import water from "../img//water.svg";
import shoppinglist from "../img/shoppinglist.png";
import WorkoutList from "../routes/dashboard/component/WorkoutList";
import StepModal from "./StepModal";
import WaterModal from "./WaterModal";
import { useDispatch, useSelector } from "react-redux";
import { getMyPlanSideBar } from "../redux/actions/dashboardAction";
import useSelection from "antd/lib/table/hooks/useSelection";
import moment from "moment";
const SidebarProgress = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { myPlan } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPlanSideBar({local: moment.tz.guess()}));
  }, []);

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
    <div className="sidebarprogress-sp">
      <div className="activity-box" onClick={showModal}>
        <h3>Activity time</h3>
        <Row gutter={[10, 10]}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="progressbar-bg">
              <Progress
                type="circle"
                percent={
                  myPlan && myPlan[0] && myPlan[0].averagworkoutdurations
                }
              />
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="activity-text">
              <h6 className="activity-completed">Completed</h6>
              {/* <h5>00:40:00</h5> */}
              <h5>
                {myPlan && myPlan[0] && myPlan[0].completed_workout_duration
                  ? moment
                      .utc(myPlan[0].completed_workout_duration * 1000)
                      .format("HH:mm:ss")
                  : null}
              </h5>
              <p>Planned</p>
              {/* <h6 className="activity-time">01:20:00</h6> */}
              <h6 className="activity-time">
                {myPlan && myPlan[0] && myPlan[0].planned_workout_duration
                  ? moment
                      .utc(myPlan[0].planned_workout_duration * 1000)
                      .format("HH:mm:ss")
                  : null}
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
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className="activitytime-mba">
                <h3>Activity time</h3>
                <Row
                  gutter={[10, 10]}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Col xs={12} sm={12} md={7} lg={7}>
                    <Progress type="circle" percent={myPlan && myPlan[0] && myPlan[0].averagworkoutdurations} />
                  </Col>
                  <Col xs={12} sm={12} md={10} lg={10}>
                    <div className="activity-text">
                      <h6 className="activity-completed">Completed</h6>
                      {/* <h5>00:40:00</h5> */}
                      <h5>
                        {myPlan &&
                        myPlan[0] &&
                        myPlan[0].completed_workout_duration
                          ? moment
                              .utc(myPlan[0].completed_workout_duration * 1000)
                              .format("HH:mm:ss")
                          : null}
                      </h5>
                      <p>Planned</p>
                      <h6 className="activity-time">
                        {myPlan &&
                        myPlan[0] &&
                        myPlan[0].planned_workout_duration
                          ? moment
                              .utc(myPlan[0].planned_workout_duration * 1000)
                              .format("HH:mm:ss")
                          : null}
                      </h6>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={17} lg={17}>
                    <div className="">
                      <Row gutter={[10, 10]}>
                        <Col xs={12} sm={12} md={12} lg={12}>
                          <div className="Activities-Calories-ac">
                            <h5>Activities</h5>
                            <p>1/2</p>
                          </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                          <div className="Activities-Calories-ac">
                            <h5>Calories</h5>
                            <p>1/2</p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className="workouts-heading-md">
                <h2>Today’s Workouts</h2>
                { myPlan && myPlan.todayworkout &&
                  myPlan.todayworkout.map((item,i)=>{
                  return <WorkoutList data={item} />;
                })
                }
                
                {/* <WorkoutList /> */}
                {/* <WorkoutList /> */}
                {/* <WorkoutList /> */}
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
      <div className="activity-box">
        <h3>Calories</h3>
        <Row gutter={[10, 10]}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="progressbar-bg progressbar-orange">
              <Progress
                type="circle"
                percent={
                  myPlan && myPlan[0] && myPlan[0].averagerecipecalories
                    ? Number(myPlan[0].averagerecipecalories)
                    : 0
                }
              />
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="activity-text">
              <h6 className="activity-completed">Calorie Intake</h6>
              <h5>
                {myPlan && myPlan[0] && myPlan[0].completedrecipecalories
                  ? Number(myPlan[0].completedrecipecalories)
                  : null}
                /
                {myPlan && myPlan[0] && myPlan[0].totalrecipecalories
                  ? Number(myPlan[0].totalrecipecalories)
                  : null}
              </h5>
              <p>Active Calories</p>
              <h6 className="activity-time">
                {myPlan && myPlan[0] && myPlan[0].completed_workout_calories}/
                {myPlan && myPlan[0] && myPlan[0]["total_workout calories"]}
              </h6>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <StepModal />
      </div>
      <div>
        <WaterModal />
      </div>

      <div className="shopping_ld">
        <Row
          gutter={[10, 10]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="step-img">
              <img src={shoppinglist} alt="" />
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="activity-text">
              <h3>Shopping List</h3>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SidebarProgress;
