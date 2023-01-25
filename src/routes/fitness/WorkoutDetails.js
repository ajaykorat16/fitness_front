import React, { useEffect, useState } from "react";
import { Row, Col, Spin, Modal, Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";

import VideoLive from "./component/VideoLive";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getWorkoutDetails,
  WorkoutComplete,
} from "../../redux/actions/fitnessAction";
import { MUX_PLAYBACK_URL, S3_BUCKET_URL } from "../../config/constants";
import Coaches from "../fitnessplan/component/Coach";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import black from "../../img/doc-thumnail.png";
import ReactHlsPlayer from "react-hls-player/dist";
import { getStreamableVideo } from "../../redux/actions/VideoStreamingAction";
import {
  StarOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  PlayCircleOutlined,
  EyeOutlined,
  StarFilled,
} from "@ant-design/icons";

const WorkoutDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fitnessState = useSelector((state) => state.fitness);
  const { fitnessDetails, loading } = fitnessState;

  const [modalVisible, setModalVisible] = useState(false);
  const [CompleteBTNFlag, setCompleteBTNFlag] = useState(false);
  const [videoID, setVideoId] = useState(null);
  const playerRef = React.useRef();

  const VideoState = useSelector((state) => state.streamableVideo);
  const { streamableVideo } = VideoState;

  useEffect(() => {
    if (videoID) dispatch(getStreamableVideo(videoID));
  }, [videoID]);

  useEffect(() => {
    dispatch(getWorkoutDetails(id));
  }, [id]);

  const CompleteWorkout = async () => {
    await dispatch(WorkoutComplete(fitnessDetails.workout_progress.id));
    dispatch(getWorkoutDetails(id));
  };

  useEffect(() => {
    CompleteButtonCheck();
  }, [fitnessDetails]);

  const CompleteButtonCheck = () => {
    fitnessDetails.today_workout &&
      fitnessDetails.today_workout.map((item, i) => {
        if (fitnessDetails.id == item.programmable_user.id) {
          setCompleteBTNFlag(true);
          return;
        }
      });
  };

  const data = {
    id: "1",
    banner:
      "https://api.time.com/wp-content/uploads/2020/03/gym-coronavirus.jpg",
    video_path: "videol",
    duration: "55",
    title: "heaing",
    category_data: [],
    description: "text",
  };
  return (
    <>
      {loading ? (
        <div className="new_container">
          <div className="">
            <Skeleton height={500} />
          </div>
        </div>
      ) : (
        <div>
          <div className="side_container">
            <Row gutter={[20, 20]}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="rp-right-profile">
                  <Row gutter={[20, 20]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="backbtn-a">
                        <h2 onClick={() => navigate(-1)}>
                          <LeftOutlined /> Back
                        </h2>
                      </div>
                      <div className="livesessions-f ">
                        <h2>{fitnessDetails.title}</h2>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="coaching-artical-img">
                        <div
                          className="liveplayvideo-lg0"
                          style={{
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <img
                            src={
                              fitnessDetails.banner
                                ? S3_BUCKET_URL + fitnessDetails.banner
                                : black
                            }
                            alt="banner"
                          ></img>
                          <PlayCircleOutlined
                            className="ahul"
                            onClick={() => {
                              setVideoId(fitnessDetails.id);
                              setModalVisible(true);
                            }}
                            // className="player-video-pvp "
                            // style={{ fontSize: "100px" }}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={19} lg={19}>
                      <div className="date-user-high">
                        {Boolean(fitnessDetails.fitness_level) ? (
                          <div className="fitning-videoy">
                            <div className="circle-all-ca">
                              {fitnessDetails.fitness_level.id === 1 ? (
                                <>
                                  <h6 className="circle-black-all"></h6>
                                  <h6 className="circle-black"></h6>
                                  <h6 className="circle-black"></h6>
                                </>
                              ) : fitnessDetails.fitness_level.id === 2 ? (
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
                            <b>{fitnessDetails.fitness_level.name}</b>
                          </div>
                        ) : null}
                        <div className="date-duh">
                          <div className="coaches-ac">
                            <ul>
                              {fitnessDetails.category_data &&
                                fitnessDetails.category_data.map((item, i) => (
                                  <li>
                                    <p className="coaches-w coaches-bg">
                                      {item.name}
                                    </p>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={5} lg={5}>
                      <div className="trofybutton_tcc">
                        {/* {CompleteBTNFlag ?(
                          <Button
                            onClick={CompleteWorkout}
                            disabled={Boolean(
                              fitnessDetails.workout_progress.complete_status
                            )}
                          >
                            Completed as planned
                          </Button>
                        ) : null} */}
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="bottom-line"></div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="equipment-workout">
                        <p className="equ-para">{fitnessDetails.description}</p>
                        <div className="coaches-ac">
                          <h2>equipment</h2>
                          <ul>
                            {fitnessDetails.equipment_data &&
                              fitnessDetails.equipment_data.map((item, i) => (
                                <li>
                                  <p className="coaches-w coaches-bg">
                                    {item.name}
                                  </p>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </Col>
                    {fitnessDetails.user ? (
                      <>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div class="personal_title">
                            <h2>Coaches</h2>
                          </div>
                        </Col>
                        {fitnessDetails &&
                          fitnessDetails.coache_data.map((state, i) => (
                            <Col xs={24} sm={24} md={24} lg={24}>
                              <Coaches data={state} index={i} />
                            </Col>
                          ))}
                      </>
                    ) : null}

                    {Boolean(fitnessDetails.today_workout) &&
                    fitnessDetails.today_workout.length > 0 ? (
                      <>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="livesessions-f">
                            <h2>Today's Workouts</h2>
                          </div>
                        </Col>
                        {fitnessDetails.today_workout &&
                          fitnessDetails.today_workout.map((item, i) => {
                            return (
                              <Col xs={24} sm={24} md={6} lg={6} key={i}>
                                <VideoLive
                                  data={item.programmable_user}
                                  modalShow={setModalVisible}
                                  videoId={setVideoId}
                                  path={"today_workout"}
                                />
                              </Col>
                            );
                          })}
                      </>
                    ) : null}

                    {Boolean(fitnessDetails.recommended_workout) &&
                    fitnessDetails.recommended_workout.length > 0 ? (
                      <>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="livesessions-f">
                            <h2>Recommended WORKOUTS</h2>{" "}
                          </div>
                        </Col>
                        {fitnessDetails.recommended_workout &&
                          fitnessDetails.recommended_workout.map((item, i) => {
                            return (
                              <Col xs={24} sm={24} md={6} lg={6} key={i}>
                                <VideoLive
                                  data={item}
                                  modalShow={setModalVisible}
                                  videoId={setVideoId}
                                  path={"workoutDetails"}
                                />
                              </Col>
                            );
                          })}
                      </>
                    ) : null}
                  </Row>
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
              {/* {console.log("playid--", fitnessDetails &&
                  ((fitnessDetails.workout_video_type == "GO_LIVE" &&
                    fitnessDetails.workout_mux_relations &&
                    fitnessDetails.workout_mux_relations.status &&
                    fitnessDetails.workout_mux_relations.status == 2) ||
                    fitnessDetails.workout_video_type == "MUX")
                    ? MUX_PLAYBACK_URL +
                      fitnessDetails.workout_mux_relations.playbackVideo
                    : fitnessDetails.workout_video_type == "GO_LIVE" &&
                      fitnessDetails.workout_mux_relations &&
                      fitnessDetails.workout_mux_relations.status &&
                      fitnessDetails.workout_mux_relations.status == 1
                    ? MUX_PLAYBACK_URL +
                      fitnessDetails.workout_mux_relations.playbackId
                    : streamableVideo.url)} */}
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
      )}
    </>
  );
};

export default WorkoutDetails;
