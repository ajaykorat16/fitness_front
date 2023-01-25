import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Button, Spin } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionPlans } from "../../../redux/actions/program/program";
import {
  upgradeSubscriptionPlans,
  userDetailData,
} from "../../../redux/actions/user";
import { useNavigate } from "react-router-dom";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import ListPaymentMethods from "./ListPaymentMethods";
import axios from "axios";
import { SUGGESTIC } from "../../../config/constants";
import PaymentForm from "./PaymentForm";
import { message } from "antd";

const ProgramsModel = ({
  setSelectedPlan,
  isUpgradeModalVisible,
  setUpgradeModalVisible,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [listModal, setListModal] = useState(false);
  const [cvcModal, setCvcModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);

  const [paymentIntent, setPaymentIntent] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState({});
  const [subPlan, setSubPlan] = useState();
  const [subPlanPrice, setSubPlanPrice] = useState();
  const [subPlanPriceID, setSubPlanPriceID] = useState();

  const [paymentMethods, setPaymentMethods] = useState(null);

  const userState = useSelector((state) => state.user);
  const { userDetails } = userState;

  // *******************************************
  const stripe = useStripe();
  const elements = useElements();

  function handleSelectCard(method) {
    setSelectedMethod(method);
    createPaymentIntent(method.id);
  }

  const createPaymentIntent = async (selectedPaymentMethodId) => {
    axios
      .post(SUGGESTIC + "payment/create", {
        subPlanPrice: subPlanPrice,
        userCustomerId: userDetails.stripe_customer_id,
        paymentMethod: selectedPaymentMethodId,
      })
      .then((resp) => {
        setPaymentIntent(resp.data);
        setCvcModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getPaymentMethods() {
    axios
      .post(SUGGESTIC + "payment/methods", {
        customerId: userDetails.stripe_customer_id,
      })
      .then((resp) => {
        /* Handle success */
        if (resp.data.data.length > 0) {
          setListModal(true);
          setPaymentMethods(resp.data.data);
        } else {
          setUpgradeModalVisible(false);
          message.success("Plan is Selected, Please enter your card Details");
        }
      })
      .catch((err) => {
        console.log("payment user create-2---error", err);
        /*Handle Error */
      });
  }

  const programState = useSelector((state) => state.programs_data);
  const { subscription_plans, plansLoading } = programState;

  useEffect(() => {
    if (!subscription_plans.length) dispatch(getSubscriptionPlans());
  }, []);

  const initiateSubscriptionUpgrade = async (plan_id) => {
    await dispatch(upgradeSubscriptionPlans(subPlan));
    setCvcModal(false);
    dispatch(userDetailData(navigate));
    setUpgradeModalVisible(false);
  };

  return (
    <div className="">
      <Modal
        visible={isUpgradeModalVisible}
        onCancel={() => setUpgradeModalVisible(false)}
        className="programmodel-white-pm"
        footer={null}
      >
        <div className="pricing-heaidng-pm">
          <h2>Upgrade your Plan</h2>
        </div>
        <div className="pricing-select-pm">
          <Row
            gutter={[2, 2]}
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            {plansLoading ? (
              <Spin className="loader-ld" />
            ) : (
              <>
                {userDetails.subscription &&
                  subscription_plans.map((plan) => {
                    const activeClass =
                      plan.id === userDetails.subscription.id ? "active" : "";
                    return (
                      <Col
                        xs={24}
                        sm={24}
                        md={8}
                        lg={8}
                        onClick={() => {
                          // api_id
                          setSelectedPlan({
                            plan: plan.id,
                            price: plan.price,
                            api_id: plan.api_id,
                          });
                          setSubPlanPriceID(plan.api_id);
                          setSubPlanPrice(plan.price);
                          setSubPlan(plan.id);
                          message.success("Plan is Selected");
                        }}
                      >
                        <div
                          className={"pricingCard-pm " + activeClass}
                          style={{ cursor: "pointer" }}
                        >
                          {plan.name === "Advance" ? (
                            <div className="most-popluar-pm">
                              <Button>MOST POPULAR</Button>
                            </div>
                          ) : null}

                          <div className="price-box-pm">
                            ${plan.price}
                            <sub className="price-value-pm">.99</sub>{" "}
                            <sub className="price-month-pm"> / month</sub>
                          </div>
                          <div className="features-pm">
                            <h5>{plan.name}</h5>
                            <p>
                              For most businesses that want to otpimize web
                              queries
                            </p>
                          </div>
                          <div className="planPriceDescription-pm">
                            <ul>
                              <li>
                                <span className="check-icon-ci">
                                  <b className="checkicon-ci">
                                    <CheckOutlined />
                                  </b>
                                  <p>Betting against yourself</p>
                                </span>
                              </li>
                              <li>
                                <span className="check-icon-ci">
                                  <b className="checkicon-ci">
                                    <CheckOutlined />
                                  </b>
                                  <p>Live Workouts</p>
                                </span>
                              </li>
                              <li>
                                <span className="check-icon-ci">
                                  <b className="checkicon-ci">
                                    <CheckOutlined />
                                  </b>
                                  <p>Group Challenges </p>
                                </span>
                              </li>
                              <li>
                                <span className="check-icon-ci">
                                  <b className="checkicon-ci">
                                    <CheckOutlined />
                                  </b>
                                  <p>Wellness Journal Tracking</p>
                                </span>
                              </li>
                              <li>
                                <span className="check-icon-ci">
                                  <b className="checkicon-ci">
                                    <CheckOutlined />
                                  </b>
                                  <p>Personalized Menu</p>
                                </span>
                              </li>
                              <li>
                                <span className="check-icon-ci">
                                  <b className="checkicon-ci">
                                    <CheckOutlined />
                                  </b>
                                  <p>Premium Blog | Forums</p>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
              </>
            )}
          </Row>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",

            justifyContent: "flex-end",
          }}
        >
          <button
            style={{
              marginTop: "10px",
              border: "none",
              padding: "10px",
              paddingRight: "40px",
              paddingLeft: "40px",
              background: "#29B8C4",
              color: "#fff",
            }}
            onClick={() => getPaymentMethods()}
          >
            Upgrade Now
          </button>
        </div>
      </Modal>
      <Modal
        visible={listModal}
        onCancel={() => {
          setListModal(false);
        }}
        className="programmodel-white-pm"
        footer={null}
      >
        <div className="pricing-heaidng-pm">
          <h2>Select Method</h2>
        </div>
        <ListPaymentMethods
          subPlanPriceID={subPlanPriceID}
          handleSelectCard={handleSelectCard}
          setListModal={setListModal}
          paymentMethods={paymentMethods}
          initiateSubs={initiateSubscriptionUpgrade}
        />
      </Modal>

      <Modal
        visible={cvcModal}
        onCancel={() => {
          setCvcModal(false);
        }}
        className="programmodel-white-pm"
        footer={null}
      >
        <div className="pricing-heaidng-pm">
          <h2>Confirm CVC</h2>
        </div>
        <PaymentForm
          paymentIntent={paymentIntent}
          paymentMethod={selectedMethod}
          initiateSubs={initiateSubscriptionUpgrade}
          subPlan={subPlan}
        />
      </Modal>
    </div>
  );
};

export default ProgramsModel;
