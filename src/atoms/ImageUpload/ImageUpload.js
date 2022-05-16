import React from "react";
import "./styles.scss";
import placeholderImg from "../../assets/bot_placeholder.png";
const ImageUpload = ({ submit, onchange, default_image, color }) => {
  const enterClicked = (e) => {
    if (e.key === "Enter" && typeof submit === "function") submit(e);
  };

  return (
    <div className={`image-upload`}>
      <img
        src={default_image || placeholderImg}
        alt="upload icon"
        style={{ border: `1px solid ${color}` }}
      />
      {/* <input type="file" onChange={onchange} /> */}
    </div>
  );
};

export default ImageUpload;
