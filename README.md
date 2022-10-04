# Desafio ED3 Product

## Sobre o desafio

Nesse desafio o seu principal objetivo é criar o fluxo de compras, na página de produto. Você também terá que fazer as outras interações da página como:

- Consultar a API de produto e atualizar o front com as infomações do produto;
- Adicionar um produto ao carrinho;
- Antes de adicionar o produto no carrinho, verificar se foi escolhido as variações de produto;
- Verificar também se o produto possui estoque;
- Notificar se o produto foi adicionado ou não;
- Preservar os dados do carrinho ao atualizar a página
- Ao clicar em uma thumb de imagem, a imagem principal deve ser alterada;

## Tailwind CSS

Para estizar essa página, utilizamos o framework [tailwindcss](https://tailwindcss.com/). Para compilar o css, execute os seguintes comandos no terminal:

```bash
yarn
yarn tailwindcss
```

## API

Foi criada uma api fake de produto. Utilizamos o pacote `json-server` para simular uma API que possui as informações dos produtos e do estoque.
Dento da raiz do projeto, execute os seguintes comandos no terminal:

```bash
yarn server
```

Ao executar os comandos ele cria uma api fake com o endpoint /product em localhost na porta 3333 a partir das informações do arquivo db.json localizado na raiz do seu projeto. Acessando essas rotas no seu navegador, você consegue ver o retorno das informações já em JSON.

Dessa forma, basta consumir essas rotas da API normalmente com o axios/fetch. Caso queira estudar mais sobre o JSON Server, dê uma olhada aqui:
<https://github.com/typicode/json-server>
