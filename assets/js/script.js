//SAVE BUTTON========================
var button = document.querySelectorAll('.btn');



function generatePDF() {
  const element = document.getElementById("print");
  const opt = {
    margin: 0,
    filename: 'proposta.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a3', orientation: 'portrait', height: 'auto' },
    exclude: [button]

  };
  html2pdf().set(opt).from(element).save();
}

//AVOID NEGATIVE INPUT==================
const inputs = document.querySelectorAll('.noNegative');

// Adiciona um ouvinte de eventos de teclado a cada campo de entrada
inputs.forEach(input => {
  input.addEventListener('keydown', function (event) {
    // Verifica se a tecla pressionada é um sinal de menos (-)
    if (event.key === '-') {
      // Impede a inserção do sinal de menos
      event.preventDefault();
    }
  });

  // Adiciona um ouvinte de eventos de mudança ao campo de entrada
  input.addEventListener('change', function (event) {
    // Verifica se o valor do campo de entrada é negativo
    if (input.value < 0) {
      // Define o valor do campo de entrada como 0
      input.value = 0;
    }
  });
});


//AUTO DATE & HOUR=====================
document.addEventListener("DOMContentLoaded", function () {
  // Obter a data atual
  const dataAtual = new Date();
  const dia = String(dataAtual.getDate()).padStart(2, "0");
  const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
  const ano = dataAtual.getFullYear();
  const dataFormatada = `${dia}/${mes}/${ano}`;

  // Obter a hora atual
  const horaAtual = new Date().toLocaleTimeString("pt-BR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  // Preencher as células da tabela com a data e a hora
  document.getElementById("data").textContent = dataFormatada;
  document.getElementById("hora").textContent = horaAtual;
});

//TABLES NEW LINES & REMOVE LINES==================
//LINES 1==========================================
let counterQuantityMateriais = 1;
let counterUnitPriceMateriais = 1;
let counterTotalMateriais = 1;

function newLineMateriais() {
  const table = document.getElementById("materiaisTable");
  const newRow = table.insertRow(-1);

  const col1 = newRow.insertCell(0);
  col1.innerHTML = '<input type="number">';

  const col2 = newRow.insertCell(1);
  col2.innerHTML = '<input type="text">';

  const col3 = newRow.insertCell(2);
  col3.innerHTML = '<input type="text">';

  const col4 = newRow.insertCell(3);
  col4.innerHTML = `<input type="number" name="quantityMateriais">`;

  const col5 = newRow.insertCell(4);
  col5.innerHTML = `<input type="number" name="unitPriceMateriais">`;

  const col6 = newRow.insertCell(5);
  col6.classList.add('lastCell'); // adicionando a classe "lastCell" ao elemento <td>
  col6.innerHTML = `<span class="currency totalValueMateriais">0`;

  counterQuantityMateriais++;
  counterUnitPriceMateriais++;
  counterTotalMateriais++;
}


function removeLineMateriais() {
  let table = document.getElementById('materiaisTable');
  let lastRow = table.rows.length - 1;
  if (table.rows[lastRow].classList.contains('dontRemove')) {
    // não remova a linha
    return;
  }
  table.deleteRow(lastRow);
}


//LINES 2=======================================
let counterQuantityServicos = 1;
let counterUnitPriceServicos = 1;
let counterTotalServicos = 1;

function newLineServicos() {
  const table = document.getElementById("servicosTable");
  const newRow = table.insertRow(-1);

  const col1 = newRow.insertCell(0);
  col1.innerHTML = '<input type="number">';

  const col2 = newRow.insertCell(1);
  col2.innerHTML = '<input type="text">';

  const col3 = newRow.insertCell(2);
  col3.innerHTML = '<input type="text">';

  const col4 = newRow.insertCell(3);
  col4.innerHTML = `<input type="number" name="quantityServicos">`;

  const col5 = newRow.insertCell(4);
  col5.innerHTML = `<input type="number" name="unitPriceServicos">`;

  const col6 = newRow.insertCell(5);
  col6.classList.add('lastCell'); // adicionando a classe "lastCell" ao elemento <td>
  col6.innerHTML = `<span class="currency totalValueServicos">0`;

  counterQuantityServicos++;
  counterUnitPriceServicos++;
  counterTotalServicos++;
}



function removeLineServicos() {
  let table = document.getElementById('servicosTable');
  let lastRow = table.rows.length - 1;
  if (table.rows[lastRow].classList.contains('dontRemove')) {
    // não remova a linha
    return;
  }
  table.deleteRow(lastRow);
}

//LINES 3===========================================
let counterQuantityFechamento = 1;
let counterUnitPriceFechamento = 1;
let counterTotalFechamento = 1;

function newLineFechamento() {
  const table = document.getElementById("fechamentoTable");
  const newRow = table.insertRow(-1);

  const col1 = newRow.insertCell(0);
  col1.innerHTML = '<input type="number">';

  const col2 = newRow.insertCell(1);
  col2.innerHTML = '<input type="text">';

  const col3 = newRow.insertCell(2);
  col3.innerHTML = '<input type="text">';

  const col4 = newRow.insertCell(3);
  col4.innerHTML = `<input type="number" name="quantityFechamento">`;

  const col5 = newRow.insertCell(4);
  col5.innerHTML = `<input type="number" name="unitPriceFechamento">`;

  const col6 = newRow.insertCell(5);
  col6.classList.add('lastCell'); // adicionando a classe "lastCell" ao elemento <td>
  col6.innerHTML = `<span class="currency totalValueFechamento">0`;

  counterQuantityFechamento++;
  counterUnitPriceFechamento++;
  counterTotalFechamento++;
}

function removeLineFechamento() {
  let table = document.getElementById('fechamentoTable');
  let lastRow = table.rows.length - 1;
  if (table.rows[lastRow].classList.contains('dontRemove')) {
    // não remova a linha
    return;
  }
  table.deleteRow(lastRow);
}


//MATHEMATICAL EXPRESSIONS//=========================
//MATERIAIS
// Adiciona o evento de clique ao botão "Gerar"
function resultadoMateriais() {
  // Seleciona todas as linhas da tabela
  var linhas_M = document.querySelectorAll('#materiaisTable tbody tr');

  // Inicializa o valor total da tabela como zero
  var totalAllMateriais = 0;

  // Percorre todas as linhas da tabela
  for (var i = 0; i < linhas_M.length; i++) {
    var linhaM = linhas_M[i];

    // Seleciona os campos de quantidade e valor unitário da linha atual, se eles existirem
    var quantityM = linhaM.querySelector('input[name="quantityMateriais"]'); // atualiza o seletor
    var unitPriceM = linhaM.querySelector('input[name="unitPriceMateriais"]'); // atualiza o seletor
    if (!quantityM || !unitPriceM) {
      continue; // pula para a próxima iteração se um dos campos não existir
    }

    // Calcula o valor total da linha
    var totalM = quantityM.value * unitPriceM.value;

    // Seleciona o campo de valor total da linha atual e atualiza o valor
    var totalValueM = linhaM.querySelector('span.totalValueMateriais'); // remove o índice da classe
    totalValueM.textContent = totalM;

    // Atualiza o valor total da tabela
    totalAllMateriais += totalM;
  }

  // Seleciona o campo de valor total da tabela e atualiza o valor
  var totalAllM = document.querySelector('span.totalAllMateriais');
  totalAllM.textContent = totalAllMateriais;
};
//MATERIAIS END

//SERVICOS=============================
function resultadoServicos() {

  // Seleciona todas as linhas da tabela
  var linhas_S = document.querySelectorAll('#servicosTable tbody tr');

  // Inicializa o valor total da tabela como zero
  var totalAllServicos = 0;

  // Percorre todas as linhas da tabela
  for (var i = 0; i < linhas_S.length; i++) {
    var linhaS = linhas_S[i];

    // Seleciona os campos de quantidade e valor unitário da linha atual
    var quantityS = linhaS.querySelector('input[name="quantityServicos"]');
    var unitPriceS = linhaS.querySelector('input[name="unitPriceServicos"]');
    if (!quantityS || !unitPriceS) {
      continue; // pula para a próxima iteração se um dos campos não existir
    }
    // Calcula o valor total da linha
    var totalS = quantityS.value * unitPriceS.value;

    // Seleciona o campo de valor total da linha atual e atualiza o valor
    var totalValueS = linhaS.querySelector('span.totalValueServicos');
    totalValueS.textContent = totalS;

    // Atualiza o valor total da tabela
    totalAllServicos += totalS;
  }

  // Seleciona o campo de valor total da tabela e atualiza o valor
  var totalAllS = document.querySelector('span.totalAllServicos');
  totalAllS.textContent = totalAllServicos;
};

//SERVICOS FIM

//FECHAMENTO=======================================
function resultadoFechamento() {

  // Seleciona todas as linhas da tabela
  var linhas_F = document.querySelectorAll('#fechamentoTable tbody tr');

  // Inicializa o valor total da tabela como zero
  var totalAllFechamento = 0;

  // Percorre todas as linhas da tabela
  for (var i = 0; i < linhas_F.length; i++) {
    var linhaF = linhas_F[i];

    // Seleciona os campos de quantidade e valor unitário da linha atual
    var quantityF = linhaF.querySelector('input[name="quantityFechamento"]');
    var unitPriceF = linhaF.querySelector('input[name="unitPriceFechamento"]');
    if (!quantityF || !unitPriceF) {
      continue; // pula para a próxima iteração se um dos campos não existir
    }
    // Calcula o valor total da linha
    var totalF = quantityF.value * unitPriceF.value;

    // Seleciona o campo de valor total da linha atual e atualiza o valor
    var totalValueF = linhaF.querySelector('span.totalValueFechamento');
    totalValueF.textContent = totalF;

    // Atualiza o valor total da tabela
    totalAllFechamento += totalF;
  }

  // Seleciona o campo de valor total da tabela e atualiza o valor
  var totalAllF = document.querySelector('span.totalAllFechamento');
  totalAllF.textContent = totalAllFechamento;
};

//FECHAMENTO FIM

//END MATHEMATICAL EXPRESSIONS//