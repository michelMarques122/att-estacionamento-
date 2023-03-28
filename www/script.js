let matriz = JSON.parse(localStorage.getItem('nr_entradas')) || {};
var totalgasto = 0;

const exibirHistorico = () =>{
  document.getElementById("dadosHistoricos").innerHTML = "";
  let dinheiro = 0;
  for (i = 0; i < matriz.veiculos.length; i++){
    document.querySelector(".tela2 article span").insertAdjacentHTML( 'afterbegin',
      "<div class='historicobox'>" + 
        "<p>Marca " + matriz.veiculos[i][0] + "</p>" +
        "<p>placa " + matriz.veiculos[i][1] + "</p>" +
        "<p>Categoria " + matriz.veiculos[i][2] + "</p>" +
        "<p>Entrada " + matriz.veiculos[i][3] + "</p>" +
        "<p>Saida " + matriz.veiculos[i][4] + "</p>" + 
        "<p>Pagamento " + matriz.veiculos[i][5] + "</p>" + 
      "</div>"
    );
    dinheiro = dinheiro + Number(matriz.veiculos[i][5].substring(0, matriz.veiculos[i][5].length - 2));
  }

  dinheiroGasto.innerHTML = dinheiro + "R$";
}

const confirmarCompra = () =>{
  let notificacao = `
    <div class='comprafeita'>
      <div class='notification'>
        <div>
          <img src='./assets/icon-certo.png' alt=''>
        </div>
        <div>
          <h2>Compra feita com Sucesso</h2>
          <p>mais informações em 'historico'</p>
        </div>
      </div>
      <div class='barraloaging'></div>
    </div>
  `;

  document.getElementById("notificacaocompra").innerHTML = notificacao;

  setTimeout(() => {
    document.getElementById("notificacaocompra").innerHTML = "";
  } ,5000);

  document.querySelector('#confirmacompra').style.display = 'none';
  let dataAtual = new Date();
  let horaAtual = dataAtual.getHours();
  let minAtual = dataAtual.getMinutes();
  let tempoatual = horaAtual + ":" + minAtual;

  const veiculo = [
    document.getElementById("marca").value,
    document.getElementById("placa").value,
    document.getElementById("categoria").value,
     tempoatual,
    document.querySelector("#cmsaida").textContent,
    totalgasto + "RS"
  ];

  if(matriz.veiculos == undefined){
    matriz.veiculos = [];
  }

  matriz.veiculos.push(veiculo);

  let minhaArrayJSON = JSON.stringify(matriz);

  try{
    localStorage.setItem('nr_entradas', minhaArrayJSON);
  } catch{
    localStorage.setItem('nr_entradas', "rola");
  }

  exibirHistorico();
  document.getElementById("marca").value = "";
    document.getElementById("placa").value = "";
    document.getElementById("categoria").value = "";
    document.querySelector("#tempo").value = "";
}

const fazercompra = () =>{
  document.querySelector("#confirmacompra").style.display = "block";
  let marca = document.getElementById("marca").value;
  let placa = document.getElementById("placa").value;
  let categoria = document.getElementById("categoria").value;
  let tempoEscolhido = document.querySelector("#tempo").value;

  let dataAtual = new Date();
  let horaAtual = dataAtual.getHours();
  let minAtual = dataAtual.getMinutes();
  let entrada = horaAtual + ":" + minAtual;

  data = new Date();
  data.setHours(dataAtual.getHours() + parseInt(tempoEscolhido));
  data.setMinutes(dataAtual.getMinutes());
  let datafinal = data.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  document.getElementById("cmmarca").textContent = marca;
  document.getElementById("cmplaca").textContent = placa;
  document.getElementById("cmcategoria").textContent = categoria;
  document.getElementById("cmentrada").textContent = entrada;
  document.getElementById("cmsaida").textContent = datafinal;
  document.getElementById("totalaPagar").textContent = totalgasto + "R$";
}

const calcularPreco = () =>{
  let categoria = document.getElementById("categoria");
  let valorCategoria;
  switch(categoria.value){
    case "Subcompacto":
      valorCategoria = 3.50;
      document.querySelector(".box .imgbox img").src = "./assets/subcompacto.png";
      break;
    
    case "Compacto":
      valorCategoria = 4.0;
      document.querySelector(".box .imgbox img").src = "./assets/compacto.png";
      break;

    case "Hatch":
      valorCategoria = 4.50;
      document.querySelector(".box .imgbox img").src = "./assets/hatch.png";
      break;

    case "Sedan":
      valorCategoria = 5.00;
      document.querySelector(".box .imgbox img").src = "./assets/sedan.png";
      break;

    case "SUV":
      valorCategoria = 6.00;
      document.querySelector(".box .imgbox img").src = "./assets/SUV.png";
      break;

    case "Pick-up":
      valorCategoria = 7.00;
      document.querySelector(".box .imgbox img").src = "./assets/pickup.png";
      
    default:
      document.querySelector("#calculoPreco").textContent = "Insira uma Categoria";
  }

  let dataAtual = new Date();
  let horaAtual = dataAtual.getHours();
  let minAtual = dataAtual.getMinutes();

  let tempoFinal = document.querySelector("#tempo").value;

  let tempoLucro = tempoFinal * valorCategoria;

  document.querySelector(".form button").disabled = true;

  document.querySelector("#calculoPreco").innerHTML = tempoLucro.toFixed(2) + " reais";
  totalgasto = tempoLucro.toFixed(2);
  if(document.querySelector("#placa").value != "" && document.querySelector("#marca").value != "" && document.querySelector("#tempo").value != ""){
    document.querySelector(".form button").disabled = false;
  }
}

const abriMenu = () =>{
  document.querySelector("nav button").classList.toggle("btnAberto");
  document.querySelector("#menuItem")
    .classList.toggle("menu-items");
    document.querySelector("#menuItem")
    .classList.toggle("menu");
}

function mostrarElementos(e) {
  var opcaoSelecionada = e.target;
  var elementos = document.querySelectorAll('main > *');
  for (var i = 0; i < elementos.length; i++) {
    if (elementos[i].classList.contains(opcaoSelecionada.classList)){
      elementos[i].style.display = 'block';
    } else {
      elementos[i].style.display = 'none';
    }
  }
  abriMenu();
}

document.querySelector("nav button").addEventListener('click', abriMenu);
document.querySelector("#menuItem").addEventListener('click', mostrarElementos);
document.addEventListener("DOMContentLoaded",()=>{
  let inputTime = document.querySelector("#tempo");
  let dataAtual = new Date();
  let horaAtual = dataAtual.getHours();
  let minAtual = dataAtual.getMinutes();
  inputTime.setAttribute("min", `${horaAtual}:00`);
  inputTime.setAttribute("max", `${horaAtual + 3}:00`);
  exibirHistorico();
});