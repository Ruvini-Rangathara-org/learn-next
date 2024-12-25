export default function HomePage() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1>Welcome to ShopEasy</h1>
        <p>Your one-stop shop for all your needs!</p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Featured Products</h2>
        <p>Discover our top picks for you.</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "8px" }}>
            <h3>Product 1</h3>
            <p>$10.00</p>
          </div>
          <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "8px" }}>
            <h3>Product 2</h3>
            <p>$20.00</p>
          </div>
          <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "8px" }}>
            <h3>Product 3</h3>
            <p>$30.00</p>
          </div>
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
