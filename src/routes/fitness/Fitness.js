import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Input, Pagination } from "antd";
import FitnessLeft from "./component/FitnessLeft";
import VideoLive from "./component/VideoLive";
import {
  getLiveWorkout,
  getWorkoutVideos,
  searchWorkoutVideos,
} from "../../redux/actions/fitnessAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
// import { CloudOutlined } from "@ant-design/icons";
import dumble from "../../img/dumble.png";
import { CardSkeleton } from "./component/CardSkeleton";
// import VideoPlayer from "../../components/VideoPlayer";

// import { Player } from "video-react";
// import HLSSource from "../../components/HLSSource";
import "video-react/dist/video-react.css";

import ReactHlsPlayer from "react-hls-player";
import { getStreamableVideo } from "../../redux/actions/VideoStreamingAction";
import moment from "moment";

const Fitness = () => {
  var params = new URLSearchParams(useLocation().search);
  const parsedQuery = paramsToObject(params.entries());

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Search } = Input;
  const workoutState = useSelector((state) => state.fitness);
  const { workoutVideos, workoutPaginationObj, loading, liveSession } =
    workoutState;

  var query = queryString.parse(useLocation().search);
  const [load, setLoad] = useState(true);
  const [pageload, setPageLoad] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoID, setVideoId] = useState(null);
  const [steamVideo, setSteamVideo] = useState([]);
  const [workoutList, setWorkoutList] = useState([]);
  const [steamPath, setSteamPath] = useState([]);

  const playerRef = React.useRef();

  useEffect(() => {
    dispatch(getLiveWorkout(query));
  }, []);
  useEffect(() => {
    collectPageData();
  }, [useLocation().search]);

  const VideoState = useSelector((state) => state.streamableVideo);
  const { streamableVideo } = VideoState;

  useEffect(() => {
    if (videoID) dispatch(getStreamableVideo(videoID));
  }, [videoID]);

  function paramsToObject(entries) {
    const result = {};
    for (const [key, value] of entries) {
      result[key] = value;
    }
    return result;
  }

  const collectPageData = async () => dispatch(getWorkoutVideos(query));

  const startSearching = (value) => dispatch(searchWorkoutVideos(value));

  const paginateWorkouts = (page) => {
    parsedQuery.page = String(page);
    navigate("/workouts?" + new URLSearchParams(parsedQuery).toString());
  };

  useEffect(() => {
    loading == false && workoutVideos && workoutVideos.length > 0
      ? setLoad(true)
      : setLoad(false);

    if (loading == false) {
      setTimeout(() => {
        setPageLoad(true);
      }, 3000);
    }
  }, [loading]);

  useEffect(() => {
    if (workoutVideos) {
      streamingVideo();
    }
  }, [workoutVideos]);

  const streamingVideo = async () => {
    const videoList = await workoutVideos.filter((steam) => {
      let dT = moment
        .utc(`${steam.publish_date} ${steam.publish_time}:00`)
        .local()
        .format("YYYY-MM-DD");
      let DT = moment(dT).isSameOrAfter(moment().format("YYYY-MM-DD"));

      return (
        steam.workout_mux_relations != null &&
        steam &&
        steam.workout_mux_relations &&
        steam.workout_mux_relations.status != 2 &&
        DT
      );
    });

    const WorkoutList = await workoutVideos.filter((steam) => {
      let dT = moment
        .utc(`${steam.publish_date} ${steam.publish_time}:00`)
        .local()
        .format("YYYY-MM-DD");
      let DT = moment(dT).isSameOrBefore(moment().format("YYYY-MM-DD"));
      return (
        (steam &&
          steam.workout_mux_relations &&
          steam.workout_mux_relations.status != 0) ||
        DT
      );
    });

    setSteamVideo(videoList);
    setWorkoutList(WorkoutList);
  };

  return (
    <div>
      <div className="side_container">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={6} lg={6}>
            <FitnessLeft />
          </Col>
          <Col xs={24} sm={24} md={18} lg={18}>
            <div className="rp-right-profile">
              <div className="searchbar_f">
                <Search
                  placeholder="Search"
                  onChange={(e) => startSearching(e.target.value)}
                  onSearch={startSearching}
                />
              </div>
              {loading ? (
                <CardSkeleton />
              ) : (
                <>
                  {liveSession && liveSession.length > 0 ? (
                    <div className="livesessions-f">
                      <h2>Live Sessions</h2>
                    </div>
                  ) : null}
                  <Row gutter={[16, 16]}>
                    {liveSession && liveSession.length > 0
                      ? liveSession.map((data, index) => (
                          <Col xs={24} sm={24} md={8} lg={8} key={index}>
                            <VideoLive
                              data={data}
                              video_spath={data.video_path}
                              title={data.title}
                              description={data.description}
                              modalShow={setModalVisible}
                              videoId={setVideoId}
                              path={"liveSteaming"}
                              setSteamPath={setSteamPath}
                            />
                          </Col>
                        ))
                      : null}
                  </Row>
                  <div className="livesessions-f">
                    <h2>Workouts</h2>
                  </div>
                  <Row gutter={[16, 16]}>
                    {workoutVideos && workoutVideos.length > 0 ? (
                      workoutVideos.map((data, index) => (
                        <Col xs={24} sm={24} md={8} lg={8} key={index}>
                          <VideoLive
                            data={data}
                            video_spath={data.video_path}
                            title={data.title}
                            description={data.description}
                            modalShow={setModalVisible}
                            videoId={setVideoId}
                            path={"workout"}
                            setSteamPath={setSteamPath}
                          />
                        </Col>
                      ))
                    ) : load ? (
                      <div className="notfound-nf">
                        <img src={dumble}></img>
                        <h1>
                          Videos <b> not found!</b>
                        </h1>
                      </div>
                    ) : null}
                  </Row>
                  {loading ? null : (
                    <Row>
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {pageload &&
                        workoutPaginationObj.last_page_url !== null &&
                        pageload ? (
                          <Pagination
                            defaultCurrent={1}
                            pageSize={workoutPaginationObj.per_page || 12}
                            current={workoutPaginationObj.current_page}
                            total={workoutPaginationObj.total}
                            onChange={paginateWorkouts}
                          />
                        ) : null}
                      </Col>
                    </Row>
                  )}
                </>
              )}
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
          style={{ height: "400px" }}
        >
          {/* steamPath[0] == "GO_LIVE" || steamPath[0] == "MUX"
                ? steamPath[1]
                : streamableVideo.url */}
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

export default Fitness;
