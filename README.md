# Gabiscoito

Site de uma padaria fictícia, criado como projeto de estudo para praticar desenvolvimento front-end. A página apresenta um catálogo de doces e salgados e reúne algumas interações básicas com JavaScript.

O projeto ainda está em desenvolvimento: novas interações e ajustes visuais estão previstos.

## Funcionalidades atuais

- Exibição dos produtos carregados de um arquivo JSON.
- Filtro do catálogo por todos os produtos, doces ou salgados.
- Seleção da quantidade de cada produto e inclusão no carrinho.
- Exibição dos itens e do valor total do carrinho.
- Persistência do carrinho no navegador usando `localStorage`.
- Seção com uma apresentação da Gabiscoito.

## Tecnologias

- HTML
- CSS
- JavaScript
- JSON para os dados do catálogo

Não há dependências ou etapa de compilação configuradas. A fonte Domine é carregada do Google Fonts, portanto sua exibição depende de conexão com a internet.

## Como executar

Como o catálogo é carregado com `fetch`, abra o projeto por um servidor HTTP local, em vez de abrir o `index.html` diretamente como arquivo.

1. Na raiz do projeto, inicie um servidor. Com Python instalado, use:

   ```powershell
   py -m http.server 8000
   ```

   Se o comando `py` não estiver disponível, tente `python -m http.server 8000`.

2. Acesse [http://localhost:8000](http://localhost:8000) no navegador.

3. Para encerrar o servidor, volte ao terminal e pressione `Ctrl+C`.

## Estrutura do projeto

```text
.
├── index.html          # Estrutura da página
├── css/
│   └── style.css       # Estilos
├── data/
│   └── produtos.json   # Produtos, preços, categorias e imagens
├── imagens/            # Logo, fotos dos produtos e imagens de fundo
└── js/
    └── script.js      # Catálogo, filtros e carrinho
```

## Personalização do catálogo

Os produtos ficam em `data/produtos.json`. Cada item contém `id`, `nome`, `preco`, `categoria`, `descricao` e `imagem`. As categorias usadas atualmente são `doce` e `salgado`; os caminhos das imagens são relativos à raiz do projeto e apontam para arquivos em `imagens/`.

## Próximos passos

- Implementar navegação entre as seções e preencher os links de contato.
- Ampliar as interações do carrinho e validar melhor as quantidades.
- Refinar o design e a experiência em diferentes tamanhos de tela.

## Objetivo

Este projeto tem finalidade de estudo e serve como espaço para experimentar e evoluir habilidades de front-end.