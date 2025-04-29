import PropTypes from "prop-types";

export default function FormSelect({ children, value, onChange, disabled }) {
  return (
    <select
      className={`
        w-full outline-0 drop-shadow-sm h-12 rounded-sm px-4 border-2 border-transparent focus:border-main transition-all
        ${disabled ? "bg-font-100" : "bg-white"}
      `}
      placeholder="Name"
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {children}
    </select>
  );
}

FormSelect.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
