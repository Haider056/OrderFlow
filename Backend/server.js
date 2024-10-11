const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
const dotenv = require("dotenv");
const auth = require("./routes/authenticationRoute");
const cors = require('cors');

dotenv.config();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true, 
}));

app.use("/auth", auth);

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
