import express from 'express';
import querystring from 'querystring'
import getToken from './src/js/Token.js';
import { getArtistsData, transformData, popRanking, genreRanking, getKeyFromMap, sendRankings } from './src/js/SpotifyAPI.js';

import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const port = 3000;

// let savedData = {};

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json());
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/src/css'));
app.use('/js', express.static(__dirname + '/src/js'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/src/index.html");
});


//Testado no IMSOMNIA
// app.post('/teste', (req, res) => {
//     savedData = req.body;
//     res.json({ data: savedData });
// });

// app.get('/teste', (req, res) => {
//     res.json({
//         message: 'Aqui estão os dados salvos:',
//         data: savedData
//     });
// });


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

app.get('/spotifyData', async (req, res) => {
    const token = await getToken();
    const getAllArtist = await getArtistsData(token)
    const dataTransformed = await transformData(getAllArtist);
    const popularArtist = await popRanking(dataTransformed, 'pop');
    const commomGenre = await genreRanking(dataTransformed)
    const listKeyFromMap = getKeyFromMap(commomGenre);
    const postMethod = sendRankings(popularArtist, commomGenre)

    await sendRankings(popularArtist, commomGenre)

    
    res.json({
        popRanking: popularArtist,
        genreRanking: commomGenre
    })
})



app.listen(port, async () => {
    console.log(`Servidor na porta: ${port}`);
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


