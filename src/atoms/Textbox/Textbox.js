import React from "react";
import "./styles.scss";

const Textbox = ({ placeholder_text, submit, text, onchange, disabled = false, defaultText }) => {
  const enterClicked = (e) => {
    if (e.key === "Enter" && typeof submit === "function") submit(e);
  };

  return (
    <div className={`textbox`}>
      <input
        type="text"
        value={text}
        defaultValue={defaultText}
        placeholder={placeholder_text}
        onKeyDown={enterClicked}
        onChange={onchange}
        disabled={disabled}
      />
    </div>
  );
};

export default Textbox;
