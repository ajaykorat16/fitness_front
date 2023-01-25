import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Button,
  Progress,
  Row,
  Col,
  Input,
  Checkbox,
  Image,
} from "antd";
import step from "../../src/img/step.svg";
import DashboardProfile from "./DashboardProfile";
import shoppinglist from "../img/shoppinglist.png";
import WorkoutList from "../routes/dashboard/component/WorkoutList";
import StepModal from "./StepModal";
import WaterModal from "./WaterModal";
import fixbg from "../img/8.svg";
import { FieldTimeOutlined } from "@ant-design/icons";
import Calories from "./Calories";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { S3_BUCKET_URL } from "../config/constants";
import ReactHlsPlayer from "react-hls-player";
import { getStreamableVideo } from "../redux/actions/VideoStreamingAction";

const LeftDashboard = ({ path, filterDates }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { myPlan } = useSelector((state) => state.dashboard);

  const VideoState = useSelector((state) => state.streamableVideo);
  const { streamableVideo } = VideoState;

  const [modalVisible, setModalVisible] = useState(false);
  const [videoID, setVideoId] = useState(null);
  const playerRef = React.useRef();

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (videoID) dispatch(getStreamableVideo(videoID));
  }, [videoID]);

  return (
    <div className="lp-left-profile ">
      <div className="sticky-top">
        <Row gutter={[10, 10]}>
          {path == "calendar" ? null : (
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className="fix-8">
                <img src={fixbg}></img>
              </div>
              <DashboardProfile />
            </Col>
          )}
          <Col xs={24} sm={24} md={24} lg={24}>
            <div className="">
              <div className="activity-box" onClick={showModal}>
                <h3>Activity time</h3>
                <Row
                  gutter={[10, 10]}
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <div className="border-progrss-bpp">
                      <div
                        className="prograss-bar-1"
                        style={{
                          "--value":
                            (myPlan &&
                              myPlan[0] &&
                              Math.trunc(myPlan[0].averagworkoutdurations)) ||
                            0,
                          // (((steps && steps.stepsprogress) || 0) /
                          //   ((steps && steps.dailygoal) || 0)) *
                          // 100,
                        }}
                      >
                        {/* <div className="step-img">
                          <img src={step} alt="" />
                        </div> */}
                      </div>
                    </div>
                    {/* <div className="progressbar-bg">
                      <Progress
                        type="circle"
                        strokeWidth={9}
                        format={(percent) =>
                          `${
                            (myPlan &&
                              myPlan[0] &&
                              Math.trunc(myPlan[0].averagworkoutdurations)) ||
                            0
                          }%`
                        }
                        percent={
                          (myPlan &&
                            myPlan[0] &&
                            Math.trunc(myPlan[0].averagworkoutdurations)) ||
                          0
                        }
                        strokeLinecap="round"
                        success={{
                          percent:
                            (myPlan &&
                              myPlan[0] &&
                              Math.trunc(myPlan[0].averagworkoutdurations)) ||
                            0,
                          strokeColor: "#a039a1",
                        }}
                      />
                    </div> */}
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <div className="activity-text">
                      <h6 className="activity-completed">Completed</h6>
                      <h5>
                        {myPlan &&
                        myPlan[0] &&
                        myPlan[0].completed_workout_duration
                          ? moment
                              .utc(myPlan[0].completed_workout_duration * 1000)
                              .format("HH:mm:ss")
                          : "00:00:00"}
                      </h5>
                      <p>Planned</p>
                      <h6 className="activity-time">
                        {myPlan &&
                        myPlan[0] &&
                        myPlan[0].planned_workout_duration
                          ? moment
                              .utc(myPlan[0].planned_workout_duration * 1000)
                              .format("HH:mm:ss")
                          : "00:00:00"}
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
                    <Col
                      xs={24}
                      sm={24}
                      md={7}
                      lg={74}
                      // style={{ backgroundColor: "#fff" }}
                    >
                      <div className=" activity-box1">
                        <h3
                          style={{ fontSize: "20px", marginTop: "20px" }}
                          className="bold_class"
                        >
                          {/* Activity time */}
                        </h3>
                        <Row gutter={[10, 10]} style={{ marginTop: "40px" }}>
                          <Col xs={12} sm={12} md={12} lg={12}>
                            <div className="border-progrss-bpp">
                              <div
                                className="prograss-bar-1"
                                style={{
                                  "--value":
                                    (myPlan &&
                                      myPlan[0] &&
                                      Math.trunc(
                                        myPlan[0].averagworkoutdurations
                                      )) ||
                                    0,
                                  // (((steps && steps.stepsprogress) || 0) /
                                  //   ((steps && steps.dailygoal) || 0)) *
                                  // 100,
                                }}
                              >
                                {/* <div className="step-img">
                          <img src={step} alt="" />
                        </div> */}
                              </div>
                            </div>
                            {/* <div
                              className="progressbar-bg"
                              style={{
                                display: "flex",
                                justifyContent: "right",
                                alignItems: "center",
                              }}
                            >
                              <Progress
                                type="circle"
                                strokeWidth={9}
                                percent={
                                  myPlan &&
                                  myPlan[0] &&
                                  Math.trunc(myPlan[0].averagworkoutdurations)
                                }
                              /> 
                              <Progress
                                type="circle"
                                strokeWidth={9}
                                strokeColor={"#A708AD"}
                                format={(percent) =>
                                  `${
                                    (myPlan &&
                                      myPlan[0] &&
                                      Math.trunc(
                                        myPlan[0].averagworkoutdurations
                                      )) ||
                                    0
                                  }%`
                                }
                                percent={
                                  (myPlan &&
                                    myPlan[0] &&
                                    Math.trunc(
                                      myPlan[0].averagworkoutdurations
                                    )) ||
                                  0
                                }
                                strokeLinecap="round"
                                success={{
                                  percent:
                                    (myPlan &&
                                      myPlan[0] &&
                                      Math.trunc(
                                        myPlan[0].averagworkoutdurations
                                      )) ||
                                    0,
                                  strokeColor: "#A708AD",
                                }}
                              />
                            </div>   */}
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
                                {myPlan &&
                                myPlan[0] &&
                                myPlan[0].completed_workout_duration
                                  ? moment
                                      .utc(
                                        myPlan[0].completed_workout_duration *
                                          1000
                                      )
                                      .format("HH:mm:ss")
                                  : "00:00:00"}
                              </h5>
                              <p>Planned</p>
                              <h6 className="activity-time">
                                {myPlan &&
                                myPlan[0] &&
                                myPlan[0].planned_workout_duration
                                  ? moment
                                      .utc(
                                        myPlan[0].planned_workout_duration *
                                          1000
                                      )
                                      .format("HH:mm:ss")
                                  : "00:00:00"}
                              </h6>
                            </div>
                          </Col>

                          <Col
                            xs={24}
                            sm={24}
                            md={24}
                            lg={24}
                            style={{
                              marginTop: "20px",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <div>
                              <p style={{ margin: "0px" }}>Activities</p>
                              <h2
                                style={{
                                  fontSize: "36px",
                                  margin: 0,
                                  padding: 0,
                                }}
                              >
                                1/
                                {myPlan &&
                                  myPlan.todayworkout &&
                                  myPlan.todayworkout.length}
                              </h2>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col
                      xs={24}
                      sm={24}
                      md={15}
                      lg={15}
                      style={{ padding: "20px" }}
                    >
                      <h2
                        style={{
                          marginTop: "23PX",
                          fontSize: "23px",
                          textTransform: "uppercase",
                          fontWeight: 800,
                          letterSpacing: "3px",
                        }}
                      >
                        Today’s Workouts
                      </h2>
                      {/* <WorkoutList /> */}

                      <Row>
                        {myPlan &&
                          myPlan.todayworkout &&
                          myPlan.todayworkout.map((item, i) => {
                            if (i < 4) {
                              return (
                                <Col
                                  x={2}
                                  xs={24}
                                  sm={24}
                                  md={6}
                                  lg={6}
                                  key={i}
                                >
                                  <div
                                    style={{
                                      marginBottom: "10px",
                                      height: "240px",
                                      marginRight: "10px",
                                      backgroundColor: "#fff",
                                    }}
                                  >
                                    {item.programmable_user.banner ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          paddingTop: "7px",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <Image
                                          style={{
                                            width: "121px",
                                            height: "114px",
                                          }}
                                          src={
                                            S3_BUCKET_URL +
                                            item.programmable_user.banner
                                          }
                                          preview={false}
                                          alt=""
                                          onClick={() => {
                                            setVideoId(
                                              item.programmable_user.id
                                            );
                                            setModalVisible(true);
                                          }}
                                        />
                                      </div>
                                    ) : (
                                      <Image
                                        src="https://raw-storage-bucket.s3.us-west-2.amazonaws.com/banner_recipe/Pancakes_5234_1652953040_aqgfcdjcf0.png"
                                        alt="image"
                                      />
                                    )}
                                    <h6
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "700",
                                        textAlign: "center",
                                      }}
                                    >
                                      {item.programmable_user.title}
                                    </h6>
                                    <div class="circle-all-ca">
                                      {item.programmable_user
                                        .fitness_level_id === 1 ? (
                                        <>
                                          <h6 className="circle-black-all"></h6>
                                          <h6 className="circle-black"></h6>
                                          <h6 className="circle-black"></h6>
                                        </>
                                      ) : item.programmable_user
                                          .fitness_level_id === 2 ? (
                                        <>
                                          <h6 className="circle-black-all"></h6>
                                          <h6 className="circle-black-all"></h6>
                                          <h6 className="circle-black"></h6>
                                        </>
                                      ) : (
                                        <>
                                          <h6 className="circle-black-all"></h6>
                                          <h6 className="circle-black-all"></h6>
                                          <h6 className="circle-black-all"></h6>
                                        </>
                                      )}
                                    </div>

                                    <h6
                                      style={{
                                        textAlign: "center",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {" "}
                                      <FieldTimeOutlined />
                                      <span style={{ marginLeft: "5px" }}>
                                        {item.programmable_user.duration
                                          ? moment
                                              .utc(
                                                item.programmable_user
                                                  .duration * 1000
                                              )
                                              .format("HH:mm:ss")
                                          : "00:00:00"}
                                      </span>
                                    </h6>

                                    <p
                                      style={{
                                        textAlign: "center",
                                        position: "absolute",

                                        bottom: "3%",
                                        left: " 38%",
                                      }}
                                    >
                                      {" "}
                                      <Checkbox
                                        className="chceks"
                                        defaultChecked
                                      />
                                    </p>
                                  </div>
                                </Col>
                              );
                            }
                          })}
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Modal>

              <Calories />
              <div
                className="activity-box"
                style={{
                  marginTop: "-11px",
                }}
              >
                {/* <h3>Calories</h3>
                <Row gutter={[10, 10]}>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <div className="progressbar-bg progressbar-orange">
                      <Progress type="circle" percent={50} showInfo={false} />
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>                    <div className="activity-text">
                    <h6 className="activity-completed">Calorie Intake</h6>
                    <h5>835/1670</h5>
                    <p>Active Calories</p>
                    <h6 className="activity-time">300/1250</h6>
                  </div>
                  </Col> */}

                {myPlan && myPlan[0] ? (
                  <Row gutter={[10, 10]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="progress-line-all">
                        <div className="progress-text-tp">
                          <p>carbs</p>{" "}
                          <b>{`${
                            Math.trunc(myPlan[0].completedrecipecarbs) || 0
                          }g, ${
                            Math.trunc(myPlan[0].averagrecipecarbs) || 0
                          }% of target`}</b>
                        </div>
                        <div className="progress-line-pur ">
                          <Progress
                            strokeLinecap="square"
                            strokeColor={"#A708AD"}
                            percent={
                              myPlan &&
                              myPlan[0] &&
                              myPlan[0].averagerecipecalories
                                ? Number(myPlan[0].averagrecipecarbs)
                                : 0
                            }
                            showInfo={false}
                          />
                        </div>
                      </div>
                      <div className="progress-line-all">
                        <div className="progress-text-tp">
                          <p>protein</p>{" "}
                          <b>{`${
                            Math.trunc(myPlan[0].completedrecipeprotin) || 0
                          }g, ${
                            Math.trunc(myPlan[0].averagerecipeprotin) || 0
                          }% of target`}</b>
                        </div>
                        <div className="progress-line-pur progress-line-ornge">
                          <Progress
                            strokeLinecap="square"
                            percent={
                              myPlan &&
                              myPlan[0] &&
                              myPlan[0].averagerecipeprotin
                                ? Number(myPlan[0].averagerecipeprotin)
                                : 0
                            }
                            showInfo={false}
                          />
                        </div>
                      </div>
                      <div className="progress-line-all">
                        <div className="progress-text-tp">
                          <p>fat</p>{" "}
                          <b>{`${
                            Math.trunc(myPlan[0].completedrecipefat) || 0
                          }g, ${
                            Math.trunc(myPlan[0].averagerecipefat) || 0
                          }% of target`}</b>
                        </div>
                        <div className="progress-line-pur progress-line-yell">
                          <Progress
                            strokeLinecap="square"
                            percent={
                              myPlan && myPlan[0] && myPlan[0].averagerecipefat
                                ? Number(myPlan[0].averagerecipefat)
                                : 0
                            }
                            showInfo={false}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : null}
              </div>
              <div>
                <StepModal filterDates={filterDates} />
              </div>
              <div>
                <WaterModal filterDates={filterDates} />
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
          </Col>
        </Row>
        <Modal
          visible={modalVisible}
          footer={null}
          className="corecircuitmodel-ccm"
          onCancel={() => {
            const pauseData = playerRef.current.pause();
            setModalVisible(false);
          }}
        >
          <ReactHlsPlayer
            playerRef={playerRef}
            src={streamableVideo.url}
            autoPlay={true}
            controls={true}
            width="100%"
            height="auto"
          />
        </Modal>
      </div>
    </div>
  );
};

export default LeftDashboard;
