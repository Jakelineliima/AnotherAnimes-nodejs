const express = require("express");
const handlebars = require("express-handlebars");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const usuario = require("./routes/usuario");
const salvo = require("./routes/salvo");
const contato = require("./routes/contato")
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
require("./models/Usuario");
require("./models/Salvo");
require("./models/Contato");
require("./config/auth")(passport);
const cloudinary = require('cloudinary').v2;

// ===== Configurações =====

// Session
app.use(
  session({
    secret: "anotheranimes",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Middleware - variaveis globais
app.use((req, res, next) => {
  res.locals.success_mgs = req.flash("success_mgs");
  res.locals.error_mgs = req.flash("error_mgs");
  res.locals.modal_mgs = req.flash("modal_mgs")
  req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handlebars
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    partialsDir: [
      // path to your partials
      path.join(__dirname, "/views/partials/"),
    ],
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");

// Cloudinary
cloudinary.config({ 
  cloud_name: 'animes-capa', 
  api_key: '672797315122388', 
  api_secret: 'Pj8472KytpiG05CCiHsWhe3yjt4' 
});


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



// Public
app.use(express.static(path.join(__dirname, "public")));

// Rotas acessiveis gerais

app.use("/usuario", usuario);
app.use("/salvo", salvo);
app.use("/contato", contato);

// Importação de rotas externas

app.get("/", (req, res) => {
  res.render("index");
});


app.get("/sobre", (req, res) => {
  res.render("sobre");
});

app.get("/404", (req, res) => {
  res.send("Erro 404! tente novamente");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("O seu servidor esta rodando!!! Acesse: http://localhost:8080/ :)");
});

const uri = process.env.MONGODB_URI;
