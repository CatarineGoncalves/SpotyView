import express from 'express';
import querystring from 'querystring';
import fetch from 'node-fetch';
import getToken from './src/js/Token'
const app = express();
const port = 3000;

const ids = [
  // Seus IDs aqui
];

const getArtistsData = async (token) => {
  const url = `https://api.spotify.com/v1/artists?ids=${ids.join(',')}`;
  const headers = { 'Authorization': `Bearer ${token}` };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.artists;
  } catch (error) {
    console.error('Erro ao obter os dados dos artistas', error);
  }
};

const transformData = (jsonData) => {
  return jsonData.map(element => ({
    "name": element.name,
    "genres": element.genres,
    "followers": element.followers.total
  }));
};

const popRanking = (jsonData, genre) => {
  return jsonData
    .filter(artist => artist.genres.includes(genre))
    .sort((a, b) => b.followers - a.followers)
    .map(artist => ({
      'name': artist.name,
      'followers': artist.followers
    }));
};

const genreRanking = (artistList) => {
  const mapGenres = new Map();

  artistList.forEach(artist => {
    artist.genres.forEach(genre => {
      mapGenres.set(genre, (mapGenres.get(genre) || 0) + 1);
    });
  });

  return Array.from(mapGenres.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([genre]) => genre);
};

const pselPost = async (popRankingData, genreRankingData) => {
  const token = await getToken(); // Adicione await aqui

  const application = {
    "github_url": "https://github.com/CatarineGoncalves/SpotyView",
    "name": "Catarine Gonçalves",
    "pop_ranking": popRankingData,
    "genre_ranking": genreRankingData
  };

  const url = "https://psel-solution-automation-cf-ubqz773kaq-uc.a.run.app?access_token=bC2lWA5c7mt1rSPR";

  try {
    const response = await fetch(url, {  
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      method: 'POST',
      body: JSON.stringify(application)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Resposta do servidor:', result);

  } catch (error) {
    console.error('Erro ao enviar dados:', error);
  }
};

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/src/index.html");
});

let savedData = {}; // Defina a variável savedData

app.post('/teste', (req, res) => {
    savedData = req.body;  
    res.json({ data: savedData });
});

app.get('/teste', (req, res) => {
    res.json({
      message: 'Aqui estão os dados salvos:',
      data: savedData
    });
});

app.get('/logged', (req, res) => {
    res.sendFile(__dirname + "/logged.html"); 
});

app.get('/spotify-auth', (req, res) => {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';
    
    const client_id = 'YOUR_CLIENT_ID'; // Defina o client_id
    const redirect_uri = 'YOUR_REDIRECT_URI'; // Defina o redirect_uri

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
    try {
      const token = await getToken();  
      const artistsData = await getArtistsData(token);
      const transformedData = transformData(artistsData);

      const popRankingData = popRanking(transformedData, 'pop');
      const genreRankingData = genreRanking(transformedData);

      await pselPost(popRankingData, genreRankingData);
    } catch (error) {
      console.error('Erro no fluxo principal:', error);
    }
    console.log(`Servidor rodando na porta ${port}`);
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
