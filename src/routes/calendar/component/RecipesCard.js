import React, { useEffect, useState } from "react";

function RecipesCard({
  showRecipeOverViewModal,
  eventDetailsObj,
  completionStatus,
  setEventId,
  recipeprogres,
  eventId,
}) {
  const [recipeList, setRecipeList] = useState([]);

  const test = async (eventDetailsObj) => {
    if (eventDetailsObj && eventDetailsObj.meal_data) {
      const breakfast = await eventDetailsObj.meal_data.filter(
        (recip) => recip.name == "Breakfast"
      );
      const lunch = await eventDetailsObj.meal_data.filter(
        (recip) => recip.name == "Lunch"
      );
      const dinner = await eventDetailsObj.meal_data.filter(
        (recip) => recip.name == "Dinner"
      );
      const snacks = await eventDetailsObj.meal_data.filter(
        (recip) => recip.name == "Snacks"
      );
      var newlist = await breakfast.concat(lunch,snacks, dinner);
      setRecipeList(newlist);
    }
  };

  useEffect(() => {
    if (eventDetailsObj) {
      test(eventDetailsObj);
    }
  }, [eventDetailsObj]);
  return (
    <div
      className="breakfast__Card"
      onClick={async () => {
        eventDetailsObj["eventId"] = eventId;
        showRecipeOverViewModal(eventDetailsObj);
      }}
    >
      {console.log(
        "programmable_user--------------",
        eventDetailsObj.recipe_progress &&
          eventDetailsObj.recipe_progress.complete_status
      )}
      <div className="breakfast__bf">
        {recipeList &&
          recipeList.map((item, index) =>
            index < 1 ? (
              <h2
                //   className={
                //   eventDetailsObj.workout_progress.complete_status == 1 ? "core__cd_cc_completed" : ( (eventDetailsObj.added_by != userId && eventDetailsObj.added_by != 1) ? "core__cd_cc_active_coach" : "core__cd_cc_active" )
                // }

                className={
                  recipeprogres && recipeprogres.complete_status == 1
                    ? "breakfast__bf_completed"
                    : "breakfast__bf_active"
                }
                key={index}
              >
                {item.name}
              </h2>
            ) : null
          )}
        {recipeList.length == 0 ? (
          <h2
            className={
              recipeprogres && recipeprogres.complete_status == 1
                ? "breakfast__bf_completed"
                : "breakfast__bf_active"
            }
          >
            Manual Recipe
          </h2>
        ) : null}
        <h3>{eventDetailsObj && eventDetailsObj.title.substring(0, 15)}...</h3>
        {/* <p>
          {eventDetailsObj && eventDetailsObj.description && eventDetailsObj.description.length > 100
            ? eventDetailsObj.description.substring(0, 100)
            : eventDetailsObj.description}
          ...
        </p> */}
      </div>
      <div className="calories__num">
        <p>calories</p>
        <h5>{eventDetailsObj.calorie}</h5>
      </div>
    </div>
  );
}

export default RecipesCard;
