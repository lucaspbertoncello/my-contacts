# 📇 Contact & Category Manager - Full Stack Application

This is a **Full Stack** project using **React** on the front-end and **Node.js + Express** on the back-end. The application allows managing a list of contacts and categories with full **Create, Read, Update, and Delete (CRUD)** operations.

---

## 🚀 Technologies Used

**Front-end:**
- [React](https://reactjs.org/)
- [Vite](https://vite.dev)
- [TailwindCSS](https://tailwindcss.com)

**Back-end:**
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/) 

---

## ⚙️ Features

- List all contacts and categories
- Add new contacts and categories
- Edit existing contacts and categories
- Delete contacts and categories

---

## 📦 How to Run Locally

### Prerequisites

- [Node.js and npm](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com)

---

### Clone the Repository

```bash
git clone https://github.com/lucaspbertoncello/mycontacts.git

cd mycontacts
```

---

### Setting Up the Backend

1. Navigate to the backend directory:

```bash
cd api
```

2. Install dependencies:

```bash
npm install
```

3. Run docker:

```bash
docker compose up -D
docker start myContactsAPI
```

4. Start the backend server:

```bash
npm run dev
```

Backend should be running at `http://localhost:3000`.

---

### Setting Up the Frontend

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend:

```bash
npm start
```

Frontend should be running at `http://localhost:5173`.

---

## 📄 API Endpoints

| Method | Endpoint                | Description                        |
|--------|-------------------------|------------------------------------|
| GET    | `/contacts`             | Get all contacts                   |
| GET    | `/contacts/:id`         | Get contact by id                  |
| POST   | `/contacts`             | Create a new contact               |
| PUT    | `/contacts/:id`         | Update a contact                   |
| DELETE | `/contacts/:id`         | Delete a contact                   |
| GET    | `/categories`           | Get all categories                 |
| POST   | `/categories`           | Create a new category              |
| DELETE | `/categories/:id`       | Delete a category                  |

---

## ✨ Contributions

Feel free to open issues or submit pull requests to contribute to the project!

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🤝 Contact

Reach out to me on [LinkedIn](https://www.linkedin.com/in/lucas-bertoncello-05786a237/) or by [Email](mailto:lucasbertoncello1@gmail.com)!
