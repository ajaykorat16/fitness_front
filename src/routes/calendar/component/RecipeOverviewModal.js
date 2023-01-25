import React, { useEffect, useState } from "react";
import { Col, Modal, Row, Form, Input, Button, Slider, Image } from "antd";
import Logo from "../../../img/healthy-protein-fitness-food-chicken-egg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { S3_BUCKET_URL } from "../../../config/constants";
import {
  DeleteRecipe,
  updateRecipeProgress,
} from "../../../redux/actions/recipesAction";
import { reloadCalendarData } from "../../../redux/actions/CalendarActions";
import moment from "moment";
import { getMyPlanSideBar } from "../../../redux/actions/dashboardAction";
import { useNavigate } from "react-router-dom";

const RecipeOverViewModal = ({
  isOverViewVisible,
  handleOverviewCancel,
  selectedEvent,
  userProgramId,
  queryString,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [completedBtnFlag, setCompletedBtnFlag] = useState(false);
  const [completedBtn, setCompleted] = useState(0);

  const recipesState = useSelector((state) => state.recipes);
  const { selectedOverview, loading } = recipesState;
  // const [queryString, setQueryString] = useState({
  //   type: 0,
  //   start_date: moment().startOf("week").format("Y-MM-D"),
  //   end_date: moment().endOf("week").format("Y-MM-D"),
  //   local: moment.tz.guess(),
  //   changeFlag: false,
  // });

  const completedAsPlanned = async () => {
    const formData = await form.getFieldValue();
    await form.setFieldsValue({
      ...formData,
      calorie_progress: formData.calories,
      carbs_progress: formData.carbs,
      protein_progress: formData.protein,
      fat_progress: formData.fat,
    });
    setCompleted(1);
    await setCompletedBtnFlag(true);
  };

  useEffect(() => {
    form.setFieldsValue(selectedOverview);
    if (selectedOverview) {
      selectedOverview && Boolean(Number(selectedOverview.complete_status))
        ? setCompletedBtnFlag(true)
        : setCompletedBtnFlag(false);
      selectedOverview && Boolean(Number(selectedOverview.complete_status))
        ? setCompleted(1)
        : setCompleted(0);
    }
    // console.log("setCompletedBtnFlag",Boolean(Number("0")))
  }, [selectedOverview]);

  const onFinish = async (values) => {
    values["feeling"] = Number(values.feeling);
    values["calorie"] = values.calories;
    const payload = {
      ...values,
      id: selectedEvent.id,
      user_program_id: selectedEvent.eventId,
      complete_status: completedBtn,
    };
    dispatch(updateRecipeProgress(payload));
    dispatch(reloadCalendarData(queryString));
    dispatch(getMyPlanSideBar({ local: moment.tz.guess() }));
    form.resetFields();
    setCompletedBtnFlag();
    setCompleted();
    handleOverviewCancel();
  };

  const cancelModal = () => {
    handleOverviewCancel();
    form.resetFields();
  };

  const handleRecipeDelete = async () => {
    const payload = {
      program_id: selectedOverview.user_programs_id,
      recipe_id: selectedOverview.id,
    };
    await dispatch(DeleteRecipe(payload));
    dispatch(reloadCalendarData(queryString));
    dispatch(getMyPlanSideBar({ local: moment.tz.guess() }));
    handleOverviewCancel();
  };

  return (
    <Modal
      visible={isOverViewVisible}
      footer={null}
      className="corecircuitmodel-ccm"
      onCancel={cancelModal}
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
                    selectedEvent.banner !== null
                      ? S3_BUCKET_URL + selectedEvent.banner
                      : Logo
                  }
                  alt=""
                  onClick={() =>
                    navigate(`/recipe-details/${selectedEvent.id}`)
                  }
                />
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={16} lg={16}>
            <div className="livetext-vl">
              <span className="livemain-vl">
                <h2>{selectedEvent.title}</h2>
                <p>
                  {selectedEvent.description &&
                    selectedEvent.description.substring(0, 150)}
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
          style={{ pointerEvents: loading ? "none" : "auto" }}
        >
          <Row gutter={[10, 10]}>
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
                    <p className="planned-ccm">Calories</p>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item
                      name="calories"
                      rules={[
                        {
                          required: true,
                          message: "Enter calories",
                        },
                      ]}
                    >
                      <Input placeholder="cal" disabled />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item name={"calorie_progress"}>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row
                  gutter={[6, 6]}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <p className="planned-ccm">Carbs</p>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item
                      name="carbs"
                      rules={[
                        {
                          required: true,
                          message: "Enter carbs",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="carbs" disabled />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item name={"carbs_progress"}>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row
                  gutter={[6, 6]}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <p className="planned-ccm">Protein</p>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item
                      name="protein"
                      rules={[
                        {
                          required: true,
                          message: "Enter protein",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="protein" disabled />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item name={"protein_progress"}>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row
                  gutter={[6, 6]}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <p className="planned-ccm">Fat</p>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item
                      name="fat"
                      rules={[
                        {
                          required: true,
                          message: "Please input Fat!",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="fat" disabled />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item name={"fat_progress"}>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>{" "}
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
                <Form.Item name={"notes"}>
                  <Input.TextArea
                    style={{
                      height: "310px",
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
                          <Button onClick={handleRecipeDelete}>Delete</Button>
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
    </Modal>
  );
};

export default RecipeOverViewModal;
