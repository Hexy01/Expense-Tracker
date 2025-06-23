# 💸 Personal Expense Tracker –
This is a full-stack expense tracker application developed as part of **Keploy Session-2 Task**. It allows users to add, view, filter, and delete personal expenses using custom-built API. and a minimal but responsive React frontend. The data is stored securely using MongoDB Atlas.

## 🧰 Technologies Used
- **Node.js + Express** – Backend and API server  
- **MongoDB Atlas** – Cloud NoSQL database  
- **Mongoose** – ODM for MongoDB  
- **React (Vite)** – Frontend (fully implemented)  
- **Axios** – For HTTP requests  
- **dotenv** – For environment configuration  
- **cors** – To allow frontend-backend communication

## 📌 API Endpoints & Functionality

### 🔹 1. Get All Expenses  
- **URL:** `/api/expenses`  
- **Method:** `GET`  
- **Query Params (Optional):**  
  - `category` – filter by category  
  - `startDate` / `endDate` – filter by date range  

**Response:**  
```json
[
  {
    "_id": "abc123",
    "title": "Uber Ride",
    "amount": 250,
    "category": "Transport",
    "date": "2025-06-23"
  }
]
```
---

### 🔹 2. Add New Item

- **URL**: `/api/expenses`
- **Method**: `POST`
- **Request Body**:
```json
{
  "title": "Groceries",
  "amount": 500,
  "category": "Food",
  "date": "2025-06-22"
}

```

---

### 🔹 3. Delete Expense

- **URL**: `/api/expenses/:id`
- **Method**: `DELETE`
- **Request Body**:
```json
{ "message": "Expense deleted successfully" }
```

---

## 🛢 Database & Integration

This app uses **MongoDB Atlas** for cloud-based data storage.

- The backend connects to MongoDB Atlas via Mongoose.
- The connection is configured through the `.env` file:

- Mongoose is connected in `server.js`:
```js
mongoose.connect(process.env.MONGO_URI)
```
- MongoDB schema defined in models/Expense.js.
---

## ▶️ How to Run the Server

1. Clone the repository:
```bash
git clone https://github.com/Hexy01/keploy-API.git
cd keploy-API
```

2. Create a `.env` file:


3. Install dependencies:
```bash
npm install
```

4. Start the server:
```bash
npm run dev

```

> Server will run on: `http://localhost:5000`

---

## 💻 How to Run the Frontend (React)

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm run dev
```

> React will open on: `http://localhost:3000` or `http://localhost:3001`

Make sure `frontend/package.json` includes:
```json
"proxy": "http://localhost:3000"
```

---

## 📡 How to Interact with the API (via curl or browser)

#### ➕ Add Expense

```bash
curl -X POST http://localhost:3000/api/expenses \
-H "Content-Type: application/json" \
-d '{"title":"Bus Ticket","amount":40,"category":"Transport","date":"2025-06-24"}'

```

#### 📋 Get All Expenses

```bash
curl http://localhost:3000/api/expenses
```

#### ❌ Delete Expense

```bash
curl -X DELETE http://localhost:3000/api/expenses/<id>
```
---

## 🧪 Testing

Run All Tests + Coverage
```bash
cd backend
npm test
```
This runs:

- Unit Tests (e.g., Mongoose model)
- Integration Tests (MongoDB in-memory server)
- API Tests (Supertest with Express)

## ✅ Test Coverage
Below is a screenshot of the test coverage result (npm test):
![Screenshot 2025-06-24 032906](https://github.com/user-attachments/assets/e6f6f279-5d84-4fe1-8a42-4605404322fd)


## Testing Tools Used

| Purpose             | Library               |
| ------------------- | --------------------- |
| Unit Testing        | Jest                  |
| Integration Testing | mongodb-memory-server |
| API Testing         | Supertest             |
| Coverage            | Jest --coverage       |

---

## 📊 Features
- Add, view, and delete personal expenses
- Filter expenses by category or date range
- Dashboard showing:
  Total spending.
  Pie chart by category.
  Bar chart of expenses. 
- Clean, responsive design using internal CSS

## ✅ Status

- Backend server working
- MongoDB connection established
- API endpoints tested
- Frontend successfully connected

---

