import PropTypes from "prop-types";
import ReactDOM from "react-dom";

export default function Modal({
  danger,
  title,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}) {
  return ReactDOM.createPortal(
    // blur
    <div
      className="
      bg-black/60 backdrop-blur-xs
        absolute top-0 left-0 w-full h-full
        flex items-center justify-center
        "
    >
      {/* container */}
      <div className="w-full max-w-[500px] bg-white rounded-sm p-6">
        <h1
          className={`text-2xl font-bold ${
            danger ? "text-danger-main" : "text-font-900"
          }`}
        >
          {title}
        </h1>

        <p className="mt-2">This action cannot be undone!</p>

        <footer className="mt-8 flex items-center justify-end gap-4">
          <button onClick={onCancel} className="cursor-pointer text-font-200">
            {cancelLabel}
          </button>

          <button
            onClick={onConfirm}
            className={`cursor-pointer h-12 px-4 text-white font-semibold rounded-sm transition-all ${
              danger
                ? `bg-danger-main hover:bg-danger-light active:bg-danger-dark`
                : `bg-main`
            }`}
          >
            {confirmLabel}
          </button>
        </footer>
      </div>
      {/* container */}
    </div>,
    document.getElementById("modal-root")
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string.isRequired,
};

Modal.defaultProps = {
  danger: false,
};
