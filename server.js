const express= require("express");
const mongoose= require("mongoose");
const User = require("./models/User")
const app= express();

//ENV
require('dotenv').config({ path: 'config/.env' })
const port= process.env.PORT;
const dbLink = process.env.DB



mongoose.connect(dbLink,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use(express.urlencoded({ extended: false }));

const route= app.route('/');

route.get((req,res)=>{
    User.find()
    .then(users =>   res.send({users : users}))
    .catch(error => res.status(400).json({ error }));
  }
)

route.post((req,res)=>{
 const user = new User (req.body)
 user.save()
 .then(() => res.send("ok"))
 .catch(error => res.send(error));
  
})

route.put((req,res)=>{
    User.replaceOne({ _id : req.body.id }, { name: req.body.name , age : req.body.age , job : req.body.job })
    .then(() => res.send("ok"))
    .catch(error => res.send(error));
})

route.delete((req,res)=>{
   User.deleteOne({ _id: req.body.id })
   .then(() => res.send("ok"))
   .catch(error => res.send(error));
})

app.listen(port);

