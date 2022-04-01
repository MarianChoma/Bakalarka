const express = require('express');
global.window = {
    screen: {
        devicePixelRatio: 1
    }
};
global.document = {
    documentElement: {
        style: {}
    },
    getElementsByTagName: function() { return []; },
    createElement: function() { return {}; }
};
global.navigator = {
    userAgent: 'nodejs',
    platform: 'nodejs'
};
global.L = require('leaflet');

const app = express();
const {User} = require('./db/models/user.model');
const SomeModel = require("./db/models/teams.model");
const jwt = require('jsonwebtoken');
const {mongoose} = require('./db/mongoose');
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//CORS header middleware
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
//app.use('/users', userRouter);


/*Middleware*/

let authenticate = (req, res, next) => {
    let token = req.header('x-access-token');

    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            //jwt is invalid DO NOT AUTHENTICATE
            res.status(401).send(err);
        } else {
            req.user_id = decoded._id;
            next();
        }
    });
}


let verifySession = (req, res, next) => {
    let refreshToken = req.header('x-refresh-token');

    let _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            return Promise.reject({
                'error': 'User not found. Make sure that refresh token and user id are correct'
            });
        }

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;
        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                if (User.hasRefreshTokenExpired(session.expiresAt === false)) {
                    //refresh token has not expired
                    isSessionValid = true;
                }
            }
        })
        if (isSessionValid) {
            // call next to continue with webrequest
            next();
        } else {
            return Promise.reject({
                'error': 'RefreshToken has expired or session is invalid'
            }).catch((e) => {
                res.status(401).send(e);
            });
        }
    });
}

/*End Middleware*/

/**
 * Post /users
 * sing up
 */

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
            return {accessToken, refreshToken}
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


/**
 * POST /users/login
 * Purpose: Login
 */
app.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user

            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return {accessToken, refreshToken}
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

/**
 * Get user/me/access-token
 * generate and return accesToken
 */
app.get('/users/me/access-token', verifySession, (req, res) => {
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({accessToken});
    }).catch((e) => {
        res.status(400).send(e);
    })
})
/**
 * Get /users/all
 * Purpose: get all users
 */
app.get('/users/all', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    })
})

/**
 * Post email by user ID
 */
app.post('/users/email', (req, res) => {
    User.findById(
        req.body.id
    ).then((user) => {
        const email = user.email;
        res.send({"email": email});
    }).catch((e) => {
        res.send(e);
    })
})


/**
 * Get all teams in database
 */
app.get('/teams', (req, res) => {

    SomeModel.find({}).then((teams) => {
        res.send(teams);
    })
})


/**
 * Login team to cup
 */
app.patch('/teams', (req, res) => {
    SomeModel.findOne({
        nazov: req.body.nazov,
        liga: req.body.liga
    }).then((team) => {
        if (team) {
            return true;
        } else {
            return false;
        }
    }).then((canUpdate) => {
        if (canUpdate) {
            SomeModel.findOneAndUpdate({
                    nazov: req.body.nazov
                }, {
                    $set: {
                        prihlasenie: true
                    }
                }
            ).then(
                res.sendStatus(201)/*send({message: 'Updated'})*/
            )
        } else {
            res.sendStatus(404);
        }
    })
})
/**
 *Get all teans in cup
 */
app.get('/teams/cup', (req, res) => {
    SomeModel.find({
        prihlasenie: true
    }).then((teams) => {
        res.send({
            team: teams
        });
    })
})

app.get('/teams/draw',(req,res)=>{
    SomeModel.find({
        prihlasenie: true
    }).then(teams=>{
        let powerOfTwo = 2;
        let i = 1;
        let teamsInCup=[];
        let waitingTeams=[];

        const count=teams.length


        // const duplicates=teams.filter((t1, index, array)=>{
        //     return array.some(t2=> {
        //         if(t1!==t2){
        //             return  t2.liga===t1.liga
        //         }
        //     })
        // })


        //console.log(duplicates)
        teams.sort((t1,t2)=>{return compareTeamLeague(t1,t2)})

        while (count >= powerOfTwo) {
            i++;
            powerOfTwo = Math.pow(2, i);
        }

        const half=powerOfTwo-count
        for(let i=count-1; i>half-1;i--){
            let sameLeague=teams.filter(t=>{
                return teams[i].liga===t.liga;
            })
            let team=sameLeague[Math.floor(Math.random()*sameLeague.length)];
            teamsInCup.push(team);
            teams.splice(teams.indexOf(team, half-1),1);
        }
        //console.log(teamsDistance(teamsInCup[1], teamsInCup[0]))

        res.send({
            count: count,
            teamsInCup: teamsInCup,
            waitingTeams: teams,
        })
    })
})


app.get('/home', authenticate, (req, res) => {
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});


function compareTeamLeague(team1,team2){
    let ligue1, ligue2;
    switch (team1.liga){
        case "3. liga":
            ligue1=5;
        break;
        case "4. liga":
            ligue1=4;
            break;
        case "5. liga":
            ligue1= 3;
            break;
        case "1. trieda":
            ligue1=2;
            break;
        case "2. trieda":
            ligue1=1;
            break;
    }
    switch (team2.liga){
        case "3. liga":
            ligue2=5;
            break;
        case "4. liga":
            ligue2=4;
            break;
        case "5. liga":
            ligue2= 3;
            break;
        case "1. trieda":
            ligue2=2;
            break;
        case "2. trieda":
            ligue2=1;
            break;
    }
    return ligue2-ligue1;
}

function teamsDistance(team1,team2)
{
    const from= new L.LatLng(team1.latitude,team1.longitude)
    const to= new L.LatLng(team2.latitude,team2.longitude)

    return getDistance(from, to);
}

function getDistance(from, to)
{
    return (from.distanceTo(to)).toFixed(0);
}


