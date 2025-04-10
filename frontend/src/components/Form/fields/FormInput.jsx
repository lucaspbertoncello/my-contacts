import PropTypes from "prop-types";

export default function FormInput({ placeholder }) {
  return (
    <input
      type="text"
      className="w-full bg-white outline-0 drop-shadow-sm h-12 rounded-sm px-4 border-2 border-transparent focus:border-main transition-all"
      placeholder={placeholder}
    />
  );
}

FormInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
};
