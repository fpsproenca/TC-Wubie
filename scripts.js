const todasRedesFalsas = [
    { ssid: "Wi-Fi da Padaria do Zé", seguranca: "WPA2", nivelSinal: "forte" },
    { ssid: "Wi-Fi Grátis Shopping", seguranca: "ABERTA", nivelSinal: "forte" },
    { ssid: "Apartamento 51", seguranca: "WEP", nivelSinal: "médio" },
    { ssid: "NET_VIRTUA_2.4G", seguranca: "WPA2", nivelSinal: "fraco" },
    { ssid: "Casa da Mel", seguranca: "WPA3", nivelSinal: "forte" },
    { ssid: "Bar do João", seguranca: "ABERTA", nivelSinal: "fraco" }
];
function descricaoSeguranca(sec) {
    if (sec === "WPA3") return "WPA3 - Mais segura";
    if (sec === "WPA2") return "WPA2 - Considerada segura";
    if (sec === "WEP") return "WEP - Segurança fraca e obsoleta";
    if (sec === "ABERTA") return "ABERTA - Qualquer um pode acessar, insegura";
    return "Desconhecido";
}
function ehRedeSegura(sec) {
    return sec === "WPA2" || sec === "WPA3";
}
function iconeSinal(nivel) {
    if (nivel === "forte") return "📶";
    if (nivel === "médio") return "📶";
    if (nivel === "fraco") return "📶";
    return "📶";
}
function corSinal(nivel) {
    if (nivel === "forte") return "green";
    if (nivel === "médio") return "orange";
    if (nivel === "fraco") return "red";
    return "grey";
}

// Elementos DOM
const btnEscanear = document.getElementById('btn-escanear');
const btnAtualizar = document.getElementById('btn-atualizar');
const listaSegurasDiv = document.getElementById('lista-seguras');
const listaInsegurasDiv = document.getElementById('lista-inseguras');
const alertaTopo = document.getElementById('alerta-topo');
const contagemRedes = document.getElementById('contagem-redes');
const toggleDarkmode = document.getElementById('toggle-darkmode');
const redesCategorias = document.querySelector('.redes-categorias');
const mensagemInicial = document.getElementById('mensagem-inicial');

// Mostrar Redes
function mostrarRedes() {
    listaSegurasDiv.innerHTML = "";
    listaInsegurasDiv.innerHTML = "";
    alertaTopo.innerHTML = "";
    contagemRedes.textContent = "";
    let redes = todasRedesFalsas;

    // Mostra listas e contagem após scan
    contagemRedes.style.display = "block";
    redesCategorias.style.display = "block";
    if (mensagemInicial) mensagemInicial.style.display = "none";

    // Separar categorias
    const seguras = redes.filter(r => ehRedeSegura(r.seguranca));
    const inseguras = redes.filter(r => !ehRedeSegura(r.seguranca));

    // Mostra alerta se tiver redes inseguras
    if (inseguras.length > 0) {
        alertaTopo.innerHTML =
            `<div class="alerta-insegura">⚠️ Atenção! Existem redes inseguras ao alcance.</div>`;
    } else {
        alertaTopo.innerHTML =
            `<div class="alerta-segura">Todas as redes disponíveis são seguras.</div>`;
    }
    contagemRedes.innerHTML =
        `<strong>Total:</strong> ${redes.length} &nbsp; |&nbsp; <span class="seguro-texto">Seguras: ${seguras.length}</span> &nbsp; |&nbsp; <span class="inseguro-texto">Inseguras: ${inseguras.length}</span>`;
    seguras.forEach(rede => listaSegurasDiv.appendChild(linhaRede(rede, true)));
    inseguras.forEach(rede => listaInsegurasDiv.appendChild(linhaRede(rede, false)));
}
function linhaRede(rede, segura) {
    const div = document.createElement('div');
    div.className = 'rede-item ' + (segura ? 'rede-segura' : 'rede-insegura');
    div.title = descricaoSeguranca(rede.seguranca);
    div.innerHTML = `
        <span class="icone-wifi" style="color:${corSinal(rede.nivelSinal)}">${iconeSinal(rede.nivelSinal)}</span>
        <span class="ssid">${rede.ssid}</span>
        <span class="seg-label">${rede.seguranca}</span>
        <span class="nivel-sinal" style="color:${corSinal(rede.nivelSinal)}">${rede.nivelSinal}</span>
        <button class="btn-copy" title="Copiar nome da rede" onclick="copiarSSID('${rede.ssid}')">📋</button>
    `;
    return div;
}
window.copiarSSID = function(ssid) {
    navigator.clipboard.writeText(ssid);
    alert(`Nome da rede "${ssid}" copiado!`);
};
// Dark Mode Toggle
toggleDarkmode.addEventListener('click', () => {
    document.body.classList.toggle('darkmode');
});
// Eventos
btnEscanear.addEventListener('click', mostrarRedes);
btnAtualizar.addEventListener('click', mostrarRedes);
