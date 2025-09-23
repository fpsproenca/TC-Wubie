// Dados falsos de redes Wi-Fi para teste do wubie
const redesFalsas = [
    {
        ssid: "Wi-Fi da Padaria do Zé", // Nome da rede
        seguranca: "WPA2",              // Tipo de segurança
        nivelSinal: "forte"             // Nível do sinal
    },
    {
        ssid: "Wi-Fi Grátis Shopping",
        seguranca: "ABERTA",
        nivelSinal: "forte"
    },
    {
        ssid: "Apartamento 51",
        seguranca: "WEP",               // Segurança antiga e fraca
        nivelSinal: "médio"
    },
    {
        ssid: "NET_VIRTUA_2.4G",
        seguranca: "WPA2",
        nivelSinal: "fraco"
    },
    {
        ssid: "Casa da Mel",
        seguranca: "WPA3",              // Segurança mais moderna
        nivelSinal: "forte"
    }
];

// ===============================================
// SCRIPT PRINCIPAL DO WUBIE
// ===============================================

// PARTE 1: Apresentando o JavaScript para os elementos do HTML
const btnEscanear = document.getElementById('btn-escanear');
const listaRedesDiv = document.getElementById('lista-redes');


// PARTE 2: A função que faz a mágica de mostrar as redes na tela
function mostrarRedes() {
    // Primeiro, limpa qualquer resultado antigo que estiver na tela
    listaRedesDiv.innerHTML = '';

    // Agora, para cada rede na nossa lista "redesFalsas"...
    redesFalsas.forEach(rede => {
        // 1. Cria uma <div> nova para ser a linha da nossa rede
        const itemRede = document.createElement('div');
        itemRede.className = 'rede-item'; // Aplica o estilo CSS que já fizemos

        // 2. Cria um <span> para colocar o nome da rede
        const nomeRede = document.createElement('span');
        nomeRede.textContent = rede.ssid;

        // 3. Cria um <span> para colocar o status (Segura/Insegura)
        const statusRede = document.createElement('span');

        // Lógica para decidir a cor e o texto do status
        if (rede.seguranca === 'WPA2' || rede.seguranca === 'WPA3') {
            statusRede.textContent = 'Segura';
            statusRede.className = 'rede-segura'; // Pinta de verde
        } else {
            statusRede.textContent = 'Insegura';
            statusRede.className = 'rede-insegura'; // Pinta de vermelho
        }

        // 4. Coloca o nome e o status dentro da <div> da linha
        itemRede.appendChild(nomeRede);
        itemRede.appendChild(statusRede);

        // 5. Coloca a linha completa dentro da nossa caixa principal na página
        listaRedesDiv.appendChild(itemRede);
    });
}


// PARTE 3: O comando final que liga o botão à nossa função
btnEscanear.addEventListener('click', mostrarRedes);