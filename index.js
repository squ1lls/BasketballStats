const express = require("express");
const firebase = require("firebase");
const app = express();
const path = require("path");
let ames = {};
const options = {root: path.join(__dirname)}

var firebaseConfig = {
  apiKey: "AIzaSyBIBUc5TL3Fo7FOlWWys8T9GEUiUj_f_u4",
  authDomain: "bball-be693.firebaseapp.com",
  projectId: "bball-be693",
  storageBucket: "bball-be693.appspot.com",
  messagingSenderId: "515154792770",
  appId: "1:515154792770:web:a550c5b726dab8b28ff8db",
  measurementId: "G-VGVBSJZ53M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let initialDBRef = firebase.database().ref("games");
initialDBRef.on("value", (data) => {
    games = data.val();
    let counter = 0;
    //shut up. it works. shut up.
    for(k in games){ 
        games[k].players.id = k;
        ames[games[k].key] = games[k].players;
    counter++;
    }

})

app.get("/stylesheet.css", (req, res) => {res.sendFile("stylesheet.css", options, (err)=>{})})
app.get("/web.js", (req, res) =>{
    res.sendFile("web.js", options, (err)=>{console.log(err)})
})
app.get("/update.html", (req, res) =>{
    res.sendFile("update.html", options, (err)=>{console.log(err)})
})
app.get("/update.js", (req, res) =>{
    res.sendFile("update.js", options, (err)=>{console.log(err)})
})

app.get("/updateValue.json", (req, res) => {

    //wow i am not going to spend the time to learn how to do this without if statements
    var updates ={}
 
    let reference = null;
    for(k in ames){
        if(k==req.query.uuid){
        console.log(ames[k].id + "      " + k);

        reference = ames[k].id;}
    }

if(req.query.type=="ath"){

    if(reference == null){res.json({error: "YOU A FAILURE BRO"})}else{
    updates['games/' +reference + '/players/' + req.query.player + '/attemptedThrees'] = parseInt(req.query.value);
    }
}else if(req.query.type=="atw"){
    if(reference == null){res.json({error: "YOU A FAILURE BRO"})}else{
        updates['games/' +reference + '/players/' + req.query.player + '/attemptedTwos'] = parseInt(req.query.value);
        }
}
else if(req.query.type=="mth"){
    if(reference == null){res.json({error: "YOU A FAILURE BRO"})}else{
        updates['games/' +reference + '/players/' + req.query.player + '/madeThrees'] = parseInt(req.query.value);
        }
    }
else if(req.query.type=="mtw"){
    if(reference == null){res.json({error: "YOU A FAILURE BRO"})}else{
        updates['games/' +reference + '/players/' + req.query.player + '/madeTwos'] = parseInt(req.query.value);
        }}
else if(req.query.type=="reb"){
    if(reference == null){res.json({error: "YOU A FAILURE BRO"})}else{
        console.log(reference);
        console.log("hi")
        console.log(req.query.player)
        console.log(req.query.value)
        updates['games/' +reference + '/players/' + req.query.player + '/rebounds'] = parseInt(req.query.value);
        }
}
else if(req.query.type=="sho"){
    if(reference == null){res.json({error: "YOU A FAILURE BRO"})}else{
        updates['games/' +reference + '/players/' + req.query.player + '/shots'] = parseInt(req.query.value);
        }}
else if(req.query.type=="ste"){
    if(reference == null){res.json({error: "YOU A FAILURE BRO"})}else{
        updates['games/' +reference + '/players/' + req.query.player + '/steals'] = parseInt(req.query.value);
        }}

firebase.database().ref().update(updates);
res.json(reference);

})
app.get("/", (req, res) =>{
    res.sendFile(__dirname + '/index.html');
})
app.get("/getValues.html", (req, res) => {
    res.sendFile(__dirname + "/getValues.html")
})
app.get("/getValues.js", (req, res) => {
    res.sendFile(__dirname + "/getValues.js")
})
app.get("/alertify.js", (req, res) => {
    res.sendFile(__dirname + "/alertify.js")
})
app.get("/getGameInfo.json", (req, res) => {
    if(req.query.uuid==undefined){res.json({error: "noInfo"})}else{
        //todo - like binary search and that stuff
        let done = false;
        for(k in ames){
            if(req.query.uuid==k){
                res.json({players: ames[k]})
                done=true;
                break;
            }

        }
        if(!done)        
        res.json({error: "uuid is wrong"})
        

    }
})
app.get("/createGame.json", (req, res) =>{
    if(req.query.names==undefined){res.json({error: "noInfo"})}else{
    let nms = req.query.names;
    
    let gameParameters = [];


    while(nms.indexOf(",")!=-1){
    
    gameParameters[gameParameters.length] = nms.substring(0, nms.indexOf(","));
    nms = nms.substring(nms.indexOf(",")+1);

    
}
    gameParameters[gameParameters.length] = nms;
    let newGame = new Game(gameParameters);
  
    // todo update games whenever the createGame is run
   
    res.json({success: newGame});
    }

})


class Game{ 
    constructor(users){
        this.players = {};
        //to do: better uuid system
        this.key =  uuidv4();
     
        for(var i = 0; i < users.length; i++){
            this.players[users[i]] = {shots: 0, rebounds: 0, attemptedThrees: 0, madeThrees: 0, attemptedTwos: 0, madeTwos: 0, steals: 0};
        }
        
        firebase.database().ref("games").push(this); 
    }
}
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
app.listen(process.env.PORT || 3000);

