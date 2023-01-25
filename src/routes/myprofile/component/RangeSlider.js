import React from "react";
import { Row, Col, Slider } from "antd";

const RangeSlider = ({ data, onChange, questionNo }) => {
  return (
    <div className="range_bar">
      {data.question_options_value.map((item, i) => {
        return (
          <Row
            key={i}
            gutter={[6, 6]}
            style={{ display: "flex", alignItems: "center" }}
            className="progressss"
          >
            <Col xs={24} sm={24} md={8} lg={8} className="progressss">
              <Slider
              // trackStyle={{ backgroundColor: "rgb(41, 184, 000)"}}
                step={1}
                defaultValue={
                  item.question_answer_user
                    ? item.question_answer_user.value
                    : 0
                }
                min={0}
                max={10}
                // tooltipVisible
                // tipFormatter={false}
                onChange={(e) => {
                  onChange(
                    e,
                    data.id,
                    item.id,
                    data.type,
                    item.color_id,
                    questionNo,
                    i
                  );
                }}
              />
            </Col>
            <Col xs={24} sm={24} md={16} lg={16}>
              <p className="range_para">{item.option_text}</p>
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export default RangeSlider;
