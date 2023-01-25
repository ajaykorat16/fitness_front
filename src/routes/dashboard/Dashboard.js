import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import LeftDashboard from "../../components/LeftDashboard";
import MiddleDashboard from "./component/MiddleDashboard";
import RightDashboard from "../../components/RightDashboard";
import { useDispatch, useSelector } from "react-redux";
import { dashboardChallenge } from "../../redux/actions/Challenges";
import {
  getMyPlanSideBar,
  getSetps,
  getWater,
} from "../../redux/actions/dashboardAction";
import moment from "moment";

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboardChall = useSelector((state) => state.challenges.dashboard);

  const [filterDates, setFilterDates] = useState(moment().format("Y-MM-D"));
  

  useEffect(() => {
    dashboardData();
  }, []);

  useEffect(() => {
    let payload={
      start_date:filterDates,
      end_date: filterDates
    }
    dispatch(getSetps(payload));
    dispatch(getWater(payload));
    // dispatch(getMyPlanSideBar({local: moment.tz.guess()}));
    // dispatch()
  }, []);

  const dashboardData = async () => {
    await dispatch(dashboardChallenge());
  };

  return (
    <div>
      <div className="side_container">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={6} lg={6}>
            <LeftDashboard  filterDates={filterDates} />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="rp-right-profile scroll_bar">
              <MiddleDashboard setFilterDates={setFilterDates} filterDates1={filterDates}/>
            </div>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6}>
            <RightDashboard challenge={dashboardChall} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
