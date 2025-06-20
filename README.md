# 📦 Inventory Management API with React Frontend

This project is a full-stack inventory management system built for the **Keploy Assignment-2**. It features a custom RESTful API with MongoDB integration and an optional React-based frontend.

---

## 🧰 Technologies Used

- **Node.js** + **Express** – Backend and API server
- **MongoDB Atlas** – Cloud-based NoSQL database
- **Mongoose** – MongoDB object modeling
- **React** – Frontend (optional but included)
- **dotenv** – For environment configuration
- **cors** – Enable cross-origin requests

---

## 📌 API Endpoints & Functionality

### 🔹 1. Get All Items

- **URL**: `/api/items`
- **Method**: `GET`
- **Response**:
```json
[
  {
    "_id": "abc123",
    "name": "Pen",
    "quantity": 10,
    "status": "available"
  }
]
```

---

### 🔹 2. Add New Item

- **URL**: `/api/items`
- **Method**: `POST`
- **Request Body**:
```json
{
  "name": "Pen",
  "quantity": 10
}
```

---

### 🔹 3. Update Item

- **URL**: `/api/items/:id`
- **Method**: `PUT`
- **Request Body**:
```json
{
  "quantity": 25
}
```

---

### 🔹 4. Delete Item

- **URL**: `/api/items/:id`
- **Method**: `DELETE`
- **Response**:
```json
{
  "message": "Item deleted successfully"
}
```

---

## 🛢 Database & Integration

This app uses **MongoDB Atlas** for cloud-based data storage.

- Integration is handled using **Mongoose**.
- The connection is configured through the `.env` file:
```
MONGO_URI=your_mongodb_atlas_connection_string
```
- Mongoose is connected in `server.js`:
```js
mongoose.connect(process.env.MONGO_URI)
```

---

## ▶️ How to Run the Server

1. Clone the repository:
```bash
git clone https://github.com/your-username/keploy-API.git
cd keploy-API
```

2. Create a `.env` file:
```
MONGO_URI=your_mongodb_atlas_uri
```

3. Install dependencies:
```bash
npm install
```

4. Start the server:
```bash
node server.js
```

> Server will run on: `http://localhost:3000`

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
npm start
```

> React will open on: `http://localhost:3000` or `http://localhost:3001`

Make sure `frontend/package.json` includes:
```json
"proxy": "http://localhost:3000"
```

---

## 📡 How to Interact with the API (via curl or browser)

### ➕ Add Item

```bash
curl "http://localhost:3000/api/items" -Method POST -Body '{"name":"Pen","quantity":10}' -ContentType "application/json"
```

### 📋 Get All Items

```bash
curl http://localhost:3000/api/items
```

### ✏️ Update Item

```bash
curl "http://localhost:3000/api/items/<id>" -Method PUT -Body '{"quantity":25}' -ContentType "application/json"
```

### ❌ Delete Item

```bash
curl "http://localhost:3000/api/items/<id>" -Method DELETE
```

---

## ✅ Status

- [x] Backend server working
- [x] MongoDB connection established
- [x] API endpoints tested
- [x] Frontend successfully connected
- [x] Fully documented

---

