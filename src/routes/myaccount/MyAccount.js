import React, { useState } from "react";
import { Row, Col } from "antd";
import PaymentInformation from "./component/PaymentInformation";
import Membership from "./component/Membership";
import ProfileSidebar from "../myprofile/component/ProfileSidebar";
import ProgramsModel from "../program/component/ProgramsModel";
import { CardElement } from "@stripe/react-stripe-js";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import Billdetails from "./component/Billdetails";

const MyAccount = () => {
  
  const [isUpgradeModalVisible, setUpgradeModalVisible] = useState(false);
  const [SelectedPlan, setSelectedPlan] = useState({});

  return (
    <div>
      <div className="side_container">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={6} lg={6}>
            <ProfileSidebar />
          </Col>
          <Col xs={24} sm={24} md={18} lg={18}>
            <div className="rp-right-profile">
              <Row gutter={[20, 20]}>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="personal_title">
                        <h2>Membership</h2>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="pi_border">
                        <Membership
                          setUpgradeModalVisible={setUpgradeModalVisible}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={[20, 20]}>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="personal_title">
                      <h2>Bill Details</h2>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="pi_border">
                      <Billdetails

                        setUpgradeModalVisible={setUpgradeModalVisible}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
              <Row gutter={[20, 20]}>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="personal_title">
                        <h2>Payment information</h2>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="pi_border">
                        <PaymentInformation SelectedPlan={SelectedPlan} />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <ProgramsModel
              setSelectedPlan={setSelectedPlan}
                isUpgradeModalVisible={isUpgradeModalVisible}
                setUpgradeModalVisible={setUpgradeModalVisible}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MyAccount;
