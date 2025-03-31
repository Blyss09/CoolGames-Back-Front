const mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.2hwd6.mongodb.net/coolGames") 
    .then(() => console.log('Connected to MonogoDB'))
    .catch((err) => console.log("Failed to connect", err));