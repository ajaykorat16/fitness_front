import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import EmailNotifications from "./component/EmailNotifications";
import Privacy from "./component/Privacy";
import ProfileSidebar from "../myprofile/component/ProfileSidebar";
import RAW from "../../api/raw"
import { RightOutlined } from "@ant-design/icons";

const Settings = () => {
  const initialValues = {
    live_sms: "",
    blog_sms: "",
    challange_sms: "",
    live_email: "",
    blog_email: "",
    challange_email: "",
  };
  const [settingValue, setSettingValue] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const setSetting  = async () => {
    try {
      setLoading(true)
      const response = await RAW.post("/add_setting",settingValue);
      getSetting()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  };

  useEffect(() => {
    getSetting()
  }, []);

  const getSetting  = async () => {
    try {
      const response = await RAW.get("/get_setting");
      if(response.data.success){
      setSettingValue(response.data.data)
      }
    } catch (err) {
    }
  };
  return (
    <div>
      <div className="side_container">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={6} lg={6}>
            <ProfileSidebar />
          </Col>
          <Col xs={24} sm={24} md={9} lg={9}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="personal_title">
                  <h2>Email Notifications</h2>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="pi_border">
                  <div className="livesession-en">
                    <div className="livesessions-f">
                      <h2>Live Sessions</h2>
                    </div>
                    <EmailNotifications
                      setSettingValue={setSettingValue}
                      settingValue={settingValue}
                      path={"live_email"}
                    />
                    <div className="livesessions-f">
                      <h2>Blog</h2>
                    </div>
                    <EmailNotifications
                      setSettingValue={setSettingValue}
                      settingValue={settingValue}
                      path={"blog_email"}
                    />
                    <div className="livesessions-f">
                      <h2>Challenges</h2>
                    </div>
                    <EmailNotifications
                      setSettingValue={setSettingValue}
                      settingValue={settingValue}
                      path={"challange_email"}
                    />
                    <div className="livesessions-f">
                      <h2>Newsletter</h2>
                    </div>
                    <EmailNotifications
                      setSettingValue={setSettingValue}
                      settingValue={settingValue}
                      path={"news_email"}
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="personal_title">
                  <h2>SMS Notifications</h2>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="pi_border">
                  <div className="livesession-en">
                    <div className="livesessions-f">
                      <h2>Live Sessions</h2>
                    </div>
                    <EmailNotifications
                      setSettingValue={setSettingValue}
                      settingValue={settingValue}
                      path={"live_sms"}
                    />
                    <div className="livesessions-f">
                      <h2>Blog</h2>
                    </div>
                    <EmailNotifications
                      setSettingValue={setSettingValue}
                      settingValue={settingValue}
                      path={"blog_sms"}
                    />
                    <div className="livesessions-f">
                      <h2>Challenges</h2>
                    </div>
                    <EmailNotifications
                      setSettingValue={setSettingValue}
                      settingValue={settingValue}
                      path={"challange_sms"}
                    />
                    <div className="livesessions-f">
                      <h2>Newsletter</h2>
                    </div>
                    <EmailNotifications
                      setSettingValue={setSettingValue}
                      settingValue={settingValue}
                      path={"news_sms"}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={9} lg={9}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="personal_title">
                  <h2>Privacy</h2>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="pi_border">
                  <Privacy />
                </div>
              </Col>
              <div className="btn_saveinfo">
          
                  <Button
                    onClick={setSetting}
                    loading={loading}
                    disabled={loading}
                  >
                  
                    Save info <RightOutlined />
                  </Button>
                </div>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={9} lg={9}>
          
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Settings;
