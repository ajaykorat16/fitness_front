import React, { useState } from "react";
import { Slider, Switch } from "antd";

const ProgramLeft = () => {
  return (
    <div className="programfilter">
      <div>
        <h2> Filters</h2>
        <Slider defaultValue={30} />
      </div>
    </div>
  );
};

export default ProgramLeft;
