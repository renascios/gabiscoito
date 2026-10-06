let produtos = [];
const dadosSalvos = localStorage.getItem("carrinho");
let carrinho = {}

async function carregarProdutos() {
    const leituras = await fetch('data/produtos.json');
    produtos = await leituras.json();
    renderizarProdutos(produtos);
    if (dadosSalvos !== null){
        carrinho = JSON.parse(dadosSalvos);
        renderizarCarrinho();
    }
}

function renderizarProdutos(produtos){
    let container = document.getElementById('produtos')
    container.innerHTML = ``;
    produtos.forEach(produto => {
        let card = document.createElement('div')
        card.classList.add('card-produto');
        
        card.innerHTML = `
            <h2>${produto.nome}</h2>
            <div class="conteudo-card">
                <img src="${produto.imagem}" alt="imagem do produto">
                <div class="descricao-card">
                    <p>${produto.descricao}</p><br>
                    <h3>R$ ${produto.preco.toFixed(2)}</h3>
                </div>
            </div>
            <form class="formulario" data-preco="${produto.preco.toFixed(2)}">
                <label><input type="number" class="input-quantidade" name="quantidade" placeholder="0">Quantidade</label><br>
                <button type="submit" class="botao-comprar">carrinho</button>
            </form>
        `;
        container.appendChild(card);

        let form = card.querySelector(".formulario");
        let precoProduto = Number(form.getAttribute("data-preco"));
        
        form.addEventListener("submit", function(event){
            event.preventDefault();
            const inputQuantidade = form.querySelector(".input-quantidade");
            const quantidade = Number(inputQuantidade.value);
            const totalPreco = precoProduto * quantidade;
            if (quantidade == 0) return;
            if (carrinho[produto.nome] === undefined) {
                carrinho[produto.nome] = {quantidade: 0, total: 0};
            }
            carrinho[produto.nome].total += totalPreco;
            carrinho[produto.nome].quantidade += quantidade;
            renderizarCarrinho();
        });
    });
}
carregarProdutos();
function renderizarCarrinho(){
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    let lista = document.getElementById("lista");
    lista.innerHTML = ``;
    let totalCarrinho = document.createElement("div");
    totalCarrinho.classList.add("total");
    Object.keys(carrinho).forEach(produtoNome => {
        let produtoCarrinho = document.createElement("div");
        let objetoCarrinho = produtos.find(produto => produto.nome === produtoNome);
        console.log(objetoCarrinho);
        let icone = objetoCarrinho.icone;
        produtoCarrinho.classList.add("produto-carrinho");
        produtoCarrinho.innerHTML = `
            <img src="${icone}" alt="icone do produto">
            <p>${produtoNome} x ${carrinho[produtoNome].quantidade} = R$${carrinho[produtoNome].total.toFixed(2)}</p>
            <button class="botao-remover" data-produto="${produtoNome}"><img src="imagens/lixeiraicon.png" alt="icone de lixeira"></button>
        `;
        lista.appendChild(produtoCarrinho);
    });
    let botoesRemover = document.querySelectorAll(".botao-remover");
    botoesRemover.forEach(botao => {
        let produtoNome = botao.getAttribute("data-produto");
        botao.addEventListener("click", () => {
            delete carrinho[produtoNome];
            renderizarCarrinho();
        })
    });
    let total = Object.values(carrinho).reduce((acumulador, valorAtual) => acumulador + valorAtual.total, 0);
    totalCarrinho.innerHTML = `<h2>Total = R$${total.toFixed(2)}</h2>`;
    lista.appendChild(totalCarrinho);
}
const botoesFiltro = document.querySelectorAll(".botao-filtro");
botoesFiltro.forEach(botao =>{
    const itemCategoria = botao.getAttribute("data-categoria");
    botao.addEventListener("click", () =>{
        let resultado = [];
        if (itemCategoria == "todos")
            resultado = produtos;
        if (itemCategoria == "doces")
            resultado = produtos.filter(produto => produto.categoria == "doce");
        if (itemCategoria == "salgados")
            resultado = produtos.filter(produto => produto.categoria == "salgado");
        renderizarProdutos(resultado);
    })
})
const listaBotao = document.querySelector("#botao-carrinho");
listaBotao.addEventListener("click", () => {
    let openOverlay = document.getElementById("overlay");
    openOverlay.classList.remove("oculto");
})
const fecharBotao = document.querySelector("#fechar");
fecharBotao.addEventListener("click", () => {
    let closeOverlay = document.getElementById("overlay");
    closeOverlay.classList.add("oculto");
})



