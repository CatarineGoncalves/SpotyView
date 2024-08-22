
document.addEventListener('DOMContentLoaded', () => {
    fetch('/spotifyData')
        .then(response => {
            return response.json()
        })
        .then(data => {
            const popRanking = document.getElementById('popRanking')            
            const genreRanking = document.getElementById('genreRanking')

            console.log(popRanking)
            console.log(genreRanking)
            console.log('foi')
            data.popRanking.forEach(artist => {
                const listItem = document.createElement('li');
                listItem.textContent = `${artist.name} - Seguidores: ${artist.followers}`;
                popRanking.appendChild(listItem);
            
                console.log(listItem)
            
            });


            data.genreRanking.forEach(element => {
                const listItem = document.createElement('li');
                listItem.textContent = element;
                genreRanking.appendChild(listItem)

                console.log(listItem)
            })
        }
    )
})