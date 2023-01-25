import React, { useEffect, useState } from "react";
import { Slider, Radio, Space, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getWorkoutFilters } from "../../../redux/actions/fitnessAction";
import { useLocation, useNavigate } from "react-router-dom";

const FitnessLeft = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  var params = new URLSearchParams(useLocation().search);
  const query = paramsToObject(params.entries());

  const [activityLevel, setActivityLevel] = useState(query.activity_level);
  const [duration, setDuration] = useState(query.duration || 100);

  const fitnessState = useSelector((state) => state.fitness);
  const { workoutCategories, fitnessLevels } = fitnessState;

  function paramsToObject(entries) {
    const result = {};
    for (const [key, value] of entries) {
      result[key] = value;
    }
    return result;
  }

  useEffect(() => {
    dispatch(getWorkoutFilters({ type: "W" }));
  }, []);

  function onChangeFilter(e) {
    if (e.target.filter_key in query) {
      var myArr = query[e.target.filter_key].split(",").map(Number);
      var index = myArr.indexOf(e.target.value);
      if (index !== -1) {
        myArr.splice(index, 1);
        query[e.target.filter_key] = myArr.join();
        if (myArr.length === 0) delete query[e.target.filter_key];
      } else {
        query[e.target.filter_key] =
          query[e.target.filter_key] + "," + e.target.value;
      }
      navigate("/workouts?" + new URLSearchParams(query).toString());
    } else {
      query[e.target.filter_key] = String(e.target.value);
      navigate("/workouts?" + new URLSearchParams(query).toString());
    }
  }

  const onChangeActivityLevel = (e) => {
    setActivityLevel(e.target.value);
    query.activity_level = String(e.target.value);
    navigate("/workouts?" + new URLSearchParams(query).toString());
  };

  function onChangeDateRange(e) {
    setDuration(e);
    query.duration = String(e);
    navigate("/workouts?" + new URLSearchParams(query).toString());
  }
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  return (
    <div className="filterleft filter-bg-fg">
      <div className="sticky-top">
        <h3 className="filtersheading_fl">Filters</h3>
        <h6 className="duration-fl">Duration</h6>
        <div className="durationrage_fl">
          <p>15</p>
          <p>40</p>
        </div>
        <div className="range-fl">
          <Slider defaultValue={duration} step={1} max={100} />
        </div>
        <div className="filterradio-fl">
          <h3 className="filtersheading_cate">Meals</h3>

          <Space direction="vertical">
            <Checkbox onChange={onChange}>Breakfast </Checkbox>

            <Checkbox onChange={onChange}> Lunch</Checkbox>

            <Checkbox onChange={onChange}>Snack </Checkbox>
            <Checkbox onChange={onChange}>Dinner </Checkbox>
          </Space>
        </div>
        <div className="filterradio-fl">
          <h3 className="filtersheading_cate">Categories</h3>

          <Space direction="vertical">
            <Checkbox onChange={onChange}>Gluten Free </Checkbox>

            <Checkbox onChange={onChange}> High in Fiber</Checkbox>

            <Checkbox onChange={onChange}> High in Protein</Checkbox>
            <Checkbox onChange={onChange}>No Dairy </Checkbox>
            <Checkbox onChange={onChange}>Vegan </Checkbox>

            <Checkbox onChange={onChange}> Vegetarian</Checkbox>
          </Space>
        </div>
        <div className="filterradio-fl">
          <h3 className="filtersheading_cate">Main Ingredient</h3>

          <Space direction="vertical">
            <Checkbox onChange={onChange}>Beef </Checkbox>

            <Checkbox onChange={onChange}> Dairy </Checkbox>

            <Checkbox onChange={onChange}> Egg </Checkbox>
            <Checkbox onChange={onChange}> Fish</Checkbox>
            <Checkbox onChange={onChange}>Fruit </Checkbox>

            <Checkbox onChange={onChange}> Grain</Checkbox>
            <Checkbox onChange={onChange}>Legume </Checkbox>

            <Checkbox onChange={onChange}> Pasta </Checkbox>

            <Checkbox onChange={onChange}> Pork </Checkbox>
            <Checkbox onChange={onChange}> Poultry</Checkbox>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default FitnessLeft;
