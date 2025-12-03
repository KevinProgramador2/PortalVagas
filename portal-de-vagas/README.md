# Portal de Vagas Freelance

Um portal web desenvolvido com foco em oportunidades de trabalho freelance. O projeto foi construído utilizando React + Vite e conta com uma API fake provida pelo `json-server` para simulação de dados.

## 🌟 Funcionalidades

* Cadastro e listagem de vagas freelance
* Formulário de envio de currículo
* Filtro de busca por vagas
* Interface responsiva com componentes reutilizáveis (Header, Footer, JobCard, etc)
* Modal de confirmação de envio de dados

## 📈 Tecnologias utilizadas

* [React](https://react.dev/) + [JSX](https://reactjs.org/docs/introducing-jsx.html)
* [Vite](https://vitejs.dev/) para bundling e desenvolvimento rápido
* [React Router DOM](https://reactrouter.com/) para navegação entre páginas
* [Axios](https://axios-http.com/) para requisições HTTP
* [Lucide React](https://lucide.dev/) para ícones
* [PropTypes](https://www.npmjs.com/package/prop-types) para tipagem de props
* [JSON Server](https://github.com/typicode/json-server) para API fake
* [ESLint](https://eslint.org/) para linting do código

## ⚙️ Como rodar o projeto localmente

### 1. Clone o repositório:

```bash
git clone https://github.com/KevinProgramador2/PortalVagas
cd portal-de-vagas
```

### 2. Instale as dependências:

```bash
npm install
```

### 3. Inicie o servidor fake (JSON Server):

```bash
npm run server
```

O servidor estará disponível em `http://localhost:3001`

### 4. Inicie a aplicação React:

```bash
npm run dev
```

A aplicação estará acessível em `http://localhost:5173`

## 🚀 Deploy

Para realizar o deploy no GitHub Pages:

```bash
npm run deploy
```

A página estará publicada em:
[https://JuandaSilvaa.github.io/portal-de-vagas](https://JuandaSilvaa.github.io/portal-de-vagas)

## 📚 Estrutura de pastas

```
src/
├── components/      # Componentes reutilizáveis
├── contexts/        # Contextos de estado global (React Context)
├── img/             # Imagens usadas no projeto
├── pages/           # Páginas principais
├── routes/          # Configuração de rotas
├── services/        # Serviços de acesso à API
├── styles/          # Estilos globais e CSS modules
├── App.jsx          # Componente raiz
├── main.jsx         # Ponto de entrada da aplicação
```

## 📄 Licença

Este projeto é apenas para fins educacionais.

---

## 🧑‍💻 Autores

 [@KevinProgramador2](https://github.com/KevinProgramador2)
- [@JuandaSilvaa](https://github.com/JuandaSilvaa)
- [@victorjoya](https://github.com/victorjoya)
