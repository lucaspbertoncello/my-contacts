import { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";

import toast from "../../utils/toast";

import ContactsService from "../../services/ContactsService";

import Form from "../../components/Form/Form";
import PageHeader from "../../components/PageHeader";

import Loader from "../../components/Loader";

export default function EditContact() {
  const [contactName, setContactName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const contactRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.listContactById(id);

        setIsLoading(false);
        contactRef.current.setFieldsValues(contact);
        setContactName(contact.name);
      } catch (e) {
        history.push("/");
        toast({
          type: "danger",
          text: "Contact not found.",
        });
      }
    }

    loadContact();
  }, [id, history]);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      const contactData = await ContactsService.updateContact(contact, id);

      setContactName(contactData.name);

      toast({
        type: "sucess",
        text: "Contact updated sucessfully",
      });
    } catch (e) {
      toast({
        type: "danger",
        text: "Ocurred an error while updating your contact",
      });
    }
  }

  return (
    <>
      <PageHeader title={isLoading ? "Loading..." : `Edit ${contactName}`} />
      <Form
        ref={contactRef}
        onSubmit={handleSubmit}
        buttonLabel="Save changes"
      />
      {isLoading && <Loader />}
    </>
  );
}
