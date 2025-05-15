import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
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

const Form = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setisLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { errors, setError, removeRepeteadErrors, getErrorMessageByFieldName } =
    useErrors();

  useImperativeHandle(
    ref,
    () => {
      return {
        setFieldsValues(contact) {
          setName(contact.name || "");
          setEmail(contact.email || "");
          setPhone(formatPhone(contact.phone) || "");
          setCategoryId(contact.categorie_id || "");
        },
      };
    },
    []
  );

  useEffect(() => {
    async function loadCategories() {
      try {
        setisLoadingCategories(true);

        const categoriesList = await CategoriesServices.listCategories();

        setCategories(categoriesList);
        // eslint-disable-next-line no-empty
      } catch {
      } finally {
        setisLoadingCategories(false);
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

  async function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);

    await onSubmit({ name, email, phone, categoryId });

    setIsSubmitting(false);

    setName("");
    setEmail("");
    setPhone("");
    setCategoryId("");
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
          disabled={isLoadingCategories}
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
      <FormButton disabled={!isFormValid || isSubmitting}>
        {!isSubmitting && buttonLabel}
        {isSubmitting && <Loader />}
      </FormButton>
      {isLoadingCategories && <Loader />} {/* to refactor */}
    </form>
  );
});

Form.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
