import React, { useEffect, useState } from "react";
import { Row, Spin, Modal, Col } from "antd";

import LeftDashboard from "../../components/LeftDashboard";
import ActiveChallenges from "./component/ActiveChallenges";
import { LeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllChallenges } from "../../redux/actions/Challenges";
import { CardSkeleton } from "../fitness/component/CardSkeleton";
import { useNavigate } from "react-router-dom";
import { getMyPlanSideBar, getSetps, getWater } from "../../redux/actions/dashboardAction";
import moment from "moment";
import { getStates } from "../../redux/actions/common";

const AllChallenges = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const challengesData = useSelector((state) => state.challenges);

  useEffect(() => {
    dispatch(getMyPlanSideBar({start_date:moment().format("Y-MM-D"),end_date:moment().format("Y-MM-D")}))
    let payload={
      start_date:moment().format("Y-MM-D"),
      end_date: moment().format("Y-MM-D")
    }
    dispatch(getSetps(payload));
    dispatch(getWater(payload));
    dispatch(getAllChallenges());
  }, []);

  return (
    <div>
      <div className="side_container">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={6} lg={6}>
            <LeftDashboard />
          </Col>
          <Col xs={24} sm={24} md={18} lg={18}>
            <div className="rp-right-profile">
              <Row gutter={[10, 10]}>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="backbtn-a">
                    <h2 onClick={() => navigate(-1)}>
                      <LeftOutlined /> Back
                    </h2>
                  </div>

                  {challengesData &&
                  challengesData.challenge &&
                  challengesData.challenge.activeChallange != undefined ? (
                    <div className="livesessions-f ">
                      <h2>Active Challenges</h2>
                    </div>
                  ) : null}
                </Col>
                {challengesData && challengesData.loading ? (
                  <CardSkeleton />
                ) : challengesData &&
                  challengesData.challenge &&
                  challengesData.challenge.activeChallange != undefined ? (
                  challengesData.challenge.activeChallange.map((item) => {
                    return (
                      <Col xs={24} sm={24} md={8} lg={8}>
                        <ActiveChallenges data={item} type={"active"} />
                      </Col>
                    );
                  })
                ) : (
                  <Spin
                    className="loader-ld"
                    style={{
                      height: "1000px",
                      opacity: 0.5,
                      backgroundColor: "#000",
                      position: "absolute",
                      zIndex: "9999",
                    }}
                  />
                )}
              </Row>
              <Row gutter={[10, 10]}>
                {challengesData && challengesData.loading ? (
                  <CardSkeleton />
                ) : challengesData &&
                  challengesData.challenge &&
                  challengesData.challenge.openChallange != undefined ? (
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="livesessions-f ">
                      <h2>Open Challenges</h2>
                    </div>
                  </Col>
                ) : null}

                {challengesData &&
                !challengesData.loading &&
                challengesData.challenge &&
                challengesData.challenge.openChallange != undefined
                  ? challengesData.challenge.openChallange.map((item) => {
                      return (
                        <Col xs={24} sm={24} md={8} lg={8}>
                          <ActiveChallenges data={item} type={"open"} />
                        </Col>
                      );
                    })
                  : null}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AllChallenges;
