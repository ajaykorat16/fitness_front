import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Modal,
  Tooltip,
  Checkbox,
  message,
  Image,
} from "antd";
import {
  RightOutlined,
  FacebookOutlined,
  GoogleOutlined,
  LeftOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  socialLogin,
  stripeRegister,
  userDetailData,
} from "../../redux/actions/user";
import { useNavigate } from "react-router-dom";
import SocialButton from "../../components/SocialButton";
import { Link } from "react-router-dom";
import RAW from "../../api/raw";
import facebook from "../../img/rr.png";
import youtube from "../../img/a.png";
import insta from "../../img/g.png";
import p from "../../img/u.png";
import tiktok from "../../img/l.png";
import b from "../../img/gg.png";
import google from "../../img/google.svg";
// import fb from "../../img/fb.svg";
import fb from "../../img/fb.svg";
import rowLogo from "../../../src/img/Group.svg";
import success from "../../../src/img/Success.svg";

import bg from "../../img/login.png";
import logo from "../../img/logowhite.png";
import logotext from "../../img/realtext.svg";
import moment from "moment";
import axios from "axios";
import { SUGGESTIC } from "../../config/constants";
// import google from "../../img/google.svg";

const Register = () => {
  const [form] = Form.useForm();
  const [socialPayload, setSocialPayload] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { isAuth, loading } = user;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [termsCondition, setTermsConditions] = useState(false);
  const [passwords, setPasswords] = useState("");
  const [reaptpasswords, setReaptPasswords] = useState("");
  const [emailValidationMessage, setEmailValidationMessage] = useState("");
  const [emailValidationStatus, setEmailValidationStatus] = useState("success");

  // useEffect(() => {
  //   if (isAuth) {
  //     navigate("/dashboard");
  //   }
  // }, [isAuth]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setTermsConditions(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setTermsConditions(false);
  };

  const onFinish = async (values) => {
    values["local"] = moment.tz.guess();
    const response = await axios.post(SUGGESTIC + "/register", values);

    console.log("payment user create----", response);
    values["stripe_customer_id"] = response.data.customer.id;
    // dispatch(stripeRegister(values))
    await dispatch(register(values, navigate));
    dispatch(userDetailData(navigate));
  };

  const handleSocialLogin = (user) => {
    const payload = {
      is_social: true,
      provider: user._provider,
      email: user._profile.email,
      social_token: user._token.accessToken,
    };
    setSocialPayload(payload);
  };

  useEffect(() => {
    if (Object.keys(socialPayload).length > 0) {
      dispatch(socialLogin(socialPayload));
    }
  }, [socialPayload]);

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  function onChangeCheckbox(e) {
    setTermsConditions(e.target.checked);
  }

  const checkEmailExists = async (e) => {
    try {
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      setEmailValidationStatus("validating");
      if (e.target.value == "") {
        setEmailValidationStatus("error");
        setEmailValidationMessage("Email is required.");
      } else if (!emailReg.test(e.target.value)) {
        setEmailValidationStatus("error");
        setEmailValidationMessage("Incorrect email format.");
      } else {
        const response = await RAW.post("/check_if_mail", {
          email: e.target.value,
        });
        if (response.data.success) {
          if (response.data.data) {
            setEmailValidationStatus("error");
            setEmailValidationMessage("Email already exist.");
          } else {
            setEmailValidationMessage("");
            setEmailValidationStatus("success");
          }
        } else {
          setEmailValidationMessage(response.data.message);
        }
      }
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  return (
    <div>
      <div className="login_contnainer">
        <Row gutter={[0, 0]}>
          <Col xs={24} sm={24} md={14} lg={14}>
            <div
              className="login-img-lm"
              style={{
                backgroundRepeat: "no-repeat",
                // backgroundAttachment: "fixed",
                height: "100%",
                backgroundImage: `url(${bg})`,
              }}
            >
              <div className="logo-login-ll">
                <img src={rowLogo}></img>
              </div>
              <div className="logotext-lt">
                <img src={logotext}></img>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={10} lg={10}>
            <div className="login-form">
              <Row gutter={[10, 10]}>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <div className="btn__bottomr">
                    <Button onClick={() => navigate(-1)}>
                      <LeftOutlined
                        style={{
                          color: "#29B8C4",
                        }}
                      />
                      Back
                    </Button>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <div className="sign-alreay">
                    <p
                      style={{
                        marginRight: "10px",
                      }}
                    >
                      Already have an account?{" "}
                    </p>
                    <div className="btn__bottomr">
                      <Link to="/Login">
                        <Button>
                          <b>Sign in</b>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="login-form-pd-5">
                <Row gutter={[10, 10]}>
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <h2
                      className=" eds-text-hl"
                      style={{
                        marginBottom: "25px",
                      }}
                    >
                      Register
                    </h2>
                  </Col>

                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="Realwellness-0">
                      <p>Real Authentic Wellness</p>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <Form
                      name="basic"
                      layout="vertical"
                      onFinish={onFinish}
                      autoComplete="off"
                      form={form}
                    >
                      <Row gutter={[10, 10]}>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <Form.Item
                            label="Your fullname"
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "Please input your full name!",
                              },
                            ]}
                          >
                            <Input placeholder="Enter your fullname" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <Form.Item
                            validateStatus={emailValidationStatus}
                            help={emailValidationMessage}
                            label="Email address"
                            name="email"
                            rules={[
                              {
                                required: true,
                                message: "Please input your email!",
                              },
                              {
                                type: "email",
                                message: "The input is not valid E-mail!",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter email address"
                              onChange={checkEmailExists}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <Form.Item
                            label="Create password"
                            name="password"
                            rules={[
                              {
                                required: true,
                                message: "Please input your Password!",
                              },
                              // prettier-ignore
                              {
                                min: 7,
                                pattern: "(?=.*[a-z])", //at least one small letter
                                pattern: "(?=.*[A-Z])", //at least one capital
                                pattern: "(?=.*d)", //at least one digit
                                pattern: "(?=.*[@$!%*#?&])", //at least one symbol
                                message: (
                                  <Tooltip
                                    visible={true}
                                    className="tooltipassword0"
                                    placement="leftTop"
                                    title="Include at least 7 characters, 1 number(0-9), 1 uppercase letter(A-Z), 1 lowercase letter(a-z), one special character."
                                  />
                                )
                              },
                            ]}
                          >
                            <Input.Password
                              placeholder="Password"
                              onChange={(e) => setPasswords(e.target.value)}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <Form.Item
                            label="Repeat password"
                            name="repeat-password"
                            rules={[
                              {
                                required: true,
                                message: "Please input your Confirm Password!",
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (
                                    !value ||
                                    getFieldValue("password") === value
                                  ) {
                                    return Promise.resolve();
                                  }

                                  return Promise.reject(
                                    new Error("Password does not match!")
                                  );
                                },
                              }),
                            ]}
                          >
                            <Input.Password
                              placeholder="Repeat password"
                              onChange={(e) =>
                                setReaptPasswords(e.target.value)
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={16} lg={16}>
                          {passwords == reaptpasswords &&
                          reaptpasswords == passwords &&
                          passwords != "" &&
                          reaptpasswords != "" ? (
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {" "}
                              <Image src={success} alt="success" />{" "}
                              <p style={{ padding: "3px" }}> Success</p>{" "}
                            </div>
                          ) : null}
                        </Col>
                        <Col xs={24} sm={24} md={16} lg={16}>
                          <Form.Item
                            name="trems_conditions"
                            valuePropName="checked"
                            rules={[
                              {
                                validator: (_, value) =>
                                  value
                                    ? Promise.resolve()
                                    : Promise.reject(
                                        new Error(
                                          "you must accept Terms & condition to proceed further!"
                                        )
                                      ),
                              },
                            ]}
                          >
                            <Checkbox
                              checked={termsCondition}
                              onChange={onChangeCheckbox}
                            >
                              <p>
                                <a
                                  onClick={showModal}
                                  style={{
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    color: "#000000",
                                    fontFamily: "Nunito Sans",
                                  }}
                                >
                                  {" "}
                                  I agree to terms & conditions
                                </a>
                              </p>
                            </Checkbox>
                          </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24}>
                          <Form.Item>
                            <div className="btn__login ">
                              <Button htmlType="submit" loading={loading}>
                                Register Account <RightOutlined />
                              </Button>
                            </div>
                          </Form.Item>
                        </Col>
                        <Modal
                          title="Terms & Conditions"
                          visible={isModalVisible}
                          onCancel={handleCancel}
                          footer={null}
                        >
                          <p>
                            What is Lorem Ipsum? Lorem Ipsum is simply dummy
                            text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy text
                            ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type
                            specimen book. It has survived not only five
                            centuries, but also the leap into electronic
                            typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of
                            Letraset sheets containing Lorem Ipsum passages, and
                            more recently with desktop publishing software like
                            Aldus PageMaker including versions of Lorem Ipsum.
                          </p>
                        </Modal>
                      </Row>
                    </Form>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="sideline">Or</div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="btn__google ">
                      <SocialButton
                        style={{ display: "flex", alignItems: "center" }}
                        client
                        provider="google"
                        appId="790051385633-8v14tava0prtb6f7oij7kvnjsob4e5jm.apps.googleusercontent.com"
                        onLoginSuccess={handleSocialLogin}
                        onLoginFailure={handleSocialLoginFailure}
                      >
                        <p>
                          {" "}
                          <img src={google} alt="r" />
                        </p>
                        <p
                          className="google_p"
                          style={{
                            fontFamily: "Lato",
                            fontStyle: "normal",
                            fontWeight: 500,
                            fontSize: "16px",
                          }}
                        >
                          {" "}
                          Register with Google
                        </p>
                      </SocialButton>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="btn__facebook ">
                      <SocialButton
                        style={{ display: "flex", alignItems: "center" }}
                        provider="facebook"
                        appId="736700457767738"
                        onLoginSuccess={handleSocialLogin}
                        onLoginFailure={handleSocialLoginFailure}
                      >
                        <p>
                          {" "}
                          <img src={fb} alt="r" />
                        </p>
                        <p
                          className="google_p"
                          style={{
                            fontFamily: "Lato",
                            fontStyle: "normal",
                            fontWeight: 500,
                            fontSize: "16px",
                          }}
                        >
                          {" "}
                          Register with Facebook
                        </p>
                      </SocialButton>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="footerSec">
        <div className="new_container">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className="icons_footer">
                <ul>
                  <li>
                    <img src={facebook} alt="r" />
                  </li>
                  <li>
                    <img src={youtube} alt="r" />
                  </li>
                  <li>
                    <img src={insta} alt="r" />
                  </li>

                  <li>
                    <img src={p} alt="r" />
                  </li>

                  <li>
                    <img src={tiktok} alt="r" />
                  </li>

                  <li>
                    <img src={b} alt="r" />
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className="text_footer">
                <ul>
                  <li>Contact </li>
                  <li>Us/FAQ</li> <li>Terms of Use</li>
                  <li>Privacy</li>
                </ul>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <div className="copyrightf">
                <p>Copyright © R.A.W. 2022</p>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <div className="copyrightr">
                <p>
                  Powered by <span>EyeUniversal</span>
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Register;
