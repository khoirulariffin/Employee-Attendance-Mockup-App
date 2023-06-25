import React from "react";

const SelectOption = (props) => {
  return (
    <select value={props.value} onChange={props.onChange}>
      {props.options.map((op, i) => (
        <option key={i} value={op.value}>
          {op.display}
        </option>
      ))}
    </select>
  );
};

export default SelectOption;
