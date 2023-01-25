import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { login, socialLogin } from "../../redux/actions/user";
import loginimg from "../../img/login.svg";
import {
  ArrowRightOutlined,
  FacebookOutlined,
  LeftOutlined,
  GoogleOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import facebook from "../../img/rr.png";
import youtube from "../../img/a.png";
import insta from "../../img/g.png";
import p from "../../img/u.png";
import tiktok from "../../img/l.png";
import b from "../../img/gg.png";
import google from "../../img/google.svg";
import fb from "../../img/fb.svg";

import bg from "../../img/login.png";
import logo from "../../img/logowhite.png";
import logotext from "../../img/realtext.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SocialButton from "../../components/SocialButton";
import { Link } from "react-router-dom";
import rowImage from "../../../src/img/Group.svg";
import moment from "moment";
const Login = () => {
  const [socialPayload, setSocialPayload] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const user = useSelector((state) => state.user);
  const { isAuth, loading } = user;

  useEffect(() => {
    if (isAuth && !loading) {
      navigate("/dashboard");
      // state ? navigate(state.from.pathname) : navigate("/dashboard");
    }
  }, [isAuth, loading]);
  // useEffect(()=>{
  //   if (isAuth) {
  //     navigate("/dashboard");
  //     // state ? navigate(state.from.pathname) : navigate("/dashboard");
  //   }
  // },[])

  const onFinish = (values) => {
    values["local"] = moment.tz.guess();
    dispatch(login(values));
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
              // style={{
              //   backgroundImage: 'url("' + loginimg + '")',

              //   backgroundRepeat: "no-repeat",
              // }}
            >
              {/* <img src={loginimg}></img> */}
              <div className="logo-login-ll">
                <img src={rowImage}></img>
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
                      Don’t have an account?{" "}
                    </p>
                    <div className="btn__bottomr">
                      <Link to="/register">
                        <Button>
                          <b>Sign Up</b>
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
                      Log in
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
                    >
                      <Row gutter={[10, 10]}>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <Form.Item
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
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                              {
                                required: true,
                                message: "Please input your password!",
                              },
                              /* // prettier-ignore
                          {
                            min:8,
                            pattern:"(?=.*[a-z])", //at least one small letter
                            pattern: "(?=.*[A-Z])", //at least one capital
                            pattern: "(?=.*\d)", //at least one digit
                            pattern: "(?=.*[@$!%*#?&])", //at least one symbol
                            message: "validation failed message",
                          }, */
                            ]}
                          >
                            <Input.Password />
                          </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24}>
                          <Form.Item>
                            <div className="forgetbtn0">
                              <Button
                                type="link"
                                target="_blank"
                                onClick={() => {
                                  navigate("/forget-password");
                                }}
                              >
                                Forgot Password?
                              </Button>
                            </div>
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <Form.Item>
                            <div className="btn__login ">
                              <Button
                                htmlType="submit"
                                style={{
                                  fontWaight: "400",
                                }}
                                loading={loading}
                              >
                                Login
                                {/* <ArrowRightOutlined /> */}
                              </Button>
                            </div>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="sideline ">Or</div>
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
                        {/* <img src="../../img/g.png"></img> */}
                        <p>
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
                          Login with Google
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
                          Login with Facebook
                        </p>
                      </SocialButton>
                    </div>
                  </Col>
                  {/* <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="topline"></div>
                </Col> */}
                  {/* <Col xs={24} sm={24} md={12} lg={12}>
                  <div className="btn__bottomr">
                    <Button>Not a customer yet?</Button>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <div className="btn__bottomr">
                    <Link to="/Register">
                      <Button>
                        <b>Register</b>
                      </Button>
                    </Link>
                  </div>
                </Col> */}
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
                  <li>Us/FAQ</li>
                  <li>Terms of Use</li>
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
export default Login;
