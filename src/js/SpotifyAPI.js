import fetch from 'node-fetch';

const ids = [
  "6eUKZXaKkcviH0Ku9w2n3V", "1dfeR4HaWDbWqFHLkxsg1d", "66CXWjxzNUsdJxJ2JdwvnR",
  "04gDigrS5kc9YWfZHwBETP", "53XhwfbYqKCa1cC15pYq2q", "7dGJo4pcD2V6oG8kP0tJRR",
  "1HY2Jd0NmPuamShAr6KMms", "4gzpq5DPGxSnKTe4SA8HAU", "6vWDO969PvNqNYHIOW5v0m",
  "0du5cEVh5yTK9QJze8zA0C", "5pKCCKE2ajJHZ9KAiaK11H", "0EmeFodog0BfCgMzAIvKQp",
  "1uNFoZAHBGtllmzznpCI3s", "6S2OmqARrzebs0tKUEyXyp", "06HL4z0CvFAxyc27GXpf02"
];

export async function getArtistsData(token) {
  const url = `https://api.spotify.com/v1/artists?ids=${ids.join(',')}`;
  const headers = { 'Authorization': `Bearer ${token}` };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error('Falhou a requisição');
    }
    if (response.status === 404) {
      throw new Error('Não encontrou qualquer resultado');
    }
    const data = await response.json();
    return data.artists;
  } catch (error) {
    console.error('Erro ao obter os dados dos artistas:', error);
    throw error;
  }
}

export function transformData(jsonData) {
  const result = jsonData.map(element => {
    return {
      "name": element.name,
      "genres": element.genres,
      "followers": element.followers["total"]
    }
  })

  return result;
}

export function popRanking(jsonData, genre) {

  const result = jsonData.filter(artist =>
    artist.genres.includes(genre)).sort((list, list2) => {
      if (list.followers > list2.followers) {
        return -1;
      } else if (list.followers < list2.followers) {
        return 1;
      }
      return 0;
    })

  const listFollowers = [];

  for (let i = 0; i < result.length; i++) {
    listFollowers.push(
      {
        'name': result[i]['name'],

        'followers': result[i]['followers']
      })
  }

  return listFollowers;
}

export function genreRanking(artistList) {
  const mapGenres = new Map();
  let mapOrdenad;
  // const result = jsonData

  for (const artist of artistList) {
    const genres = artist.genres;

    for (const genre of genres) {

      // já tem o genero na no mapa?
      if (mapGenres.has(genre)) {
        // Se já existe, incrementa o contador
        mapGenres.set(genre, mapGenres.get(genre) + 1);
      } else {
        // Se não existe, inicializa o contador com 1
        mapGenres.set(genre, 1);
      }

    }

  }

  // Ordena o mapa pelos valores (quantidade de vezes que o gênero apareceu)
  mapOrdenad = Array.from(new Map([...mapGenres.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)).keys());

  return mapOrdenad;
}

export function getKeyFromMap(...ranking) {
  return ranking.join(",").split(",");
}

export async function sendRankings(popRanking, genreRanking) {
  const payload = {
    github_url: "https://github.com/CatarineGoncalves/SpotyView",
    name: "Catarine Gonçalves",
    pop_ranking: popRanking,
    genre_ranking: genreRanking
  };

  const url = "https://psel-solution-automation-cf-ubqz773kaq-uc.a.run.app?access_token=bC2lWA5c7mt1rSPR";

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log('Resposta do servidor:', result);

  } catch (error) {
    console.error('Resposta do erro:', error);
  }

}

