"use client"; // This marks the component as a client component

import { useState } from "react";

export default function ProductPage() {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: 10.0 },
    { id: 2, name: "Product 2", price: 20.0 },
    { id: 3, name: "Product 3", price: 30.0 },
  ]);

  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  // Add a new product
  const addProduct = () => {
    if (!newProduct.name || !newProduct.price)
      return alert("All fields are required!");
    const newId = products.length ? products[products.length - 1].id + 1 : 1;
    setProducts([
      ...products,
      { id: newId, ...newProduct, price: parseFloat(newProduct.price) },
    ]);
    setNewProduct({ name: "", price: "" });
  };

  // Delete a product
  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Edit a product
  const updateProduct = (
    id: number,
    updatedProduct: { name: string; price: number }
  ) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  return (
    <div style={styles.container}>
      <h2>Products</h2>

      {/* Add Product Form */}
      <div style={styles.formContainer}>
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          style={styles.input}
        />
        <button onClick={addProduct} style={styles.button}>
          Add Product
        </button>
      </div>

      {/* Product List */}
      <div>
        <h3>Product List</h3>
        {products.length ? (
          <ul>
            {products.map((product) => (
              <li key={product.id} style={styles.listItem}>
                <strong>{product.name}</strong> - ${product.price.toFixed(2)}
                <button
                  onClick={() => {
                    const updatedName =
                      prompt("Enter new name:", product.name) || product.name;
                    const updatedPrice = parseFloat(
                      prompt("Enter new price:", product.price.toString()) ||
                        product.price.toString()
                    );
                    updateProduct(product.id, {
                      name: updatedName,
                      price: updatedPrice,
                    });
                  }}
                  style={{ ...styles.button, marginLeft: "1rem" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  style={{
                    ...styles.button,
                    marginLeft: "0.5rem",
                    backgroundColor: "#e74c3c",
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "1.5rem",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    maxWidth: "800px",
    margin: "auto",
  },
  formContainer: {
    marginBottom: "2rem",
    padding: "1rem",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding: "0.5rem",
    marginRight: "0.5rem",
    marginBottom: "1rem",
    width: "calc(50% - 0.5rem)",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },

  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#3498db",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#2980b9",
  },
  listItem: {
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};
