import React, { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  // Fetch items from backend
  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  // Add new item
  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !quantity) return;

    fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, quantity }),
    })
      .then((res) => res.json())
      .then((newItem) => {
        setItems((prev) => [...prev, newItem]);
        setName("");
        setQuantity("");
      });
  };

  // Delete item
  const handleDelete = (id) => {
    fetch(`/api/items/${id}`, { method: "DELETE" })
      .then(() => setItems((prev) => prev.filter((item) => item._id !== id)));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📦 Inventory</h1>

      <form onSubmit={handleAdd} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Item</button>
      </form>

      <ul style={styles.list}>
        {items.map((item) => (
          <li key={item._id} style={styles.listItem}>
            {item.name} - Qty: {item.quantity}
            <button onClick={() => handleDelete(item._id)} style={styles.deleteBtn}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "1rem",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    width: "120px",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    marginBottom: "0.5rem",
    fontSize: "1.1rem",
  },
  deleteBtn: {
    marginLeft: "1rem",
    padding: "0.2rem 0.5rem",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default App;
