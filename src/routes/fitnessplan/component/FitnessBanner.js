import React from "react";
import { Row, Col, Button } from "antd";
import { VideoCameraOutlined, RightOutlined } from "@ant-design/icons";
import fitnessimg from "../../../img/fitness-banner.svg";
import { useSelector } from "react-redux";
import { S3_BUCKET_URL } from "../../../config/constants";
import arrow from "../../../img/arrow2.png";

const FitnessBanner = ({
  data,
  onSignUp,
  programSelector,
  showUpgradeModal,
  modalShow,
  videoId,
}) => {
  const userState = useSelector((state) => state.user);
  const { userDetails } = userState;

  const checkAndInitaiteSignup = () => {
    if (userDetails.subscription.id >= data.subscription) {
      programSelector(data.id);
      onSignUp(true);
    } else {
      showUpgradeModal(true);
    }
  };

  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="banner-fitness-fb">
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={
                Boolean(data.banner) ? S3_BUCKET_URL + data.banner : fitnessimg
              }
              alt="program-banner"
            ></img>
            <div className="fitness-text-fh">
              <h2>{data.name}</h2>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="fitness-text-btf">
            <p>{data.description}</p>
          </div>
          <Row gutter={[6, 6]}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className="fitnessbn-rf">
                <div className="coaches-ac">
                  <ul>
                    <li>
                      <p className="coaches-w">COACHES</p>
                    </li>
                    <li>
                      <p className="coaches-w coaches-bg">
                        {data.userdata && data.userdata.name}
                      </p>
                    </li>
                  </ul>
                </div>
                <div
                  className="coaches-ac"
                  style={{
                    width: "100%",
                    display: "flex",
                  }}
                >
                  <ul
                    style={{
                      width: "72%",
                    }}
                  >
                    <li>
                      <p className="coaches-w">EQUIPMENT</p>
                    </li>

                    {data.is_equpment ? (
                      <li>
                        <p className="coaches-w coaches-bg">
                          EQUIPMENT REQUIRED
                        </p>
                      </li>
                    ) : (
                      <li>
                        <p className="coaches-w coaches-bg">
                          EQUIPMENT OPTIONAL
                        </p>
                      </li>
                    )}
                  </ul>
                  <div
                    className="learn-more-btn"
                    style={{
                      width: "28%",
                    }}
                  >
                    <Button
                      onClick={() => {
                        modalShow(true);
                        videoId(data.id);
                      }}
                    >
                      Play intro video <VideoCameraOutlined />
                    </Button>
                  </div>
                  <div className="sign-up-btn">
                    {data.is_program_signed_up_count === 0 ? (
                      <Button onClick={checkAndInitaiteSignup}>
                        {userDetails.subscription &&
                        userDetails.subscription.id >= data.subscription
                          ? "Sign Up"
                          : "Upgrade Plan"}{" "}
                        {/* <RightOutlined /> */}
                        <i
                          style={{
                            top: "1px",
                            position: "relative",
                            left: "11px",
                          }}
                          class="fa-solid fa-arrow-right"
                        ></i>
                        <span>
                          <img
                            style={{
                              width: "7px",
                              height: "19px",
                              marginLeft: "8px",
                            }}
                            src={arrow}
                          />
                        </span>
                      </Button>
                    ) : null}
                  </div>
                </div>
                <div className="work-min-mel-all">
                  <ul>
                    <li>
                      <div className="wok-mbm">
                        <b>{data.workout_count}</b>
                        <p>Workouts</p>
                      </div>
                    </li>
                    <li>
                      <div className="wok-mbm">
                        <b>
                          {Number.parseFloat(
                            data.workout_count / data.days,
                            2
                          ).toFixed(2)}
                        </b>
                        <p>minutes/day</p>
                      </div>
                    </li>
                    {Boolean(data.fitness_level) ? (
                      <li>
                        <div className="wok-mbm">
                          <div className="circle-all-ca">
                            {data.fitness_level.id === 1 ? (
                              <>
                                <h6 className="circle-black-all"></h6>
                                <h6 className="circle-black"></h6>
                                <h6 className="circle-black"></h6>
                              </>
                            ) : data.fitness_level.id === 2 ? (
                              <>
                                <h6 className="circle-black-all"></h6>
                                <h6 className="circle-black-all"></h6>
                                <h6 className="circle-black"></h6>
                              </>
                            ) : (
                              <>
                                <h6 className="circle-black-all"></h6>
                                <h6 className="circle-black-all"></h6>
                                <h6 className="circle-black-all"></h6>
                              </>
                            )}
                          </div>

                          <p>{data.fitness_level.name}</p>
                        </div>
                      </li>
                    ) : null}
                    <li>
                      <div className="wok-mbm">
                        <b>
                          {Number.parseFloat(
                            data.recipe_count / data.days,
                            2
                          ).toFixed(2)}
                        </b>
                        <p>MEALS/day</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}></Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default FitnessBanner;
