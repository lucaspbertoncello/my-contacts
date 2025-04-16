import { useState } from "react";
import PropTypes from "prop-types";

import isEmailValid from "../../utils/isEmailValid";

import FormGroup from "./FormGroup";
import FormInput from "./fields/FormInput";
import FormSelect from "./fields/FormSelect";
import FormButton from "./fields/FormButton";

export default function Form({ buttonLabel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState([]);

  function handleNameChange(e) {
    setName(e.target.value);

    if (!e.target.value) {
      setErrors((prevState) => [
        ...prevState,
        { fieldName: "name", message: "Name is required" },
      ]);
    } else {
      setErrors((prevState) =>
        prevState.filter((error) => error.fieldName !== "name")
      );
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);

    if (e.target.value && !isEmailValid(e.target.value)) {
      const errorAlreadyExists = errors.find(
        (error) => error.fieldName === "email"
      );

      if (errorAlreadyExists) {
        return;
      }

      setErrors((prevState) => [
        ...prevState,
        { fieldName: "email", message: "E-mail is invalid" },
      ]);
    } else {
      setErrors((prevState) =>
        prevState.filter((error) => error.fieldName !== "email")
      );
    }
  }

  console.log(errors);

  function handleSubmit(e) {
    e.preventDefault();

    console.log({ name, email, phone, category });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormGroup>
        <FormInput
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup>
        <FormInput
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <FormInput
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
