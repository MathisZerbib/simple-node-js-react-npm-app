const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

// Nous définissons ici les paramètres du serveur.
var hostname = 'mongodb://matzer:420!Nice@ds131914.mlab.com:31914/get-out'; 
var port = 4444; 
var db;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
MongoClient.connect(hostname, { useNewUrlParser: true } ,(err, client) => {

      if (err) return console.log(err)
      db = client.db('get-out') 
      console.log('Connect is succesfull');
      app.listen(port, function(){
            console.log("Mon serveur fonctionne sur http://" +":"+port); 
      });
    })

//Afin de faciliter le routage (les URL que nous souhaitons prendre en charge dans notre API), nous créons un objet Router.
//C'est à partir de cet objet myRouter, que nous allons implémenter les méthodes. 
var myRouter = express.Router(); 
 
myRouter.route('/dashboard')
// J'implémente les méthodes GET, PUT, UPDATE et DELETE
// GET
.get(function(req,res){ 
 res.json({
 message : "Liste de tout les evenements :",
 ville : req.query.ville,
 nbResultat : req.query.maxresultat, 
 methode : req.method });
 
})
//POST
   app.post('/bar', (req, res) => {
      db.collection('event').save(req.body, (err, result) => {
        if (err) return console.log(err)
    
        console.log('saved to database')
        res.redirect('/')
      })
    })

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

myRouter.route('/dashboard/:piscine_id')
.get(function(req,res){ 
	  res.json({message : "Vous souhaitez accéder aux informations de la piscine n°" + req.params.piscine_id});
})
.put(function(req,res){ 
	  res.json({message : "Vous souhaitez modifier les informations de la piscine n°" + req.params.piscine_id});
})
.delete(function(req,res){ 
	  res.json({message : "Vous souhaitez supprimer la piscine n°" + req.params.piscine_id});
});

 
// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);
 
// Démarrer le serveur 
