const express = require('express');
let app = express();
let helpers = require('../helpers/github.js');
const save = require('../database/index.js');
const retrieve = require('../database/index.js');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

// TODO - your code here!
// This route should take the github username provided
// and get the repo information from the github API, then
// save the repo information in the database
app.post('/repos', function (req, res) {
  console.log(req.body);
  res.send(helpers.getReposByUsername(req.body.user, (err, repos) => {
    if (err) {
      console.error(err);
    } else {
      // console.log('express server repos: ', repos);
      // iterate over collection of repos and pass into save function (db index.js)
      for (var i = 0; i < repos.length; i++) {
        save.save(repos[i], (err, doc) => {
          if (err) console.error(err);
          // console.log('doc received from MongoDB ', doc);
        });
      }
    }
  }));
});

// TODO - your code here!
// This route should send back the top 25 repos
app.get('/repos', function (req, res) {
  retrieve.retrieveTop25Repos((err, top25Repos) => {
    if (err) console.log(err);
    // console.log(top25Repos);
    res.send(top25Repos);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

