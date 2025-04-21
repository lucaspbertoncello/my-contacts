import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import { InfinitySpin } from "react-loader-spinner";

export default function Loader({ isLoading }) {
  return ReactDOM.createPortal(
    <div
      className={`w-full h-full absolute top-0 left-0 bg-main-lightest/20 backdrop-blur-xs flex items-center justify-center`}
    >
      <InfinitySpin
        width="300"
        color="#5061fc"
        ariaLabel="infinity-spin-loading"
      />
    </div>,
    document.getElementById("loader-root")
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool,
};
