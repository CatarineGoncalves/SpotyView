const express = require('express');
const querystring = require('querystring');
const app = express();
const port = 3000;

const spotifyAPI = require('./src/js/SpotifyAPI')

commonGenre = spotifyAPI.commonGenre;
followPop = spotifyAPI.followPop;
transformData = spotifyAPI.transformData;
getArtistsData = spotifyAPI.getArtistsData;

const getToken = require('./src/js/Token');


app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/src/css'));
app.use('/js', express.static(__dirname + '/src/js'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/src/index.html");
});


app.post('/', (req, res) => {
    res.send('requisição POST à homepage')
})

app.get('/logged', (req, res) => {
    res.sendFile(__dirname + "/logged.html"); 
});


app.get('/spotify-auth', (req, res) => {
    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email';
    
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id, 
        scope: scope,
        redirect_uri: redirect_uri, 
        state: state
    }));
});


app.listen(port, async () => {
    const token = await getToken();
    const getAllArtist = await getArtistsData(token)
    const dataTransformed = await transformData(getAllArtist);
    const followersPop = await followPop(dataTransformed, 'pop');
    const commomGenre = await commonGenre(dataTransformed)
    console.log(commomGenre)


    // console.log(dataTransformed)

    

});


function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
