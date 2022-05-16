import React from "react";
import "./styles.scss";

const ImageUpload = ({ placeholder_text, submit, text, onchange, default_image }) => {
  const enterClicked = (e) => {
    if (e.key === "Enter" && typeof submit === "function") submit(e);
  };

  return (
    <div className={`image-uploader`}>
      <img src="" alt="upload icon" />
      <input type="file" onChange={onchange} />
    </div>
  );
};

export default ImageUpload;
