# 🛒 Online Store

**Fullstack проєкт інтернет-магазину**, створений з використанням **Node.js (Express)** для backend та **React** для frontend. Мета — реалізувати повноцінну e-commerce платформу з авторизацією, кошиком, API для продуктів, замовлень тощо.

---

## 🔧 Технології

### Backend:
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM

### Frontend (в розробці):
- React
- Vite / Create React App (вказати, що саме)
- Axios
- TailwindCSS або інше (якщо планується)

---

## 🚀 Статус

- ✅ API реалізовано: реєстрація, авторизація, продукти, категорії, замовлення
- 🚧 Frontend у процесі розробки

---

## 📦 Встановлення

1. Клонувати репозиторій:

```bash
git clone https://github.com/SerhiySokalskiy/online-store.git
cd online-store
```

2. Встановити залежності для backend:

```bash
cd backend
npm install
```

3. Створити `.env` файл:

```env
PORT=5000
DB_NAME=your_db_name
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
```

4. Запустити сервер:

```bash
npm run dev
```

---

## 📁 Структура проекту (backend)

```
backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── index.js
└── .env
```

---

## 🧩 Плани:

- [ ] Реалізувати UI у React
- [ ] Додати оплату (Stripe / LiqPay)
- [ ] Docker-контейнери
- [ ] Тести (Jest / Supertest)

---

## 📃 Ліцензія

Цей проєкт опубліковано під ліцензією MIT.

---

## 🙋‍♂️ Автор

[Serhiy Sokalskiy](https://github.com/SerhiySokalskiy)
