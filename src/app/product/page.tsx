"use client"; // This marks the component as a client component

import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  // Fetch products from backend
  const fetchProducts = async () => {
    const res = await fetch("/api/product", {
      method: "GET",
    });
    if (res.ok) {
      const data = await res.json();
      setProducts(data);
    } else {
      console.error("Failed to fetch products");
    }
  };

  // Add a new product
  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price)
      return alert("All fields are required!");
    const res = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (res.ok) {
      const addedProduct = await res.json();
      setProducts([...products, addedProduct]);
      setNewProduct({ name: "", price: "" });
    } else {
      console.error("Failed to add product");
    }
  };

  // Delete a product
  const deleteProduct = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return; // Exit if the user cancels
    }

    try {
      const res = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const deletedProduct = await res.json();
        setProducts(
          products.filter((product) => product.id !== deletedProduct.id)
        );
        alert("Product deleted successfully");
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("An error occurred while deleting the product:", error);
    }
  };

  // Edit a product
  const updateProduct = async (updatedProduct: {
    id: number;
    name: string;
    price: number;
  }) => {
    const res = await fetch(`/api/product/${updatedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    if (res.ok) {
      const updatedProductData = await res.json();
      setProducts(
        products.map((product) =>
          product.id === updatedProduct.id
            ? { ...product, ...updatedProductData }
            : product
        )
      );
      alert("Product updated successfully");
    } else {
      console.error("Failed to update product");
    }
  };

  // Fetch products on page load
  useEffect(() => {
    fetchProducts();
  }, []);

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
                <strong>{product.name}</strong> ${product.price}
                <button
                  onClick={() => {
                    const updatedName =
                      prompt("Enter new name:", product.name) || product.name;
                    const updatedPrice = parseFloat(
                      prompt("Enter new price:", product.price.toString()) ||
                        product.price.toString()
                    );
                    updateProduct({
                      id: product.id,
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
