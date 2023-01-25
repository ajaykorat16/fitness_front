import React, { useEffect, useState } from "react";
import { Modal, Progress, Row, Col, Input, Form, Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import DashboardProfile from "./DashboardProfile";

import water from "../img//watericon.svg";
import waters from "../img//glass.png";
import step from "../img/stepnew.svg";
import { useSelector } from "react-redux";

const Calories = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { myPlan } = useSelector((state) => state.dashboard);

  const [todayWorkouts, setTodayWorkouts] = useState([]);
  const [todayMeals, setTodayMeals] = useState([]);

  const userState = useSelector((state) => state.user);
  const { userDetails, loading } = userState;

  useEffect(() => {
    collectDashboardData();
  }, [userDetails]);

  const collectDashboardData = async () => {
    if (Object.keys(userDetails).length !== 0) {
      const workouts = await userDetails.user_program_only.filter((item) => {
        return item.programmable_user_type === "App\\Models\\Workout";
      });
      const meals = await userDetails.user_program_only.filter((item) => {
        return item.programmable_user_type === "App\\Models\\Recipe";
      });
      await setTodayWorkouts(workouts);
      await setTodayMeals(meals);
    }
  };

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
    <div>
      <div className="activity-box" onClick={showModal}>
        <h3>Calories</h3>
        <Row gutter={[10, 10]}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div
              style={{ width: "98px", height: "98px", position: "relative" }}
            >
              <div
                className="progressbar-bg progressbar-orange"
                style={{
                  position: " absolute",
                }}
              >
                <Progress
                  type="circle"
                  strokeColor={"#FFFFFF"}
                  strokeWidth={14}
                  percent={
                    myPlan && myPlan[0] && myPlan[0].averagerecipecalories
                      ? Number(myPlan[0].averagerecipecalories)
                      : 0
                  }
                  showInfo={false}
                />
              </div>
              <div
                className="progressbar-bg ahull progressbar-orange "
                style={{
                  top: "13%",
                  right: "5%",
                  position: " absolute",
                }}
              >
                <Progress
                  // style={{
                  //   position: "absolute",
                  //   top: "60"
                  // }}
                  showInfo={false}
                  strokeColor={"#EA551A"}
                  strokeWidth={14}
                  type="circle"
                  percent={
                    myPlan && myPlan[0] && myPlan[0].averagworkoutdurations
                      ? Number(myPlan[0].averageworkoutcalories)
                      : 0
                  }
                />
              </div>
              {/* <Progress
                  strokeWidth={11}
                  type="circle"
                  strokeColor={"#EA551A"}
                  percent={
                    myPlan && myPlan[0] && myPlan[0].averagworkoutdurations
                      ? Number(myPlan[0].averagworkoutdurations)
                      : 0
                  }
                  showInfo={false}
                /> */}
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="activity-text">
              <h6 className="activity-completed">Calorie Intake</h6>
              <h5>
                {myPlan && myPlan[0] && myPlan[0].completedrecipecalories
                  ? Number(myPlan[0].completedrecipecalories)
                  : 0}
                /
                {myPlan && myPlan[0] && myPlan[0].totalrecipecalories
                  ? Number(myPlan[0].totalrecipecalories)
                  : 0}
              </h5>
              <p style={{ color: "#EA551A" }}>Active Calories</p>
              <h6 className="activity-time" style={{ color: "#EA551A" }}>
                {(myPlan &&
                  myPlan[0] &&
                  myPlan[0].completed_workout_calories) ||
                  0}
                /
                {(myPlan && myPlan[0] && myPlan[0]["total_workout calories"]) ||
                  0}
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
            <Col xs={24} sm={24} md={7} lg={7}>
              <div className="stepmodel-sm">
                <h3 style={{ margingTop: "20px" }}>CALORIES</h3>
                <Row
                  gutter={[10, 10]}
                  style={{
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
                    <div
                      style={{
                        width: "98px",
                        height: "98px",
                        position: "relative",
                      }}
                    >
                      <div
                        className="progressbar-bg progressbar-orange"
                        style={{
                          position: " absolute",
                        }}
                      >
                        <Progress
                          type="circle"
                          // strokeColor={"#FFFFFF"}
                          strokeWidth={14}
                          percent={
                            myPlan &&
                            myPlan[0] &&
                            myPlan[0].averagerecipecalories
                              ? Number(myPlan[0].averagerecipecalories)
                              : 0
                          }
                          showInfo={false}
                        />
                      </div>
                      <div
                        className="progressbar-bg ahull progressbar-orange "
                        style={{
                          top: "13%",
                          right: "5%",
                          position: " absolute",
                        }}
                      >
                        <Progress
                          // style={{
                          //   position: "absolute",
                          //   top: "60"
                          // }}
                          strokeColor={"#EA551A"}
                          strokeWidth={14}
                          showInfo={false}
                          type="circle"
                          percent={
                            myPlan &&
                            myPlan[0] &&
                            myPlan[0].averagworkoutdurations
                              ? Number(myPlan[0].averageworkoutcalories)
                              : 0
                          }
                        />
                      </div>
                      {/* <Progress
                  strokeWidth={11}
                  type="circle"
                  strokeColor={"#EA551A"}
                  percent={
                    myPlan && myPlan[0] && myPlan[0].averagworkoutdurations
                      ? Number(myPlan[0].averagworkoutdurations)
                      : 0
                  }
                  showInfo={false}
                /> */}
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <div className="activity-text">
                      <h6 className="activity-completed">Calorie Intake</h6>
                      {/* <h6 style={{ color: "" }} className="activity-completed">
                        Completed
                      </h6> */}
                      <h5 style={{ color: "" }}>
                        {" "}
                        {myPlan &&
                        myPlan[0] &&
                        myPlan[0].completedrecipecalories
                          ? Math.trunc(myPlan[0].completedrecipecalories)
                          : 0}
                        /
                        {myPlan && myPlan[0] && myPlan[0].totalrecipecalories
                          ? Number(myPlan[0].totalrecipecalories)
                          : 0}
                      </h5>
                      <p style={{ color: " #EA551A" }}>Active Calories</p>
                      {/* <p style={{ color: " #29B8C4" }}>835/1600</p> */}
                      <h6
                        className="activity-time"
                        style={{ color: "#EA551A" }}
                      >
                        {(myPlan &&
                          myPlan[0] &&
                          myPlan[0].completed_workout_calories) ||
                          0}
                        /
                        {(myPlan &&
                          myPlan[0] &&
                          myPlan[0]["total_workout calories"]) ||
                          0}
                      </h6>
                    </div>
                  </Col>
                </Row>
                {myPlan && myPlan[0] ? (
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "30px",
                    }}
                  >
                    <Col xs={24} sm={24} md={16} lg={16}>
                      <div className="progress-line-all">
                        <div className="progress-text-tp">
                          <p>carbs</p>{" "}
                          <b style={{ color: "#000" }}>{`${
                            Math.trunc(myPlan[0].completedrecipecarbs) || 0
                          }g, ${Math.trunc(
                            myPlan[0].averagrecipecarbs || 0
                          )}% of target`}</b>
                        </div>
                        <div className="progress-line-pur">
                          <Progress
                            strokeLinecap="square"
                            percent={
                              Math.trunc(myPlan[0].averagrecipecarbs) || 0
                            }
                            showInfo={false}
                            strokeColor={"#A708AD"}
                          />
                        </div>
                      </div>
                      <div className="progress-line-all">
                        <div className="progress-text-tp">
                          <p>protein</p>
                          <b style={{ color: "#000" }}>{`${
                            Math.trunc(myPlan[0].completedrecipeprotin) || 0
                          }g, ${
                            Math.trunc(myPlan[0].averagerecipeprotin) || 0
                          }% of target`}</b>
                        </div>
                        <div className="progress-line-pur progress-line-ornge">
                          <Progress
                            strokeLinecap="square"
                            percent={Number(myPlan[0].averagerecipeprotin)}
                            showInfo={false}
                          />
                        </div>
                      </div>
                      <div className="progress-line-all">
                        <div className="progress-text-tp">
                          <p>fat</p>
                          <b style={{ color: "#000" }}>{`${
                            Math.trunc(myPlan[0].completedrecipefat) || 0
                          }g, ${
                            Math.trunc(myPlan[0].averagerecipefat) || 0
                          }% of target`}</b>
                        </div>
                        <div className="progress-line-pur progress-line-yell">
                          <Progress
                            strokeLinecap="square"
                            percent={Number(myPlan[0].averagerecipefat) || 0}
                            showInfo={false}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : null}
              </div>
            </Col>
            <Col xs={24} sm={24} md={17} lg={17}>
              <div>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <Col xs={20} sm={20} md={20} lg={20}>
                    <Row>
                      <Col xs={17} sm={17} md={17} lg={17}>
                        <h2
                          style={{
                            // textAlign: "center",
                            paddingTop: "5px",
                            paddingBottom: "10px",
                            fontWeight: "900",
                          }}
                        >
                          CALORIE INTAKE
                        </h2>
                      </Col>
                      <Col xs={7} sm={7} md={7} lg={7}>
                        <p style={{ paddingTop: "5px" }}>
                          {myPlan && myPlan[0] && myPlan[0].totalrecipecalories
                            ? Number(myPlan[0].totalrecipecalories)
                            : 0}{" "}
                          <span> CALS</span>
                        </p>
                      </Col>
                      {todayMeals.map((state) => (
                        <>
                          <Col xs={17} sm={17} md={17} lg={17}>
                            <div style={{ display: "flex" }}>
                              <p
                                style={{
                                  marginRight: "10px",
                                  textAlign: "center",
                                  background: "#000",
                                  color: "#fff",
                                  width: "25px",
                                  paddingTop: "3px",
                                }}
                              >
                                {state &&
                                state.meal_data &&
                                state.meal_data[0].name == "Dinner"
                                  ? "D"
                                  : state &&
                                    state.meal_data &&
                                    state.meal_data[0].name == "Lunch"
                                  ? "L"
                                  : state &&
                                    state.meal_data &&
                                    state.meal_data[0].name == "Breakfast"
                                  ? "BF"
                                  : "SN"}
                              </p>
                              <p style={{ paddingTop: "5px" }}>
                                {state.programmable_user.title}
                              </p>
                            </div>
                          </Col>
                          <Col xs={7} sm={7} md={7} lg={7}>
                            <p
                              style={{
                                paddingTop: "5px",
                                color: "rgba(41, 184, 196, 1)",
                              }}
                            >
                              {state.programmable_user.calorie}{" "}
                              <span> CALS</span>
                            </p>
                          </Col>
                        </>
                      ))}

                      {/* <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        style={{
                          border: "0.2px solid #F2F2F2",
                          marginBottom: "5px",
                        }}
                      ></Col>
                      <Col xs={17} sm={17} md={17} lg={17}>
                        <div style={{ display: "flex" }}>
                          <p
                            style={{
                              marginRight: "10px",
                              textAlign: "center",
                              background: "#000",
                              color: "#fff",
                              width: "25px",
                              paddingTop: "3px",
                            }}
                          >
                            SN
                          </p>
                          <p style={{ paddingTop: "5px" }}>Banana</p>
                        </div>
                      </Col>
                      <Col xs={7} sm={7} md={7} lg={7}>
                        <p
                          style={{
                            paddingTop: "5px",
                            color: "rgba(41, 184, 196, 1)",
                          }}
                        >
                          600 <span> CALS</span>
                        </p>
                      </Col>
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        style={{
                          border: "0.2px solid #F2F2F2",
                          marginBottom: "5px",
                        }}
                      ></Col>
                      <Col xs={17} sm={17} md={17} lg={17}>
                        <div style={{ display: "flex" }}>
                          <p
                            style={{
                              marginRight: "10px",
                              textAlign: "center",
                              background: "#000",
                              color: "#fff",
                              width: "25px",
                              paddingTop: "3px",
                            }}
                          >
                            L
                          </p>
                          <p style={{ paddingTop: "5px" }}>Recipe name</p>
                        </div>
                      </Col>
                      <Col xs={7} sm={7} md={7} lg={7}>
                        <p
                          style={{
                            paddingTop: "5px",
                            color: "rgba(41, 184, 196, 1)",
                          }}
                        >
                          600 <span> CALS</span>
                        </p>
                      </Col>
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        style={{
                          border: "0.2px solid #F2F2F2",
                          marginBottom: "5px",
                        }}
                      ></Col>
                      <Col xs={17} sm={17} md={17} lg={17}>
                        <div style={{ display: "flex" }}>
                          <p
                            style={{
                              marginRight: "10px",
                              textAlign: "center",
                              background: "#000",
                              color: "#fff",
                              width: "25px",
                              paddingTop: "3px",
                              paddingTop: "3px",
                            }}
                          >
                            D
                          </p>
                          <p style={{ paddingTop: "5px" }}>Recipe name</p>
                        </div>
                      </Col>
                      <Col xs={7} sm={7} md={7} lg={7}>
                        <p
                          style={{
                            paddingTop: "5px",
                            color: "rgba(41, 184, 196, 1)",
                          }}
                        >
                          600 <span> CALS</span>
                        </p>
                      </Col>
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        style={{
                          border: "0.2px solid #F2F2F2",
                          marginBottom: "5px",
                        }}
                      ></Col>
                      <Col xs={17} sm={17} md={17} lg={17}>
                        <div style={{ display: "flex" }}>
                          <p
                            style={{
                              marginRight: "10px",
                              textAlign: "center",
                              background: "#000",
                              color: "#fff",
                              width: "25px",
                              paddingTop: "3px",
                            }}
                          >
                            SN
                          </p>
                          <p style={{ paddingTop: "5px" }}>Snack name</p>
                        </div>
                      </Col>
                      <Col xs={7} sm={7} md={7} lg={7}>
                        <p
                          style={{
                            paddingTop: "5px",
                            color: "rgba(41, 184, 196, 1)",
                          }}
                        >
                          600 <span> CALS</span>
                        </p>
                      </Col>
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        style={{
                          border: "0.2px solid #F2F2F2",
                          marginBottom: "5px",
                        }}
                      ></Col>
                      <Col xs={17} sm={17} md={17} lg={17}>
                        <div style={{ display: "flex" }}>
                          <p
                            style={{
                              marginRight: "10px",
                              textAlign: "center",
                              background: "#000",
                              color: "#fff",
                              width: "25px",
                              paddingTop: "3px",
                            }}
                          >
                            SN
                          </p>
                          <p style={{ paddingTop: "5px" }}>Snack name</p>
                        </div>
                      </Col>
                      <Col xs={7} sm={7} md={7} lg={7}>
                        <p
                          style={{
                            paddingTop: "5px",
                            color: "rgba(41, 184, 196, 1)",
                          }}
                        >
                          600 <span> CALS</span>
                        </p>
                      </Col>
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        style={{
                          border: "0.2px solid #F2F2F2",
                          marginBottom: "5px",
                        }}
                      ></Col>
                      <Col xs={17} sm={17} md={17} lg={17}>
                        <div style={{ display: "flex" }}>
                          <p
                            style={{
                              marginRight: "10px",
                              textAlign: "center",
                              background: "#000",
                              color: "#fff",
                              width: "25px",
                              paddingTop: "3px",
                            }}
                          >
                            SN
                          </p>
                          <p style={{ paddingTop: "5px" }}>Snack name</p>
                        </div>
                      </Col>
                      <Col xs={7} sm={7} md={7} lg={7}>
                        <p
                          style={{
                            paddingTop: "5px",
                            color: "rgba(41, 184, 196, 1)",
                          }}
                        >
                          600 <span> CALS</span>
                        </p>
                      </Col> */}
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        style={{
                          border: "0.2px solid #F2F2F2",
                          marginBottom: "5px",
                        }}
                      ></Col>
                      <Col xs={17} sm={17} md={17} lg={17}>
                        <h2
                          style={{
                            // textAlign: "center",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                            fontWeight: "900",
                          }}
                        >
                          ACTIVE CALORIES
                        </h2>
                      </Col>
                      <Col xs={7} sm={7} md={7} lg={7}>
                        <p
                          style={{
                            // textAlign: "center",
                            paddingTop: "5px",
                          }}
                        >
                          {(myPlan &&
                            myPlan[0] &&
                            myPlan[0]["total_workout calories"]) ||
                            0}{" "}
                          <span> CALS</span>
                        </p>
                      </Col>

                      {todayWorkouts.map((item) => (
                        <>
                          <Col xs={17} sm={17} md={17} lg={17}>
                            <div style={{ display: "flex" }}>
                              <p
                                style={{
                                  marginRight: "10px",
                                  textAlign: "center",
                                  background: "#000",
                                  color: "#fff",
                                  width: "25px",
                                  paddingTop: "3px",
                                }}
                              >
                                B{" "}
                              </p>
                              <p style={{ paddingTop: "5px" }}>
                                {item.programmable_user.title}
                              </p>
                            </div>
                          </Col>
                          <Col xs={7} sm={7} md={7} lg={7}>
                            <p
                              style={{
                                paddingTop: "5px",
                                color: "rgba(41, 184, 196, 1)",
                              }}
                            >
                              {item.programmable_user.calories}{" "}
                              <span> CALS</span>
                            </p>
                          </Col>
                        </>
                      ))}
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        style={{
                          border: "0.2px solid #F2F2F2",
                          marginBottom: "5px",
                        }}
                      ></Col>
                    </Row>
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

export default Calories;
