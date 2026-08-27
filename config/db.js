const mongoose = require("mongoose");
// Mongoose
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true)

mongoose
  .connect(MONGODB_URI =
    "mongodb+srv://another_useradm:1289104@anotherdb.ls0wgo8.mongodb.net/test"

  )
  .then(() => {
    console.log("Banco de dados conectado");
  })
  .catch((err) => {
    console.log("Error ao se conectar ao banco de dados " + err);
  });

const uri = process.env.MONGODB_URI;
