const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const user = require('./user.json');


router.get('/home', (req,res) => {
  res.sendFile(__dirname + '/home.html');
});


router.get('/profile', (req,res) => {
  res.write(JSON.stringify(user));
  res.end()
});

router.get('/login', (req,res) => {
    fs.readFile(__dirname + "/user.json", 'utf-8', (error, data) => {
        let jsObj = JSON.parse(data) //JSON to JS Object
        if(req.query.username == jsObj.username && req.query.password == jsObj.password)
        {
            res.write(JSON.stringify({status: true, message: "User Is valid"}))
        }
        if(req.query.username != jsObj.username)
        {
            res.write(JSON.stringify({status: false, message: "User Name is invalid"}))
        }
        if(req.query.password != jsObj.password)
        {
            res.write(JSON.stringify({status: false, message: "Password is invalid"}))
        }
        res.end()
    })
});


router.get('/logout/:username', (req,res) => {
    const username = req.params.username;
    res.send(`<b>${username} successfully logout.`);

});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));