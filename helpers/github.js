const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (user, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios.get(options.url, options.headers)
    .then((response) => {
      // console.log(`GitHub repos for "${user}"`, response.data);
      callback(null, response.data);
    })
    .catch((error) => {
      console.log('axios error ', error);
      callback(error);
    })

}

module.exports.getReposByUsername = getReposByUsername;