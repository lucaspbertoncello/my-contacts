import PropTypes from "prop-types";

import dangerIcon from "../../../assets/images/icons/danger.svg";
import sucessIcon from "../../../assets/images/icons/sucess.svg";
import { useEffect } from "react";

export default function ToastMessage({
  onRemoveMessage,
  id,
  text,
  type = "default",
}) {
  function handleRemoveToast() {
    onRemoveMessage(id);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(id);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onRemoveMessage, id]);

  return (
    <div
      className={`
        flex justify-center items-center gap-4 px-8 py-4 text-white rounded-sm mt-4 drop-shadow-sm cursor-pointer
        ${type === "danger" && "bg-danger-main"}
        ${type === "sucess" && "bg-sucess-main"}
        ${type === "default" && "bg-main"}
      `}
      onClick={handleRemoveToast}
    >
      {type === "danger" && <img src={dangerIcon} alt="danger" />}
      {type === "sucess" && <img src={sucessIcon} alt="sucess" />}
      <strong> {text} </strong>
    </div>
  );
}

ToastMessage.propTypes = {
  onRemoveMessage: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["default", "sucess", "danger"]),
};
