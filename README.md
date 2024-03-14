# Aplicativo de Busca de Vídeos do YouTube

Este projeto é uma aplicação React que permite aos usuários buscar vídeos do YouTube, visualizar vídeos populares e explorar canais. Ele utiliza a API de Dados do YouTube para obter informações sobre vídeos e canais.

## Funcionalidades

- **Busca de Vídeos**: Os usuários podem buscar vídeos inserindo um termo de busca na caixa de pesquisa. A aplicação exibe uma lista de vídeos correspondentes à consulta de pesquisa.
- **Vídeos Populares**: A aplicação exibe inicialmente vídeos populares obtidos do ranking de vídeos mais populares do YouTube.
- **Exploração de Canais**: Os usuários podem explorar canais do YouTube clicando nas miniaturas dos canais exibidas nos resultados da pesquisa.
- **Autenticação**: A autenticação é integrada usando a autenticação do Supabase, permitindo que os usuários façam login usando contas do Google ou GitHub.

## Estrutura do Projeto

- **src/components**: Contém componentes React para diferentes partes da aplicação, como a lista de vídeos, item de vídeo, busca do YouTube e componentes de login.
- **src/css**: Inclui arquivos CSS para estilizar a aplicação.
- **src/services**: Contém o arquivo de configuração do Supabase para autenticação.

## Instalação e Uso

1. Clone este repositório para sua máquina local.
2. Navegue até o diretório do projeto.
3. Instale as dependências usando `npm install`.
4. Crie um arquivo `.env` no diretório raiz e adicione sua chave da API do YouTube Data como `REACT_APP_YOUTUBE_API_KEY=sua_chave_api_aqui`.
5. Execute a aplicação usando `npm start`.
6. Acesse a aplicação em seu navegador em `http://localhost:3000`.

## Requisitos

- Node.js
- React
- react-router-dom
- axios
- @supabase/supabase-js
- @supabase/auth-ui-react

## Contribuições

Contribuições para este projeto são bem-vindas! Você pode contribuir abrindo problemas para correções de bugs ou solicitações de novos recursos, ou enviando pull requests com melhorias ou novos recursos.

## Autores

- [Ivo Aragao](https://github.com/Ivo-Aragao)

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

## Agradecimentos

Um agradecimento especial aos criadores da API de Dados do YouTube e do Supabase por fornecerem as ferramentas necessárias para construir esta aplicação.





