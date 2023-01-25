import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Spin } from "antd";
import "./style/main.css";
import "antd/dist/antd.css";
import Login from "./routes/login/Login";
import Register from "./routes/register/Register";
import ForgetPassword from "./routes/forgetpassword/ForgetPassword";
import RequireAuth from "./containers/RequireAuth";
import Dashboard from "./routes/dashboard/Dashboard";
import MyProfile from "./routes/myprofile/MyProfile";
import Fitness from "./routes/fitness/Fitness";
import Program from "./routes/program/Program";
import Nutrition from "./routes/nutrition/Nutrition";
import ShoppingList from "./routes/shoppinglist/ShoppingList";
import SingleChallenge from "./routes/singlechallenge/SingleChallenge";
import Settings from "./routes/settings/Settings";
import AllChallenges from "./routes/allchallenges/AllChallenges";
import MyAccount from "./routes/myaccount/MyAccount";
import NotFound from "./routes/NotFound";
import ForgetVerify from "./routes/forgetpassword/ForgetVerify";

import { tryLocalSignIn, userDetailData } from "./redux/actions/user";
import MyCalendar from "./routes/calendar/MyCalendar";
import Recipes from "./routes/recipes/Recipes";
import RecipeDetails from "./routes/recipes/RecipeDetails";
import VideoPlayer from "./components/VideoPlayer";
import WellNess from "./routes/wellness/WellNess";
import WellnessProfile from "./routes/myprofile/WellnessProfile";
import NutritionContainer from "./routes/myprofile/NutritionContainer";
import Coaching from "./routes/Coaching/Coaching";
import CoachingArticle from "./routes/Coaching/CoachingArticle";
import WorkoutDetails from "./routes/fitness/WorkoutDetails";
import FitnessPlan from "./routes/fitnessplan/FitnessPlan";
import ScrollToTop from "./components/ScrollToTop";
import RAW from "./api/raw"
import AddPayMethod from "./routes/AddPayMethod";
import PaymentRegister from "./routes/PaymentRegister";
const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const isAuth = useSelector((state) => state.user.isAuth);
    const isAuthLoading = useSelector((state) => state.user.loading);
    useEffect(() => {
        dispatch(tryLocalSignIn());
    }, []);

    useEffect(() => {
        if(isAuthLoading){
        checkAuth();
        }
    }, [isAuth,isAuthLoading]);

    useEffect(()=>{
        checkServerAuth()
    },[])

    const checkServerAuth = async () => {
        dispatch(userDetailData(navigate));        
    };

    const checkAuth = async () => {
        const token = await localStorage.getItem("token");

        if (token && isAuth){
            setLoading(false);
            if (location.pathname === "/") {
                navigate("/dashboard");
            }
        } else {
            setLoading(false);
            if (location.pathname === "/") {
                navigate("/login");
            }
        }
    };

    return loading ? (
        <Spin className="loader-ld" />
    ) : (
        <ScrollToTop>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/resetpassword/:token" element={<ForgetVerify />} />
                <Route element={<RequireAuth />}>
                    {/* functional screens */}
                    <Route exact path="/my-profile" element={<MyProfile />} />
                    <Route exact path="/dashboard" element={<Dashboard />} />
                    <Route exact path="/wellness-profile" element={<WellnessProfile />} />
                    <Route
                        exact
                        path="/nutrition-calculator"
                        element={<NutritionContainer />}
                    />
                    <Route exact path="/workouts" element={<Fitness />} />
                    <Route
                        exact
                        path="/workout-details/:id"
                        element={<WorkoutDetails />}
                    />
                    <Route exact path="/program" element={<Program />} />
                    <Route exact path="/program-details/:id" element={<FitnessPlan />} />
                    <Route exact path="/calendar" element={<MyCalendar />} />
                    <Route exact path="/recipes" element={<Recipes />} />
                    <Route exact path="/recipe-details/:id" element={<RecipeDetails />} />
                    <Route exact path="/video-player" element={<VideoPlayer />} />
                    {/* only designs */}
                    <Route exact path="/nutrition" element={<Nutrition />} />
                    <Route exact path="/shoppinglist" element={<ShoppingList />} />
                    <Route exact path="/challenge-details/:id" element={<SingleChallenge />} />
                    <Route exact path="/settings" element={<Settings />} />
                    <Route exact path="/all-challenges" element={<AllChallenges />} />
                    <Route exact path="/my-account" element={<MyAccount />} />
                    <Route exact path="/wellness" element={<WellNess />} />
                    <Route exact path="/coaching" element={<Coaching />} />
                    <Route exact path="/coaching-article" element={<CoachingArticle />} />
                    {/* <Route exact path="/add-payment-method" component={AddPayMethod} /> */}
                    <Route path="/payment_register" component={PaymentRegister} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </ScrollToTop>
    );
};

export default App;