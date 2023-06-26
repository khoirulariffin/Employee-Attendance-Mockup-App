import React from "react";

const SelectOption = (props) => {
  return (
    <select
      className="ml-1 mt-1 -mb-1 p-1 rounded w-32 cursor-pointer bg-white border focus:ring focus:outline-none"
      value={props.value}
      onChange={props.onChange}
    >
      {props.options.map((op, i) => (
        <option key={i} value={op.value}>
          {op.display}
        </option>
      ))}
    </select>
  );
};

export default SelectOption;
