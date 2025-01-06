let state = false;
let novoProdutoBool = false;
let ListaProdutos = [];

function addProdutos() {
  if (novoProdutoBool) {
    novoProdutoBool = false;
  } else {
    novoProdutoBool = true;
  }

  console.log(novoProdutoBool);

  const novoProdutoElement = document.getElementById("novoFormulario");
  if (novoProdutoElement) {
    if (novoProdutoBool) {
      novoProdutoElement.style.visibility = "visible";
    } else {
      novoProdutoElement.style.visibility = "hidden";
    }
  }
}

function ExcluirProdutos() {
  const nome = prompt("Digite o nome do produto que deseja excluir");

  if (nome) {
    ListaProdutos = ListaProdutos.filter((produto) => {
      return produto.nome !== nome;
    });

    alert(`${nome} excluido com sucesso`);

    salvarListaProdutos();

    mostrarProdutos();
  } else {
    alert("Digite um nome valido");
  }
}

function changeState(boolean) {
  const botaoSim = document.getElementById("sim");
  const botaoNao = document.getElementById("nao");

  if (boolean) {
    state = true;
    botaoSim.style.backgroundColor = "#FFF";
    botaoSim.style.color = "#000";
    botaoNao.style.backgroundColor = "red";
    botaoNao.style.color = "#FFF";
  } else {
    state = false;
    botaoNao.style.backgroundColor = "#FFF";
    botaoNao.style.color = "#000";
    botaoSim.style.backgroundColor = "green";
    botaoSim.style.color = "#FFF";
  }
}

function AdicionarProdutos() {
  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;
  const descricao = document.getElementById("descricao").value;

  if (nome && preco && descricao) {
    const novoProduto = {
      nome: nome,
      preco: preco,
      descricao: descricao,
      disponivel: state,
    };

    ListaProdutos.push(novoProduto);

    ListaProdutos.sort((a, b) => {
      return a.preco - b.preco;
    });

    alert(`${nome} adicionado com sucesso`);

    nome.value = "";
    preco.value = "";
    descricao.value = "";

    mostrarProdutos();

    addProdutos();

    guardarJson();
  } else {
    alert("Preencha todos os campos");
  }
}

function mostrarProdutos() {
  const listaProdutosElement = document.getElementById("listaProdutos");

  if (listaProdutosElement) {
    listaProdutosElement.innerHTML = "";

    ListaProdutos.forEach((produto) => {
      const li = document.createElement("li");

      const nomeElement = document.createElement("p");

      nomeElement.innerHTML = `Nome: ${produto.nome} - Preço: ${produto.preco}`;

      li.appendChild(nomeElement);
      listaProdutosElement.appendChild(li);
    });
  }
}

function salvarListaProdutos() {
  const json = JSON.stringify(ListaProdutos);
  localStorage.setItem("ListaProdutos", json);
}

function carregarListaProdutos() {
  const json = localStorage.getItem("ListaProdutos");
  if (json) {
    ListaProdutos = JSON.parse(json);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  carregarListaProdutos();
  mostrarProdutos();
});
