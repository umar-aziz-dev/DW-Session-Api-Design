import express from "express";

const router = express.Router();

// simple CRUD demo
let products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
  { id: 6, name: "Product 6", price: 60 },
];

// GET
router.get("/", (req, res) => {
  res.status(200).json(products);
});

// GET by ID
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");
  res.status(200).json(product);
});

// POST
router.post("/", (req, res) => {
  const { name, price } = req.body;
  const product = { id: products.length + 1, name, price };
  products.push(product);
  res.status(201).json(product);
});

// PUT - FULL UPDATE
router.put("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");
  const { name, price } = req.body;
  product.name = name;
  product.price = price;
  res.status(200).json(product);
});

// PATCH - PARTIAL UPDATE
router.patch("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");
  const { name, price } = req.body;
  if (name) product.name = name;
  if (price) product.price = price;
  res.status(200).json(product);
});

// DELETE
router.delete("/:id", (req, res) => {
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id),
  );
  if (productIndex === -1) return res.status(404).send("Product not found");
  products.splice(productIndex, 1);
  res.status(204).send();
});

// PAGINATION --- Endpoints for Just pagination demonstration
// 1- Offset pagination
router.get("/offset", (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;

  // SQL equivalent:
  // SELECT * FROM products
  // ORDER BY id
  // LIMIT limit OFFSET offset;

  const paginatedProducts = products.slice(offset, offset + limit);

  res.status(200).json({
    offset,
    limit,
    data: paginatedProducts,
  });
});

// 2- Page-based pagination
router.get("/page", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const offset = (page - 1) * limit;

  // SQL equivalent:
  // SELECT * FROM products
  // ORDER BY id
  // LIMIT limit OFFSET offset;

  const paginatedProducts = products.slice(offset, offset + limit);

  res.status(200).json({
    page,
    limit,
    offset,
    data: paginatedProducts,
  });
});

// 3- Cursor-based pagination
router.get("/cursor", (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const cursor = parseInt(req.query.cursor) || 0;

  //   SQL Query Example for Cursor-based pagination
  //   SELECT * FROM products
  //   WHERE id > last_seen_id -- This is the cursor (last seen ID)
  //   ORDER BY id ASC
  //   LIMIT 10; -- This will fetch the next 10 items after the cursor

  const paginatedProducts = products.slice(cursor, cursor + limit);
  const nextCursor = cursor + limit < products.length ? cursor + limit : null;
  res.status(200).json({ data: paginatedProducts, nextCursor });
});


export default router;
