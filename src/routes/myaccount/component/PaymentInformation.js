import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { ArrowRightOutlined, RightOutlined } from "@ant-design/icons";
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { STRIPE_SECRET_KEY } from "../../../config/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { SUGGESTIC } from "../../../config/constants";
import { upgradeSubscriptionPlans } from "../../../redux/actions/user";

const PaymentInformation = ({ SelectedPlan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const { userDetails } = userState;

  const [paymentMethods, setPaymentMethods] = useState(null);
  const [cardFlag, setCardFlag] = useState(false);
  const [lastCard, setLastCard] = useState("");

  const [form] = Form.useForm();

  function getPaymentMethods() {
    axios
      .post(SUGGESTIC + "payment/methods", {
        customerId: userDetails.stripe_customer_id,
      })
      .then((resp) => {
        /* Handle success */
        if (resp.data.data.length > 0) {
          // console.log("payment user create-2---er", resp.data.data.length > 0);
          form.setFieldsValue({
            cardNumber: `${resp.data.data[0].card.brand} ending in ${resp.data.data[0].card.last4}`,
            cardExpir: `${resp.data.data[0].card.exp_month}/${resp.data.data[0].card.exp_year}`,
          });

          setPaymentMethods(resp.data.data[0]);
        } else {
          setCardFlag(true);
        }
      })
      .catch((err) => {
        console.log("payment user create-2---error", err);
        /*Handle Error */
      });
  }

  useEffect(() => {
    if (userDetails.stripe_customer_id) getPaymentMethods();
  }, [userDetails]);

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        lineHeight: "27px",
        color: "#212529",
        fontSize: "1.1rem",
        "::placeholder": {
          color: "#aab7c4",
        },
      },

      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  // const createPaymentIntent = async (selectedPaymentMethodId) => {
  //   axios
  //     .post(SUGGESTIC + "payment/create", {
  //       subPlanPrice: subPlanPrice,
  //       userCustomerId: userDetails.stripe_customer_id,
  //       paymentMethod: selectedPaymentMethodId,
  //     })
  //     .then((resp) => {
  //       setPaymentIntent(resp.data);
  //       setCvcModal(true)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  // }

  const makePayment = async () => {
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
      });
      console.log("paymentTest-----------", paymentMethod);
      if (!error) {
      }
    } catch (err) {
      console.log("paymentTest--------1", err);
    }
  };

  const onFinish = async (values) => {
    console.log("SelectedPlan.api_id", SelectedPlan.api_id);
    axios
      .post(SUGGESTIC + "create-checkout-session", {
        customerId: userDetails.stripe_customer_id,
        priceId: SelectedPlan.api_id,
      })
      .then(async (resp) => {
        /* Handle success */
        // makePayment()
        // getPaymentMethods();
        // setCardFlag(false);
        // console.log("payment user create-2--success-", resp.data.data.latest_invoice.payment_intent.client_secret);

        const cardElement = elements.getElement(CardNumberElement);

        // Use card Element to tokenize payment details
        let { error, paymentIntent } = await stripe.confirmCardPayment(
          resp.data.data.latest_invoice.payment_intent.client_secret,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: "jack",
              },
            },
          }
        );
        if (!error) {
          await dispatch(upgradeSubscriptionPlans(SelectedPlan.plan));
          console.log("payment user create-2--success-", paymentIntent);
          console.log("payment user create-2--success-e", error);
        } else {
          console.log("payment user create-2--success-e", error);
        }
      })
      .catch((err) => {
        console.log("payment user create-2---error", err);
        /*Handle Error */
      });
  };

  // const onFinish = async (values) => {
  //   // event.preventDefault();
  //   console.log(
  //     "elements.getElement(CardElement)----",
  //     elements.getElement(CardNumberElement)
  //   );

  //   const billingDetails = {
  //     name: userDetails.username,
  //   };

  //   try {
  //     stripe
  //       .createPaymentMethod({
  //         type: "card",
  //         billing_details: billingDetails,
  //         card: elements.getElement(CardNumberElement),
  //       })
  //       .then((resp) => {
  //         axios
  //           .post(SUGGESTIC + "payment/method/attach", {
  //             paymentMethod: resp.paymentMethod,
  //             customerId: userDetails.stripe_customer_id,
  //           })
  //           .then((resp) => {
  //             /* Handle success */
  //             makePayment()
  //             // getPaymentMethods();
  //             setCardFlag(false);
  //             console.log("payment user create-2---", resp);
  //           })
  //           .catch((err) => {
  //             console.log("payment user create-2---error", err);
  //             /*Handle Error */
  //           });
  //         console.log("createPaymentMethod------", resp);
  //       });
  //   } catch (err) {
  //     /* Handle Error*/
  //   }
  // };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
      // autoComplete="off"
    >
      <div className="pi_inner">
        <Row gutter={[6, 6]}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Form.Item label="Card number" name="cardNumber">
              {cardFlag ? (
                <CardNumberElement
                  id="cc-number"
                  className="form-control"
                  options={CARD_ELEMENT_OPTIONS}
                />
              ) : (
                <Input onClick={() => setCardFlag(true)} />
              )}
            </Form.Item>
            <Form.Item label="Name on card" name="cardCVC">
              {cardFlag ? (
                <CardCvcElement
                  id="cvc"
                  className="form-control"
                  options={CARD_ELEMENT_OPTIONS}
                />
              ) : (
                <Input onClick={() => setCardFlag(true)} />
              )}
            </Form.Item>
            <Form.Item label="Expiration Date" name="cardExpir">
              {cardFlag ? (
                <CardExpiryElement
                  id="expiry"
                  className="form-control"
                  options={CARD_ELEMENT_OPTIONS}
                />
              ) : (
                <Input onClick={() => setCardFlag(true)} />
              )}
            </Form.Item>
            <Form.Item label="." name="cardExpir">
              <div
                className="trofybutton_tcc"
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  margin: "0",
                }}
              >
                <Button
                  htmlType="submit"
                  style={{
                    padding: "12px 34px",
                  }}
                >
                  Confirm Payment
                  <RightOutlined />
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default PaymentInformation;
