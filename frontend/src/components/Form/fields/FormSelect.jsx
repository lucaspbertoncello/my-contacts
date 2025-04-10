import PropTypes from "prop-types";

export default function FormSelect({ children }) {
  return (
    <select
      className="w-full bg-white outline-0 drop-shadow-sm h-12 rounded-sm px-4 border-2 border-transparent focus:border-main transition-all"
      placeholder="Name"
    >
      {children}
    </select>
  );
}

FormSelect.propTypes = {
  children: PropTypes.node.isRequired,
};
