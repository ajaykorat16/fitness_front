import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Form, Input, Button, Slider } from "antd";

import TextArea from "antd/lib/input/TextArea";
import { useDispatch } from "react-redux";
import { addManualRecipes } from "../../../redux/actions/recipesAction";
import moment from "moment";
import {
  getCalendarData,
  reloadCalendarData,
} from "../../../redux/actions/CalendarActions";
import { getMyPlanSideBar } from "../../../redux/actions/dashboardAction";

const ManualRecipe = ({ isManualRecipeVisible, handleManualRecipeCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const [completedBtnFlag, setCompletedBtnFlag] = useState(false);
  const [queryString, setQueryString] = useState({
    type: 0,
    start_date: moment().startOf("week").format("Y-MM-D"),
    end_date: moment().endOf("week").format("Y-MM-D"),
    changeFlag: false,
  });

  const onFinish = (e) => {
    form.validateFields().then(async (values) => {
      values["feeling"] = Number(values.feeling) || 1;
      const updatedPayload = {
        ...values,
        program_date: moment().format("Y-MM-D"),
      };
      console.log(updatedPayload, "updated recipe payload");
      await dispatch(addManualRecipes(updatedPayload));
      dispatch(reloadCalendarData(queryString));
      dispatch(getMyPlanSideBar({ local: moment.tz.guess() }));
      handleManualRecipeCancel();
      // setFlag(true);
      form.resetFields();
    });
  };

  // useEffect(() => {
  //   // refreshing calendar API
  //   if (flag) dispatch(getCalendarData());
  // }, [flag]);

  const completedAsPlanned = async () => {
    const formData = await form.getFieldValue();
    await form.setFieldsValue({
      ...formData,
      calorie_progress: formData.calories,
      carbs_progress: formData.carbs,
      protein_progress: formData.protein,
      fat_progress: formData.fat,
    });
    await setCompletedBtnFlag(true);
  };

  return (
    <div>
      <Modal
        visible={isManualRecipeVisible}
        onCancel={handleManualRecipeCancel}
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
              <Col xs={24} sm={24} md={24} lg={24}>
                <span className="heilight-walk-hw">
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Enter recipe name",
                      },
                    ]}
                  >
                    <Input placeholder="Recipe Name" />
                  </Form.Item>
                  <div className="mainss">
                    <Form.Item
                      label="Description"
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: "Enter description",
                        },
                      ]}
                    >
                      {/* <TextArea
                      style={{
                        paddingTop: "10px",
                      }}
                      showCount
                      maxLength={100}
                    /> */}
                      <TextArea
                        // style={{
                        //   height: "6px",
                        // }}
                        // style={{
                        //   marginBottom: "16px",
                        // }}
                        showCount
                        maxLength={100}
                      />
                    </Form.Item>
                  </div>
                </span>
              </Col>
            </Row>
          </div>
          <div className="planned-btn-ccm">
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
                        name="calorie"
                        rules={[
                          {
                            required: true,
                            message: "Enter calories",
                          },
                        ]}
                      >
                        <Input placeholder="cal" />
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
                        <Input type="text" placeholder="carbs" />
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
                        <Input type="text" placeholder="protein" />
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
                        <Input type="text" placeholder="fat" />
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
                          style={
                            {
                              // margin: "0",
                            }
                          }
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
                        height: "363px",
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
                              <i
                                className="fa fa-smile-o"
                                aria-hidden="true"
                              ></i>
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
                              <i
                                className="fa fa-frown-o"
                                aria-hidden="true"
                              ></i>
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
                              // margin: "0",
                              textAlign: "center",
                            }}
                          >
                            <Button>Delete</Button>
                          </div>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8}>
                        <Form.Item>
                          <div
                            className="deletbutton_ccm"
                            style={{
                              // margin: "0",
                              textAlign: "center",
                            }}
                          >
                            <Button onClick={handleManualRecipeCancel}>
                              Cancel
                            </Button>
                          </div>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8}>
                        <Form.Item>
                          <div
                            className="trofybutton_ccm"
                            style={{
                              // margin: "0",
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
    </div>
  );
};

export default ManualRecipe;
