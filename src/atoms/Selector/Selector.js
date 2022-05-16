import React from "react";
import "./styles.scss";

const Selector = ({ options = [], values = [], selected_option, onSelect, controlledOption }) => {
  return (
    <select
      className={"selector"}
      defaultValue={selected_option}
      onChange={onSelect}
      value={controlledOption}
    >
      {options.map((option, i) => (
        <option key={i} value={values[i] || i}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Selector;
