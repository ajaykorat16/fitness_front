import React from "react";
import { Radio, Input, Space } from "antd";

import { Link } from "react-router-dom";

const EmailNotifications = ({ setSettingValue, settingValue, path }) => {
  return (
    <div className="radio-en">
      <Radio.Group
        name="radiogroup"
        defaultValue={1}

        value={settingValue && settingValue[path]?settingValue[path]:1}
        onChange={(e) =>
          setSettingValue({
            ...settingValue,
            [path]: e.target.value,
          })
        }
      >
        <Space direction="vertical">
          <Radio value={1}>
            24 hours before one of my live sessions starts
          </Radio>
          <Radio value={2}>
            15 minutes before one of my live sessions starts
          </Radio>
          <Radio value={3}>
            5 minutes before one of my live sessions starts
          </Radio>
          <Radio value={4}>When one of my events is changed or canceled</Radio>
          <Radio value={5}>When an event is added in one of my clubs</Radio>
        </Space>
      </Radio.Group>
    </div>
  );
};

export default EmailNotifications;
