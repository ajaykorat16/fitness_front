import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Button, Modal, Spin } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import WorkoutList from "../component/WorkoutList";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "./MenuItem";
import moment from "moment";
import { ChangeRecipeStore, userDetailData } from "../../../redux/actions/user";
import dumble from "../../../img/dumble.png";
import fork from "../../../img/fork.png";
import { getStreamableVideo } from "../../../redux/actions/VideoStreamingAction";
import {
  DashboardSkeleton,
  ProgramSkeleton,
} from "../../fitness/component/CardSkeleton";
import {
  getMyPlanSideBar,
  getSetps,
} from "../../../redux/actions/dashboardAction";
import { useNavigate } from "react-router-dom";
import ChooseManu from "./ChooseManu";

const MiddleDashboard = ({ setFilterDates, filterDates1 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterDate, setFilterDate] = useState(moment().format("Y-MM-D"));
  const [todayWorkouts, setTodayWorkouts] = useState([]);
  const [todayMeals, setTodayMeals] = useState([]);

  const [changeProgram, setChangeProgram] = useState();
  const [changeProgramD, setChangeProgramD] = useState();
  const [ChangeOldID, setChangeOldID] = useState();
  const [ChangeNewID, setChangeNewID] = useState();
  const [ChangeRecipeName, setChangeRecipeName] = useState("");
  const [recipeload, setRecipeload] = useState(false);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const userState = useSelector((state) => state.user);
  const { userDetails, loading, changeRecipe } = userState;

  useEffect(() => {
    collectDashboardData();
  }, [userDetails]);

  const collectDashboardData = async () => {
    if (Object.keys(userDetails).length !== 0) {
      const workouts = await userDetails.user_program_only.filter((item) => {
        return item.programmable_user_type === "App\\Models\\Workout";
      });
      const meals = await userDetails.user_program_only.filter((item) => {
        return item.programmable_user_type === "App\\Models\\Recipe";
      });
      await setTodayWorkouts(workouts);
      await setTodayMeals(meals);
    }
  };

  const filterDashboardData = (type) => {
    if (type === "forward") {
      setFilterDate(moment(filterDate).add(1, "days").format("Y-MM-D"));
    } else if (type === "backward") {
      setFilterDate(moment(filterDate).subtract(1, "days").format("Y-MM-D"));
    }
  };

  useEffect(() => {
    dispatch(userDetailData(navigate, { date: filterDate }));
    dispatch(
      getMyPlanSideBar({ start_date: filterDate, end_date: filterDate })
    );
    let payload = {
      start_date: filterDate,
      end_date: filterDate,
      // date: filterDate,
    };
    dispatch(getSetps(payload));
    setFilterDates(filterDate);
  }, [filterDate]);

  useEffect(() => {
    console.log(todayMeals, todayWorkouts);
  }, [todayWorkouts, todayMeals]);

  const signUpCancel = () => {
    // setSignUpID(null);
    // setSignUpDate("");
    // setSignUpEnd_date("");
    setIsPopupVisible(false);
  };

  const recipeChangeReq = async (newID) => {
    let data = {
      recipe_id: ChangeOldID,
      new_recipe_id: newID,
      program_id: changeProgram,
      program_date: changeProgramD,
    };
    await dispatch(ChangeRecipeStore(data));
    dispatch(userDetailData(navigate, { date: filterDate }));
    await dispatch(
      getMyPlanSideBar({
        start_date: filterDate,
        end_date: filterDate,
      })
    );
    setRecipeload(false);
    setIsPopupVisible(false);
    // challengeDetails(params.id);
    // navigate(`/challenge-details/${signUpID}`);
  };

  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="dashboard-hding-sd">
            <div className="personal_title">
              <h2>Workouts</h2>
            </div>
            <div className="datedropdown_md">
              <LeftOutlined onClick={() => filterDashboardData("backward")} />{" "}
              {moment(filterDate).format("LL")}{" "}
              <RightOutlined onClick={() => filterDashboardData("forward")} />
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="workouts-heading-md">
            {loading ? (
              <DashboardSkeleton />
            ) : todayWorkouts.length === 0 ? (
              <div className="notfound-nf">
                <img src={dumble}></img>
                <h1>
                  Workouts <b>not found! </b>
                </h1>
              </div>
            ) : (
              todayWorkouts.map((item, i) => {
                if (i < 2) {
                  return (
                    <WorkoutList key={i} data={item.programmable_user || {}} />
                  );
                }
              })
            )}

            {!loading ? (
              <div className="personal_title">
                <h2>Menu</h2>
              </div>
            ) : (
              ""
            )}
            <Row gutter={[10, 10]}>
              {todayMeals.length === 0 && !loading ? (
                <div className="notfound-nf">
                  <img className="fork-icon" src={fork}></img>
                  <h1>
                    Recipes <b> not found! </b>
                  </h1>
                </div>
              ) : loading ? (
                ""
              ) : (
                todayMeals.map((item, i) => {
                  if (i < 6) {
                    return (
                      <Col key={i} xs={24} sm={8} md={8} lg={8}>
                        <MenuItem
                          data={item.programmable_user || {}}
                          key={i}
                          program_id={item.id}
                          complete={item.getrecipeprogres[0].complete_status}
                          setIsPopupVisible={setIsPopupVisible}
                          setChangeProgram={setChangeProgram}
                          setChangeProgramD={setChangeProgramD}
                          setChangeOldID={setChangeOldID}
                          program_date={item.program_date || ""}
                          program_id1={item.program_id || null}
                          setChangeRecipeName={setChangeRecipeName}
                          setRecipeload={setRecipeload}
                          filterDate={filterDates1}
                        />
                      </Col>
                    );
                  }
                })
              )}
            </Row>
          </div>
        </Col>
      </Row>
      <Modal
        title={`Replace ${ChangeRecipeName}`}
        visible={isPopupVisible}
        onCancel={() => {
          signUpCancel();
        }}
        footer={null}
        className="alert-box-ab"
      >
        <div className="alert-para-ap">
          <Row gutter={[10, 10]}>
            {!recipeload ? (
              changeRecipe &&
              changeRecipe.map((item, i) => (
                <Col key={i} xs={24} sm={8} md={8} lg={8}>
                  <ChooseManu
                    data={item}
                    setChangeNewID={setChangeNewID}
                    key={i}
                    recipeChangeReq={recipeChangeReq}
                  />
                </Col>
              ))
            ) : (
              <Spin />
            )}
          </Row>
        </div>
        <Row gutter={[10, 10]}>
          {/* <Col xs={24} sm={24} md={12} lg={12}>
            <Button
              type="primary"
              onClick={() => signUpCancel()}
              className="add-delete-all"
            >
              Cancel
            </Button>
          </Col> */}
          {/* <Col xs={24} sm={24} md={12} lg={12}>
            <Button
              type="primary"
              onClick={() => recipeChangeReq()}
              className="add-delete-all"
            >
              Confirm
            </Button>
          </Col> */}
        </Row>
      </Modal>
    </div>
  );
};

export default MiddleDashboard;
