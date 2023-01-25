import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Input, Pagination } from "antd";
import CoachingFilter from "./component/CoachingFilter";
import VideoLive from "../fitness/component/VideoLive";
import { useDispatch, useSelector } from "react-redux";
import { CoachNextPage, getCoach, getLiveStream } from "../../redux/actions/CoachAction";
import { CardSkeleton } from "../fitness/component/CardSkeleton";
import dumble from "../../../src/img/dumble.png";
import { useNavigate } from "react-router-dom";
import ReactHlsPlayer from "react-hls-player";
import "video-react/dist/video-react.css";
import queryString from "query-string";
import moment from "moment";
import RAW from "../../api/raw";


const Coaching = () => {
  const { Search } = Input;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playerRef = React.useRef();

  // var params = new URLSearchParams(useLocation().search);
  // const parsedQuery = paramsToObject(params.entries());

  const { coachs, loading } = useSelector((state) => state.coach);
  const VideoState = useSelector((state) => state.streamableVideo);
  const { streamableVideo } = VideoState;

  const [steamVideo, setSteamVideo] = useState([]);
  const [workoutList, setWorkoutList] = useState([]);
  const [steamPath, setSteamPath] = useState([]);
  const [LiveData, setLiveData] = useState([]);
  const [load, setLoad] = useState(true);
  const [videoID, setVideoId] = useState(null);
  const [pageload, setPageLoad] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loading == false && coachs && coachs.data.length > 0
      ? setLoad(true)
      : setLoad(false);

    if (loading == false) {
      setTimeout(() => {
        setPageLoad(true);
      }, 3000);
    }
  }, [loading]);

  function showTotal(total) {
    return `Total ${total} items`;
  }

  const paginateWorkouts = (page) => {
    console.log("test------------", page);
    dispatch(CoachNextPage(page));
    // parsedQuery.page = String(page);
    // navigate("/workouts?" + new URLSearchParams(parsedQuery).toString());
  };

  useEffect(() => {
    // dispatch(getLiveStream());
    dispatch(getCoach());
  }, []);

  // const getLiveStream = async () => {
   
  //   console.log("cosches livestream--------------------------", response.data.data.data)
  //   setSteamVideo(response.data.data.data)
  // }

  useEffect(() => {
    if (coachs) {
      streamingVideo();
    }
  }, [coachs]);

  const streamingVideo = async () => {
    // console.log("cocha----------------------",coachs.data)
    const videoList =
      (await coachs) &&
      coachs.data.filter((steam) => {
        return (
          steam.workout_mux_relations != null &&
          moment(steam.publish_date).format("L") >= moment().format("L")
        );
      });

    const WorkoutList =
      (await coachs) &&
      coachs.data.filter((steam) => {
        return (
          steam.workout_mux_relations == null ||
          moment(steam.publish_date).format("L") <= moment().format("L")
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
            <CoachingFilter />
          </Col>
          <Col xs={24} sm={24} md={18} lg={18}>
            <div className="rp-right-profile">
              <div className="searchbar_f">
                <Search placeholder="Search" />
              </div>
              {loading ? (
                <CardSkeleton />
              ) : (
                <>
                {
                  steamVideo && steamVideo.length > 0 ?
                  <>
                  <div className="livesessions-f">
                    <h2>Live Sessions</h2>
                  </div>
                  <Row gutter={[16, 16]}>
                    { 
                      steamVideo.map((data, index) => (
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
                    }
                  </Row>
                  </> : null
                }
                 
                  {/* <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="pagination-icon">
                        <Pagination size="small" total={12} />
                      </div>
                    </Col>
                  </Row> */}
                  <div className="livesessions-f">
                    <h2>Video galery</h2>
                  </div>
                  <Row gutter={[16, 16]}>
                    {workoutList && workoutList.length > 0 ? (
                      workoutList.map((data, index) => (
                        <Col xs={24} sm={24} md={8} lg={8} key={index}>
                          <VideoLive
                            data={data}
                            video_spath={data.video_path}
                            title={data.title}
                            description={data.description}
                            modalShow={setModalVisible}
                            videoId={setVideoId}
                            path={"coachWorkout"}
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
                        coachs.last_page_url !== null &&
                        pageload ? (
                          <Pagination
                            defaultCurrent={1}
                            pageSize={coachs.per_page || 12}
                            current={coachs.current_page}
                            total={coachs.total}
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
        >
          {/* console.log("mux-----------------",steamPath[0] == "liveSteaming"? steamPath[1] :streamableVideo.url ) */}
          <ReactHlsPlayer
            playerRef={playerRef}
            src={ steamPath[0] == "liveSteaming"? steamPath[1] :streamableVideo.url}
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

export default Coaching;
