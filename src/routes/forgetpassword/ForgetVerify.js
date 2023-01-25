import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col, Spin, message } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  forgetPasswordVerify,
  changePassword,
} from "../../redux/actions/forgot_pass";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgetVerify = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const tokenval = location.pathname.split("/");

  const forgetState = useSelector((state) => state.forget_pass);
  const { check_valid, loading, password_changed } = forgetState;

  useEffect(() => {
    if (tokenval.length > 1) {
      let tokendata = tokenval[2];
      dispatch(forgetPasswordVerify({ tokenval: tokendata }));
    }
  }, []);

  const onFinish = (values) => {
    if (tokenval.length > 1) {
      let tokendata = tokenval[2];
      values.tokenval = tokendata;

      dispatch(changePassword(values));
    }
  };

  useEffect(() => {
    if (check_valid === false) {
      message.error("Invalid Token");
      navigate("/login");
    }
    if (password_changed) {
      message.success("Password chenged successfully, please login!");
      navigate("/login");
    }
  }, [check_valid, password_changed]);

  return (
    <div className="login_contnainer">
      <Row
        gutter={[10, 10]}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col xs={24} sm={24} md={12} lg={12}>
          {loading ? (
            <Spin className="loader-ld" />
          ) : check_valid && !password_changed ? (
            <div className="login-form">
              <Row gutter={[10, 10]}>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <h2 className=" eds-text-hl">Change Password</h2>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24}>
                  <p>Enter your new password.</p>
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
                          label="Password"
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Password!",
                            },
                            {
                              min: 8,
                              message: "Password must be minimum 8 characters.",
                            },
                            {
                              pattern:
                                "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$",
                              message:
                                "Please use at least a upper case, Lower case and numbers.",
                            },
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item>
                          <div className="btn__login ">
                            <Button htmlType="submit">
                              Change Password <ArrowRightOutlined />
                            </Button>
                          </div>
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={24} lg={24}>
                        <div className="topline"></div>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <div className="btn__bottomr">
                          <Button>Try a different account.</Button>
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <div className="btn__bottomr">
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
            </div>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

export default ForgetVerify;
