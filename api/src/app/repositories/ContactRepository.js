const { v4 } = require("uuid");

const db = require("../../database/index");

let contacts = [
  {
    id: v4(),
    name: "Lucas",
    email: "lucasbertoncello1@gmail.com",
    phone: "41995257119",
    category_id: v4(),
  },
  {
    id: v4(),
    name: "Gabriel",
    email: "gabrielferreira@gmail.com",
    phone: "531293879123",
    category_id: v4(),
  },
  {
    id: v4(),
    name: "Matheus",
    email: "matheusilva@gmail.com",
    phone: "34312321444",
    category_id: v4(),
  },
];

class ContactRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
  }

  async create({ name, email, phone, category_id }) {
    const [row] = await db.query(
      `
      INSERT INTO contacts(name, email, phone, categorie_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `,
      [name, email, phone, category_id]
    );

    return row;
  }

  update(id, { name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) =>
        contact.id === id ? updatedContact : contact
      );

      resolve(updatedContact);
    });
  }

  deleteById(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactRepository();
