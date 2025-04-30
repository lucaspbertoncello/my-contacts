import PageHeader from "../../components/PageHeader";
import Form from "../../components/Form/Form";
import ContactsService from "../../services/ContactsService";

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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <PageHeader title="New contact" />
      <Form onSubmit={handleSubmit} buttonLabel="Create contact" />
    </>
  );
}
