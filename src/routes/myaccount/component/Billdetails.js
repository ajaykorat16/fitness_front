import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import righta from "../../../img/righta.svg";
import RAW from "../../../api/raw";
import moment from "moment";
import axios from "axios";
import { SUGGESTIC } from "../../../config/constants";
import { userDetailData } from "../../../redux/actions/user";
import { useNavigate } from "react-router-dom";

const Billdetails = ({ setUpgradeModalVisible }) => {
  const userState = useSelector((state) => state.user);
  const { userDetails } = userState;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    userDetails["country"] = userDetails && userDetails.country_name;
    userDetails["address_line_1"] = userDetails && userDetails.address;
    userDetails["pincode"] = userDetails && userDetails.postal_code;
    form.setFieldsValue(userDetails);
  }, [userDetails]);

  const onFinish = async (values) => {
    try {
      values["stripe_customer_id"] = userDetails.stripe_customer_id;
      console.log("bill----", values);
      const response = await RAW.post("/update_stripe_customer", values);

      if (response.data.success) {
        dispatch(userDetailData(navigate))
        console.log("response--------", response.data);
        message.success(response.data.message);
      }
    } catch (err) {
      console.log("error-----", err);
    }
  };

  return (
    <div className="pi_inner">
      <Row gutter={[6, 6]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form form={form} onFinish={onFinish}>
            <Form.Item required label="Address" name="address_line_1">
              <Input
                style={{
                  height: "50px",
                }}
              />
            </Form.Item>

            <Form.Item required label="Country" name="country">
              <Input
                style={{
                  height: "50px",
                }}
              />
            </Form.Item>
            <Form.Item required label="State" name="state">
              <Input
                style={{
                  height: "50px",
                }}
              />
            </Form.Item>

            <Form.Item required label="City" name="city">
              <Input
                style={{
                  height: "50px",
                }}
              />
            </Form.Item>

            <Form.Item required label="Pincode" name="pincode">
              <Input
                style={{
                  height: "50px",
                }}
              />
            </Form.Item>

            <Form.Item label="." name="name">
              <div className="trofybutton_tcc">
                <Button
                  style={{
                    width: "100%",
                  }}
                  htmlType="submit"
                  // onClick={() => billDetail()}
                >
                  SUBMIT
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

export default Billdetails;
