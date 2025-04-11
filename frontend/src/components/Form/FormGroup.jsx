import PropTypes from "prop-types";

// component to display field errors
export default function FormGroup({ children, error }) {
  return (
    <div>
      {children}

      {error && (
        <small className="text-danger-main mt-2 text-xs block">{error}</small>
      )}
    </div>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
};

FormGroup.defaultProps = {
  error: null,
};
