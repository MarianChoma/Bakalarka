const express=require('express');
const app= express();
const {mongoose} = require('./db/mongoose');
const jwt = require("jsonwebtoken");
const {User} = require("./db/models/user.model");

const bodyParser = require("body-parser");

app.use(bodyParser.json());

/*Middleware*/

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});


let authenticate=(req,res,next)=>{
    let token= req.header('x-access-token');

    jwt.verify(token, User.getJWTSecret(), (err, decoded)=>{
        if(err){
            //jwt is invalid DO NOT AUTHENTICATE
            res.status(401).send(err);
        }
        else{
            req.user_id= decoded._id;
            next();
        }
    });
}

app.post('/users', (req, res) => {
    // User sign up

    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        // Session created successfully - refreshToken returned.
        // now we geneate an access auth token for the user

        return newUser.generateAccessAuthToken().then((accessToken) => {
            // access auth token generated successfully, now we return an object containing the auth tokens
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
})


app.post('/users/login', (req, res) => {
    let email = req.body.club;
    let password = req.body.password;


    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user

            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})

app.get('/users/all',(req,res)=>{
    User.find({}).then((users) => {
        res.send(users);
    }).catch((e) => {
        res.send(e);
    });
})


app.listen(3000, () =>{
    console.log('Server is listening on port 3000');
});