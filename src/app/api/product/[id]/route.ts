import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/db";

// Handler for PUT requests to update a product
export async function PUT(req: Request) {
  try {
    // Extract `id` from the URL
    const url = new URL(req.url || "", `http://${req.headers.get("host")}`);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return new Response(JSON.stringify({ error: "Product ID is required" }), {
        status: 400,
      });
    }

    const productId = parseInt(id, 10);

    const body = await req.json();
    const { name, price } = body;

    if (!name || !price) {
      return new Response(
        JSON.stringify({ error: "Product name and price are required" }),
        { status: 400 }
      );
    }

    const client = await connectToDatabase();

    try {
      const result = await client.query(
        "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *",
        [name, price, productId]
      );

      const updatedProduct = result.rows[0];

      if (!updatedProduct) {
        return new Response(JSON.stringify({ error: "Product not found" }), {
          status: 404,
        });
      }

      return new Response(JSON.stringify(updatedProduct), { status: 200 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error in PUT handler:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// Handler for DELETE requests to delete a product
export async function DELETE(req: Request) {
  let client;
  try {
    // Extract `id` from the URL
    const url = new URL(req.url || "", `http://${req.headers.get("host")}`);
    const id = url.pathname.split("/").pop(); // Extract the last part of the path

    if (!id) {
      return new Response(JSON.stringify({ error: "Product ID is required" }), {
        status: 400,
      });
    }

    // Connect to the database
    client = await connectToDatabase();

    // Execute the DELETE query
    const result = await client.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [parseInt(id, 10)]
    );

    const deletedProduct = result.rows[0];
    if (!deletedProduct) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(deletedProduct), { status: 200 });
  } catch (error) {
    console.error("Error in DELETE handler:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  } finally {
    // Release the client back to the pool
    if (client) {
      client.release();
    }
  }
}

// Handler for GET requests to fetch a product by ID
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  const client = await connectToDatabase();

  try {
    const result = await client.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);

    const product = result.rows[0];
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
}
