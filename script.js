// Seleciona o elemento que exibe o jogador atual
const currentPlayer = document.querySelector(".currentPlayer");

// Inicializa variáveis para o estado do jogo
let selected;
let player = "X"; // Define o jogador inicial como "X"

// Define as combinações vencedoras possíveis
let positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

// Função para inicializar o jogo
function init() {
    selected = Array(10).fill(""); // Inicializa com 10 elementos vazios

    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`; // Atualiza o jogador atual

    // Configura os botões do jogo
    document.querySelectorAll(".game button").forEach((item) => {
        item.innerHTML = "";
        item.addEventListener("click", newMove); // Adiciona evento de clique para cada botão
    });
}

// Chama a função de inicialização
init();

// Função para lidar com a nova jogada
function newMove(e) {
    const index = e.target.getAttribute("data-i");
    if (selected[index]) return; // Previne sobreposição de jogadas

    e.target.innerHTML = player; // Marca a jogada do jogador atual
    e.target.removeEventListener("click", newMove); // Remove o evento de clique após a jogada
    selected[index] = player; // Atualiza o array de seleções

    setTimeout(() => {
        check(); // Verifica o estado do jogo após a jogada
    }, 100);

    // Alterna o jogador
    player = player === "X" ? "O" : "X";
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`; // Atualiza o jogador atual
}

// Função para verificar o estado do jogo
function check() {
    let playerLastMove = player === "X" ? "O" : "X"; // Define o jogador da última jogada
    const items = selected
        .map((item, i) => [item, i])
        .filter((item) => item[0] === playerLastMove)
        .map((item) => item[1]);

    // Verifica se há uma combinação vencedora
    for (let pos of positions) {
        if (pos.every((item) => items.includes(item))) {
            alert(`O JOGADOR '${playerLastMove}' GANHOU!`); // Exibe uma mensagem de vitória
            init(); // Reinicia o jogo
            return;
        }
    }
    
    // Verifica se o jogo deu empate
    if (selected.filter((item) => item).length === 9) {
        alert("DEU EMPATE!"); // Exibe uma mensagem de empate
        init(); // Reinicia o jogo
        return;
    }
}
