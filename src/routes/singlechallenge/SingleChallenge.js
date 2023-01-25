import React, { useEffect, useState } from "react";
import { Row, Col, Progress, Button, Modal } from "antd";

import LeftDashboard from "../../components/LeftDashboard";
import bgsingle from "../../img/unsplash_lg_T5aatVdo.jpg";
import profile from "../../img/8.svg";
import profile1 from "../../img/24.svg";
import profile2 from "../../img/24.svg";
import profile3 from "../../img/24.svg";
import arrow from "../../../src/img/arrow.png";
import arrow2 from "../../../src/img/arrow2.png";

import {
  ArrowRightOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import RecommendChallenges from "./component/RecommendChallenges";
import { S3_BUCKET_URL } from "../../config/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChallengeSignUpRq,
  completeChallenges,
  getChallengesDetails,
  leaveChallenges,
} from "../../redux/actions/Challenges";
import { ChallengeSkeleton } from "../fitness/component/CardSkeleton";
import black from "../../img/doc-thumnail.png";

import moment from "moment";
import ActiveChallenges from "../allchallenges/component/ActiveChallenges";
import {
  getMyPlanSideBar,
  getSetps,
  getWater,
} from "../../redux/actions/dashboardAction";

const SingleChallenge = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { details, loading } = useSelector((state) => state.challenges);
  const params = useParams();

  const [Days, setDays] = useState(0);

  const [signUpID, setSignUpID] = useState(null);
  const [signUpDate, setSignUpDate] = useState("");
  const [signUpEnd_date, setSignUpEnd_date] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    challengeDetails(params.id);
    let payload = {
      start_date: moment().format("Y-MM-D"),
      end_date: moment().format("Y-MM-D"),
    };
    dispatch(getMyPlanSideBar(payload));
    dispatch(getSetps(payload));
    dispatch(getWater(payload));
  }, []);

  const challengeDetails = async (id) => {
    let data = {
      id: id,
    };
    await dispatch(getChallengesDetails(data));
  };

  const leaveChallenge = async (id) => {
    let data = {
      challenge_id: id,
    };
    await dispatch(leaveChallenges(data));
    navigate(`/dashboard`);
  };

  const completeChallenge = async (id) => {
    let data = {
      challenge_id: id,
    };
    await dispatch(completeChallenges(data));
    challengeDetails(params.id);
    // navigate(`/dashboard`);
  };

  useEffect(() => {
    calDays();
  }, [details]);

  const calDays = () => {
    let DT = moment(details && details.end_date).isSameOrAfter(
      moment().format("YYYY-MM-DD")
    );
    // console.log("dates--", DT);
    if (DT) {
      var startDate = moment().format("yyyy-MM-DD");
      var endDate = moment(details && details.end_date, "yyyy-MM-DD");
      var diffDay = endDate.diff(startDate, "days");
      // console.log("setDays----",diffDay, details.end_date)
      setDays(diffDay);
    } else {
      setDays(0);
    }
  };

  const signUpChallenge = (id, start, end) => {
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

  const challengeSignUp = async () => {
    let data = {
      challenge_id: signUpID,
      start_date: signUpDate,
      end_date: signUpEnd_date,
    };
    await dispatch(ChallengeSignUpRq(data));
    setIsPopupVisible(false);
    challengeDetails(params.id);
    // navigate(`/challenge-details/${signUpID}`);
  };

  return (
    <div>
      <div className="side_container" style={{ minHeight: "100vh" }}>
        {loading ? (
          <Row gutter={[20, 20]}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <LeftDashboard />
            </Col>
            <Col xs={24} sm={24} md={18} lg={18}>
              <ChallengeSkeleton />
            </Col>
          </Row>
        ) : details ? (
          <>
            <Row gutter={[20, 20]}>
              <Col xs={24} sm={24} md={6} lg={6}>
                <LeftDashboard />
              </Col>
              <Col xs={24} sm={24} md={18} lg={18}>
                <div className="rp-right-profile scroll_bar">
                  <Row gutter={[10, 10]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="backbtn-a">
                        <h2 onClick={() => navigate(-1)}>
                          <LeftOutlined /> Back
                        </h2>
                      </div>

                      <div className="livesessions-f ">
                        <h2>challange</h2>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="profilecover-img-rs">
                        <div
                          className="cover-img-rs"
                          style={{ backgroundColor: "#000" }}
                        >
                          <img
                            src={
                              details.banner != null
                                ? S3_BUCKET_URL + details.banner
                                : profile
                            }
                            alt="img"
                          ></img>
                        </div>
                        <span className="profile-img-rs">
                          <div className="profilinner-tp">
                            <Row
                              gutter={[16, 16]}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Col xs={24} sm={24} md={4} lg={4}>
                                <img
                                  src={
                                    details && details.details_trophy != null
                                      ? S3_BUCKET_URL + details.details_trophy
                                      : profile3
                                  }
                                  alt="alt"
                                ></img>
                              </Col>
                              <Col xs={24} sm={24} md={18} lg={18}>
                                <div className="hour-challenge-rs">
                                  <h3>{details.title}</h3>
                                  <p>
                                    Description <ArrowRightOutlined />{" "}
                                    {details.description}
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </span>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18}>
                      <Row
                        gutter={[16, 16]}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Col xs={24} sm={24} md={20} lg={20}>
                          <div className="progress-bar-pb">
                            <div className="progressbar-text-pb">
                              {(details &&
                              details.is_challenge_signed_up_count == 1) ||
                            (details &&
                              details.user_challenge_signup &&
                              details.user_challenge_signup.status &&
                              details.user_challenge_signup.status == 2) ? (
                                <>
                                  {details && details.type == "A" ? (
                                    <p>
                                      <span>
                                        {details.attached_type == 1
                                          ? `${
                                              details.complete_challenge || 0
                                            } Activity time`
                                          : details.attached_type == 2
                                          ? `${
                                              details.complete_challenge || 0
                                            } Calories Intake`
                                          : details.attached_type == 3
                                          ? `${
                                              details.complete_challenge || 0
                                            }  Active Calories`
                                          : details.attached_type == 4
                                          ? `${
                                              details.complete_challenge || 0
                                            } Steps`
                                          : `${
                                              details.complete_challenge || 0
                                            } Water`}
                                      </span>
                                      / {details.daily_goal || 0}{" "}
                                      {details.attached_type == 1
                                        ? ` Total Activity time`
                                        : details.attached_type == 2
                                        ? ` Total Calories Intake`
                                        : details.attached_type == 3
                                        ? ` Total Active Calories`
                                        : details.attached_type == 4
                                        ? ` Total Steps`
                                        : ` Total Water`}
                                    </p>
                                  ) : (
                                    <p>
                                      <span>
                                        {details.fitness_based_type == "Time"
                                          ? Math.floor(
                                              moment
                                                .duration(
                                                  (details &&
                                                    details.duration_complete) ||
                                                    0,
                                                  "seconds"
                                                )
                                                .asHours()
                                            ) +
                                            ":" +
                                            moment
                                              .duration(
                                                (details &&
                                                  details.duration_complete) ||
                                                  0,
                                                "seconds"
                                              )
                                              .minutes() +
                                            ":" +
                                            moment
                                              .duration(
                                                (details &&
                                                  details.duration_complete) ||
                                                  0,
                                                "seconds"
                                              )
                                              .seconds()
                                          : details.fitness_based_type ==
                                            "Distance"
                                          ? details.distance_complete || 0
                                          : details.session_complete || 0}{" "}
                                        {details.fitness_based_type == "Time"
                                          ? "Hours"
                                          : details.fitness_based_type ==
                                            "Distance"
                                          ? "Miles"
                                          : "Session"}{" "}
                                      </span>{" "}
                                      /{" "}
                                      {details.fitness_based_type == "Time"
                                        ? Math.floor(
                                            moment
                                              .duration(
                                                (details && details.time) || 0,
                                                "seconds"
                                              )
                                              .asHours()
                                          ) +
                                          ":" +
                                          moment
                                            .duration(
                                              (details && details.time) || 0,
                                              "seconds"
                                            )
                                            .minutes() +
                                          ":" +
                                          moment
                                            .duration(
                                              (details && details.time) || 0,
                                              "seconds"
                                            )
                                            .seconds()
                                        : details.fitness_based_type ==
                                          "Distance"
                                        ? details.distance || 0
                                        : details.session || 0}{" "}
                                      {details.fitness_based_type == "Time"
                                        ? "Hours"
                                        : details.fitness_based_type ==
                                          "Distance"
                                        ? "Miles"
                                        : "Session"}
                                    </p>
                                  )}
                                  <p>{Days} days left</p>
                                </>
                              ) : null}
                            </div>
                            {(details &&
                              details.is_challenge_signed_up_count == 1) ||
                            (details &&
                              details.user_challenge_signup &&
                              details.user_challenge_signup.status &&
                              details.user_challenge_signup.status == 2) ? (
                              <Progress
                                percent={(details && details.percentage) || 0}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="overview-pb">
                            <h4>Overview</h4>
                            <p>
                              {/* Overview <ArrowRightOutlined /> */}
                              {details.overview}
                            </p>
                          </div>
                          <div className="overview-pb">
                            <h4>Rewards</h4>
                            <p>
                              {/* Rewards <ArrowRightOutlined /> */}
                              {details.reward}
                            </p>
                          </div>
                          <div className="overview-pb">
                            <h4>Additional Info</h4>
                            <p>
                              {/* Additional Info
                              <ArrowRightOutlined /> */}
                              {details.additionalinfo}
                            </p>
                          </div>
                          <div className="overview-pb">
                            <h4>Rules</h4>
                            <p>
                              {/* Rules
                              <ArrowRightOutlined /> */}{details.rules} 
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6}>
                      {details && details.is_challenge_signed_up_count == 1 ? (
                        <div className="trofybutton_tcc">
                          {details &&
                          Number(details.percentage) >= 100 ? null : (
                            <Button
                              onClick={() => leaveChallenge(details.id)}
                              disabled={Days == 0}
                            >
                              Leave Challenge{" "}
                              <span>
                                <img
                                  style={{
                                    width: "7px",
                                    marginLeft: "8px",
                                    marginRight: "5px",
                                  }}
                                  src={arrow}
                                />
                              </span>{" "}
                              <i
                                style={{
                                  top: "1px",
                                  position: "relative",
                                  right: "7px",
                                }}
                                class="fa-solid fa-arrow-right"
                              ></i>
                            </Button>
                          )}
                        </div>
                      ) : details &&
                        details.user_challenge_signup &&
                        details.user_challenge_signup.status &&
                        details.user_challenge_signup.status == 2 ? (
                        <div className="trofybutton_tcc">
                          <Button disabled={true}>completed Challenge</Button>
                        </div>
                      ) : (
                        <div className="trofybutton_tcc">
                          <Button
                            onClick={() => {
                              signUpChallenge(
                                details.id,
                                details.start_date,
                                details.end_date
                              );
                              // completeChallenge(details.id)
                            }}
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
                          </Button>
                        </div>
                      )}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <Row gutter={[10, 10]}>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="livesessions-f ">
                            <h2>recommended challenges</h2>
                          </div>
                        </Col>
                        {details &&
                          details.recommended_challenge &&
                          details.recommended_challenge.map((item) => (
                            <Col xs={24} sm={24} md={8} lg={8}>
                              <ActiveChallenges data={item} type={"open"} />
                              {/* <RecommendChallenges data={item} /> */}
                            </Col>
                          ))}
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </>
        ) : null}
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
    </div>
  );
};

export default SingleChallenge;
