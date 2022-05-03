const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 9000;

var decisionLogs = [];

app.post('/logs', function(req,res) {
    console.log(req.body);
    decisionLogs.push(req.body);
    res.sendStatus(200) ;
})

app.get('/logs', function(req,res) {
    res.json(decisionLogs) ;
})

app.get('/', function(req,res) {
 return res.send("hello from my app express server!")
})
app.listen(port, () => {
 console.log('Server is up and running on port '+ port);
})
