var button = document.getElementById('.btn');


function generatePDF() {
  const element = document.getElementById("print");
  const opt = {
    margin: 0,
    filename: 'proposta.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 1 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    exclude: [button]
  };
  html2pdf().set(opt).from(element).save();
}




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

//NEW/REMOVE LINES 1
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
  col4.innerHTML = `<input type="number" class="quantityMateriais_${counterQuantityMateriais}">`;

  const col5 = newRow.insertCell(4);
  col5.innerHTML = `<input type="number" class="currency unitPriceMateriais_${counterUnitPriceMateriais}">`;

  const col6 = newRow.insertCell(5);
  col6.innerHTML = `<span class="currency totalValueMateriais_${counterTotalMateriais}">`;

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


//NEW/REMOVE LINES 2
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
  col4.innerHTML = `<input type="number" class="quantityServicos_${counterQuantityServicos}">`;

  const col5 = newRow.insertCell(4);
  col5.innerHTML = `<input type="number" class="currency unitPriceServicos_${counterUnitPriceServicos}">`;

  const col6 = newRow.insertCell(5);
  col6.innerHTML = `<span class="currency totalValueServicos_${counterTotalServicos}">`;

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

//NEW/REMOVE LINES 2
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
  col4.innerHTML = `<input type="number" class="quantityFechamento_${counterQuantityFechamento}">`;

  const col5 = newRow.insertCell(4);
  col5.innerHTML = `<input type="number" class="currency unitPriceFechamento_${counterUnitPriceFechamento}">`;

  const col6 = newRow.insertCell(5);
  col6.innerHTML = `<span class="currency totalValueFechamento_${counterTotalFechamento}">`;

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


//FORMULA DE SOMAS//
//MATERIAIS

// Adiciona o evento de clique ao botão "Gerar"
function resultadoMateriais() {

  // Seleciona todas as linhas da tabela
  var linhas_M = document.querySelectorAll('#materiaisTable tbody tr');

  // Inicializa o valor total da tabela como zero
  var totalAllMateriais = 0.00;

  // Percorre todas as linhas da tabela
  for (var i = 0.00; i < linhas_M.length; i++) {
    var linhaM = linhas_M[i];

    // Seleciona os campos de quantidade e valor unitário da linha atual
    var quantityM = linhaM.querySelector('input.quantityMateriais_' + i);
    var unitPriceM = linhaM.querySelector('input.unitPriceMateriais_' + i);

    // Calcula o valor total da linha
    var totalM = quantityM.value * unitPriceM.value;

    // Seleciona o campo de valor total da linha atual e atualiza o valor
    var totalValueM = linhaM.querySelector('span.totalValueMateriais_' + i);
    totalValueM.textContent = totalM;

    // Atualiza o valor total da tabela
    totalAllMateriais += totalM;
  }

  // Seleciona o campo de valor total da tabela e atualiza o valor
  var totalAllM = document.querySelector('span.totalAllMateriais');
  totalAllM.textContent = totalAllMateriais;
};


//MATERIAIS FIM

//SERVICOS

function resultadoServicos() {

  // Seleciona todas as linhas da tabela
  var linhas_S = document.querySelectorAll('#servicosTable tbody tr');

  // Inicializa o valor total da tabela como zero
  var totalAllServicos = 0.00;

  // Percorre todas as linhas da tabela
  for (var i = 0.00; i < linhas_S.length; i++) {
    var linhaS = linhas_S[i];

    // Seleciona os campos de quantidade e valor unitário da linha atual
    var quantityS = linhaS.querySelector('input.quantityServicos_' + i);
    var unitPriceS = linhaS.querySelector('input.unitPriceServicos_' + i);

    // Calcula o valor total da linha
    var totalS = quantityS.value * unitPriceS.value;

    // Seleciona o campo de valor total da linha atual e atualiza o valor
    var totalValueS = linhaS.querySelector('span.totalValueServicos_' + i);
    totalValueS.textContent = totalS;

    // Atualiza o valor total da tabela
    totalAllServicos += totalS;
  }

  // Seleciona o campo de valor total da tabela e atualiza o valor
  var totalAllS = document.querySelector('span.totalAllServicos');
  totalAllS.textContent = totalAllServicos;
};

//SERVICOS FIM

//FECHAMENTO

function resultadoFechamento() {

  // Seleciona todas as linhas da tabela
  var linhas_F = document.querySelectorAll('#fechamentoTable tbody tr');

  // Inicializa o valor total da tabela como zero
  var totalAllFechamento = 0.00;

  // Percorre todas as linhas da tabela
  for (var i = 0.00; i < linhas_F.length; i++) {
    var linhaF = linhas_F[i];

    // Seleciona os campos de quantidade e valor unitário da linha atual
    var quantityF = linhaF.querySelector('input.quantityFechamento_' + i);
    var unitPriceF = linhaF.querySelector('input.unitPriceFechamento_' + i);

    // Calcula o valor total da linha
    var totalF = quantityF.value * unitPriceF.value;

    // Seleciona o campo de valor total da linha atual e atualiza o valor
    var totalValueF = linhaF.querySelector('span.totalValueFechamento_' + i);
    totalValueF.textContent = totalF;

    // Atualiza o valor total da tabela
    totalAllFechamento += totalF;
  }

  // Seleciona o campo de valor total da tabela e atualiza o valor
  var totalAllF = document.querySelector('span.totalAllFechamento');
  totalAllF.textContent = totalAllFechamento;
};

//FECHAMENTO FIM

//FORMULA DE SOMAS FIM//