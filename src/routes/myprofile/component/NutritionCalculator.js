import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  InputNumber,
  DatePicker,
  Select,
  Button,
  Spin,
  Input,
} from "antd";

import { RightOutlined } from "@ant-design/icons";
import {
  getNutritionData,
  saveNutritionFormData,
} from "../../../redux/actions/profile/nutrition_calculate";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment-timezone";
import {
  getActivityLevel,
  getFitnessGoal,
  getHeights,
} from "../../../redux/actions/common";

import checkicon from "../../../img/Success.png";
import CustomisedMealSuggestic from "./CustomisedMealSuggestic";
import {
  NautritionSkeleton,
  ProfileSkeleton,
} from "../../fitness/component/CardSkeleton";
import { useNavigate } from "react-router-dom";

const NutritionCalculator = (props) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const common = useSelector((state) => state.common);
  const { height, activityLevel, fitnessGoal } = common;
  const nutrition = useSelector((state) => state.nutrition);
  const { nutritionData, loading } = nutrition;

  const [pageLoading, setPageLoading] = useState(true);

  const [TargetDate, setTargetDateState] = useState(
    moment(nutritionData.target_date || new Date())
  );

  useEffect(() => {
    collectRequiredFormData();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      ...nutritionData,
      target_date: moment(nutritionData.target_date || new Date()),
    });
    setTargetDateState(moment(nutritionData.target_date || new Date()));
  }, [nutritionData]);

  const collectRequiredFormData = async () => {
    await dispatch(getHeights());
    await dispatch(getActivityLevel());
    await dispatch(getNutritionData());
    await dispatch(getFitnessGoal());
    await setPageLoading(false);
  };

  const onFinish = async (values) => {
    form.setFieldsValue({
      ...values,
      target_date: moment(TargetDate),
    });
    values["target_date"] = moment(TargetDate).format("YYYY-MM-DD");
    values["height_id"] = 1;

    await dispatch(saveNutritionFormData(values, props.path, navigate));
  };

  function disabledDate(current) {
    return current && current.valueOf() < Date.now();
  }

  const setTargetDate = (moment, string) => {
    setTargetDateState(string);
  };

  return (
    <div className="rp-right-profile">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="personal_title">
            <h2>Nutrition Calculator</h2>
          </div>
        </Col>
        {pageLoading ? (
          <Col xs={24} sm={24} md={24} lg={24}>
            <NautritionSkeleton />
          </Col>
        ) : (
          <Col xs={24} sm={24} md={24} lg={24}>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              form={form}
            >
              <div className="pi_border_2  nutritions_form">
                <div className="pi_inner piinner_change">
                  <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <Form.Item label="Neck" name="neck">
                        <InputNumber />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <Form.Item label="Waist" name="waist">
                        <InputNumber />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <Form.Item label="Hip" name="hip">
                        <InputNumber />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <Form.Item label="Bicep" name="bicep">
                        <InputNumber />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <Form.Item label="Chest" name="chest">
                        <InputNumber />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <Form.Item label="Thigh" name="thigh">
                        <InputNumber />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <Form.Item label="Calf" name="calf">
                        <InputNumber />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="topline"></div>
                  </Col>
                  </Row>
                  <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <Form.Item
                        label="Gender "
                        name="gender"
                        rules={[
                          {
                            required: true,
                            message: "field is required!",
                          },
                        ]}
                      >
                        <Select name="gender" placeholder="Select...">
                          <Option value="M">Male</Option>
                          <Option value="F">Female</Option>
                          <Option value="O">Other</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      {/* <Form.Item
                        label="Height"
                        name="height_id"
                        rules={[
                          {
                            required: true,
                            message: "field is required!",
                          },
                        ]}
                      >
                        <Select name="height_id" placeholder="Select...">
                          {height.map((item) => (
                            <Option key={item.id} value={item.id}>
                              {item.value}cm
                            </Option>
                          ))}
                        </Select>
                      </Form.Item> */}
                      <Row className="mb-24">
                        <Col xs={24} sm={24} md={24} lg={24} >
                        <div class="ant-col ant-form-item-label w-100"><label for="basic_feet" class="ant-form-item-required" title="Height ">Height </label></div>
                         
                        <Row className="w-147less_full">
                        <Col xs={24} sm={24} md={12} lg={12}>

                          <Form.Item
                          className="mb-0"
                            name="feet"
                            placeholder="Ft"
                            rules={[
                              {
                                required: true,
                                message: "field is required!",
                              },
                            ]}
                            style={{width:60}}
                          >
                            <InputNumber min={0} max={50} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <Form.Item
                            // label="Height"
                            className="mb-0"
                            placeholder="In"
                            
                            name="inch"
                            rules={[
                              {
                                required: true,
                                message: "field is required!",
                              },
                            ]}
                            style={{width:60}}
                          >
                            <InputNumber min={0} max={50} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    </Row>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <Form.Item label="Body Fat" name="body_fat">
                        <InputNumber
                          min={0}
                          max={100}
                          formatter={(value) => `${value}%`}
                          parser={(value) => value.replace("%", "")}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <Form.Item
                        label="Current Weight "
                        name="current_weight"
                        rules={[
                          {
                            required: true,
                            message: "field is required!",
                          },
                        ]}
                      >
                        <InputNumber />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <Form.Item
                        label="Target Weight "
                        name="target_weight"
                        rules={[
                          {
                            required: true,
                            message: "field is required!",
                          },
                        ]}
                      >
                        <InputNumber />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <Form.Item
                        label="Target Date"
                        name="target_date"
                        rules={[
                          {
                            required: true,
                            message: "field is required!",
                          },
                        ]}
                      >
                        <DatePicker
                          format={"MM-DD-YYYY"}
                          disabledDate={disabledDate}
                          onChange={setTargetDate}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[16, 0]} align="middle">
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="activity-level0">
                        <Form.Item
                          label="Activity Level"
                          name="activity_id"
                          rules={[
                            {
                              required: true,
                              message: "field is required!",
                            },
                          ]}
                        >
                          <Select
                            name="activity_id"
                            placeholder="Select activity level"
                          >
                            {activityLevel.map((item) => (
                              <Option key={item.id} value={item.id}>
                                {item.value}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="activity-level0">
                        <Form.Item
                          label="Fitness Goal"
                          name="fitness_goal"
                          rules={[
                            {
                              required: true,
                              message: "field is required!",
                            },
                          ]}
                        >
                          <Select
                            name="fitness_goal"
                            placeholder="Select fitness goal"
                          >
                            {fitnessGoal.map((item) => (
                              <Option key={item.id} value={item.id}>
                                {item.text_val} ({item.protein}% protein,{" "}
                                {item.carbs}% carbs, {item.fat}% fat)
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <Row gutter={[16, 16]} className="nutritions_form pt-0">
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="topline"></div>
                  </Col>
                  </Row>
              {nutritionData && nutritionData.protein ? (
                
                    <div
                      className="mecro-main"
                      // style={{
                      //   marginTop: "10px",
                      // }}
                    >
                      <div className="mecroline-input">
                      <Row gutter={[16, 16]} align="middle">
                       <Col xs={24} sm={24} md={9} lg={9}>
                        <h2>
                          <img src={checkicon} alt="checkicon"></img>
                          MACRO percentages
                        </h2>
                        </Col>
                        <Col xs={24} sm={24} md={15} lg={15}>
                        <div className="pro-carbs">
                        <Row gutter={[8, 8]}>
                        <Col xs={24} sm={24} md={8} lg={8}>
                          <Form.Item label="Protein" className="fieldbox">
                            <Input
                              suffix="%"
                              value={nutritionData.protein}
                              disabled
                            />
                          </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={8} lg={8}>
                          <Form.Item label="Carbs" className="fieldbox">
                            <Input
                              suffix="%"
                              value={nutritionData.carb}
                              disabled
                            />
                          </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={8} lg={8}>
                          <Form.Item label="Fat" className="fieldbox">
                            <Input
                              suffix="%"
                              value={nutritionData.fat}
                              disabled
                            />
                          </Form.Item>
                          </Col>
                          </Row>
                        </div>
                        </Col>
                        </Row>
                      </div>
                      <div className="calories-nut-o">
                        <p>
                          To maintain your current weight requires about
                          <b>
                            {" "}
                            {Math.trunc(
                              nutritionData.calorie_intake_current
                            )}{" "}
                          </b>
                          Calories per day.
                        </p>
                        <p>
                          To reach your goal of{" "}
                          <b>
                            {" "}
                            {Math.trunc(nutritionData.target_weight) ||
                              0} kg{" "}
                          </b>{" "}
                          in
                          <b> {nutritionData.days} days </b> at your current
                          body weight and activity level, requires about
                        </p>
                        <h3>
                          {Number.parseFloat(
                            nutritionData.calorie_intake_target
                          ).toFixed(2)}{" "}
                          Calories per day.
                        </h3>
                      </div>
                    </div>
                  
              ) : null}

              <div className="btn-submitinfo" style={{ marginTop: "20px" }}>
                <div className="btn_clearinfo">
                  <Button
                    disabled={loading}
                    onClick={() =>
                      dispatch(saveNutritionFormData({ empty: 1 }))
                    }
                  >
                    Clear
                  </Button>
                </div>

                <div className="btn_saveinfo">
                  <Button
                    htmlType="submit"
                    loading={loading}
                    disabled={loading}
                  >
                    Save <RightOutlined />
                  </Button>
                </div>
              </div>
            </Form>

            {/* <CustomisedMealSuggestic nutritionData={nutritionData} /> */}
          </Col>
        )}
      </Row>
    </div>
  );
};

export default NutritionCalculator;
