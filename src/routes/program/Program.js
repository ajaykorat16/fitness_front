import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Button, message, Spin } from "antd";
import moment from "moment";
import ProgramsModel from "./component/ProgramsModel";
import {
  getPrograms,
  signUpForProgram,
  checkProgramClash,
  changeClashCheckFlag,
  signUpProgramBySuggestic,
} from "../../redux/actions/program/program";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import ProgramFilter from "./component/ProgramFilter";
import ProgramCard from "./component/ProgramCard";
import ProfileSidebar from "../myprofile/component/ProfileSidebar";
import AddToCalendar from "../../components/AddToCalendar";
import calendar from "../../img/calendar.png";
import { ProgramSkeleton } from "../fitness/component/CardSkeleton";
import { getNutritionData } from "../../redux/actions/profile/nutrition_calculate";

const Program = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const programsState = useSelector((state) => state.programs_data);
  const {
    all_programs,
    suggested_programs,
    loading,
    signupFlag,
    clashCheckFlag,
    clashedProgramsCount,
  } = programsState;

  const userState = useSelector((state) => state.user);
  const { userDetails } = userState;

  const nutrition = useSelector((state) => state.nutrition);
  const { nutritionData } = nutrition;

  const [isUpgradeModalVisible, setUpgradeModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [programDay, setProgramDay] = React.useState(1);
  const [startDay, setStartDay] = React.useState(moment().format("Y-MM-D"));
  const [selectedProgram, setSelectedProgram] = React.useState(undefined);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const showUserConsentModal = () => {
    setIsPopupVisible(true);
  };

  var query = queryString.parse(useLocation().search);

  useEffect(() => {
    collectRequiredFormData();
  }, [useLocation().search]);

  const collectRequiredFormData = async () => {
    await dispatch(getPrograms(query));
    await dispatch(getNutritionData());
  };

  const initiateSignUp = async (consent) => {
    if (selectedProgram === undefined) {
      message.error("Please select a program first!");
    } else {
      await dispatch(
        signUpForProgram({
          program_id: selectedProgram,
          start_date: startDay,
          delete_previously_enrolled: consent,
        })
      );

      if (nutritionData) {
        const data = {
          calories: Math.ceil(nutritionData.calorie_intake_target),
          carbs: Number(nutritionData.carb / 100).toFixed(2),
          protein: Number(nutritionData.protein / 100).toFixed(2),
          fat: Number(nutritionData.fat / 100).toFixed(2),
          days: programDay,
          user_id: userDetails.id,
          program_Id: selectedProgram,
          // user_program_status: 68,
          program_date: startDay,
        };
        console.log("programDay--test-------", data);
        dispatch(signUpProgramBySuggestic(data));
      }
    }
    setIsModalVisible(false)
    setIsPopupVisible(false)
  };

  const initProgramClash = () => {
    if (selectedProgram === undefined) {
      message.error("Please select a program first!");
    } else {
      dispatch(
        checkProgramClash({
          program_id: selectedProgram,
          start_date: startDay,
        })
      );
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    dispatch(changeClashCheckFlag(false));
  };

  const addProgramToCalendar = async (target_date) => {
    await setStartDay(target_date.format("YYYY-MM-DD"));
    // userDetails.user_programs_count > 0
    userDetails.user_program_only.length > 0
      ? initProgramClash()
      : initiateSignUp(false);
  };

  useEffect(() => {
    if (clashCheckFlag) showUserConsentModal(true);
  }, [clashCheckFlag]);

  useEffect(() => {
    if (signupFlag) navigate("/calendar");
  }, [signupFlag]);

  const ModalAPi = async () => {
    setIsPopupVisible(false);
    await dispatch(changeClashCheckFlag(false));
    if (nutritionData) {
      const data = {
        calories: Math.ceil(nutritionData.calorie_intake_target),
        carbs: Number(nutritionData.carb / 100).toFixed(2),
        protein: Number(nutritionData.protein / 100).toFixed(2),
        fat: Number(nutritionData.fat / 100).toFixed(2),
        days: programDay,
        user_id: userDetails.id,
        program_Id: selectedProgram,
        user_program_status: 68,
        program_date: startDay,
      };
      console.log("programDay--test-------", data);
      dispatch(signUpProgramBySuggestic(data));
    }
  };

  return (
    <div>
      <div className="side_container">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={6} lg={6}>
            <ProfileSidebar />
          </Col>
          {!loading ? (
            <Col xs={24} sm={24} md={12} lg={12}>
              <div className="rp-right-profile">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <ProgramsModel
                      isUpgradeModalVisible={isUpgradeModalVisible}
                      setUpgradeModalVisible={setUpgradeModalVisible}
                    />
                    <div className="livesessions-f">
                      <h2>fitness plans for you</h2>
                    </div>
                  </Col>
                  {suggested_programs.length > 0 ? (
                    suggested_programs.map((item, i) => {
                      return (
                        <Col xs={24} sm={24} md={24} lg={24} key={i}>
                          <ProgramCard
                            data={item}
                            onSignUp={setIsModalVisible}
                            programSelector={setSelectedProgram}
                            showUpgradeModal={setUpgradeModalVisible}
                            setProgramDays={setProgramDay}
                          />
                        </Col>
                      );
                    })
                  ) : (
                    <p>We don't have any suggestions for you.</p>
                  )}
                </Row>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div
                      className="livesessions-f"
                      style={{ marginTop: "20px" }}
                    >
                      <h2>All fitness plans</h2>
                    </div>
                  </Col>

                  {all_programs.length > 0 ? (
                    all_programs.map((item, i) => {
                      return (
                        <Col xs={24} sm={24} md={24} lg={24} key={i}>
                          <ProgramCard
                            data={item}
                            onSignUp={setIsModalVisible}
                            programSelector={setSelectedProgram}
                            showUpgradeModal={setUpgradeModalVisible}
                            setProgramDays={setProgramDay}
                          />
                        </Col>
                      );
                    })
                  ) : (
                    <div className="notfound-nf">
                      <img className="fork-icon" src={calendar}></img>
                      <h1>
                        Programs <b> not found! </b>
                      </h1>
                    </div>
                  )}
                </Row>
                <AddToCalendar
                  isModalVisible={isModalVisible}
                  setIsModalVisible={closeModal}
                  addToCalendar={addProgramToCalendar}
                  buttonLoading={loading}
                />

                <Modal
                  title="Alert"
                  visible={isPopupVisible}
                  onCancel={() => ModalAPi()}
                  footer={null}
                  className="alert-box-ab"
                >
                  <div className="alert-para-ap">
                    {clashedProgramsCount == 0 ? (
                      <p>
                        Your new program schedule is not clashing with other
                        programs schedule, click confirm to signup for program.
                      </p>
                    ) : (
                      <p>
                        Your new program schedule is clashing with other
                        programs schedule, there are {clashedProgramsCount} days
                        of event clashing.
                      </p>
                    )}
                  </div>
                  <Row gutter={[10, 10]}>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <Button
                        type="primary"
                        onClick={() => initiateSignUp(false)}
                        className="add-delete-all"
                      >
                        {clashedProgramsCount == 0
                          ? "Confirm"
                          : "Keep the previous program"}
                      </Button>
                    </Col>
                    {clashedProgramsCount != 0 ? (
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <Button
                          type="primary"
                          onClick={() => initiateSignUp(true)}
                          className="add-delete-all"
                        >
                          Delete the previous program
                        </Button>
                      </Col>
                    ) : null}
                  </Row>
                </Modal>
              </div>
            </Col>
          ) : (
            <Col xs={24} sm={24} md={12} lg={12}>
              <ProgramSkeleton />
            </Col>
          )}
          <Col xs={24} sm={24} md={6} lg={6}>
            <ProgramFilter />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Program;
