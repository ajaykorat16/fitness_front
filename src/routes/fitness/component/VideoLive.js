import React, { useEffect, useState } from "react";
import { Row, Col, Image, Modal, Button, Calendar, message } from "antd";
import {
  StarOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  PlayCircleOutlined,
  EyeOutlined,
  StarFilled,
} from "@ant-design/icons";
import { MUX_PLAYBACK_URL, S3_BUCKET_URL } from "../../../config/constants";
import videoimg from "../../../img/8.svg";
import { useNavigate } from "react-router-dom";
import {
  addFavouriteWorkoutDetails,
  addNewSchedule,
  addToFavouriteWorkout,
  addToLiveFavourite,
  TodayFavouriteWorkout,
} from "../../../redux/actions/fitnessAction";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import AddToCalendar from "../../../components/AddToCalendar";
import { coachFavouriteWorkout } from "../../../redux/actions/CoachAction";

const VideoLive = ({ data, modalShow, videoId, path, setSteamPath }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const workoutState = useSelector((state) => state.fitness);
  const { loading } = workoutState;
  const [flag, setFlag] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [payload, setPayload] = useState({
    programmable_user_type: "App\\Models\\Workout",
    programmable_user_id: data.id,
    program_date: moment().format("Y-MM-D"),
  });

  const addWorkoutToCalendar = async (target_date) => {
    const newPayload = await {
      ...payload,
      program_date: target_date.format("YYYY-MM-DD"),
      workout_type_id: data.workout_type_id,
    };
    dispatch(addNewSchedule(newPayload));
    setFlag(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (flag) navigate("/calendar");
  }, [flag]);

  return (
    <div className="liveview-vl">
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
            <Image
              src={data && data.thumb ? S3_BUCKET_URL + data.thumb : videoimg}
              preview={false}
            />
            <div style={{ position: "absolute", top: 6, left: 8 }}>
              {path == "liveSteaming" ? (
                data.workout_mux_relations.status == 1 ? (
                  <p
                    style={{
                      padding: "0px 8px",
                      color: "#fff",
                      backgroundColor: "#29B8C4",
                      fontSize: "14px",
                    }}
                  >
                    Live
                  </p>
                ) : (
                  <p
                    style={{
                      padding: "0px 8px",
                      backgroundColor: "#E0E0E0",
                      fontSize: "12px",
                    }}
                  >
                    {moment
                      .utc(`${data.publish_date} ${data.publish_time}:00`)
                      .local()
                      .format("DD/MM/YYYY h:mm A")}
                  </p>
                )
              ) : null}
            </div>
            <PlayCircleOutlined
              className="player-video-pvp"
              style={{ fontSize: "32px" }}
              onClick={() => {
                modalShow(true);
                videoId(data.id);
                data.workout_mux_relations != null &&
                data.workout_video_type == "GO_LIVE"
                  ? setSteamPath([
                      data.workout_video_type,
                      MUX_PLAYBACK_URL +
                        data.workout_mux_relations.playbackId +
                        ".m3u8",
                    ])
                  : data.workout_mux_relations != null &&
                    data.workout_video_type == "MUX"
                  ? setSteamPath([
                      data.workout_video_type,
                      MUX_PLAYBACK_URL +
                        data.workout_mux_relations.playbackVideo +
                        ".m3u8",
                    ])
                  : setSteamPath([data.workout_video_type, ""]);
              }}
            />
            <div className="icons_btn-vltop">
              {Boolean(data.fitness_level) ? (
                <div className="fitning-videoy">
                  <div className="circle-all-ca">
                    {data.fitness_level.id === 1 ? (
                      <>
                        <h6 className="circle-black-all"></h6>
                        <h6 className="circle-black"></h6>
                        <h6 className="circle-black"></h6>
                      </>
                    ) : data.fitness_level.id === 2 ? (
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
                  <b>{data.fitness_level.name}</b>
                </div>
              ) : Boolean(data.fitness_level_id) ? (
                <div className="fitning-videoy">
                  <div className="circle-all-ca">
                    {data.fitness_level_id === 1 ? (
                      <>
                        <h6 className="circle-black-all"></h6>
                        <h6 className="circle-black"></h6>
                        <h6 className="circle-black"></h6>
                      </>
                    ) : data.fitness_level_id === 2 ? (
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
                  {/* <b>{data.fitness_level.name}</b> */}
                </div>
              ) : null}

              <p>
                <ClockCircleOutlined />
                {new Date(data.duration * 1000).toISOString().substr(11, 8) ||
                  "N/A"}
              </p>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div
            className="livetext-vl bg-ht-bh"
            style={{ backgroundColor: "#FDFDFD" }}
          >
            <span className="livemain-vl">
              <h2>{data.title ? data.title : "N/A"}</h2>
              <p>
                {/* {data.category_data.map((item, i) =>
                  i === data.category_data.length - 1
                    ? item.name
                    : item.name + ","
                )} */}
                {data && data.workout_type && data.workout_type.name}
              </p>
            </span>
            <p className="livedes-vl">
              {data.description && data.description.length > 150
                ? data.description.substring(0, 150)
                : data.description}
              ...
            </p>
            <span className="liveequip-vl">
              <b>Equipment</b>
            </span>
            <div className="coaches-ac">
              <ul>
                {data.equipment_data.map((item, i) => (
                  <li>
                    <p className="coaches-w coaches-bg">{item.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="icons_btn-vl"
              style={{ position: "absolute", bottom: 3, width: "90%" }}
            >
              {Boolean(data.coache_data) ? (
                <div className="Ashley-name-c">
                  <b>Coach</b>
                  <span style={{ display: "flex" }}>
                    {data.coache_data &&
                      data.coache_data.map((item, i) => {
                        if (i < 2) {
                          return <p>{item.name}</p>;
                        }
                      })}
                  </span>
                </div>
              ) : null}
              <span
                className="icons-vl"
                style={{
                  paddingTop: "7px",
                  // marginLeft: "150px",
                }}
              >
                {data.is_favorite_count == 1 ||
                (data.is_favorite && data.is_favorite.length == 1) ? (
                  <StarFilled
                    onClick={() =>
                      path == "workoutDetails"
                        ? dispatch(
                            addFavouriteWorkoutDetails(
                              data.id,
                              data.is_favorite_count
                            )
                          )
                        : path == "today_workout"
                        ? dispatch(
                            TodayFavouriteWorkout(
                              data.id,
                              data.is_favorite_count
                            )
                          )
                        : path == "coachWorkout"
                        ? dispatch(
                            coachFavouriteWorkout(
                              data.id,
                              data.is_favorite_count
                            )
                          )
                        : path == "liveSteaming"
                        ? dispatch(
                            addToLiveFavourite(data.id, data.is_favorite_count)
                          )
                        : dispatch(
                            addToFavouriteWorkout(
                              data.id,
                              data.is_favorite_count
                            )
                          )
                    }
                  />
                ) : (
                  <StarOutlined
                    onClick={() =>
                      path == "workoutDetails"
                        ? dispatch(
                            addFavouriteWorkoutDetails(
                              data.id,
                              data.is_favorite_count
                            )
                          )
                        : path == "today_workout"
                        ? dispatch(
                            TodayFavouriteWorkout(
                              data.id,
                              data.is_favorite_count
                            )
                          )
                        : path == "coachWorkout"
                        ? dispatch(
                            coachFavouriteWorkout(
                              data.id,
                              data.is_favorite_count
                            )
                          )
                        : dispatch(
                            addToFavouriteWorkout(
                              data.id,
                              data.is_favorite_count
                            )
                          )
                    }
                  />
                )}

                <EyeOutlined
                  onClick={() => navigate("/workout-details/" + data.id)}
                />
                <CalendarOutlined onClick={() => setIsModalVisible(true)} />
              </span>
            </div>
          </div>
          <AddToCalendar
            isModalVisible={isModalVisible}
            setIsModalVisible={closeModal}
            addToCalendar={addWorkoutToCalendar}
            buttonLoading={loading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default VideoLive;
