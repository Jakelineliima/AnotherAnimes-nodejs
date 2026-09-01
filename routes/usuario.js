const express = require("express");
const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("Usuario");
const bcrypt = require("bcryptjs");
const passport = require("passport");
require("../config/auth")(passport);
const router = express.Router();


// Rotas

router.get("/registro", (req, res) => {
  res.render("usuario/registro");
});

router.post("/registro", (req, res) => {
  // Validação
  var erros = [];

  if (
    !req.body.nome ||
    typeof req.body.nome == undefined ||
    req.body.nome == null
  ) {
    erros.push({ texto: "Nome inválido" });
    console.log(erros);
  }

  if (
    !req.body.email ||
    typeof req.body.email == undefined ||
    req.body.email == null
  ) {
    erros.push({ texto: "Email inválido" });
  }

  if (
    !req.body.senha ||
    typeof req.body.senha == undefined ||
    req.body.senha == null
  ) {
    erros.push({ texto: "Senha inválida" });
  }

  if (!req.body.senha.length > 4) {
    erros.push({ texto: "Senha muito curta 😫" });
  }

  // Validação se senhar for diferente nos dois campos (!=)
  if (req.body.senha != req.body.senha2) {
    erros.push({ texto: "As senhas são diferentes" });
  }

  if (erros.length < 0) {
    res.render("/", { erros: erros });
  } else {
    Usuario.findOne({ email: req.body.email })
      .then((usuario) => {
        if (usuario) {
          req.flash("error_mgs", "Este email já está cadastrado");
          res.redirect("/usuario/registro");
        } else {
          const novoUsuario = new Usuario({
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
          });

          // Hash de senha
          bcrypt.genSalt(10, (erro, salt) => {
            bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
              if (erro) {
                req.flash("error_mgs", "Ocorreu um erro ao salvar a senha");
                res.redirect("/registro");
              }
              novoUsuario.senha = hash;
              novoUsuario
                .save()
                .then(() => {
                  req.flash("success_mgs", "Usuario criado com sucesso !");
                  res.redirect("/usuario/login");
                })
                .catch((err) => {
                  req.flash(
                    "error_mgs",
                    "Não foi possivel salvar o usuário, tente novamente! "
                  );
                  res.redirect("/usuario/registro");
                });
            });
          });
        }
      })
      .catch((err) => {
        req.flash("error_mgs", "Houve um erro interno 😥");
        res.redirect("/");
      });
  }
});

router.get("/login", (req, res) => {
 res.render("usuario/login");
});

router.post("/login", (req, res, next) => {
  req.session.user = req.usuario;
  passport.authenticate("local", {
    successRedirect: "/salvo/salvos",
    failureRedirect: "/usuario/login",
  })(req, res, next);
});


router.get("/logout", (req, res, next) => {
  req.logout((err)=>{
    if(err){
      return next(err);
    }
  req.flash("success_mgs", "Você saiu");
    res.redirect("/");
  });
});



module.exports = router;
