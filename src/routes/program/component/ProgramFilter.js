import React, { useEffect, useState } from "react";
import { Slider, Space, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getWorkoutFilters } from "../../../redux/actions/fitnessAction";

const ProgramFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  var params = new URLSearchParams(useLocation().search);
  const query = paramsToObject(params.entries());

  const fitnessState = useSelector((state) => state.fitness);
  const { workoutCategories,fitnessLevels,equipment } = fitnessState;

  const [days, setDays] = useState(query.duration || 90);

  function paramsToObject(entries) {
    const result = {};
    for (const [key, value] of entries) {
      result[key] = value;
    }
    return result;
  }

  useEffect(() => {
    dispatch(getWorkoutFilters({ type: "P" }));
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
      navigate("/program?" + new URLSearchParams(query).toString());
    } else {
      query[e.target.filter_key] = String(e.target.value);
      navigate("/program?" + new URLSearchParams(query).toString());
    }
  }

  function onChangeDateRange(e) {
    setDays(e);
    query.days = String(e);
    navigate("/program?" + new URLSearchParams(query).toString());
  }

  return (
    <div className="filterleft">
      <div className="sticky-top">
        <h3 className="filtersheading_fl">Filters</h3>
        <div className="durationrage_fl">
          <h6>Duration</h6>
          <p>1 - 90 Days</p>
        </div>
        <div className="range-fl">
          <Slider
            defaultValue={days}
            step={1}
            max={90}
            onAfterChange={onChangeDateRange}
          />
        </div>
        <div className="filterradio-fl">
          <h3 className="filtersheading_cate">Categories</h3>

          <Space direction="vertical">
            {workoutCategories && workoutCategories.map((item, i) => {
              var myArr = [];
              if ("categories" in query) {
                myArr = query.categories.split(",").map(Number);
              }
              return (
                <Checkbox
                  key={i}
                  value={item.id}
                  checked={myArr.includes(item.id) ? true : false}
                  onChange={onChangeFilter}
                  filter_key="categories"
                >
                  {item.name}
                </Checkbox>
              );
            })}
          </Space>
        </div>
        <div className="filterradio-fl">
          <h3 className="filtersheading_cate">Fitness level</h3>

          <Space direction="vertical">
            {fitnessLevels && fitnessLevels.map((item, i) => {
              var myArr = [];
              if ("fitness_level" in query) {
                myArr = query.fitness_level.split(",").map(Number);
              }
              return (
                <Checkbox
                  key={i}
                  value={item.id}
                  checked={myArr.includes(item.id) ? true : false}
                  onChange={onChangeFilter}
                  filter_key="fitness_level"
                >
                  {item.name}
                </Checkbox>
              );
            })}
          </Space>
        </div>
        <div className="filterradio-fl">
          <h3 className="filtersheading_cate">Equipment</h3>

          <Space direction="vertical">
            {equipment && equipment.map((item, i) => {
              var myArr = [];
              if ("equipment" in query) {
                myArr = query.equipment.split(",").map(Number);
              }
              return (
                <Checkbox
                  key={i}
                  value={item.id}
                  checked={myArr.includes(item.id) ? true : false}
                  onChange={onChangeFilter}
                  filter_key="equipment"
                >
                  {item.name}
                </Checkbox>
              );
            })}
          </Space>
        </div>
      </div>
    </div>
  );
};

export default ProgramFilter;
