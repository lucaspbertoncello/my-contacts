import PropTypes from "prop-types";

import FormGroup from "./FormGroup";

import FormInput from "./fields/FormInput";
import FormSelect from "./fields/FormSelect";
import FormButton from "./fields/FormButton";

export default function Form({ buttonLabel }) {
  return (
    <form className="space-y-4">
      <FormGroup>
        <FormInput placeholder="Name" />
      </FormGroup>

      <FormGroup>
        <FormInput placeholder="E-mail" />
      </FormGroup>

      <FormGroup>
        <FormInput placeholder="Phone" />
      </FormGroup>

      <FormGroup>
        <FormSelect>
          <option>Instagram</option>
          <option>Facebook</option>
          <option>Faculdade</option>
        </FormSelect>
      </FormGroup>

      <FormButton disabled>{buttonLabel}</FormButton>
    </form>
  );
}

Form.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
