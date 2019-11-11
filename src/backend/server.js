const mongoose = require("mongoose");
const express = require('express');
const cors = require('cors');
const generateApiKey = require('./api-key');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cors());

const serverOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/usersdb", serverOptions,(err)=>{
    console.log(err)
});

const port = 3001;
mongoose.connection.on("connected",function(err,res){
    console.log("Mongo connected:");
    app.listen(port);
});

const userScheme = new mongoose.Schema({
    phone: {type: Number, required:true},
    firstName: {type: String, required:true},
    lastName: {type: String, required:false}
},{ versionKey: false });

const User = mongoose.model("User", userScheme);

// var users = [{name:'Ivan',age:19},{name:'Bilbo',age:15},{name:'Sano',age:22}];

// User.insertMany(users).then((err)=>{
//     console.log(err)
// })

app.get('/',function(req,res){
    res.redirect('/users');
});

app.post('/login/:email',function(req,res){
    const email = req.params.email;

    const api_key = generateApiKey(16); // GENERATING API KEY
    const domain = 'http://localhost:3001/';
    const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

    const code = generateApiKey(6); // GENERATING CODE FOR VERIFYING USER EMAIL
    const data = {
        from: 'stonebo0sh56@gmail.com',
        to: email,
        subject: 'Verify your email',
        body: "Back to NextYou. Input this code "+ code + " in the field "
    };

    mailgun.messages().send(data, function (error, body) {
        if (error) {
            reject([{ messages: [{ id: 'Auth.form.error.email.invalid' }] }]);
        } else {
            resolve();
        }
        console.log("Body: "+body);
        if(error) console.log("Error: "+error)
    });
    res.status(200).send("All is good");
});
