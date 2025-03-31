---

# Projeto Next.js

Aplicação [`link-da-aplicacao`](https://3dcreate-git-3dcreate-jonathas-levis-projects.vercel.app/).

## Começando

Primeiro, execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

Você pode começar a editar a página modificando o arquivo `app/page.tsx`. A página será atualizada automaticamente conforme você edita o arquivo.

Este projeto usa [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para otimizar e carregar automaticamente a fonte [Geist](https://vercel.com/font), uma nova família de fontes da Vercel.

## Instruções de Uso

1. **Inicie a aplicação** conforme as instruções acima para rodar o servidor de desenvolvimento.

2. **Interaja com a aplicação**:
    - **Clique no botão localizado no canto inferior esquerdo da tela**.
    - Você terá a **opção de fazer o upload de um diretório** com a seguinte estrutura:
        ```
        dir/
        ├── data.json
        └── images/
        ```
    - O diretório `data.json` deve conter os dados necessários para a aplicação.
    - O diretório `images/` deve conter as imagens relevantes, que serão carregadas conforme o necessário.
  
    - Além disso, você tem a **opção de criar um novo terreno**:
        - **Clique no botão "More"** para adicionar um novo terreno.
        - Ao clicar, você será capaz de inserir as informações do terreno inicial, como nome, descrição e outras propriedades necessárias.
        - Essas informações serão usadas para gerar um novo terreno dentro da aplicação.

3. **Painel de Informações do Projeto**:
    - Ao **criar um novo projeto** ou ao **usar um projeto existente**, será aberto na parte direita da tela um **painel** com todas as informações do projeto, incluindo:
        - **Terrenos existentes**
        - **Blocos dentro de cada terreno**
        - **Texturas aplicadas aos blocos**
        - **Dimensões dos blocos** (altura, largura, profundidade)
        - **Componentes** presentes no terreno, como:
          - **Portas**
          - **Janelas**
          - **Buracos vazios** (aberturas no terreno)
        - **Ângulo do telhado** (inclinação)
        - **Dimensões do telhado** (largura, comprimento, altura)
        - **Posição dos blocos** no espaço 3D (coordenadas X, Y, Z)
        - **Rotação dos blocos** (ângulo de rotação nos eixos X, Y, Z)
    - No painel, você pode **"abrir" ou ocultar** detalhes dos blocos e terrenos:
        - **Clique em algum lugar fora da ocupação do objeto** ou **minimize clicando no botão com a seta** ao lado do bloco ou terreno no painel.
    - **Download do Projeto**:
        - Dentro do painel aberto, você tem a opção de **fazer o download do projeto** no formato ZIP.
    - **Minimizar o Painel**:
        - O painel também pode ser **minimizado** ao clicar no **botão lateral** para ocultá-lo e liberar espaço na tela.

---

Agora o "Getting Started" foi traduzido para **"Começando"**, e as informações sobre o **Vercel** no final foram removidas.
