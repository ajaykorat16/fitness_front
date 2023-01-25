import React, { useState } from "react";
import { Row, Col, Modal, Button } from "antd";
import { RightOutlined } from "@ant-design/icons";

import docthumnail from "../../../img/unsplash_lg_T5aatVdo.svg";
import imgicon from "../../../img/Recurso4@2x.png";
import { S3_BUCKET_URL } from "../../../config/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import arrow from "../../../img/arrow.png";
import arrow2 from "../../../img/arrow2.png";
import {
  ChallengeSignUpRq,
  getChallengesDetails,
  leaveChallenges,
} from "../../../redux/actions/Challenges";
import moment from "moment";
import black from "../../../img/doc-thumnail.png";
// ../img/doc-thumnail.png
import profile from "../../../img/8.svg";
const ActiveChallenges = (item) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [signUpID, setSignUpID] = useState(null);
  const [signUpDate, setSignUpDate] = useState("");
  const [signUpEnd_date, setSignUpEnd_date] = useState("");

  // console.log("item-----------", item);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const leaveChallenge = async (id) => {
    let data = {
      challenge_id: id,
    };
    await dispatch(leaveChallenges(data));
    navigate(`/dashboard`);
  };

  const challengeDetails = async (id) => {
    let data = {
      id: id,
    };
    await dispatch(getChallengesDetails(data));
    navigate(`/challenge-details/${id}`);
  };

  const challengeSignUp = async () => {
    let data = {
      challenge_id: signUpID,
      start_date: signUpDate,
      end_date: signUpEnd_date,
    };
    await dispatch(ChallengeSignUpRq(data));
    navigate(`/challenge-details/${signUpID}`);
  };

  const signUpChallenge = (id, start, end) => {
    console.log("model-------------------");
    setSignUpID(id);
    setSignUpDate(start);
    setSignUpEnd_date(end);
    setIsPopupVisible(true);
  };

  const signUpCancel = () => {
    setSignUpID(null);
    setSignUpDate("");
    setSignUpEnd_date("");
    setIsPopupVisible(false);
  };

  return (
    <div className="active-hour-ah">
      <Row gutter={[0, 0]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div
            className="menuthumnail_img"
            onClick={() => challengeDetails(item.data.id)}
            style={{backgroundColor:"#000"}}
          >
            {/* {S3_BUCKET_URL + item.data.banner} */}
            {/* <img src={item.data.banner != null ? S3_BUCKET_URL + item.data.banner : black} height={210} alt="" /> */}
            <img
              src={
                item.data.thumbnail_image != null
                  ? S3_BUCKET_URL + item.data.thumbnail_image
                  : profile
              }
              height={210}
              alt=""
            />
            <div class="recp_hding-rh">
              <img
                src={
                  item.data && item.data.card_trophy != null
                    ? S3_BUCKET_URL + item.data.card_trophy
                    : imgicon
                }
              ></img>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div
            className="livetext-vl"
            // onClick={() => challengeDetails(item.data.id)}
          >
            <span className="livemain-vl">
              <h2>{item.data.title}</h2>
            </span>
            <p className="livedes-vl">
              {item.data.description.substring(0, 100)}
            </p>
            <span className="liveequip-vl">
              <b>
                {moment(item.data.start_date).format("DD-MM-yyyy")} |{" "}
                {moment(item.data.end_date).format("DD-MM-yyyy")}
              </b>
            </span>
            <div
              className="trofybutton_tc"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {console.log("completeC----", item)}
              {item.type == "active" ? (
                <Button
                  onClick={() => {
                    leaveChallenge(item.data.id);
                    // challengeDetails(item.data.id)
                  }}
                >
                  Leave Challenge
                  <span>
                    <img
                      style={{ width: "7px", marginLeft: "8px" }}
                      src={arrow}
                    />
                  </span>
                  <i
                    style={{
                      top: "1px",
                      position: "relative",
                      right: "7px",
                    }}
                    class="fa-solid fa-arrow-right"
                  ></i>
                </Button>
              ) : item &&
                item.data &&
                item.data.user_challenge_signup &&
                item.data.user_challenge_signup.status &&
                item.data.user_challenge_signup.status == 2 ? (
                <Button onClick={()=> challengeDetails(item.data.id)}>completed Challenge</Button>
              ) : (
                <Button
                  onClick={() =>
                    signUpChallenge(
                      item.data.id,
                      item.data.start_date,
                      item.data.end_date
                    )
                  }
                >
                  JOIN Challenge
                  <i
                    style={{
                      top: "1px",
                      position: "relative",
                      left: "9px",
                    }}
                    class="fa-solid fa-arrow-right"
                  ></i>
                  <span>
                    <img
                      style={{ width: "7px", marginLeft: "8px" }}
                      src={arrow2}
                    />
                  </span>
                  {/* <RightOutlined /> */}
                </Button>
              )}
            </div>
          </div>
        </Col>
      </Row>
      <Modal
        title="Alert"
        visible={isPopupVisible}
        onCancel={() => {
          signUpCancel();
        }}
        footer={null}
        className="alert-box-ab"
      >
        <div className="alert-para-ap">
          <p>
            Do your want to start the Challenge, click confirm to continue the
            Challenge.
          </p>
        </div>
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Button
              type="primary"
              onClick={() => signUpCancel()}
              className="add-delete-all"
            >
              Cancel
            </Button>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Button
              type="primary"
              onClick={() => challengeSignUp()}
              className="add-delete-all"
            >
              Confirm
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default ActiveChallenges;
