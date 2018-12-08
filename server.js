var express = require('express');
var app = express();
const fs = require('fs');
const cowsay = require('cowsay');
var port = process.env.PORT || 8080;

app.put('/create/:name/:email/:state', (req,res)=>{
  let users = require(`${__dirname}/storage.json`)
  let id = 1;
  if(users.length){
    id = (users[users.length-1].id +1)
  }
  let newUser = {
    id: id,
    name: req.params.name,
    email: req.params.email,
    state: req.params.state
  }
  users.push(newUser);
  fs.writeFileSync(`${__dirname}/storage.json`, JSON.stringify(users))
  res.end(`${req.params.name}'s profile created!`)
})

app.get('/', (req,res)=>{
  res.json(require('./storage.json'))
})

app.get('/:id', (req,res)=>{
  let users = require(`${__dirname}/storage.json`);
  res.json(users.filter((user)=>user.id==req.params.id))
})

app.put('/update/:id/:name/:email/:state', (req,res)=>{
  let users = require(`${__dirname}/storage.json`)
  let newUser = {
    id: req.params.id,
    name: req.params.name,
    email: req.params.email,
    state: req.params.state
  }
  updatedUsers = users.map((user)=>{
    if(user.id==req.params.id){
      user = newUser
    }
    return user;
  })
  fs.writeFile(`${__dirname}/storage.json`, JSON.stringify(updatedUsers), (err, response)=>res.end(`Profile ${req.params.id} updated!`))
//  setTimeout( ()=> res.end(`Profile ${req.params.id} updated!`), 1000)
})

app.delete('/:id', (req,res)=>{
  let users = require(`${__dirname}/storage.json`)
  let updatedUsers = users.filter((user)=>user.id != req.params.id)
  fs.writeFileSync(`${__dirname}/storage.json`, JSON.stringify(updatedUsers))
  res.end(`Profile ${req.params.id} deleted!`)
})


app.use((req,res)=>{
  res.sendStatus(404)
})

app.listen(port, ()=>{
  console.log(cowsay.say({
  text : `Server now listening on port ${port}`,
  f: 'turtle'
  }));
})

module.exports = app;
