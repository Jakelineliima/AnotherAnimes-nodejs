const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  nome: {
    type: String
  },
  email: {
    type: String
  },
  senha: {
    type: String
  },

})

module.exports = mongoose.model("Usuario", UsuarioSchema)