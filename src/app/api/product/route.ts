// src/app/api/product/route.ts
import { connectToDatabase } from "@/app/lib/db";

// GET method: Fetch all products
export async function GET() {
  const client = await connectToDatabase();
  try {
    const result = await client.query("SELECT * FROM products ORDER BY id ASC;");
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  } finally {
    client.release();  // Release the client back to the pool
  }
}

// POST method: Add a new product
export async function POST(req: Request) {
  const client = await connectToDatabase();
  try {
    const { name, price } = await req.json(); // Getting JSON from the request body

    if (!name || !price) {
      return new Response(
        JSON.stringify({ error: "Product name and price are required" }),
        { status: 400 }
      );
    }

    const result = await client.query(
      "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
      [name, price]
    );

    const newProduct = result.rows[0];
    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  } finally {
    client.release();  // Release the client back to the pool
  }
}
