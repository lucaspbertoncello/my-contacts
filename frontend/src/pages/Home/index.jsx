import { useState, useMemo, useEffect } from "react";

import Loader from "../../components/Loader";

import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/delete.svg";

import delay from "../../utils/delay";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);

        const result = await fetch("http://localhost:3000/contacts");
        await delay(500);

        const json = await result.json();

        setContacts(json);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    loadContacts();
  }, [orderBy]);

  return (
    <div>
      <input
        className="h-12 px-4 w-full bg-white outline-0 rounded-3xl drop-shadow-sm"
        type="text"
        placeholder="Search contact..."
        value={searchTerm}
        onChange={handleSearchTermChange}
      />

      <div className="mt-8">
        {/* contact list header */}
        <header className="flex justify-between items-center mb-4">
          <strong className="font-bold text-2xl text-font-900">
            {filteredContacts.length}{" "}
            {filteredContacts.length === 1 ? "contacts" : "contact"}
          </strong>

          <a
            href="/new"
            className="text-main font-bold px-4 py-2 border-2 rounded-md transition-all hover:bg-main hover:text-white"
          >
            Add new contact
          </a>
        </header>
        {/* contact list header */}

        {/* contact list area */}
        <div>
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
                <button>
                  <img src={trash} alt="Delete" />
                </button>
              </div>
            </div>
          ))}
          {/* card */}
        </div>
        {/* contact list area */}
      </div>

      {isLoading && <Loader />}
    </div>
  );
}
