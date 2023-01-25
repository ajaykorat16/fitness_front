import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addManualWorkout,
  getCalendarData,
  reloadCalendarData,
} from "../../../redux/actions/CalendarActions";
import moment from "moment";
import { Row, Col, Modal, Form, Input, Button, Slider, Select } from "antd";
import MaskedInput from "antd-mask-input";
import { getMyPlanSideBar } from "../../../redux/actions/dashboardAction";
import RAW from "../../../api/raw";

const ManualWorkout = ({
  isManualWorkoutVisible,
  handleManualWorkoutCancel,
}) => {
  const { TextArea } = Input;
  const { Option } = Select;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [flag, setFlag] = useState(false);
  const [completedBtnFlag, setCompletedBtnFlag] = useState(false);
  const [workoutType, setWorkoutTypes] = useState([]);
  const [queryString, setQueryString] = useState({
    type: 0,
    start_date: moment().startOf("week").format("Y-MM-D"),
    end_date: moment().endOf("week").format("Y-MM-D"),
    changeFlag: false,
  });

  const onFinish = (e) => {
    form.validateFields().then(async (values) => {
      values["feeling"] = Number(values.feeling) || 0;
      values["duration"] = moment(`${values.duration}`, "HH:mm:ss").diff(
        moment().startOf("day"),
        "seconds"
      );
      values["duration_complete"] = moment(
        `${values.duration_complete}`,
        "HH:mm:ss"
      ).diff(moment().startOf("day"), "seconds");
      const updatedPayload = {
        ...values,
        program_date: moment().format("Y-MM-D"),
      };
      //console.log(updatedPayload, "update payload");
      await dispatch(addManualWorkout(updatedPayload));
      await dispatch(reloadCalendarData(queryString));
      dispatch(getMyPlanSideBar({ local: moment.tz.guess() }));
      handleManualWorkoutCancel();
      // setFlag(true);
      form.resetFields();
    });
  };

  useEffect(() => {
    getWorkoutType();
  }, []);

  const getWorkoutType = async () => {
    const response = await RAW.get("/workout_type");
    setWorkoutTypes(response.data.data);
  };
  // useEffect(() => {
  //   // refreshing calendar API
  //   if (flag) dispatch(getCalendarData());
  // }, [flag]);

  const completedAsPlanned = async () => {
    const formData = await form.getFieldValue();
    await form.setFieldsValue({
      ...formData,
      calories_complete: formData.calories,
      distance_complete: formData.distance,
      duration_complete: formData.duration,
    });
    await setCompletedBtnFlag(true);
  };

  return (
    <Modal
      visible={isManualWorkoutVisible}
      onCancel={handleManualWorkoutCancel}
      footer={null}
      className="corecircuitmodel-ccm"
    >
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
        autoComplete="off"
      >
        <div className="calendar-img-ccm liveview-vl ">
          <Row gutter={[0, 0]}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <span className="heilight-walk-hw">
                <Form.Item
                  label="WORKOUT NAME"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Enter Workout name",
                    },
                  ]}
                >
                  <Input placeholder="workout name" />
                </Form.Item>
              </span>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <span className="heilight-walk-hw">
                <Form.Item
                  label="WORKOUT TYPE"
                  name="workout_type_id"
                  rules={[
                    {
                      required: true,
                      message: "Enter Workout name",
                    },
                  ]}
                >
                  <Select
                    style={{
                      border: "0px",
                    }}
                    // showSearch
                    // placeholder="Workout Type"
                    optionFilterProp="children"
                    // onChange={onChange}
                    // onSearch={onSearch}
                    // filterOption={(input, option) =>
                    //   (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                    // }
                  >
                    {workoutType &&
                      workoutType.map((item, i) => (
                        <Option value={item.id} key={i}>
                          {item.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </span>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <span className="heilight-walk-hw">
                <Form.Item
                  label="DESCRIPTION"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Enter workout description",
                    },
                  ]}
                >
                  <TextArea
                    style={{
                      width: "100%",
                    }}
                    showCount
                    maxLength={100}
                  />
                </Form.Item>
              </span>
            </Col>
            {/* <Col xs={24} sm={24} md={14} lg={14}>
              <div className="livetext-vl">
                <div className="shareiconsbtm-ccm">
                  <Row gutter={[0, 0]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="share-icon-sccm">
                        <p>Share</p>
                        <FacebookOutlined />
                        <MessageOutlined />
                        <TwitterOutlined />
                        <LinkedinOutlined />
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col> */}
          </Row>
        </div>
        <div className="planned-btn-ccm">
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
                    <Form.Item
                      name="duration"
                      rules={[
                        {
                          required: true,
                          message: "Enter Duration",
                        },
                      ]}
                    >
                      {/* <Input type="text" placeholder="sec" /> */}
                      <MaskedInput mask="11:11:11" placeholder="sec" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item name="duration_complete">
                      {/* <Input type="text" placeholder="sec" /> */}
                      <MaskedInput mask="11:11:11" placeholder="sec" />
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
                    <Form.Item
                      name="distance"
                      rules={[
                        {
                          required: true,
                          message: "Enter Distance",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="meter" />
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
                    <Form.Item
                      name="calories"
                      rules={[
                        {
                          required: true,
                          message: "Enter Calories",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="cal" />
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
                    <Form.Item
                      style={{
                        margin: "0",
                        marginBottom: "0px",
                        paddingBottom: "0px",
                      }}
                    >
                      <div className="trofybutton_ccm">
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
                      height: "369px",
                    }}
                  />
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
                  <Form.Item name="feeling" defaultValue={1}>
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
                              // checked={true}
                              // defaultChecked={true}
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
                      <Form.Item
                        style={
                          {
                            // margin: "0",
                            // marginBottom: "0px",
                            // paddingBottom: "0px",
                          }
                        }
                      >
                        <div
                          className="deletbutton_ccm"
                          style={{
                            margin: "0",
                            textAlign: "center",
                          }}
                        >
                          <Button>Delete</Button>
                        </div>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <Form.Item
                        style={
                          {
                            // margin: "0",
                            // marginBottom: "0px",
                            // paddingBottom: "0px",
                          }
                        }
                      >
                        <div
                          className="deletbutton_ccm"
                          style={{
                            margin: "0",
                            textAlign: "center",
                          }}
                        >
                          <Button onCancel={handleManualWorkoutCancel}>
                            Cancel
                          </Button>
                        </div>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <Form.Item
                        style={
                          {
                            // margin: "0",
                            // marginBottom: "0px",
                            // paddingBottom: "0px",
                          }
                        }
                      >
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
    </Modal>
  );
};

export default ManualWorkout;
