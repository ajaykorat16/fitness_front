import React, { useEffect, useState } from "react";
import { Col, Modal, Row, Form, Input, Button, Slider, TimePicker } from "antd";
import Logo from "../../../img/gym-coronavirus.jpg";
import { useDispatch, useSelector } from "react-redux";
import { S3_BUCKET_URL } from "../../../config/constants";
import {
  updateWorkoutProgress,
  DeleteWorkout,
} from "../../../redux/actions/fitnessAction";
import useSelection from "antd/lib/table/hooks/useSelection";
import ReactHlsPlayer from "react-hls-player/dist";
import { getStreamableVideo } from "../../../redux/actions/VideoStreamingAction";
import { ClockCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import MaskedInput from "antd-mask-input";
import { reloadCalendarData } from "../../../redux/actions/CalendarActions";
import { getMyPlanSideBar } from "../../../redux/actions/dashboardAction";

const WorkoutOverViewModal = ({
  isOverViewVisible,
  handleOverviewCancel,
  selectedEvent,
  userProgramId,
  queryString,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [completedBtnFlag, setCompletedBtnFlag] = useState(false);
  const [completedBtn, setCompleted] = useState(0);

  const fitnessState = useSelector((state) => state.fitness);
  const { selectedOverview, loading } = fitnessState;

  // const [queryString, setQueryString] = useState({
  //   type: 0,
  //   start_date: moment().startOf("week").format("Y-MM-D"),
  //   end_date: moment().endOf("week").format("Y-MM-D"),
  //   changeFlag: false,
  // });

  const completedAsPlanned = async () => {
    const formData = await form.getFieldValue();
    await form.setFieldsValue({
      ...formData,
      calories_complete: formData.calories,
      distance_complete: formData.distance,
      duration_complete: formData.duration,
    });
    setCompleted(1);
    await setCompletedBtnFlag(true);
  };

  useEffect(() => {
    if (selectedOverview && selectedOverview["duration"]) {
      selectedOverview["duration"] = moment
        .utc(selectedOverview["duration"] * 1000)
        .format("HH:mm:ss");
    }
    if (selectedOverview && selectedOverview["duration_complete"]) {
      console.log("selectedOverview[duration_complete]--------",selectedOverview["duration_complete"])

      // selectedOverview["duration_complete"] = moment
      //   .utc(selectedOverview["duration_complete"] * 1000)
      //   .format("HH:mm:ss");
    }
    
    form.setFieldsValue(selectedOverview);
  }, [selectedOverview]);

  const onFinish = async (values) => {
    values["feeling"] = Number(values.feeling);
    values["duration"] = moment(`${values.duration}`, "HH:mm:ss").diff(
      moment().startOf("day"),
      "seconds"
    );
    values["duration_complete"] = moment(
      `${values.duration_complete}`,
      "HH:mm:ss"
    ).diff(moment().startOf("day"), "seconds");
    const payload = {
      ...values,
      id: selectedEvent.id,
      user_program_id: selectedEvent.eventId,
      complete_status: completedBtn,
    };
    dispatch(updateWorkoutProgress(payload));
    dispatch(reloadCalendarData(queryString));
    dispatch(getMyPlanSideBar(queryString));
    form.resetFields();
    setCompletedBtnFlag();
    setCompleted();
    handleOverviewCancel();
  };

  useEffect(() => {
    console.log("select---", selectedOverview);
    form.setFieldsValue(selectedOverview);
    if (selectedOverview) {
      selectedOverview && Boolean(selectedOverview.complete_status)
        ? setCompletedBtnFlag(true)
        : setCompletedBtnFlag(false);
      selectedOverview && Boolean(selectedOverview.complete_status)
        ? setCompleted(1)
        : setCompleted(0);
    }
  }, [selectedOverview]);

  const [modalVisible, setModalVisible] = useState(false);
  const [videoID, setVideoId] = useState(null);
  const [isChecked0, setIsChecked0] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const playerRef = React.useRef();

  const VideoState = useSelector((state) => state.streamableVideo);
  const { streamableVideo } = VideoState;

  useEffect(() => {
    if (videoID) dispatch(getStreamableVideo(videoID));
  }, [videoID]);

  useEffect(() => {
    selectedOverview &&
    selectedOverview.feeling &&
    selectedOverview.feeling == 2
      ? setIsChecked2(true)
      : setIsChecked2(false);

    selectedOverview &&
    selectedOverview.feeling &&
    selectedOverview.feeling == 1
      ? setIsChecked1(true)
      : setIsChecked1(false);

    selectedOverview &&
    selectedOverview.feeling &&
    selectedOverview.feeling == 0
      ? setIsChecked0(true)
      : setIsChecked0(false);
  }, [selectedOverview]);

  const handleWorkDelete = async () => {
    const payload = {
      program_id: selectedOverview.user_programs_id,
      workout_id: selectedOverview.id,
    };
    await dispatch(DeleteWorkout(payload));
    dispatch(reloadCalendarData(queryString));
    dispatch(getMyPlanSideBar(queryString));
    handleOverviewCancel();
  };

  return (
    <Modal
      visible={isOverViewVisible}
      footer={null}
      className="corecircuitmodel-ccm"
      onCancel={() => {
        form.resetFields();
        handleOverviewCancel();
      }}
    >
      <div className="calendar-img-ccm liveview-vl ">
        <Row gutter={[0, 0]}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <div className="liveimg-calender">
              <div
                className="liveplayvideo-lg0"
                style={{
                  width: "100%",
                  height: "180px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <img
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  src={
                    selectedEvent.banner != null
                      ? S3_BUCKET_URL + selectedEvent.banner
                      : Logo
                  }
                  alt=""
                />
                <PlayCircleOutlined
                  onClick={() => {
                    setVideoId(selectedEvent.id);
                    setModalVisible(true);
                  }}
                  className="player-video-pvp "
                  style={{ fontSize: "100px" }}
                />
              </div>
              <div className="icons_btn-vltop" style={{ bottom: "10%" }}>
                {Boolean(selectedEvent.fitness_level) ? (
                  <div className="fitning-videoy">
                    <div className="circle-all-ca">
                      {selectedEvent.fitness_level.id === 1 ? (
                        <>
                          <h6 className="circle-black-all"></h6>
                          <h6 className="circle-black"></h6>
                          <h6 className="circle-black"></h6>
                        </>
                      ) : selectedEvent.fitness_level.id === 2 ? (
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
                    <b>{selectedEvent.fitness_level.name}</b>
                  </div>
                ) : null}
                <p>
                  <ClockCircleOutlined />
                  {selectedOverview && selectedOverview.duration_planned
                    ? new Date(selectedOverview.duration_planned * 1000)
                        .toISOString()
                        .substr(11, 8)
                    : "00:00:00"}
                </p>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={16} lg={16}>
            <div className="livetext-vl">
              <span className="livemain-vl">
                <h2>{selectedEvent.title}</h2>
                <p>
                  {selectedEvent.description &&
                    selectedEvent.description.substring(0, 80)}
                </p>
              </span>
              <div className="shareiconsbtm-ccm">
                <Row gutter={[0, 0]}>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    {selectedEvent.equipment_data &&
                    selectedEvent.equipment_data.length ? (
                      <span className="liveequip-vl">
                        <b>Equipment Needed</b>
                        <p>
                          {selectedEvent.equipment_data.map((item, i) =>
                            i === selectedEvent.equipment_data.length - 1
                              ? item.name
                              : item.name + ","
                          )}
                        </p>
                      </span>
                    ) : null}
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Form onFinish={onFinish} form={form} autoComplete="off">
        <div
          className="planned-btn-ccm"
          style={{
            pointerEvents: loading ? "none" : "auto",
            opacity: loading ? 0.4 : null,
          }}
        >
          <Row gutter={[6, 6]}>
            <Col xs={24} sm={24} md={8} lg={8}>
              <div>
                <Row gutter={[6, 6]}>
                  <Col xs={24} sm={24} md={8} lg={8}></Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <h2 className="planned-ccm">Planned</h2>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <h2 className="planned-ccm">Completed</h2>
                  </Col>
                </Row>
                <Row
                  gutter={[6, 6]}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <p className="planned-ccm">Duration</p>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item name="duration">
                      <MaskedInput mask={'00:00:00'} placeholder="sec" disabled />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item name="duration_complete">
                      <MaskedInput mask={'00:00:00'} placeholder="sec" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row
                  gutter={[6, 6]}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <p className="planned-ccm">Distance</p>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item name="distance">
                      <Input type="text" placeholder="meter" disabled />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item name="distance_complete">
                      <Input type="text" placeholder="meter" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row
                  gutter={[6, 6]}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <p className="planned-ccm">Calories</p>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item name="calories">
                      <Input type="text" placeholder="cal" disabled />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item name="calories_complete">
                      <Input type="text" placeholder="cal" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[6, 6]}>
                  <Col xs={24} sm={24} md={8} lg={8}></Col>
                  <Col xs={24} sm={24} md={16} lg={16}>
                    <Form.Item>
                      <div
                        className="trofybutton_ccm"
                        style={{
                          margin: "0",
                        }}
                      >
                        <Button
                          onClick={completedAsPlanned}
                          disabled={completedBtnFlag}
                        >
                          Completed as planned
                        </Button>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row
                  gutter={[6, 6]}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <p className="planned-ccm">Heart Rate</p>
                  </Col>
                  <Col xs={24} sm={24} md={5} lg={5}>
                    <div className="min-hearttrate-ccm">
                      <Form.Item name="hrt_min" label="Min">
                        <Input />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={5} lg={5}>
                    <div className="min-hearttrate-ccm">
                      <Form.Item name="hrt_avg" label="Avg">
                        <Input />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={5} lg={5}>
                    <div className="min-hearttrate-ccm">
                      <Form.Item name="hrt_max" label="Max">
                        <Input />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8}>
              <div className="note-text-ccm">
                <h2
                  className="planned-ccm"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Notes
                </h2>
                <Form.Item name="notes">
                  <Input.TextArea 
                  style={{
                    height: "340px",
                  }} />
                </Form.Item>
              </div>
            </Col>
            
            <Col xs={24} sm={24} md={8} lg={8}>
              <div className="feel-text-ccm">
                <h2
                  className="planned-ccm"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  How did you feel
                </h2>
                <div>
                  <Form.Item name="feeling">
                    <Row gutter={[6, 6]}>
                      <Col xs={24} sm={24} md={8} lg={8}>
                        <div className="emotion-icon-ccm">
                          <p>Strong</p>
                          <label className="plan basic-plan" for="Strong">
                            <Input
                              type={"radio"}
                              id="Strong"
                              name="feeling"
                              value={2}
                              defaultChecked={
                                selectedOverview &&
                                selectedOverview.feeling == 2
                              }
                            />
                            <i className="fa fa-smile-o" aria-hidden="true"></i>
                          </label>
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8}>
                        <div className="emotion-icon-ccm">
                          <p>Normal</p>
                          <label className="plan complete-plan" for="normal">
                            <Input
                              type={"radio"}
                              id="normal"
                              name="feeling"
                              value={1}
                              defaultChecked={
                                selectedOverview &&
                                selectedOverview.feeling == 1
                              }
                            />
                            <i className="fa fa-meh-o" aria-hidden="true"></i>
                          </label>
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8}>
                        <div className="emotion-icon-ccm">
                          <p>Weak</p>
                          <label className="plan complete-plan" for="weak">
                            <Input
                              type={"radio"}
                              name="feeling"
                              id="weak"
                              value={0}
                              defaultChecked={
                                selectedOverview &&
                                selectedOverview.feeling == 0
                              }
                            />
                            <i className="fa fa-frown-o" aria-hidden="true"></i>
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Row
                    gutter={[6, 6]}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Col xs={24} sm={24} md={20} lg={20}>
                      <div className="perceived-exertion-ccm">
                        <p>Perceived Exertion</p>
                        <Form.Item name="perceived_excert">
                          <Slider max={100} defaultValue={20} />
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                  <Row
                    gutter={[6, 6]}
                    style={{
                      right: 0,
                      position: "absolute",
                      bottom: 0,
                    }}
                  >
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <Form.Item>
                        <div
                          className="deletbutton_ccm"
                          style={{
                            margin: "0",
                            textAlign: "center",
                          }}
                        >
                          <Button onClick={handleWorkDelete}>Delete</Button>
                        </div>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <Form.Item>
                        <div
                          className="deletbutton_ccm"
                          style={{
                            margin: "0",
                            textAlign: "center",
                          }}
                        >
                          <Button onClick={handleOverviewCancel}>Cancel</Button>
                        </div>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <Form.Item>
                        <div
                          className="trofybutton_ccm"
                          style={{
                            margin: "0",
                            textAlign: "center",
                          }}
                        >
                          <Button htmlType="submit">Save</Button>
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Form>
      <Modal
        visible={modalVisible}
        footer={null}
        className="corecircuitmodel-ccm"
        onCancel={() => {
          const pauseData = playerRef.current.pause();
          console.log("pauseData------------", pauseData);
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
    </Modal>
  );
};

export default WorkoutOverViewModal;
