<?php
$arquivo = "../data/usuarios.json";

$usuarios = json_decode(file_get_contents($arquivo), true);

$usuarios = array_filter($usuarios, function ($usuario) {
    return $usuario["id"] != $_POST["id"];
});

file_put_contents($arquivo, json_encode(array_values($usuarios), JSON_PRETTY_PRINT));
