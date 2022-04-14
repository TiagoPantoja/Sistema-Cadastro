// Declarando variáveis
let produto = document.getElementById("produto");
let quantidade = document.getElementById("quantidade");
let codigo = document.getElementById("codigo"); 

// Função que verifica se todos os campos foram preenchidos
function validar() { 

    if (produto.value == "" && quantidade.value == 0 && codigo.value == "") {
        alert("Insira um valor válido para as informações.");

    } else if (produto.value == "") {
        alert("Insira um nome válido para o produto.");

    } else if (quantidade.value == 0) {
        alert("Insira uma quantidade válida para o produto.");

    } else if (codigo.value == "") {
        alert("Insira um código válido para o produto.");
    }
}

// Função que adiciona um produto ao estoque
function adicionar(){

    let novo = document.getElementById("produto").value;
    let qtd = document.getElementById("quantidade").value; 
    let cod = document.getElementById("codigo").value;

// Verifica se as informações estão presentes antes de adicionar
    if (!novo) {
        return false;
    }
    else if (!qtd) {
        return false; 
    }
    else if (!cod) {
        return false;
    }

// Criando um objeto para ser inserido no array itens
    let item = {
        nome: novo,
        quant: qtd,
        codigo: cod,
    }
    
    if (localStorage.getItem("estoqueItens") === null) {
        let itens = [];
        itens.push(item);
        localStorage.setItem("estoqueItens", JSON.stringify(itens));
    }
 else {
        var itens = JSON.parse(localStorage.getItem("estoqueItens"));
        itens.push(item);
        localStorage.setItem("estoqueItens", JSON.stringify(itens));
        }
    }

// Função que remove um item do estoque usando os objetos que foram previamente inseridos no array
function removerItem(nome) {
    
    let itens = JSON.parse(localStorage.getItem("estoqueItens"));
    
    for (var i = 0; i < itens.length; i++) {
        
        if (itens[i].nome === nome) {
            itens.splice(i, 1);
        }
        
        localStorage.setItem("estoqueItens", JSON.stringify(itens));
        
    }

    mostrarResultado();
    
}

// Função que retorna os objetos que foram inseridos no estoque no HTML para o usuário poder ver
function mostrarResultado() {
    
    let itens = JSON.parse(localStorage.getItem("estoqueItens"));
    let resultadoItens = document.getElementById("dados"); 
    
    resultadoItens.innerHTML = '';
    
    for (var i = 0; i < itens.length; i++) { 
    
// Mostra a ordem que as informações serão exibidas no HTMl
        let nome =  itens[i].nome;
        let quant = itens[i].quant;
        let codigo = itens[i].codigo;
          
        resultadoItens.innerHTML += '\
            <tr>\
                <td style="word-wrap: break-word;">' + nome + '</td>\
                <td style="word-wrap: break-word;">' + quant + '</td>\
                <td style="word-wrap: break-word;">' + codigo + '</td>\
                <td><button class="botao-tabela" onclick="removerItem(\'' + nome + '\')">Remover Produto</button></td>\
            </tr>';
        
        produto.value = '';
        quantidade.value = '';
        codigo.value = '';
    }
}