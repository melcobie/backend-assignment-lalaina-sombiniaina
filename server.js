let express = require('express');
let mongoose = require('mongoose');
let app = express();
let bodyParser = require('body-parser');

let User = require('./model/user');
let crypto = require('crypto');

let assignment = require('./routes/assignments');
let user = require('./routes/users');
let matiere = require('./routes/matiere');

let middleware = require("./middleware/authorize");

mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
//const uri = 'mongodb+srv://sombitiako:TmgNpR3h6CShZHY8@cluster0.7jxzown.mongodb.net/?retryWrites=true&w=majority';
const uri = 'mongodb://127.0.0.1:27017/assignment?retryWrites=true&w=majority';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne");
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Pour les images
app.use(express.static('public'));

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.route(prefix + '/assignments')
  .get(assignment.getAssignments);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);


app.route(prefix + '/assignments')
  .post(middleware.getUserByToken, assignment.postAssignment)
  .put(assignment.updateAssignment);

app.route(prefix+ '/authenticate')
  .post(user.authenticate);

app.route(prefix + '/matiere')
  .get(matiere.getMatieres)

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


