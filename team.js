const express = require('express'),
bodyParser = require('body-parser');
const team = express.Router()

var uuid = require('uuid-v4');  // crea un ID univoco;

const teamArray = [
  {
    "id": "1",
    "name": "Italia",
    "is_still_in": false,
    "matches": [{"opponent":"Croazia","outcome":"L"}, {"opponent":"Brasile","outcome":"D"}, {"opponent":"Argentina","outcome":"L"}]
},
{
  "id": "2",
  "name": "Croazia",
  "is_still_in": true,
  "matches": [{"opponent":"Italia","outcome":"W"}, {"opponent":"Brasile","outcome":"W"}, {"opponent":"Argentina","outcome":"W"}]
},
{
  "id": "3",
  "name": "Brasile",
  "is_still_in": true,
  "matches": [{"opponent":"Italia","outcome":"D"}, {"opponent":"Croazia","outcome":"L"}, {"opponent":"Argentina","outcome":"W"}]
},
{
  "id": "4",
  "name": "Argentina",
  "is_still_in": false,
  "matches": [{"opponent":"Italia","outcome":"W"}, {"opponent":"Brasile","outcome":"L"}, {"opponent":"Croazia","outcome":"L"}]
}]

team.get ('/', start);

function start (req, res){
    res.send = {
        msg: 'WELCOME TO THE MONDIAL TEAM DATABASE!'}
}


team.route('/team')
  //simpleget return all teams
  .get((req, res) => {
    var name = ''
    if (req.query.name) {
      name = req.query.name
      var checkName = function (team){
        return team.name == name
      }
      var array = teamName.filter(name)
      res.json(array)
    }
    else {
      res.status(200)
      res.json(teamArray)
    }
  })

//post an object
  .post((req, res) => {
    var team = {}
    team.id = uuid()
    if (req.body.name) team.name = req.body.name
    if (req.body.is_still_in) {
      team.is_still_in = true
    } else {
      team.is_still_in = false
    }
    teamArray.push (team)
    res.status(200)
    res.json(team)
  });

// Return a Team data by ID:
team.route('/team/:id')
  .get((req, res) => {
    var id = req.params.id
    const i = teamArray.findIndex(team => {return team.id == id})
    if (i==-1) res.sendStatus(404)  // Errore, team non trovato
    else {
      res.status(200)
      res.json(teamArray[i])
    }
  })

// Return a team by NAME:
team.route('/search/:name')
  .get((req, res) => {
    var name = req.params.name
    const i = teamArray.findIndex(team => {return team.name == name})
    if (i==-1) res.sendStatus(404)  
    else {
      res.status(200)
      res.json(teamArray[i])
    }
  })

  .put((req, res) => {
    var id = req.params.id
    const i = teamArray.findIndex(team => {return team.id == id})
    if (i==-1) res.sendStatus(404)
    else {
      if (req.body.name) teamArray[i].name = req.body.name
      if (req.body.is_still_in) {
        teamArray[i].is_still_in = true
      } else {
        teamArray[i].is_still_in = false
      }
      res.status(200)
      res.json(teamArray[i])
    }
  })


module.exports = team
