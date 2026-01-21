<?php
$arquivo = "../data/usuarios.json";

$usuarios = json_decode(file_get_contents($arquivo), true);

foreach ($usuarios as &$usuario) {
    if ($usuario["id"] == $_POST["id"]) {
        $usuario["nome"] = $_POST["nome"];
        $usuario["email"] = $_POST["email"];
        $usuario["telefone"] = $_POST["telefone"];
        break;
    }
}

file_put_contents($arquivo, json_encode($usuarios, JSON_PRETTY_PRINT));
