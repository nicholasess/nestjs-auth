# nestjs-auth
Repositório para ajudar FrontEnds que querem consolidar conhecimento de Autenticação e Autorização

Disclamer: Não acrescentei o .env no gitignore justamente para facilitar qualquer pessoa a rodar o projeto e focar 100% no frontend.

## Instalação
Esse projeto precisa ter Docker somente para banco de dados MongoDB, também pode ser substuído pelo Mongo Atlas, mas é preciso trocar a URL do banco de dados no DATABASE_URL dentro do .env.

Instale as dependencias
```
yarn
```

## Rodar localmente
Primeiro rode o docker compose para subir o banco de dados:

```
yarn compose:up
```
Agora rode o backend
```
yarn start:dev
```

## Acessar a api
A api está rodando na porta :5555, portanto é preciso usar o http://localhost:5555 para acessar a api.

A api conta com uma documentação (swagger) e vai te ajudar a entender o que precisa enviar para cada endpoint, exceto para o /me, que é um GET quando já estiver obtido o token no login  ou cadastro.
```
http://localhost:5555/swagger
```

É preciso passar o Authorization no header da requisição /me
```
config.headers["Authorization"] = accessToken
```

### Ponto importante
Não há instrução de como implementar o frontend, pois esse fluxo é um caso real que qualquer frontend vai precisar fazer no dia a dia.
Por tanto é preciso que você faça a implementação da sua parte.

Boa sorte!
