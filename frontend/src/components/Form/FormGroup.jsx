import PropTypes from "prop-types";

// component to display field errors
export default function FormGroup({ children }) {
  return <div>{children}</div>;
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
};
