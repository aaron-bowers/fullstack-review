const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Connection Successful!');
});

let repoSchema = mongoose.Schema({
  'node_id': String,
  'owner': String,
  'name': String,
  'html_url': String,
  'forks_count': Number
});

let Repo = mongoose.model('Repo', repoSchema);

// TODO: Your code here
// This function should save a repo or repos to
// the MongoDB
let save = async function (repoData, callback) {
  // console.log('database node_id: ', repoData['node_id']);
  // console.log('database owner: ', repoData['owner']['login']);
  // console.log('database name: ', repoData['name']);
  // console.log('database html_url: ', repoData['html_url']);
  // console.log('database forks_count: ', repoData['forks_count']);
  let nodeIdExists = await Repo.exists({'node_id': repoData['node_id']});
  if (nodeIdExists) console.log(`node_id ${repoData['node_id']} already exists`);
  if (!nodeIdExists) {
    const repoInstance = new Repo({
      'node_id': repoData['node_id'],
      'owner': repoData['owner']['login'],
      'name': repoData['name'],
      'html_url': repoData['html_url'],
      'forks_count': repoData['forks_count']
    });
    repoInstance.save((err, doc) => {
      if (err) console.error(err);
      // console.log('success adding data to docs');
      callback(null, doc);
    })
  }
}

let retrieveTop25Repos = async function (callback) {
  let top25Repos = await Repo.find({}).sort({'forks_count': -1}).limit(25);
  callback(null, top25Repos);
}

module.exports.save = save;
module.exports.retrieveTop25Repos = retrieveTop25Repos;