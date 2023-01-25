import React from "react";
import { Row, Col, Button } from "antd";
import img from "../../../img/video.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { S3_BUCKET_URL } from "../../../config/constants";

const ProgramCard = ({
  data,
  onSignUp,
  programSelector,
  showUpgradeModal,
  setProgramDays,
}) => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const { userDetails } = userState;

  const checkAndInitaiteSignup = () => {
    if (userDetails.subscription.id >= data.subscription) {
      programSelector(data.id);
      setProgramDays(data.days);
      onSignUp(true);
    } else {
      showUpgradeModal(true);
    }
  };

  return (
    <div className="programfilter">
      <Row gutter={[0, 0]}>
        <Col xs={24} sm={24} md={8} lg={8}>
          <img
            src={Boolean(data.thumbnail) ? S3_BUCKET_URL + data.thumbnail : img}
            alt=""
          />
        </Col>
        <Col xs={24} sm={24} md={16} lg={16}>
          <div className="fitnessplans-fp">
            <h2>{data.name}</h2>
            <p className="fitheading-fp">
              {data.description.length > 150
                ? data.description.substring(0, 150)
                : data.description}
            </p>
            <div className="coaches-ac">
              <ul>
                <li>
                  <p className="coaches-w">COACHES</p>
                </li>
                <li>
                  <p className="coaches-w coaches-bg">{data.userdata.name}</p>
                </li>
              </ul>
            </div>
            <div className="equipment-eq">
              {data.is_equpment ? (
                <h5>EQUIPMENT REQUIRED</h5>
              ) : (
                <h5>EQUIPMENT OPTIONAL</h5>
              )}
            </div>
            <div>
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

                        <p
                          style={{
                            marginTop: "20px",
                          }}
                        >
                          {data.fitness_level.name}
                        </p>
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
            <div className="learn-sing-more">
              <div className="learn-more-btn">
                <Button onClick={() => navigate("/program-details/" + data.id)}>
                  Learn more
                </Button>
              </div>
              <div className="sign-up-btn">
                {data.is_program_signed_up_count === 0 ? (
                  <Button onClick={checkAndInitaiteSignup}>
                    {userDetails.subscription &&
                    userDetails.subscription.id >= data.subscription
                      ? "Sign Up"
                      : "Upgrade Plan"}{" "}
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProgramCard;
