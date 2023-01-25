import React from "react";
import { Row, Col, Checkbox } from "antd";

const CheckBox = ({ data, onChangeCheckbox, questionNo }) => {
  return (
    <Row style={{ width: "100%" }}>
      {data.question_options_value.map((item, i) => (
        <Col span={24} key={i}>
          <Checkbox
            defaultChecked={item.question_answer_user != null ? true : false}
            onChange={(e) => {
              onChangeCheckbox(
                null,
                data.id,
                item.id,
                data.type,
                item.color_id,
                questionNo,
                i,
                e
              );
            }}
            key={item.id}
          >
            {item.option_text}
          </Checkbox>
        </Col>
      ))}
    </Row>
  );
};

export default CheckBox;
