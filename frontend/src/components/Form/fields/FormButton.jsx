import PropTypes from "prop-types";

export default function FormButton({ children, disabled }) {
  return (
    <button
      disabled={disabled}
      className="
      w-full h-12 font-semibold drop-shadow-sm rounded-sm bg-main text-white transition-all cursor-pointer
      hover:bg-main-light active:bg-main
      disabled:bg-[#ccc] disabled:cursor-default
      "
    >
      {children}
    </button>
  );
}

FormButton.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};
