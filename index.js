const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");

const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Categories");
const brandsRouter = require("./routes/Brands");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");

//middlewares
server.use(
  cors({
    exposedHeaders: ["totalCount"],
  })
);
server.use(express.json()); // to parse req.body
server.use("/api/products", productsRouter);
server.use("/api/categories", categoriesRouter);
server.use("/api/brands", brandsRouter);
server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/carts", cartRouter);
server.use("/api/orders", ordersRouter);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("database connected");
}

server.use(express.static(path.join(__dirname, 'build')));
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build' , 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});