import PropTypes from "prop-types";

export default function FormButton({ children, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
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
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};
