# SpotyView

SpotyView é um aplicativo que extrai informações de artistas da API do Spotify e gera rankings com base em gêneros e popularidade. Este projeto foi desenvolvido como parte de um processo seletivo para a Monks.

## Índice

- [Descrição]
- [Tecnologias Utilizadas]
- [Pré-requisitos]
- [Instalação]
- [Configuração do Ambiente]

## Descrição

Este projeto consiste em um aplicativo Node.js que utiliza a API do Spotify para extrair informações de uma lista de artistas pré-definidos. Ele gera dois rankings:

## Funcionalidades

1. `**Ranking de Popularidade**`: Lista de artistas do gênero "pop" ordenados por número de seguidores.
2. `**Ranking de Gêneros**`: Os cinco gêneros mais comuns entre os artistas analisados.

## Tecnologias Utilizadas

- Node.js
- Express
- JavaScript (ES6+)
- Fetch API
- Spotify Web API

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/CatarineGoncalves/SpotyView.git
   cd SpotyView

2. Instale as dependências:

   ```bash
   npm install

3. Configure as credenciais do Spotify:

 - Crie um app na Spotify Developer Dashboard e obtenha o Client ID e Client Secret.
 - Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
      ```bash
         CLIENT_ID=your_spotify_client_id
         CLIENT_SECRET=your_spotify_client_secret
         REDIRECT_URI=your_redirect_uri
      
4. Execute a aplicação:
   ```bash
   node app.js

5. Acesse a aplicação:

   - Abra um navegador e vá até *http://localhost:3000*.      
   - Os dados coletados serão exibidos na página.


