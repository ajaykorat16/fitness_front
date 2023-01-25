import React, { useEffect, useState } from "react";
import { Modal, Button, DatePicker, Radio } from "antd";
import moment from "moment";

function AddToCalendar({
  isModalVisible,
  setIsModalVisible,
  addToCalendar,
  buttonLoading,
}) {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedWeekDays, setSelectedWeekDays] = useState([]);

  const onSelectDateRadio = (e) => {
    setSelectedDate(moment(e.target.value));
  };

  useEffect(() => {
    if (selectedDate) {
      var weekStart = selectedDate.clone().startOf("week");
      let i;
      var days = [];
      for (i = 0; i <= 6; i++) {
        days.push(moment(weekStart).add(i, "days"));
      }
      setSelectedWeekDays(days);
    }
  }, [selectedDate]);

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current.valueOf() < Date.now();
  }

  return (
    <Modal
      visible={isModalVisible}
      footer={null}
      className="modelbox-atc"
      onCancel={setIsModalVisible}
    >
      <div className="date-atc">
        <h2>Add to Calendar</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p> WEEK OF THE</p>
          <DatePicker
            format={"MMM Do"}
            defaultValue={selectedDate}
            style={{
              width: 70,
              textTransform: "capitalize",
              // textTransform: "uppercase"
            }}
            onChange={setSelectedDate}
            disabledDate={disabledDate}
          />
        </div>
      </div>
      <div className="week-s-atc">
        <Radio.Group
          onChange={onSelectDateRadio}
          value={moment(selectedDate).format("l")}
        >
          {selectedWeekDays.map((item, i) => (
            <div key={i} className="weekheading-atc">
              <h3>{moment(item).format("dddd")}</h3>
              <div className="monthe-num-atc">
                <p>{moment(item).format("MMM Do")}</p>
              </div>
              <div className="radiobtn-atc">
                <Radio value={moment(item).format("l")}></Radio>
              </div>
            </div>
          ))}
        </Radio.Group>
      </div>
      <div className="addtocal">
        <div className="btn_saveinfo">
          <div className="addtocal">
            <div className="btn_clearinf">
              <Button
                style={{
                  background: "#e1e1e1",
                  color: "#000",
                }}
                onClick={() => setIsModalVisible(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
          <Button
            loading={buttonLoading}
            onClick={() => addToCalendar(selectedDate)}
          >
            Add to calendar
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddToCalendar;
