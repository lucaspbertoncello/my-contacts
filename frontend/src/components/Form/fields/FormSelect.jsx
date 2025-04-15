import PropTypes from "prop-types";

export default function FormSelect({ children, value, onChange }) {
  return (
    <select
      className="w-full bg-white outline-0 drop-shadow-sm h-12 rounded-sm px-4 border-2 border-transparent focus:border-main transition-all"
      placeholder="Name"
      value={value}
      onChange={onChange}
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
