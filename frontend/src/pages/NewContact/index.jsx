import PageHeader from "../../components/PageHeader";
import Form from "../../components/Form/Form";
import ContactsService from "../../services/ContactsService";

import toast from "../../utils/toast";

export default function NewContact() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      const response = await ContactsService.createContact(contact);
      toast({
        type: "sucess",
        text: "Contact registered sucessfully",
      });
    } catch {
      toast({
        type: "danger",
        text: "Ocurred an error while registering your contact",
      });
    }
  }

  return (
    <>
      <PageHeader title="New contact" />
      <Form onSubmit={handleSubmit} buttonLabel="Create contact" />
    </>
  );
}
