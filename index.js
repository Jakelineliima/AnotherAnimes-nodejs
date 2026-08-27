const express = require("express");
const handlebars = require("express-handlebars");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const usuario = require("./routes/usuario");
const salvo = require("./routes/salvo");
const contato = require("./routes/contato")
const app = express();
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

require("./models/Usuario");
require("./models/Salvo");
require("./models/Contato");
require("./config/db");
require("./config/cloudinary");
require("./config/auth")(passport);


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

