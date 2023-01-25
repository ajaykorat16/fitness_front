import React, { useEffect, useState } from "react";
import style from "./ListPaymentMethods.module.scss";
import { getCardImage } from "../../../config/helpers";
import axios from "axios";
import { SUGGESTIC } from "../../../config/constants";
import { useSelector } from "react-redux";
import { useStripe } from "@stripe/react-stripe-js";

export default function ListPaymentMethods({
  subPlanPriceID,
  handleSelectCard,
  setListModal,
  paymentMethods,
  initiateSubs,
}) {

  const userState = useSelector((state) => state.user);
  const stripe = useStripe();
  const { userDetails } = userState;

  const onFinish = async (values) => {
    axios
      .post(SUGGESTIC + "create-checkout-session", {
        customerId: userDetails.stripe_customer_id,
        priceId: subPlanPriceID,
      })
      .then(async (resp) => {
        setListModal(false);
        let { error, paymentIntent } = await stripe.confirmCardPayment(
          resp.data.data.latest_invoice.payment_intent.client_secret,
          {
            payment_method: values.id,
          }
        );
        if (!error) {
          initiateSubs();
        } else {
          console.log("payment user create-2---error", error);
        }
      })
      .catch((err) => {
        console.log("payment user create-2---error", err);
        /*Handle Error */
      });
  };


  return (
    <div className={style.wrapper}>
      {paymentMethods &&
        paymentMethods.map((method) => (
          <div
            className={style.card}
            onClick={() => {
              onFinish(method);
            }}
          >
            <div className={style.cardLogo}>
              <img src={getCardImage(method.card.brand)} alt="" />
            </div>

            <div className={style.details}>
              <p>
                {method.card.brand} **** {method.card.last4}
              </p>
              <p>{method.billing_details.name}</p>
            </div>

            <div className={style.expire}>
              Expires {`${method.card.exp_month}/${method.card.exp_year}`}
            </div>
          </div>
        ))}
    </div>
  );
}
