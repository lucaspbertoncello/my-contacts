import { useState, useMemo, useEffect, useCallback } from "react";

import Loader from "../../components/Loader";
import FormButton from "../../components/Form/fields/FormButton";
import Modal from "../../components/Modal";

import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/delete.svg";
import sad from "../../assets/images/sad.svg";
import emptyBox from "../../assets/images/empty-box.svg";
import magnifierQuestion from "../../assets/images/magnifier-question.svg";

import ContactsService from "../../services/ContactsService";

import toast from "../../utils/toast";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, contacts]
  );

  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
  }

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  function handleTryAgain() {
    loadContacts();
  }

  function handleDeleteContact(contact) {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
    setContactBeingDeleted(null);
  }

  const handleConfirmDeleteContact = useCallback(async () => {
    try {
      setIsLoading(true);

      await ContactsService.deleteContact(contactBeingDeleted.id);

      toast({
        type: "sucess",
        text: "Contact deleted sucessfully",
      });
    } catch {
      toast({
        type: "danger",
        text: "Ocurred an error while deleting your contact",
      });
    } finally {
      handleCloseDeleteModal();
      setIsLoading(false);
    }
  }, [contactBeingDeleted]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts, handleConfirmDeleteContact]);

  return (
    <div>
      <Modal
        danger
        title={`Are you sure you want to delete the contact "${contactBeingDeleted?.name}"`}
        isVisible={isDeleteModalVisible}
        cancelLabel="Cancel"
        confirmLabel="Delete"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
      />

      {contacts.length > 0 && (
        <input
          className="h-12 px-4 w-full bg-white outline-0 rounded-3xl drop-shadow-sm"
          type="text"
          placeholder="Search contact..."
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      )}

      <div className="mt-8">
        {/* contact list header */}
        <header
          className={`flex items-center mb-4 ${
            hasError
              ? "justify-end border-b-2 border-b-font-100 pb-4"
              : contacts.length > 0
              ? "justify-between"
              : "justify-center border-b-2 border-b-font-100 pb-4"
          }
          ${
            filteredContacts.length < 1
              ? "border-b-2 border-b-font-100 pb-4"
              : ""
          }
          `}
        >
          {!hasError && contacts.length > 0 && (
            <strong className="font-bold text-2xl text-font-900">
              {filteredContacts.length}{" "}
              {filteredContacts.length === 1 ? "contact" : "contacts"}
            </strong>
          )}

          <a
            href="/new"
            className="text-main font-bold px-4 py-2 border-2 rounded-md transition-all hover:bg-main hover:text-white"
          >
            Add new contact
          </a>
        </header>
        {/* contact list header */}

        {hasError && (
          // Error Container
          <div className="flex gap-6">
            <img src={sad} alt="sad" />
            <div className="gap-4">
              <span className="font-semibold text-lg text-danger-dark block mb-4">
                An error occurred while retrieving your contacts
              </span>
              <FormButton onClick={handleTryAgain}>Try again</FormButton>
            </div>
          </div>
        )}

        {/* contact list area */}
        {!hasError && (
          <div>
            {contacts.length < 1 && (
              <div className="flex justify-center items-center flex-col gap-4">
                <img src={emptyBox} alt="empty" />
                <span className="text-center text-font-200">
                  You don't have any contacts registered yet! <br />
                  Click the{" "}
                  <span className="text-main font-semibold">
                    "New Contact"
                  </span>{" "}
                  button above to register your first one!
                </span>
              </div>
            )}

            {filteredContacts.length < 1 && contacts.length > 0 && (
              <div className="flex items-center justify-between gap-4">
                <img src={magnifierQuestion} alt="Not found" />
                <span className="text-font-200 break-all">
                  No results found for{" "}
                  <span className="font-semibold">"{searchTerm}"</span>
                </span>
              </div>
            )}

            {filteredContacts.length > 0 && (
              <header>
                <button
                  onClick={handleToggleOrderBy}
                  className="flex items-center cursor-pointer"
                >
                  <span className="mr-2 text-main font-bold">Nome</span>{" "}
                  <img
                    src={arrow}
                    alt=""
                    className={`${
                      orderBy === "asc" ? "" : "rotate-180"
                    } transition-all`}
                  />
                </button>
              </header>
            )}
            {/* card */}
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between mt-2 mb-2 bg-white p-4 border border-white rounded-sm drop-shadow-sm"
              >
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <strong className="text-lg text-font-900">
                      {contact.name}
                    </strong>
                    {contact.categorie_name && (
                      <small className="bg-main-lighter text-main font-bold px-2 py-1 uppercase rounded-sm ml-3">
                        {contact.categorie_name}
                      </small>
                    )}
                  </div>

                  <span className="text-sm text-font-200">{contact.email}</span>
                  <span className="text-sm text-font-200">{contact.phone}</span>
                </div>

                <div className="flex gap-4">
                  <a href={`/edit/${contact.id}`}>
                    <img src={edit} alt="Edit" />
                  </a>
                  <button
                    className="cursor-pointer"
                    onClick={() => handleDeleteContact(contact)}
                  >
                    <img src={trash} alt="Delete" />
                  </button>
                </div>
              </div>
            ))}
            {/* card */}
          </div>
        )}
        {/* contact list area */}
      </div>

      {isLoading && <Loader />}
    </div>
  );
}
