let produtos = [];
const dadosSalvos = localStorage.getItem("carrinho");
let carrinho = {}
if (dadosSalvos !== null){
    carrinho = JSON.parse(dadosSalvos);
    renderizarCarrinho();
}

async function carregarProdutos() {
    const leituras = await fetch('data/produtos.json');
    produtos = await leituras.json()
    renderizarProdutos(produtos)
}
function renderizarProdutos(produtos){
    let container = document.getElementById('produtos')
    container.innerHTML = ``;
    produtos.forEach(produto => {
        let card = document.createElement('div')
        card.classList.add('card-produto');
        
        card.innerHTML = `
            <h2>${produto.nome}</h2>
            <img src="${produto.imagem}" alt="imagem do produto">
            <p>${produto.descricao}</p>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <form class="formulario" data-preco="${produto.preco.toFixed(2)}">
                <input type="number" class="input-quantidade" name="quantidade" id="quantidade" placeholder="0">
                <button type="submit" class="botao-comprar">carrinho</button>
                <label for="quantidade">Quantidade</label>
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
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            renderizarCarrinho();
        });
    });
}
carregarProdutos();
function renderizarCarrinho(){
    let lista = document.getElementById("lista");
    lista.innerHTML = ``;
    let totalCarrinho = document.createElement("div");
    totalCarrinho.classList.add("total");
    Object.keys(carrinho).forEach(produtoNome => {
        let produtoCarrinho = document.createElement("div");
        produtoCarrinho.classList.add("produto-carrinho");
        produtoCarrinho.innerHTML = `
            <p>${produtoNome} x ${carrinho[produtoNome].quantidade} = R$${carrinho[produtoNome].total.toFixed(2)}</p>
        `;
        lista.appendChild(produtoCarrinho);
    });
    let total = Object.values(carrinho).reduce((acumulador, valorAtual) => acumulador + valorAtual.total, 0);
    totalCarrinho.innerHTML = `<p>total = R$${total.toFixed(2)}</p>`;
    lista.appendChild(totalCarrinho);
}
const botoes = document.querySelectorAll(".botao-filtro");
botoes.forEach(botao =>{
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
    let lista = document.getElementById("lista");
    lista.classList.toggle("oculto");
})


