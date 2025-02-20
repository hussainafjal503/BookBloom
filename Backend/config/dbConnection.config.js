const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnection() {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log(`DB Connected Successfully..  :)`);
      })
      .catch((err) => {
        console.log(`Error occured while connecting to db`);
      });
  } catch (Err) {
    console.log(`Error in dbConnection : ${Err}`);
  }
}

module.exports = dbConnection;
