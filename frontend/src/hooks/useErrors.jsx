import { useState } from "react";

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  function setError(fieldName, message) {
    const errorAlreadyExists = errors.find(
      (error) => error.fieldName === fieldName
    );

    if (errorAlreadyExists) {
      return;
    }

    setErrors((prevState) => [...prevState, { fieldName, message }]);
  }

  function removeRepeteadErrors(fieldName) {
    setErrors((prevState) =>
      prevState.filter((error) => error.fieldName !== fieldName)
    );
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((error) => error.fieldName === fieldName)?.message;
  }

  return { errors, setError, removeRepeteadErrors, getErrorMessageByFieldName };
}
