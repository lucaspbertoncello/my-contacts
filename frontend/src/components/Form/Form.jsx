import { useState } from "react";
import PropTypes from "prop-types";

import isEmailValid from "../../utils/isEmailValid";
import formatPhone from "../../utils/formatPhone";
import useErrors from "../../hooks/useErrors";

import FormGroup from "./FormGroup";
import FormInput from "./fields/FormInput";
import FormSelect from "./fields/FormSelect";
import FormButton from "./fields/FormButton";

export default function Form({ buttonLabel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");

  const { setError, removeRepeteadErrors, getErrorMessageByFieldName } =
    useErrors();

  function handleNameChange(e) {
    setName(e.target.value);

    if (!e.target.value) {
      setError("name", "Name is required");
    } else {
      removeRepeteadErrors("name");
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);

    if (e.target.value && !isEmailValid(e.target.value)) {
      setError("email", "Invalid e-mail");
    } else {
      removeRepeteadErrors("email");
    }
  }

  function handlePhoneChange(e) {
    setPhone(formatPhone(e.target.value));
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log({ name, email, phone, category });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormGroup error={getErrorMessageByFieldName("name")}>
        <FormInput
          error={getErrorMessageByFieldName("name")}
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName("email")}>
        <FormInput
          error={getErrorMessageByFieldName("email")}
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <FormInput
          placeholder="Phone"
          value={phone}
          onChange={handlePhoneChange}
          maxPhoneLength={"15"}
        />
      </FormGroup>

      <FormGroup>
        <FormSelect
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Instagram</option>
          <option>Facebook</option>
          <option>Faculdade</option>
        </FormSelect>
      </FormGroup>

      <FormButton>{buttonLabel}</FormButton>
    </form>
  );
}

Form.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
