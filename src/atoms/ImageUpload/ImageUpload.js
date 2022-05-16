import React from "react";
import "./styles.scss";
import placeholderImg from "../../assets/bot_placeholder.png";
const ImageUpload = ({ submit, onchange, default_image }) => {
  const enterClicked = (e) => {
    if (e.key === "Enter" && typeof submit === "function") submit(e);
  };

  return (
    <div className={`image-uploader`}>
      <img src={default_image || placeholderImg} alt="upload icon" />
      <input type="file" onChange={onchange} />
    </div>
  );
};

export default ImageUpload;
