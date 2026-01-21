document.addEventListener("DOMContentLoaded", () => {
    listarUsuarios();

    const form = document.getElementById("formUsuario");
    const cancelarBtn = document.getElementById("cancelar");

    form.addEventListener("submit", salvarUsuario);
    cancelarBtn.addEventListener("click", cancelarEdicao);
});

// LISTAR USUÁRIOS
function listarUsuarios() {
    fetch("php/listar.php")
        .then(response => response.json())
        .then(dados => {
            const tabela = document.getElementById("listaUsuarios");
            tabela.innerHTML = "";

            dados.forEach(usuario => {
                tabela.innerHTML += `
                    <tr>
                        <td>${usuario.nome}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.telefone}</td>
                        <td>
                            <button class="acao editar" onclick="editarUsuario(${usuario.id})">Editar</button>
                            <button class="acao excluir" onclick="excluirUsuario(${usuario.id})">Excluir</button>
                        </td>
                    </tr>
                `;
            });
        });
}

// SALVAR / EDITAR USUÁRIO
function salvarUsuario(event) {
    event.preventDefault();

    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("telefone", telefone);

    const url = id ? "php/editar.php" : "php/salvar.php";

    fetch(url, {
        method: "POST",
        body: formData
    })
    .then(() => {
        limparFormulario();
        listarUsuarios();
    });
}

// PREENCHER FORMULÁRIO PARA EDIÇÃO
function editarUsuario(id) {
    fetch("php/listar.php")
        .then(response => response.json())
        .then(dados => {
            const usuario = dados.find(u => u.id == id);

            document.getElementById("id").value = usuario.id;
            document.getElementById("nome").value = usuario.nome;
            document.getElementById("email").value = usuario.email;
            document.getElementById("telefone").value = usuario.telefone;

            document.getElementById("cancelar").style.display = "inline-block";
        });
}

// EXCLUIR USUÁRIO
function excluirUsuario(id) {
    if (!confirm("Deseja realmente excluir este usuário?")) return;

    const formData = new FormData();
    formData.append("id", id);

    fetch("php/excluir.php", {
        method: "POST",
        body: formData
    })
    .then(() => listarUsuarios());
}

// CANCELAR EDIÇÃO
function cancelarEdicao() {
    limparFormulario();
}

// LIMPAR FORMULÁRIO
function limparFormulario() {
    document.getElementById("formUsuario").reset();
    document.getElementById("id").value = "";
    document.getElementById("cancelar").style.display = "none";
}


// =====================
// TOGGLE DE TEMA
// =====================
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    if (!themeToggle) return;

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            themeIcon.classList.remove("bi-sun-fill");
            themeIcon.classList.add("bi-moon-fill");
        } else {
            themeIcon.classList.remove("bi-moon-fill");
            themeIcon.classList.add("bi-sun-fill");
        }
    });
});
