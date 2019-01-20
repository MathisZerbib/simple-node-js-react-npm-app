const express = require('express')
const bodyParser= require('body-parser')
const app = express()
// Nous définissons ici les paramètres du serveur.
var hostname = 'localhost'; 
var port = 4444; 
 
// Nous créons un objet de type Express. 
var app = express(); 
 

var bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
//Afin de faciliter le routage (les URL que nous souhaitons prendre en charge dans notre API), nous créons un objet Router.
//C'est à partir de cet objet myRouter, que nous allons implémenter les méthodes. 
var myRouter = express.Router(); 
 
// Je vous rappelle notre route (/piscines).  
myRouter.route('/piscines')
// J'implémente les méthodes GET, PUT, UPDATE et DELETE
// GET
.get(function(req,res){ 
	  res.json({message : "Liste toutes les piscines de Lille Métropole", methode : req.method});
})
//POST
.post(function(req,res){
    res.json({message : "Ajoute une nouvelle piscine à la liste", 
    nom : req.body.nom, 
    ville : req.body.ville, 
    taille : req.body.taille,
    methode : req.method});
   })// ... code
//PUT
.put(function(req,res){ 
      res.json({message : "Mise à jour des informations d'une piscine dans la liste", methode : req.method});
})
//DELETE
.delete(function(req,res){ 
res.json({message : "Suppression d'une piscine dans la liste", methode : req.method});  
}); 
 
myRouter.route('/')
// all permet de prendre en charge toutes les méthodes. 
.all(function(req,res){ 
      res.json({message : "Bienvenue sur notre Frugal API ", methode : req.method});
});

myRouter.route('/piscines/:piscine_id')
.get(function(req,res){ 
	  res.json({message : "Vous souhaitez accéder aux informations de la piscine n°" + req.params.piscine_id});
})
.put(function(req,res){ 
	  res.json({message : "Vous souhaitez modifier les informations de la piscine n°" + req.params.piscine_id});
})
.delete(function(req,res){ 
	  res.json({message : "Vous souhaitez supprimer la piscine n°" + req.params.piscine_id});
});

myRouter.route('/piscines')
// J'implémente les méthodes GET, PUT, UPDATE et DELETE
// GET
.get(function(req,res){ 
 res.json({
 message : "Liste les piscines de Lille Métropole avec paramètres :",
 ville : req.query.ville,
 nbResultat : req.query.maxresultat, 
 methode : req.method });
 
})//... Suite du code
 
// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);  000
 
// Démarrer le serveur 
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port); 
});