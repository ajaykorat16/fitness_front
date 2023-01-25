import React from "react";
import { Col, Modal, Row, Form, Input, Button, Slider } from "antd";
import Logo from "../../../img/Logo.png";
import {
  FacebookOutlined,
  MessageOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { BASE_URL, S3_BUCKET_URL } from "../../../config/constants";

const OverViewModal = ({
  isOverViewVisible,
  handleOverviewCancel,
  selectedEvent,
}) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal
      visible={isOverViewVisible}
      footer={null}
      className="corecircuitmodel-ccm"
      onCancel={handleOverviewCancel}
    >
      <div className="calendar-img-ccm liveview-vl ">
        <Row gutter={[0, 0]}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <div className="liveimg-calender">
              <img
                src={
                  selectedEvent.banner !== null
                    ? S3_BUCKET_URL + selectedEvent.banner
                    : Logo
                }
                alt=""
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={16} lg={16}>
            <div className="livetext-vl">
              <span className="livemain-vl">
                <h2>{selectedEvent.title}</h2>
                <p>{selectedEvent.description}</p>
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

                  {/* <Col xs={24} sm={24} md={12} lg={12}>
                    <div className="share-icon-sccm">
                      <p>Share</p>
                      <FacebookOutlined />
                      <MessageOutlined />
                      <TwitterOutlined />
                      <LinkedinOutlined />
                    </div>
                  </Col> */}
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div
        className="planned-btn-ccm"
        style={{
          pointerEvents: "none",
          opacity: 0.4,
        }}
      >
        <Row gutter={[6, 6]}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <div>
              <Form
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Row gutter={[6, 6]}>
                  <Col xs={24} sm={24} md={8} lg={8}></Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <p className="planned-ccm">Planned</p>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <p className="planned-ccm">Completed</p>
                  </Col>
                </Row>
                <Row gutter={[6, 6]}>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <p className="planned-ccm">Duration</p>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[6, 6]}>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <p className="planned-ccm">Distance</p>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[6, 6]}>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <p className="planned-ccm">Calories</p>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
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
                        <Button>Completed as planned</Button>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[6, 6]}>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <p className="planned-ccm">Heart Rate</p>
                  </Col>
                  <Col xs={24} sm={24} md={5} lg={5}>
                    <div className="min-hearttrate-ccm">
                      <Form.Item name="url" label="Min">
                        <Input />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={5} lg={5}>
                    <div className="min-hearttrate-ccm">
                      <Form.Item name="avg" label="Avg">
                        <Input />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={5} lg={5}>
                    <div className="min-hearttrate-ccm">
                      <Form.Item name="Max" label="Max">
                        <Input />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <div className="note-text-ccm">
              <p
                className="planned-ccm"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Notes
              </p>
              <Form.Item name={["user", "introduction"]}>
                <Input.TextArea />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <div className="feel-text-ccm">
              <p
                className="planned-ccm"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                How did you feel
              </p>
              <div>
                <Row gutter={[6, 6]}>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <div className="emotion-icon-ccm">
                      <p className="planned-ccm">Strong</p>
                      <i className="fa fa-smile-o" aria-hidden="true"></i>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <div className="emotion-icon-ccm">
                      <p className="planned-ccm">Normal</p>
                      <i className="fa fa-meh-o" aria-hidden="true"></i>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <div className="emotion-icon-ccm">
                      <p className="planned-ccm">Weak</p>
                      <i className="fa fa-frown-o" aria-hidden="true"></i>
                    </div>
                  </Col>
                </Row>
                <Row
                  gutter={[6, 6]}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <div className="perceived-exertion-ccm">
                      <p className="planned-ccm">Perceived Exertion</p>
                      <Slider defaultValue={30} />
                    </div>
                  </Col>
                </Row>
                <Row gutter={[6, 6]}>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <Form.Item>
                      <div
                        className="trofybutton_ccm"
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
                    <Form.Item>
                      <div
                        className="trofybutton_ccm"
                        style={{
                          margin: "0",
                          textAlign: "center",
                        }}
                      >
                        <Button>Cancel</Button>
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
                        <Button>Save</Button>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default OverViewModal;
