import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Calendar, Button, message, Spin } from "antd";
import moment from "moment";

import { LeftOutlined } from "@ant-design/icons";
import FitnessBanner from "./component/FitnessBanner";
import Workout from "./component/Workout";
import Coach from "./component/Coach";
import RelatedFitnessPlans from "./component/RelatedFitnessPlans";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeClashCheckFlag,
  checkProgramClash,
  getProgramDetails,
  signUpForProgram,
  signUpProgramBySuggestic,
} from "../../redux/actions/program/program";
import ProgramsModel from "../program/component/ProgramsModel";
import ProfileSidebar from "../myprofile/component/ProfileSidebar";
import Coaches from "./component/Coach";
import "video-react/dist/video-react.css";
import ReactHlsPlayer from "react-hls-player";
import { getStreamableVideo } from "../../redux/actions/VideoStreamingAction";
import AddToCalendar from "../../components/AddToCalendar";

const FitnessPlan = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startDay, setStartDay] = React.useState(moment().format("Y-MM-D"));
  const [selectedProgram, setSelectedProgram] = React.useState(undefined);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isUpgradeModalVisible, setUpgradeModalVisible] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoID, setVideoId] = useState(null);
  const [programDay, setProgramDay] = React.useState(1);

  const playerRef = React.useRef();

  const userState = useSelector((state) => state.user);
  const { userDetails } = userState;

  const nutrition = useSelector((state) => state.nutrition);
  const { nutritionData } = nutrition;

  const VideoState = useSelector((state) => state.streamableVideo);
  const { streamableVideo } = VideoState;

  const programState = useSelector((state) => state.programs_data);
  const {
    programDetails,
    loading,
    clashedProgramsCount,
    signupFlag,
    clashCheckFlag,
  } = programState;

  useEffect(() => {
    collectPageData();
  }, [id]);

  const collectPageData = async () => {
    await dispatch(getProgramDetails(id));
    setLocalLoading(false);
  };

  /* Start::Calendar functions */
  function onSelectDate(date) {
    setStartDay(date.format("YYYY-MM-DD"));
  }

  function disabledDate(current) {
    return current && current.valueOf() < Date.now();
  }
  /* End:: Calendar functiona */

  /* Start :: Program Signup & clash check functions */
  // const initiateSignUp = (consent) => {
  //   if (selectedProgram === undefined) {
  //     message.error("Please select a program first!");
  //   } else {
  //     dispatch(
  //       signUpForProgram({
  //         program_id: selectedProgram,
  //         start_date: startDay,
  //         delete_previously_enrolled: consent,
  //       })
  //     );
  //   }
  // };

  const initProgramClash = () => {
    if (selectedProgram === undefined) {
      message.error("Please select a program first!");
    } else {
      dispatch(
        checkProgramClash({
          program_id: selectedProgram,
          start_date: startDay,
        })
      );
    }
  };
  /* End :: Program Signup & clash check functions */

  /* Start :: show repeat events consent modal */
  const showUserConsentModal = () => {
    setIsPopupVisible(true);
  };

  useEffect(() => {
    if (clashCheckFlag) showUserConsentModal(true);
  }, [clashCheckFlag]);
  /* End :: show repeat events consent modal */

  /* Start :: Navigate user after success signup */
  useEffect(() => {
    if (signupFlag) navigate("/calendar");
  }, [signupFlag]);
  /* End :: Navigate user after success signup */

  useEffect(() => {
    let data = "?program=program";
    if (videoID) dispatch(getStreamableVideo(videoID, data));
  }, [videoID]);

  const closeModal = () => {
    setIsModalVisible(false);
    dispatch(changeClashCheckFlag(false));
  };

  const addProgramToCalendar = async (target_date) => {
    await setStartDay(target_date.format("YYYY-MM-DD"));
    // userDetails.user_programs_count > 0
    userDetails.user_program_only.length > 0
      ? initProgramClash()
      : initiateSignUp(false);
  };

  const initiateSignUp = async (consent) => {
    if (selectedProgram === undefined) {
      message.error("Please select a program first!");
    } else {
      await dispatch(
        signUpForProgram({
          program_id: selectedProgram,
          start_date: startDay,
          delete_previously_enrolled: consent,
        })
      );

      if (nutritionData) {
        const data = {
          calories: Math.ceil(nutritionData.calorie_intake_target),
          carbs: Number(nutritionData.carb / 100).toFixed(2),
          protein: Number(nutritionData.protein / 100).toFixed(2),
          fat: Number(nutritionData.fat / 100).toFixed(2),
          days: programDetails && programDetails.days,
          user_id: userDetails.id,
          program_Id: selectedProgram,
          // user_program_status: 68,
          program_date: startDay,
        };
        console.log("programDay--test-------", data);
        dispatch(signUpProgramBySuggestic(data));
      }
    }
    setIsModalVisible(false);
    setIsPopupVisible(false);
    navigate("/calendar");
  };

  const ModalAPi = async () => {
    setIsPopupVisible(false);
    await dispatch(changeClashCheckFlag(false));
    if (nutritionData) {
      const data = {
        calories: Math.ceil(nutritionData.calorie_intake_target),
        carbs: Number(nutritionData.carb / 100).toFixed(2),
        protein: Number(nutritionData.protein / 100).toFixed(2),
        fat: Number(nutritionData.fat / 100).toFixed(2),
        days: programDetails && programDetails.days,
        user_id: userDetails.id,
        program_Id: selectedProgram,
        program_date: startDay,
      };
      console.log("programDay--test-------", data);
      dispatch(signUpProgramBySuggestic(data));
      // navigate("/calendar")
    }
  };

  return (
    <div>
      <div className="side_container">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={6} lg={6}>
            <ProfileSidebar />
          </Col>

          <Col xs={24} sm={24} md={18} lg={18}>
            {localLoading ? (
              <Spin className="loader-ld" />
            ) : (
              <div className="rp-right-profile">
                <Row gutter={[10, 10]}>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="backbtn-a">
                      <h2 onClick={() => navigate(-1)}>
                        <LeftOutlined /> Back
                      </h2>
                    </div>

                    <div className="livesessions-f ">
                      <h2>Fitness Plan</h2>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <FitnessBanner
                      data={programDetails}
                      onSignUp={setIsModalVisible}
                      programSelector={setSelectedProgram}
                      showUpgradeModal={setUpgradeModalVisible}
                      modalShow={setModalVisible}
                      videoId={setVideoId}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="livesessions-f ">
                      <h2>Workouts</h2>
                    </div>
                  </Col>
                  {programDetails.program_skelton &&
                    programDetails.program_skelton.map((item, index) => {
                      if (item.programmable_type === "App\\Models\\Workout") {
                        return (
                          <Col xs={24} sm={24} md={8} lg={8} key={index}>
                            <Workout
                              data={item}
                              videoId={setVideoId}
                              modalShow={setModalVisible}
                            />
                          </Col>
                        );
                      }
                    })}
                  {programDetails.coacheData &&
                  programDetails.coacheData.length > 0 ? (
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="livesessions-f ">
                        <h2>Coaches</h2>
                      </div>
                    </Col>
                  ) : null}
                  {programDetails.coacheData &&
                    programDetails.coacheData.map((state, i) => (
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <Coaches data={state} index={i} />
                      </Col>
                    ))}
                  {/* <Col xs={24} sm={24} md={24} lg={24}>
                    <Coach data={programDetails.userdata || {}} />
                  </Col> */}
                </Row>

                {programDetails.recommended_program &&
                programDetails.recommended_program.length > 0 ? (
                  <Row gutter={[10, 10]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="livesessions-f ">
                        <h2>related fitness plans</h2>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18}>
                      <Row gutter={[20, 20]}>
                        {programDetails.recommended_program.map(
                          (item, index) => {
                            return (
                              <Col xs={24} sm={24} md={24} lg={24} key={index}>
                                <RelatedFitnessPlans
                                  data={item}
                                  onSignUp={setIsModalVisible}
                                  programSelector={setSelectedProgram}
                                  showUpgradeModal={setUpgradeModalVisible}
                                />
                              </Col>
                            );
                          }
                        )}
                      </Row>
                    </Col>
                    {userDetails &&
                    userDetails.subscription &&
                    userDetails.subscription.name != "Advance" ? (
                      <Col xs={24} sm={24} md={6} lg={6}>
                        <div className="black-fitness-bf">
                          <h3>
                            upgrade to PREMIUM AND get your custom fitness and
                            nutrition plans
                          </h3>
                        </div>
                      </Col>
                    ) : null}
                  </Row>
                ) : null}

                {/* Start :: modal for plan upgrade */}
                <ProgramsModel
                  isUpgradeModalVisible={isUpgradeModalVisible}
                  setUpgradeModalVisible={setUpgradeModalVisible}
                />
                {/* End :: modal for plan upgrade */}

                {/* Start : Program Signup Modals */}

                <AddToCalendar
                  isModalVisible={isModalVisible}
                  setIsModalVisible={closeModal}
                  addToCalendar={addProgramToCalendar}
                  buttonLoading={loading}
                />
                {/* <Modal
                  visible={isModalVisible}
                  footer={null}
                  className="calendarfull-cf"
                  onCancel={() => {
                    setIsModalVisible(false);
                    dispatch(changeClashCheckFlag(false));
                  }}
                >
                  <div className="calendar-cf">
                    <h2 className="select-start-ss">
                      Select program start day
                    </h2>

                    <Calendar
                      onSelect={onSelectDate}
                      disabledDate={disabledDate}
                    />

                    <div
                      className=""
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        className="addtocalendar-atc"
                        loading={loading}
                        type="primary"
                        onClick={() =>
                          userDetails.user_programs_count > 0
                            ? initProgramClash()
                            : initiateSignUp(false)
                        }
                      >
                        Add to Calendar
                      </Button>
                    </div>
                  </div>
                </Modal> */}
                <Modal
                  title="Alert"
                  visible={isPopupVisible}
                  // onCancel={() => {
                  //   setIsPopupVisible(false);
                  //   dispatch(changeClashCheckFlag(false));
                  // }}
                  onCancel={() => ModalAPi()}
                  footer={null}
                  className="alert-box-ab"
                >
                  <div className="alert-para-ap">
                    {clashedProgramsCount == 0 ? (
                      <p>
                        Your new program schedule is not clashing with other
                        programs schedule, click confirm to signup for program.
                      </p>
                    ) : (
                      <p>
                        Your new program schedule is clashing with other
                        programs schedule, there are {clashedProgramsCount} days
                        of event clashing.
                      </p>
                    )}
                  </div>
                  <Row gutter={[10, 10]}>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <Button
                        type="primary"
                        onClick={() => initiateSignUp(false)}
                        className="add-delete-all"
                      >
                        {clashedProgramsCount == 0
                          ? "Confirm"
                          : "Keep the previous program"}
                      </Button>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      {clashedProgramsCount != 0 ? (
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <Button
                            type="primary"
                            onClick={() => initiateSignUp(true)}
                            className="add-delete-all"
                          >
                            Delete the previous program
                          </Button>
                        </Col>
                      ) : null}
                    </Col>
                  </Row>
                </Modal>
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
                {/* End :: Proram Signup Modals */}
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FitnessPlan;
