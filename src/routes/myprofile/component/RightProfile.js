import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Spin,
  Upload,
  message,
} from "antd";
import pen from "../../../img/pen.svg";
import callphone from "../../../img/callphone.svg";
import profile from "../../../img/profile.png";
import {
  EditOutlined,
  ArrowRightOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { getCountries } from "../../../redux/actions/common";
import { useSelector, useDispatch } from "react-redux";
import { userDetailData, userDetailUpdate } from "../../../redux/actions/user";
import moment from "moment";
import MaskedInput from "antd-mask-input";
import {
  updateProfilePicture,
  removeProfilePicture,
} from "../../../redux/actions/user";

import ImgCrop from "antd-img-crop";
import { PhoneOutlined } from "@ant-design/icons";
import {
  CardSkeleton,
  ProfileSkeleton,
} from "../../fitness/component/CardSkeleton";
import { useNavigate } from "react-router-dom";

// pixed for the bug
const RightProfile = (props) => {
  const [fileListN, setFileList] = useState([]);
  const [Phone, setPhone] = useState(null);

  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const common = useSelector((state) => state.common);
  const user = useSelector((state) => state.user);
  const { userDetails, loading } = user;
  useEffect(() => {
    console.log("Phone-------", Phone);
  }, [Phone]);

  useEffect(() => {
    collectRequiredFormData();
  }, []);

  /*========upload img=========*/

  useEffect(() => {
    form.setFieldsValue({
      ...userDetails,
      dob: moment(userDetails.dob || new Date()),
    });

    setFileList([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url:
          userDetails && userDetails.profile_pic != null
            ? userDetails.profile_pic
            : profile,
      },
    ]);
  }, [userDetails]);

  const collectRequiredFormData = async () => {
    await dispatch(getCountries());
    if (Object.keys(userDetails).length === 0) {
      await dispatch(userDetailData(navigate));
    }
  };

  const onFinish = async (values) => {
    // console.log(values);
    await dispatch(userDetailUpdate(values, props.path, navigate));
  };

  const onProfileRemove = (file) => {
    dispatch(removeProfilePicture());
  };

  const onChange = async ({ fileList: newFileList }) => {
    await setFileList(newFileList);
    if (
      fileListN &&
      fileListN[0] &&
      fileListN[0].thumbUrl &&
      fileListN[0].type
    ) {
      console.log(fileListN);
      const pic = fileListN[0].thumbUrl;
      const splitted = pic.split(",");
      const updatedType = "data:" + fileListN[0].type + ";base64";
      const updatedURL = splitted[splitted.length - 1];

      const newData = {
        avatar: updatedURL,
        type: updatedType,
      };
      dispatch(updateProfilePicture(newData));
    }
  };
  const { TextArea } = Input;
  return (
    <div className="rp-right-profile">
      {!loading && Object.keys(userDetails).length !== 0 ? (
        <Form name="basic" form={form} onFinish={onFinish} autoComplete="off">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className="personal_title">
                <h2>Personal Information</h2>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <div className="pi_border">
                <div className="pi_inner">
                  <Row gutter={[6, 6]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your name!",
                          },
                          {
                            max: 100,
                            message:
                              "Name must not be grater than 100 character",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <Form.Item
                        label="Email "
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Email Address!",
                          },
                          {
                            type: "email",
                            message: "The input is not valid E-mail!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <Form.Item
                        label="Username "
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Username!",
                          },
                          {
                            max: 50,
                            message:
                              "Username must not be grater than 50 character",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <Form.Item
                        label="Date of birth"
                        name="dob"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Date of birth!",
                          },
                        ]}
                      >
                        <DatePicker format={"MM-DD-YYYY"} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Phone!",
                          },
                        ]}
                      >
                        <MaskedInput
                          mask="(111)111-1111"
                          suffix={
                            <a href={`tel:${Phone}`}>
                              {/* <PhoneOutlined /> */}
                              <img
                                style={{
                                  height: "17px",
                                }}
                                src={callphone}
                                alt="phone"
                              />
                            </a>
                          }
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24}>
                      <Form.Item
                        label="Country of 
                        residence"
                        name="country"
                        rules={[
                          {
                            required: true,
                            message: "Please select your country!",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder="Select Country"
                          optionFilterProp="children"
                          allowClear
                          /* prefixCls={<img src={countrieimg} alt="countries" />} */
                        >
                          {common.countries.map((item) => (
                            <Option key={item.id} value={item.id}>
                              {item.county_name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <Form.Item
                        label="City of residence"
                        name="city"
                        rules={[
                          {
                            required: true,
                            message: "Please input your City!",
                          },
                          {
                            max: 50,
                            message: "City must be maximum 50 characters.",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <div className="pi_border">
                <div className="pi_inner">
                  <div
                    className="pi_profile"
                    style={{
                      // background: "red",
                      position: "relative",
                      width: "100%",
                      height: "285px",
                    }}
                  >
                    {/*<img src={profile} alt="" />
                    <p>
                      Update user image <EditOutlined />
                    </p>*/}
                    <div
                      className="img-profile0"
                      style={{
                        width: "250px",
                        height: "250px",
                        position: "absolute",
                        right: 0,
                        top: "10%",
                      }}
                    >
                      <ImgCrop rotate>
                        <Upload
                          style={{
                            height: "200px",
                          }}
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          listType="picture-card"
                          fileList={fileListN}
                          onChange={onChange}
                          maxCount={1}
                          onRemove={onProfileRemove}
                          showUploadList={{ showPreviewIcon: false }}
                        >
                          {fileListN.length < 1 && "Update user image  "}

                          <p
                            style={{
                              marginRight: "10px",
                            }}
                          >
                            Update user image
                          </p>
                          <EditOutlined />

                          {/* <img
                            style={{
                              width: "10px",
                              height: "20px",
                              border: "0px",
                              boxSizing: "border-box",
                              boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.25)",
                            }}
                            src={pen}
                            alt="pen"
                          /> */}
                        </Upload>
                      </ImgCrop>
                    </div>
                  </div>

                  <Row gutter={[6, 6]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <Form.Item
                        label="Club Info"
                        name="club_info"
                        rules={[
                          {
                            required: true,
                            message: "Please input your  Club Info!",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder="Select Club Info"
                          optionFilterProp="children"
                          defaultValue={"RAW"}
                        >
                          <Option value={"RAW"}>RAW</Option>
                          <Option value={"EU"}>Eye Universal</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <Form.Item
                        label="Mantra"
                        name="mantra"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Mantra!",
                          },
                          {
                            max: 60,
                            message: "Mantra must be maximum 100 characters.",
                          },
                        ]}
                      >
                        <TextArea rows={4} />
                      </Form.Item>
                      <b className="num-b0">0/60</b>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className="topline"></div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Form.Item>
                <div className="btn_saveinfo">
                  <Button
                    style={{
                      marginRight: " 31px",
                      width: "27.50%",
                    }}
                    htmlType="submit"
                    loading={loading}
                    disabled={loading}
                  >
                    Save info <RightOutlined />
                  </Button>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ) : (
        <ProfileSkeleton />
      )}
    </div>
  );
};

export default RightProfile;
