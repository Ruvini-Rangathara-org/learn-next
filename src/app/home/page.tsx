"use client"; // This marks the component as a client component

import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

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

  // Fetch products on page load
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1>Welcome to ShopEasy</h1>
        <p>Your one-stop shop for all your needs!</p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Featured Products</h2>
        <p>Discover our top picks for you.</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", // Adjust column width and allow more cards per row
            gap: "1rem", // Increased gap between cards
            justifyItems: "center",
            marginTop: "1rem",
          }}
        >
          {products.length ? (
            products.map((product) => (
              <div
                key={product.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "1rem",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </section>

      <section>
        <h2>Why Shop With Us?</h2>
        <ul>
          <li>Wide range of high-quality products</li>
          <li>Affordable prices and exciting deals</li>
          <li>Fast and reliable delivery</li>
        </ul>
      </section>
    </div>
  );
}
