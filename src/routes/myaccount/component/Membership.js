import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import righta from "../../../img/righta.svg";
import moment from "moment";

const Membership = ({ setUpgradeModalVisible }) => {
  const userState = useSelector((state) => state.user);
  const { userDetails } = userState;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      plan:
        userDetails &&
        userDetails.subscription &&
        userDetails.subscription.name,
    });
  }, [userDetails]);
  return (
    <div className="pi_inner">
      <Row gutter={[6, 6]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form form={form}>
            <Form.Item label="Member Since " name="name">
              <Input
                style={{
                  height: "50px",
                }}
                defaultValue={moment(userDetails.created_at).format("Y-MM-D")}
                disabled
              />
            </Form.Item>

            <Form.Item label="Membership Plan" name="plan">
              {Boolean(userDetails.subscription) ? (
                <Input
                  style={{
                    height: "50px",
                  }}
                  defaultValue={
                    userDetails &&
                    userDetails.subscription &&
                    userDetails.subscription.name
                  }
                  disabled
                />
              ) : null}
            </Form.Item>
            <Form.Item label="." name="name">
              <div
                className="trofybutton_tcc"
                // style={{
                //   display: "flex",
                //   alignItems: "flex-end",
                //   justifyContent: "flex-end",
                //   marginTop: "10px",
                // }}
              >
                <Button
                  style={{
                    width: "100%",
                  }}
                  onClick={() => setUpgradeModalVisible(true)}
                >
                  Update Plan
                  <img
                    style={{
                      marginLeft: "10px",
                    }}
                    src={righta}
                    alt="arrow"
                  />
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Membership;
