// Aqui ficam todas as boxes criadas pelo usuário.
let boxes = [];

// Guardam o item que está sendo editado.
let boxEditando = null;
let musicaEditando = null;

const formularioBox = document.querySelector("#formBox");
const campoNomeBox = document.querySelector("#nomeBox");
const listaBoxes = document.querySelector("#listaBoxes");

// Mostra na tela todas as boxes e suas músicas.
function mostrarBoxes() {
  listaBoxes.innerHTML = "";

  boxes.forEach((box, indiceBox) => {
    let musicasHTML = "";

    box.musicas.forEach((musica, indiceMusica) => {
      musicasHTML += `
        <div class="musica">
          <strong>🎶 ${musica.nome}</strong>
          <p>💬 ${musica.comentario}</p>

          <button onclick="editarMusica(${indiceBox}, ${indiceMusica})">
            Editar música
          </button>

          <button class="remover" onclick="excluirMusica(${indiceBox}, ${indiceMusica})">
            Remover música
          </button>
        </div>
      `;
    });

    const musicaAtual = musicaEditando && musicaEditando.box === indiceBox
      ? box.musicas[musicaEditando.indice]
      : null;

    const textoBotao = musicaAtual ? "Salvar música" : "Adicionar música";

    listaBoxes.innerHTML += `
      <article class="box">
        <h2>🎧 ${box.nome}</h2>

        <div class="acoes">
          <button onclick="editarBox(${indiceBox})">Editar box</button>

          <button class="excluir" onclick="excluirBox(${indiceBox})">
            Excluir box
          </button>
        </div>

        <form onsubmit="adicionarMusica(event, ${indiceBox})">
          <input
            id="musica${indiceBox}"
            placeholder="Nome da música"
            required
            value="${musicaAtual ? musicaAtual.nome : ""}"
          >

          <input
            id="comentario${indiceBox}"
            placeholder="Comentário"
            required
            value="${musicaAtual ? musicaAtual.comentario : ""}"
          >

          <button>${textoBotao}</button>
        </form>

        ${musicasHTML}
      </article>
    `;
  });
}

// Cria uma box nova ou salva uma alteração.
formularioBox.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = campoNomeBox.value;

  if (boxEditando === null) {
    boxes.push({
      nome,
      musicas: []
    });
  } else {
    boxes[boxEditando].nome = nome;
    boxEditando = null;
  }

  formularioBox.reset();
  mostrarBoxes();
});

// Cria ou atualiza uma música.
function adicionarMusica(event, indiceBox) {
  event.preventDefault();

  const nome = document.querySelector(`#musica${indiceBox}`).value;
  const comentario = document.querySelector(`#comentario${indiceBox}`).value;

  if (musicaEditando && musicaEditando.box === indiceBox) {
    boxes[indiceBox].musicas[musicaEditando.indice] = {
      nome,
      comentario
    };

    musicaEditando = null;
  } else {
    boxes[indiceBox].musicas.push({
      nome,
      comentario
    });
  }

  mostrarBoxes();
}

// Preenche os campos da música para edição.
function editarMusica(indiceBox, indiceMusica) {
  musicaEditando = {
    box: indiceBox,
    indice: indiceMusica
  };

  mostrarBoxes();
}

// Preenche o formulário principal para editar uma box.
function editarBox(indiceBox) {
  campoNomeBox.value = boxes[indiceBox].nome;
  boxEditando = indiceBox;
  campoNomeBox.focus();
}

// Exclui uma box inteira.
function excluirBox(indiceBox) {
  boxes.splice(indiceBox, 1);
  boxEditando = null;
  musicaEditando = null;

  mostrarBoxes();
}

// Exclui uma música.
function excluirMusica(indiceBox, indiceMusica) {
  boxes[indiceBox].musicas.splice(indiceMusica, 1);
  musicaEditando = null;

  mostrarBoxes();
}

mostrarBoxes();
