// const fetch = require('node-fetch'); 
const client_id = 'ae3a6d42733c48a5a803991fab10cd2e';
const client_secret = '3e61413de531407f98a44ecbde499bd4';

async function getToken() {
  const authOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials'
    })
  };

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = getToken;