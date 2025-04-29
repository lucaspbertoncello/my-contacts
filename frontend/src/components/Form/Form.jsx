import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import isEmailValid from "../../utils/isEmailValid";
import formatPhone from "../../utils/formatPhone";
import useErrors from "../../hooks/useErrors";

import CategoriesServices from "../../services/CategoriesService";

import FormGroup from "./FormGroup";
import FormInput from "./fields/FormInput";
import FormSelect from "./fields/FormSelect";
import FormButton from "./fields/FormButton";
import Loader from "../Loader";

export default function Form({ buttonLabel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { errors, setError, removeRepeteadErrors, getErrorMessageByFieldName } =
    useErrors();

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoading(true);

        const categoriesList = await CategoriesServices.listCategories();

        setCategories(categoriesList);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadCategories();
  }, []);

  const isFormValid = name && errors.length === 0;

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

    console.log({ name, email, phone, categoryId });
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
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="" disabled>
            No category selected
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </FormSelect>
      </FormGroup>

      <FormButton disabled={!isFormValid}>{buttonLabel}</FormButton>

      {isLoading && <Loader />}
    </form>
  );
}

Form.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
