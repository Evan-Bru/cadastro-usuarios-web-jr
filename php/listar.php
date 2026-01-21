<?php
$arquivo = "../data/usuarios.json";

if (!file_exists($arquivo)) {
    echo json_encode([]);
    exit;
}

$dados = file_get_contents($arquivo);
echo $dados;
