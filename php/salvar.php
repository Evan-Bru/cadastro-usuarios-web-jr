<?php
$arquivo = "../data/usuarios.json";

$usuarios = json_decode(file_get_contents($arquivo), true);

$novoUsuario = [
    "id" => time(),
    "nome" => $_POST["nome"],
    "email" => $_POST["email"],
    "telefone" => $_POST["telefone"]
];

$usuarios[] = $novoUsuario;

file_put_contents($arquivo, json_encode($usuarios, JSON_PRETTY_PRINT));
