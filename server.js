const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db;

const url = "mongodb+srv://dishon:resilient@cluster0-gsvbd.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "todoList";

app.listen(7000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  //console.log(db)
  db.collection('todos').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {todos: result, unfinished: result.length})
  })
})

app.post('/todos', (req, res) => {
  db.collection('todos').save({name: req.body.name , isComplete: false}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/todos', (req, res) => {
  console.log(req.body.name)
  db.collection('todos')
  .findOneAndUpdate({name: req.body.name}, {
    $set: {
    isComplete: req.body.name
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/todos', (req, res) => {
  console.log(req.body.name)
  db.collection('todos').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
