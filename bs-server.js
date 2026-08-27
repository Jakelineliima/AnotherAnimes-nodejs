const browserSync = require('browser-sync').create();
const nodemon = require('nodemon');

nodemon({
  script: 'index.js',
  ext: 'js handlebars css',
  ignore: ['bs-server.js'],
});

nodemon.on('start', function () {
  setTimeout(() => {
    if (!browserSync.active) {
      browserSync.init({
        proxy: 'http://localhost:8080',
        files: ['public/**/*.*', 'views/**/*.handlebars'],
        port: 3000,
        open: true,
        notify: false,
      });
    }
  }, 300);
});

nodemon.on('restart', function () {
  setTimeout(() => {
    browserSync.reload();
  }, 300);
});


//  Reinicia o servidor quando houver alterações nos arquivos .js, .handlebars ou .css, e atualiza o navegador automaticamente.