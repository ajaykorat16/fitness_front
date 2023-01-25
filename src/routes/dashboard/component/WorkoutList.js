import React, { useEffect, useState } from "react";
import { Row, Col, Image, Modal } from "antd";
import {
  ClockCircleOutlined,
  EyeOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { S3_BUCKET_URL } from "../../../config/constants";
import videoimg from "../../../img/8.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactHlsPlayer from "react-hls-player";
import { getStreamableVideo } from "../../../redux/actions/VideoStreamingAction";

const WorkoutList = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const VideoState = useSelector((state) => state.streamableVideo);
  const { streamableVideo } = VideoState;

  const [modalVisible, setModalVisible] = useState(false);
  const [videoID, setVideoId] = useState(null);
  const playerRef = React.useRef();

  useEffect(() => {
    if (videoID) dispatch(getStreamableVideo(videoID));
  }, [videoID]);

  return (
    <div>
      <div className="workoutlist_wl">
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={12} lg={12}>
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
                src={data.banner ? S3_BUCKET_URL + data.banner : videoimg}
                preview={false}
              />
              <PlayCircleOutlined
                className="player-video-pvp"
                style={{ fontSize: "32px" }}
                onClick={() => {
                  setVideoId(data.id);
                  setModalVisible(true);
                }}
              />
              <div className="icons_btn-vltop">
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
                  <b>
                    {" "}
                    {data.fitness_level_id === 1
                      ? "Beginner"
                      : data.fitness_level_id === 2
                      ? "INTERMEDIATE"
                      : "Advanced"}
                  </b>
                </div>
                <p>
                  <ClockCircleOutlined />
                  {new Date(parseInt(data.duration || 0) * 1000)
                    .toISOString()
                    .substr(11, 8) || "N/A"}
                </p>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="workoutlist-text">
              <h4 className="workoutlist-completed">
                {data.title ? data.title : "N/A"}
              </h4>
              <p>
                {data.category_data &&
                  data.category_data.map((item, i) =>
                    i === data.category_data.length - 1
                      ? item.name
                      : item.name + ","
                  )}
              </p>
              <p
                style={{
                  height: "80px",
                }}
              >
                {data.description && data.description.length > 150
                  ? data.description.substring(0, 150)
                  : data.description}
                ...
              </p>
              {Boolean(data.equipment_data) ? (
                <>
                  <b>Equipment</b>
                  <div className="coaches-ac">
                    <ul>
                      {data.equipment_data &&
                        data.equipment_data.map((item, i) => (
                          <li>
                            <p className="coaches-w coaches-bg">{item.name}</p>
                          </li>
                        ))}
                    </ul>
                  </div>
                </>
              ) : null}

              <div
                className="icons_btn-vl"
                style={{
                  marginTop: "12px",
                }}
              >
                {Boolean(data.coache_data) ? (
                  <div className="Ashley-name-c">
                    <b>Coach</b>
                    {data.coache_data &&
                      data.coache_data.map((item, i) => (
                        <span style={{ display: "flex" }}>
                          <p>{item.name}</p>
                        </span>
                      ))}
                  </div>
                ) : null}

                <span
                  className="icons-view-iv"
                  onClick={() => navigate("/workout-details/" + data.id)}
                >
                  <EyeOutlined /> View
                </span>
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

export default WorkoutList;
