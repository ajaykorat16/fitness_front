import React, { useState, useEffect } from "react";
import { Row, Col, Button, Spin } from "antd";
import { ArrowRightOutlined, RightOutlined } from "@ant-design/icons";
import RadioBtn from "./RadioBtn";
import RangeSlider from "./RangeSlider";
import CheckBox from "./CheckBox";
import {
  getQuestioner,
  addQuestioner,
} from "../../../redux/actions/profile/questioner";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import {
  CardSkeleton,
  WellnessSkeleton,
} from "../../fitness/component/CardSkeleton";
import { useNavigate } from "react-router-dom";

const WellnessQuestionnaire = () => {
  const dispatch = useDispatch();
  const questioner = useSelector((state) => state.questioner);
  const { wellnessQuestions, loading } = questioner;
  const navigate = useNavigate();
  const [question_response, setQuestionResponse] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [state, setState] = useState(0);

  useEffect(() => {
    collectRequiredFormData();
  }, []);

  useEffect(() => {
    setQuestionResponse(Array(wellnessQuestions.length).fill(null));
  }, [wellnessQuestions]);

  const collectRequiredFormData = async () => {
    await dispatch(getQuestioner());
    await setPageLoading(false);
  };

  const saveQuestionerResponse = async () => {
    await dispatch(addQuestioner({ data: question_response }));
    dispatch(getQuestioner());
    navigate("/program");
  };

  const onChangeRadio = (e) => {
    setState(e.target.value);
    onChangeSlider(
      null,
      e.target.questionid,
      e.target.value,
      e.target.questiontype,
      e.target.colorid,
      e.target.questionnumber
    );
  };

  const onChangeCheckbox = (
    e,
    question_id,
    option_id,
    question_type,
    color_id,
    questionnumber,
    optionnumber = 0,
    value
  ) => {
    onChangeSlider(
      e,
      question_id,
      option_id,
      question_type,
      color_id,
      questionnumber,
      optionnumber,
      value.target.checked ? 0 : 1
    );
  };

  const onChangeSlider = (
    value,
    question_id,
    option_id,
    question_type,
    color_id,
    questionnumber,
    optionnumber = -1,
    remove = 0
  ) => {
    let response = null;

    if (optionnumber > -1) {
      response = [];
      if (question_response[questionnumber]) {
        response = question_response[questionnumber];
      }

      response[optionnumber] = {
        question_id: question_id,
        option_id: option_id,
        question_type: question_type,
        color_id: color_id,
        value: value,
        removevalue: remove,
      };
    } else {
      response = {
        question_id: question_id,
        option_id: option_id,
        question_type: question_type,
        color_id: color_id,
        remove: remove,
      };
    }

    question_response[questionnumber] = response;
    setQuestionResponse(question_response);
    console.log(question_response);
  };

  return (
    <div className="rp-right-profile">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="personal_title">
            <h2>Wellness Questionnaire</h2>
          </div>
        </Col>
        {pageLoading ? (
          /* <Spin className="loader-ld" /> */
          <WellnessSkeleton />
        ) : (
          <Col xs={24} sm={24} md={24} lg={24}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="pi_border_2">
                  {wellnessQuestions.map((item, i) => {
                    return (
                      <div key={i} className="question_wq">
                        <p className="wq_hding">
                          <span> Question {i + 1}: </span> {item.question_text}
                        </p>
                        {item.type == 1 ? (
                          <RadioBtn
                            data={item}
                            callbackvalue={onChangeRadio}
                            questionNo={i}
                            state={state}
                          />
                        ) : item.type == 2 ? (
                          <RangeSlider
                            data={item}
                            onChange={onChangeSlider}
                            questionNo={i}
                          />
                        ) : item.type == 3 ? (
                          <CheckBox
                            data={item}
                            onChangeCheckbox={onChangeCheckbox}
                            questionNo={i}
                          />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="topline"></div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div
                  className="btn_saveinfo"
                  style={{
                    width: "34%",
                  }}
                >
                  <Button
                    onClick={saveQuestionerResponse}
                    loading={loading}
                    disabled={loading}
                    style={{
                      width: "34%",
                    }}
                  >
                    Save info <RightOutlined />
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default WellnessQuestionnaire;
