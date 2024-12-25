// pages/api/product/[id]/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, disconnectFromDatabase } from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
    body,
  } = req;

  const client = await connectToDatabase();

  try {
    if (method === "PUT") {
      // Update product
      const { name, price } = body;

      if (!name || !price) {
        return res.status(400).json({ error: "Product name and price are required" });
      }

      const result = await client.query(
        "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *",
        [name, price, id]
      );

      const updatedProduct = result.rows[0];
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(updatedProduct);
    } else if (method === "DELETE") {
      // Delete product
      const result = await client.query(
        "DELETE FROM products WHERE id = $1 RETURNING *",
        [id]
      );

      const deletedProduct = result.rows[0];
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(deletedProduct);
    } else if (method === "GET") {
      // Get product by ID
      const result = await client.query("SELECT * FROM products WHERE id = $1", [id]);

      const product = result.rows[0];
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(product);
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await disconnectFromDatabase();
  }
}
