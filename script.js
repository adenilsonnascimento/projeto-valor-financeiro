let saldoAtual = 0;

function adicionarSalario() {
    const salarioInput = document.getElementById("salario");
    const saldoElement = document.getElementById("saldo");

    const salario = parseFloat(salarioInput.value);
    if (!isNaN(salario)) {
        saldoAtual += salario;
        saldoElement.textContent = saldoAtual.toFixed(2);
        salarioInput.value = "";
    } else {
        alert("Por favor, insira um valor válido para o salário.");
    }
}

function adicionarGasto() {
    const dataInput = document.getElementById("data");
    const descricaoInput = document.getElementById("descricao");
    const valorInput = document.getElementById("valor");
    const saldoElement = document.getElementById("saldo");

    const data = dataInput.value;
    const descricao = descricaoInput.value;
    const valorText = valorInput.value;

    const valor = parseFloat(valorText.replace(",", "."));

    if (descricao && !isNaN(valor) && valorText.trim() !== "" && valor >= 0) {
        const tabela = document.querySelector('.tabeladeclasse tbody');
        const novaLinha = tabela.insertRow();
        const colData = novaLinha.insertCell(0);
        const colDescricao = novaLinha.insertCell(1);
        const colValor = novaLinha.insertCell(2);

        colData.textContent = data;
        colDescricao.textContent = descricao;
        colValor.textContent = valor.toFixed(2);

        saldoAtual -= valor;
        saldoElement.textContent = saldoAtual.toFixed(2);

        dataInput.value = "";
        descricaoInput.value = "";
        valorInput.value = "";

        mostrarInformacoes(data, descricao, valor);
    } else {
        alert("Por favor, preencha os campos corretamente.");
    }
}

function mostrarInformacoes(data, descricao, valor) {
    const quadradoInfo = document.getElementById("quadrado-info");
    const infoData = document.getElementById("info-data");
    const infoDescricao = document.getElementById("info-descricao");
    const infoValor = document.getElementById("info-valor");

    infoData.textContent = `Data: ${data}`;
    infoDescricao.textContent = `Descrição: ${descricao}`;
    infoValor.textContent = `Valor: R$ ${valor.toFixed(2)}`;

    quadradoInfo.style.display = "block";
}

function calcularGastos() {
    const tabela = document.querySelector('.tabeladeclasse tbody');
    const linhas = tabela.getElementsByTagName('tr');

    let gastosTotais = 0;

    for (let i = 1; i < linhas.length; i++) {
        const colValor = linhas[i].getElementsByTagName('td')[2];
        const valor = parseFloat(colValor.textContent);

        if (!isNaN(valor)) {
            gastosTotais += valor;
        }
    }

    const saldoElement = document.getElementById("saldo");
    saldoAtual = parseFloat(saldoElement.textContent);

    if (!isNaN(saldoAtual)) {
        saldoAtual -= gastosTotais;
        saldoElement.textContent = saldoAtual.toFixed(2);
    }
}
function limparTela() {
    const saldoElement = document.getElementById("saldo");
    const dataInput = document.getElementById("data");
    const descricaoInput = document.getElementById("descricao");
    const valorInput = document.getElementById("valor");
    const quadradoInfo = document.getElementById("quadrado-info");
    const tabela = document.querySelector('.tabeladeclasse tbody');

    saldoAtual = 0;
    saldoElement.textContent = "0";

    tabela.innerHTML = '<tr><th>Data</th><th>Descrição</th><th>Valor</th></tr>';

    dataInput.value = "";
    descricaoInput.value = "";
    valorInput.value = "";
    quadradoInfo.style.display = "none";

    location.reload();
}

function formatarDataInput() {
    const dataInput = document.getElementById("data");
    const valor = dataInput.value.replace(/\D/g, ''); // Remover todos os não dígitos

    if (valor.length > 2) {
        dataInput.value = `${valor.substr(0, 2)}/${valor.substr(2, 2)}/${valor.substr(4, 4)}`;
    } else {
        dataInput.value = valor;
    }
}

document.getElementById("data").addEventListener("input", formatarDataInput);