const localStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("../models/Usuario");
const Usuario = mongoose.model("Usuario");

module.exports = function (passport) {
  // ----- Login local -----
  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "senha" },
      (email, senha, done) => {
        Usuario.findOne({ email: email }).then((usuario) => {
          if (!usuario) {
            return done(null, false, {
              message: "Está conta não existe!",
            });
          }
          bcrypt.compare(senha, usuario.senha, (erro, batem) => {
            if (batem) {
              return done(null, usuario);
            } else {
              return done(null, false, {
                message: "Senha incorreta!",
              });
            }
          });
        });
      }
    )
  );

  // ----- Login com Google -----
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let usuario = await Usuario.findOne({ googleId: profile.id });

          if (usuario) {
            return done(null, usuario);
          }

          // Se já existe conta com esse email (cadastro via senha), vincula o googleId
          usuario = await Usuario.findOne({ email: profile.emails[0].value });

          if (usuario) {
            usuario.googleId = profile.id;
            usuario.avatar = usuario.avatar || profile.photos[0].value;
            await usuario.save();
            return done(null, usuario);
          }

          // // Senão, cria um novo usuário
          // usuario = await Usuario.create({
          //   googleId: profile.id,
          //   nome: profile.displayName,
          //   email: profile.emails[0].value,
          //   avatar: profile.photos[0].value,
          // });

          return done(null, false,  {
            message: "Não existe conta cadastrada com este email. Registre-se primeiro.",
            
          });
        } catch (erro) {
          return done(erro, null);
        
        }
      }
    )
  );

  // ----- Serialização -----
  passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
  });

  passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, usuario) => {
      done(err, usuario);
    });
  });
};