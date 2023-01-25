import React from "react";
import { ClockCircleOutlined } from "@ant-design/icons";

function WorkoutCard({
  eventDetailsObj,
  showOverViewModal,
  eventDuration,
  eventEquipment,
  completionStatus,
  setEventId,
  eventId,
  userId,
  workout_progress,
}) {
  return (
    <div
      className="workout__Card"
      onClick={async () => {
        eventDetailsObj["eventId"] = eventId;
        showOverViewModal(eventDetailsObj);
      }}
    >
      <div className="core__cd_cc">
        <h2
          className={
            workout_progress && workout_progress.complete_status == 1
              ? "core__cd_cc_completed"
              : eventDetailsObj.added_by != userId &&
                eventDetailsObj.added_by != 1
              ? "core__cd_cc_active_coach"
              : "core__cd_cc_active"
          }
        >
          {eventDetailsObj.title || "N/A"}
        </h2>
        <p>
          {/* {eventDetailsObj.description.length > 100
            ? eventDetailsObj.description.substring(0, 100)
            : eventDetailsObj.description}
          ... */}
        </p>
      </div>
      {Boolean(eventDetailsObj.fitness_level) ? (
        <div className="fitning-videoy">
          <div className="circle-all-ca">
            {eventDetailsObj.fitness_level.id === 1 ? (
              <>
                <h6 className="circle-black-all"></h6>
                <h6 className="circle-black"></h6>
                <h6 className="circle-black"></h6>
              </>
            ) : eventDetailsObj.fitness_level.id === 2 ? (
              <>
                <h6 className="circle-black-all"></h6>
                <h6 className="circle-black-all"></h6>
                <h6 className="circle-black"></h6>
              </>
            ) : (
              <>
                <h6 className="circle-black-all"></h6>
                <h6 className="circle-black-all"></h6>
                <h6 className="circle-black-all"></h6>
              </>
            )}
          </div>
          <b>{eventDetailsObj.fitness_level.name}</b>
        </div>
      ) : null}

      <div className="clock__card">
        <ClockCircleOutlined /> <p> {eventDuration}</p>
      </div>
      {eventEquipment.length ? (
        <div className="pad__card-pc">
          {eventEquipment.map((item, i) => (
            <p key={i}>{item.name}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default WorkoutCard;
