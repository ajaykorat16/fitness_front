import React from "react";
import { Radio, Space } from "antd";

const RadioBtn = ({ data, callbackvalue, questionNo }) => {
  return (
    <Radio.Group
      onChange={callbackvalue}
      type={"radio"}
      defaultValue={
        data.question_answer_users.length >0 ? data.question_answer_users[0].option_id : 0
      }
      style={{color:"#000"}}

    >
      <Space direction="vertical">
        {data.question_options_value.map((item) => (
          <Radio
            key={item.id}
            value={item.id}
            questionnumber={questionNo}
            questionid={data.id}
            questiontype={data.type}
            colorid={item.color_id}
            style={{color:"#000"}}
          >
            {item.option_text}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
};

export default RadioBtn;
