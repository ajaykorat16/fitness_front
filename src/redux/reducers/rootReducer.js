import { combineReducers } from "redux";
import common from "./common";
import User from "./user";
import Questioner from "./profile/questioner";
import Nutrition from "./profile/nutrition_calculate";
import Program from "./program/program";
import forget_pass from "./forgot_pass";
import Calendar from "./calendar/Calendar";
import Fitness from "./fitnessReducer";
import Recipes from "./recipeReducer";
import videoStreamReducer from "./videoStreamReducer";
import challenges from "./challenges";
import dashboardData from "./dashboardReducer";
import CoachData from "./CoachReducer";

const rootReducer = combineReducers({
  user: User,
  dashboard: dashboardData,
  common: common,
  questioner: Questioner,
  forget_pass: forget_pass,
  nutrition: Nutrition,
  programs_data: Program,
  calendar: Calendar,
  fitness: Fitness,
  recipes: Recipes,
  challenges: challenges,
  coach: CoachData,
  streamableVideo: videoStreamReducer,
});

export default rootReducer;
