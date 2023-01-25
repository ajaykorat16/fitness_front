import React from "react";

const IngredientsRecipes = ({ item, keyval }) => {
  const extra_class =
    keyval % 2 == 0 ? "white Avocado-allb " : "Avocado-allb-gray Avocado-allb";

  return (
    <div className={extra_class}>
      <div className="av-name">
        <p></p>
        <h4>{item.name}</h4>
      </div>
      {/* <b className="av-unit">Unit</b> */}
      <p className="av-num-u">{item.pivot.ingredientLines}</p>
    </div>
  );
};

export default IngredientsRecipes;
