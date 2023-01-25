import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import { Row, Col, Progress, Spin, Radio, Image } from "antd";
import ManualWorkout from "./component/ManualWorkout";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { changeSignUpFlag } from "../../redux/actions/program/program";
import { getCalendarData } from "../../redux/actions/CalendarActions";
import AddNew from "./component/AddNew";
import WorkoutOverViewModal from "./component/WorkoutOverViewModal";
import ManualRecipe from "./component/ManualRecipe";
import moment from "moment";
import WorkoutCard from "./component/WorkoutCard";
import RecipesCard from "./component/RecipesCard";
import { getWorkoutOverviewModalData } from "../../redux/actions/fitnessAction";
import { getRecipeOverviewModalData } from "../../redux/actions/recipesAction";
import RecipeOverViewModal from "./component/RecipeOverviewModal";
import LeftDashboard from "../../components/LeftDashboard";
import {
  getMyPlanSideBar,
  getSetps,
  getWater,
} from "../../redux/actions/dashboardAction";
import logo from "../../../src/img/Vector.svg";

const MyCalendar = () => {
  const dispatch = useDispatch();

  let startWeek = moment().startOf("week").format("Y-MM-D")
  console.log("startWeek------------1--",startWeek)
  console.log("startWeek------------2--",moment(startWeek,"Y-MM-D").add(6, 'days').format("Y-MM-D"))
  //modals state variables
  const [isAddNewVisible, setIsAddNewVisible] = useState(false);
  const [isOverViewVisible, setIsOverViewVisible] = useState(false);
  const [isRecipeOverViewVisible, setIsRecipeOverViewVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [isManualWorkoutVisible, setIsManualWorkoutVisible] = useState(false);
  const [isManualRecipeVisible, setIsManualRecipeVisible] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [queryString, setQueryString] = useState({
    type: 0,
    start_date: moment().startOf("week").format("Y-MM-D"),
    // end_date: moment().endOf("week").format("Y-MM-D"),
    // end_date:  moment().add(6, 'days').format("Y-MM-D"),
    end_date: moment(startWeek,"Y-MM-D").add(6, 'days').format("Y-MM-D"),
    changeFlag: false,
  });
  const signupFlag = useSelector((state) => state.programs_data.signupFlag);
  const calendarState = useSelector((state) => state.calendar);
  const { calendar_data, loading } = calendarState;
  const [recipeList, setRecipeList] = useState([]);
  const [calendarSize, setCalendarSize] = useState(900);

  const mealdFilter = async () => {
    const calendarDate = await [...Array(7)].map((datas, index) => {
      return {
        start: moment(queryString.start_date, "YYYY-MM-DD")
          .add(index, "days")
          .format("YYYY-MM-DD"),
        displayDate: moment(queryString.start_date, "YYYY-MM-DD")
          .add(index, "days")
          .format("D"),
      };
    });

    const fadAddIcon = await [...Array(7)].map((datas, index) => {
      if (moment().format("YYYY-MM-DD") < calendarDate[index].start) {
        return {
          start: moment(queryString.start_date, "YYYY-MM-DD")
            .add(index, "days")
            .format("YYYY-MM-DD"),
          type: "FadBTN",
        };
      }
    });

    var fadAddIcons = await fadAddIcon.filter(function (element) {
      return element !== undefined;
    });

    var displayList = await calendar_data.concat(calendarDate);
    const calendatList = await displayList.sort(function (left, right) {
      return moment
        .utc(left.start, "Y-MM-D")
        .diff(moment.utc(right.start, "Y-MM-D"));
    });

    const dateDisplay = await calendatList.filter((recip) => {
      return recip.hasOwnProperty("displayDate");
    });

    const workouts = await calendatList.filter((recip) => {
      if (recip && recip.programmable_user_type) {
        return recip.programmable_user_type == "App\\Models\\Workout";
      } else {
        return false;
      }
    });

    const breakfast = await calendatList.filter((recip) => {
      if (
        recip &&
        recip.programmable_user &&
        recip.programmable_user.meal_data &&
        recip.programmable_user.meal_data[0] &&
        recip.programmable_user.meal_data[0].name
      ) {
        return recip.programmable_user.meal_data[0].name == "Breakfast";
      } else {
        return false;
      }
    });

    const lunch = await calendatList.filter((recip) => {
      if (
        recip &&
        recip.programmable_user &&
        recip.programmable_user.meal_data &&
        recip.programmable_user.meal_data[0] &&
        recip.programmable_user.meal_data[0].name
      ) {
        return recip.programmable_user.meal_data[0].name == "Lunch";
      }
    });
    const snacks = await calendatList.filter((recip) => {
      if (
        recip &&
        recip.programmable_user &&
        recip.programmable_user.meal_data &&
        recip.programmable_user.meal_data[0] &&
        recip.programmable_user.meal_data[0].name
      ) {
        return recip.programmable_user.meal_data[0].name == "Snacks";
      }
    });
    
    const dinner = await calendatList.filter((recip) => {
      if (
        recip &&
        recip.programmable_user &&
        recip.programmable_user.meal_data &&
        recip.programmable_user.meal_data[0] &&
        recip.programmable_user.meal_data[0].name
      ) {
        return recip.programmable_user.meal_data[0].name == "Dinner";
      }
    });

    const manualRecipe = await calendatList.filter((recip) => {
      if (
        recip &&
        recip.programmable_user &&
        recip.programmable_user.meal_data
      ) {
        return recip.programmable_user.meal_data.length == 0 && recip.programmable_user_type == "App\\Models\\Recipe" ;
      }
    });

    const remain = await calendatList.filter((recip) => {
      if (recip && recip) {
        return recip.hasOwnProperty("protin_average");
      }
    });

    const remainIcon = await calendatList.filter((recip) => {
      if (recip && recip.type) {
        return recip.type == "plusicon";
      } else {
        return false;
      }
    });

    var newlist = await dateDisplay.concat(
      workouts,
      breakfast,
      lunch,
      snacks,
      dinner,
      manualRecipe,
      remainIcon,
      fadAddIcons,
      remain
    );

    var test = await calendarDate.map((state) => {
      var add = newlist.map((states, i) => {
        if (state.start == states.start) {
          return states;
        }
      });

      var data = add.filter(function (element) {
        return element !== undefined;
      });

      return {
        start: state.start,
        displaydata: data,
      };
    });

    var pre = 0;
    test.map((state) => {
      if (pre == 0) pre = state.displaydata.length;
      if (state.displaydata.length > 9 && pre < state.displaydata.length) {
        pre = state.displaydata.length;
        setCalendarSize(state.displaydata.length * 103);
      }
    });
console.log("test-----------------------------",test)
    setRecipeList(test);
  };

  useEffect(() => {
    if (calendar_data && calendar_data[0]) {
      setTimeout(() => {
        mealdFilter();
      }, 100);
    }
  }, [calendar_data]);

  //modal show functions
  const showAddNewModal = () => {
    setIsAddNewVisible(true);
  };

  const showOverViewModal = async (eventData) => {
    setSelectedEvent(eventData);
    await dispatch(
      getWorkoutOverviewModalData(eventData.id, eventData.eventId, moment)
    );
    setIsOverViewVisible(true);
  };

  const showRecipeOverViewModal = async (eventData) => {
    setSelectedRecipe(eventData);
    await dispatch(getRecipeOverviewModalData(eventData.id, eventData.eventId));
    setIsRecipeOverViewVisible(true);
  };

  const showManualWorkoutModal = () => {
    setIsManualWorkoutVisible(true);
  };

  const showManualRecipeModal = () => {
    setIsManualRecipeVisible(true);
  };

  //modal hide functions
  const handleAddNewCancel = () => {
    setIsAddNewVisible(false);
  };

  const handleOverviewCancel = () => {
    setIsOverViewVisible(false);
  };

  const handleRecipeOverviewCancel = () => {
    setIsRecipeOverViewVisible(false);
  };

  const handleManualWorkoutCancel = () => {
    setIsManualWorkoutVisible(false);
  };

  const handleManualRecipeCancel = () => {
    setIsManualRecipeVisible(false);
  };

  useEffect(() => {
    dispatch(getCalendarData(queryString));
  }, []);
// *********************************************
  useEffect(() => {
    dispatch(getSetps(queryString));
    dispatch(getMyPlanSideBar(queryString));
  }, []);
// *********************************************


  useEffect(() => {
    if (queryString.changeFlag) filterCalendarData();
  }, [queryString.changeFlag]);

  const filterCalendarData = async () => {
    await dispatch(getCalendarData(queryString));
    await dispatch(getMyPlanSideBar(queryString));
    // let payload = {
    //   start_date: filterDates,
    //   end_date: filterDates,
    //   // date: filterDates || moment(new Date()).format("YYYY-MM-DD"),
    // };
    await dispatch(getSetps(queryString));
    await dispatch(getWater(queryString));
    setQueryString({ ...queryString, changeFlag: false });
  };

  useEffect(() => {
    if (signupFlag) {
      dispatch(changeSignUpFlag(false));
    }
  }, [signupFlag]);

  const setFilterType = (e) => {
    setQueryString({ ...queryString, type: e.target.value, changeFlag: true });
  };

  function renderEventContent(eventInfo) {
    const eventObj = eventInfo.event._def.extendedProps;
    var eventDetailsObj = eventObj.displaydata || {};

    return (
      <div className="event_reneders" style={{ height: calendarSize }}>
        {eventDetailsObj.map((eventObj, i) => {
          const eventID = eventObj.id || "";
          eventDetailsObj["eventId"] = eventInfo.event._def.publicId || "";

          const eventEquipment =
            (eventObj.programmable_user &&
              eventObj.programmable_user.equipment_data &&
              eventObj.programmable_user.equipment_data) ||
            [];
          const duration =
            (eventObj.programmable_user &&
              eventObj.programmable_user.duration) ||
            0;
          const eventDuration = new Date(duration * 1000)
            .toISOString()
            .substr(11, 8);

          return (
            <>
              {eventObj && eventObj.displayDate ? (
                <div className="breakfast__Card">
                  <div className="breakfast__bf">
                    <h2 className={"date_active"}>{eventObj.displayDate}</h2>
                  </div>
                </div>
              ) : null}

              {eventObj.type === "FadBTN" ? (
                <div>
                  <div className="plus-icon-pi-fadbtn">
                    <PlusOutlined />
                  </div>
                </div>
              ) : null}
              {eventObj.programmable_user_type === "App\\Models\\Workout" ? (
                <div>
                  <WorkoutCard
                    showOverViewModal={showOverViewModal}
                    eventDetailsObj={eventObj.programmable_user}
                    workout_progress={eventObj.workout_progress}
                    eventDuration={eventDuration}
                    eventEquipment={eventEquipment}
                    completionStatus={eventObj.status}
                    setEventId={setEventId}
                    eventId={eventID}
                    userId={eventObj.user_id}
                  />
                </div>
              ) : eventObj.type === "plusicon" ? (
                <div>
                  <div className="plus-icon-pi" onClick={showAddNewModal}>
                    <PlusOutlined />
                  </div>
                </div>
              ) : eventObj.type === "progress" ? (
                <>
                  <div className="event_reneders2">
                    <div className="progress-calendar-pc">
                      <div className="progressbar-one-pc">
                        <div className="Caloriestext-pc">
                          <p style={{ color: "#E0E0E0" }}>TIME</p>{" "}
                          <p style={{ color: "#000", marginLeft: 30 }}>
                          {`${
                            new Date(eventObj.total_planned_duration * 1000).toISOString().substr(11, 8) || "00:00:00"
                          }, ${Math.trunc(eventObj.percentage_complete_duration)}% `}
                          </p>
                        </div>
                        <div className="progress-line-pur ">
                          <Progress
                            strokeLinecap="square"
                            percent={eventObj.percentage_complete_duration}
                            showInfo={false}
                            strokeColor={"#29B8C4"}
                          />
                        </div>
                      </div>
                      <div className="progressbar-one-pc">
                        <div className="Caloriestext-pc">
                          <p style={{ color: "#E0E0E0" }}>CALS INTAKE</p>{" "}
                          <p style={{ color: "#000", marginLeft: 30 }}>{`${
                            eventObj.calorie
                          }, ${Math.trunc(eventObj.calorie_average)}% `}</p>
                        </div>
                        <div className="progress-line-pur ">
                          <Progress
                            strokeLinecap="square"
                            percent={eventObj.calorie_average}
                            showInfo={false}
                            strokeColor={"#29B8C4"}
                          />
                        </div>
                      </div>
                      <div className="progressbar-one-pc">
                        <div className="Caloriestext-pc">
                          <p style={{ color: "#E0E0E0" }}>CARBS</p>{" "}
                          <p style={{ color: "#000", marginLeft: 30 }}>{`${
                            eventObj.carbs
                          }g, ${Math.trunc(eventObj.carb_average)}% `}</p>
                        </div>
                        <div className="progress-line-pur ">
                          <Progress
                            strokeLinecap="square"
                            percent={eventObj.carb_average}
                            showInfo={false}
                            strokeColor={"#A708AD"}
                          />
                        </div>
                      </div>
                      <div className="progressbar-one-pc">
                        <div className="Caloriestext-pc">
                          <p style={{ color: "#E0E0E0" }}>PROT</p>{" "}
                          <p style={{ color: "#000", marginLeft: 30 }}>{`${
                            eventObj.protein
                          }g, ${Math.trunc(eventObj.protin_average)}% `}</p>
                        </div>
                        <div className="progress-line-pur ">
                          <Progress
                            strokeLinecap="square"
                            percent={eventObj.protin_average}
                            showInfo={false}
                            strokeColor={"#EA551A"}
                          />
                        </div>
                      </div>
                      <div className="progressbar-one-pc">
                        <div className="Caloriestext-pc">
                          <p style={{ color: "#E0E0E0" }}>FAT</p>{" "}
                          <p style={{ color: "#000", marginLeft: 30 }}>{`${
                            eventObj.fat
                          }g, ${Math.trunc(eventObj.fat_average)}% `}</p>
                        </div>
                        <div
                          className="progress-line-pur"
                          style={{ color: "#000" }}
                        >
                          <Progress
                            strokeLinecap="square"
                            percent={eventObj.fat_average}
                            showInfo={false}
                            strokeColor={"#FFC500"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : eventObj.programmable_user_type === "App\\Models\\Recipe" ? (
                <RecipesCard
                  showRecipeOverViewModal={showRecipeOverViewModal}
                  eventDetailsObj={eventObj.programmable_user}
                  recipeprogres={eventObj.recipeprogres}
                  completionStatus={eventObj.status}
                  setEventId={setEventId}
                  eventId={eventID}
                />
              ) : null}
            </>
          );
        })}
      </div>
    );
  }

  return (
    <div className="side_container">
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={18} lg={18}>
          <div className="rp-right-profile">
            <div className="calendar-full-cf">
              <div className="radiocalender">
                <Radio.Group
                  name="radiogroup"
                  defaultValue={queryString.type}
                  onChange={setFilterType}
                >
                  <Radio value={0}>All</Radio>
                  <Radio value={1}>Workouts</Radio>
                  <Radio value={2}>Recipes</Radio>
                  <Radio value={3}>Coaching</Radio>
                </Radio.Group>
              </div>
              {loading ? (
                <>
                  <div
                    style={{
                      width: "100%",
                      height: "100vh",
                      position: "absolute",
                      zIndex: "9999",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100vh",
                        opacity: 0.5,
                        backgroundColor: "#fff",
                        position: "relative",
                        zIndex: "9999",
                      }}
                    >
                      <div
                        style={{
                          opacity: 0.5,
                          backgroundColor: "#fff",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          zIndex: "9999",
                        }}
                      >
                        <Image src={logo} alt="logo" preview={false}/>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridWeek"
                events={recipeList}
                eventContent={renderEventContent}
                height={1000}
                datesSet={(dateInfo) => {
                  // console.log("dateInfo--------------------------",dateInfo)
                  setQueryString({
                    ...queryString,
                    start_date: moment(dateInfo.start).format("Y-MM-D"),
                    // end_date: moment(dateInfo.end).format("Y-MM-D"),
                    end_date:  moment(dateInfo.start, "DD-MM-YYYY").add(6, 'days').format("Y-MM-D"),
                    changeFlag: true,
                  });
                }}
                dayHeaderFormat={{
                  weekday: "long",
                }}
                customButtons={{
                  myCustomButton: {
                    text: moment(queryString.start_date, "Y-MM-D").format(
                      "ddd, MMM Do"
                    ),
                    click: function () {},
                  },
                }}
                headerToolbar={{
                  left: "",
                  center: "",
                  end: "prev,myCustomButton,next",
                }}
              />
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          {/* <SidebarProgress /> */}
          <LeftDashboard path={"calendar"} />
        </Col>

        {/* add event modal */}
        <AddNew
          isAddNewVisible={isAddNewVisible}
          handleAddNewCancel={handleAddNewCancel}
          showManualWorkoutModal={showManualWorkoutModal}
          showManualRecipeModal={showManualRecipeModal}
        />

        {/* Workout overview modal */}
        <WorkoutOverViewModal
          userProgramId={eventId}
          isOverViewVisible={isOverViewVisible}
          handleOverviewCancel={handleOverviewCancel}
          selectedEvent={selectedEvent}
          queryString={queryString}
        />

        {/* Workout overview modal */}
        <RecipeOverViewModal
          userProgramId={eventId}
          isOverViewVisible={isRecipeOverViewVisible}
          handleOverviewCancel={handleRecipeOverviewCancel}
          selectedEvent={selectedRecipe}
          queryString={queryString}
        />

        {/* manual workout modal */}

        <ManualWorkout
          isManualWorkoutVisible={isManualWorkoutVisible}
          handleManualWorkoutCancel={handleManualWorkoutCancel}
        />

        {/* manual recipe modal */}
        <ManualRecipe
          isManualRecipeVisible={isManualRecipeVisible}
          handleManualRecipeCancel={handleManualRecipeCancel}
        />
      </Row>
    </div>
  );
};

export default MyCalendar;
