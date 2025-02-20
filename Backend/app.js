const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const dbConnection = require("./config/dbConnection.config");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");
const favouritesBook = require("./routes/fovourites.routes");
const cartBook = require("./routes/cart.routes");
const orderBook = require("./routes/order.routes");

// app.use(cors(

// ))
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies if needed
  })
);

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//creating port
const PORT = process.env.PORT || 4000;

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/favourites", favouritesBook);
app.use("/api/v1/cart/", cartBook);
app.use("/api/v1/order", orderBook);

app.get("/", (req, res) => {
  res.send("hello from backend side");
});

app.listen(PORT, () => {
  console.log(`Server is Running on PORT : ${PORT}`);
});

dbConnection();
