const express = require('express');
const axios = require('axios');
const cors = require('cors');  // Importando o cors
const app = express();
const port = 3000;

app.use(cors());  // Permite que a API aceite requisições de outros domínios

// Rota: dados do usuário
app.get('/github/:usuario', async (req, res) => {
  const usuario = req.params.usuario;
  try {
    const resposta = await axios.get(`https://api.github.com/users/${usuario}`);
    const dados = resposta.data;

    const usuarioInfo = {
      nome: dados.name,
      login: dados.login,
      avatar: dados.avatar_url,
      bio: dados.bio,
      seguidores: dados.followers,
      seguindo: dados.following,
      localizacao: dados.location,
      public_repos: dados.public_repos,
      url: dados.html_url,
    };

    res.json(usuarioInfo);
  } catch (erro) {
    res.status(404).json({ erro: 'Usuário não encontrado' });
  }
});

// Rota: repositórios do usuário
app.get('/github/:usuario/repos', async (req, res) => {
  const usuario = req.params.usuario;
  try {
    const resposta = await axios.get(`https://api.github.com/users/${usuario}/repos`);
    const repos = resposta.data.map(repo => ({
      nome: repo.name,
      url: repo.html_url,
      descricao: repo.description,
      linguagem: repo.language,
    }));

    res.json(repos);
  } catch (erro) {
    res.status(404).json({ erro: 'Erro ao buscar repositórios' });
  }
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
