import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { ArrowRightOutlined, LeftOutlined } from "@ant-design/icons";

import { forgetPassword } from "../../redux/actions/user";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import bg from "../../img/login.png";
import logo from "../../img/logowhite.png";
import logotext from "../../img/realtext.svg";
const ForgetPassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);

  const onFinish = (values) => {
    dispatch(forgetPassword(values));
  };

  return (
    <div className="login_contnainer">
      <Row gutter={[0, 0]}>
        <Col xs={24} sm={24} md={14} lg={14}>
          <div
            className="login-img-lm"
            style={{
              backgroundImage: `url(${bg})`,
            }}
            // style={{
            //   backgroundImage: 'url("' + loginimg + '")',

            //   backgroundRepeat: "no-repeat",
            // }}
          >
            {/* <img src={loginimg}></img> */}
            <div className="logo-login-ll">
              <img src={logo}></img>
            </div>
            <div className="logotext-lt">
              <img src={logotext}></img>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={10} lg={10}>
          <div className="login-form" style={{ height: window.innerHeight }}>
            <div className="login-form-pd-5">
              <Row gutter={[10, 10]}>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <Row gutter={[10, 10]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <h2 className=" eds-text-hl">Forget Password</h2>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24}>
                      <p>Enter your registered email to reset your password.</p>
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
                            <Form.Item>
                              <div className="btn__login ">
                                <Button htmlType="submit" loading={loading}>
                                  Reset Password <ArrowRightOutlined />
                                </Button>
                              </div>
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={24} md={24} lg={24}>
                            <div className="topline"></div>
                          </Col>
                          <Col xs={24} sm={24} md={12} lg={12}>
                            <div className="btn__tryl">
                              <Button>Try a different account.</Button>

                              <Link to="/login">
                                <Button>
                                  <b>Login</b>
                                </Button>
                              </Link>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ForgetPassword;
