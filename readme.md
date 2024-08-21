# SpotyView

SpotyView é um aplicativo que extrai informações de artistas da API do Spotify e gera rankings com base em gêneros e popularidade. Este projeto foi desenvolvido como parte de um processo seletivo para a Monks.

## Índice

- [Descrição](#descrição)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Execução](#execução)
- [Endpoints](#endpoints)
- [Licença](#licença)

## Descrição

Este projeto consiste em um aplicativo Node.js que utiliza a API do Spotify para extrair informações de uma lista de artistas pré-definidos. Ele gera dois rankings:

1. **Ranking de Popularidade**: Lista de artistas do gênero "pop" ordenados por número de seguidores.
2. **Ranking de Gêneros**: Os cinco gêneros mais comuns entre os artistas analisados.

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
