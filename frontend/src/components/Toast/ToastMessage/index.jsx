import PropTypes from "prop-types";

import dangerIcon from "../../../assets/images/icons/danger.svg";
import sucessIcon from "../../../assets/images/icons/sucess.svg";

export default function ToastMessage({ text, type = "default" }) {
  return (
    <div
      className={`
        flex justify-center items-center gap-4 px-8 py-4 text-white rounded-sm mt-4
        ${type === "danger" && "bg-danger-main"}
        ${type === "sucess" && "bg-sucess-main"}
        ${type === "default" && "bg-main"}
      `}
    >
      {type === "danger" && <img src={dangerIcon} alt="danger" />}
      {type === "sucess" && <img src={sucessIcon} alt="sucess" />}
      <strong> {text} </strong>
    </div>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["default", "sucess", "danger"]),
};
