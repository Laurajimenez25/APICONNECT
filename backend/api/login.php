<?php
header("Content-Type: application/json");
require_once "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["email"], $data["contrasena"])) {
    echo json_encode(["success" => false, "message" => "Faltan credenciales"]);
    exit;
}

$email = $data["email"];
$contrasena = $data["contrasena"];

$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
$stmt->execute([$email]);
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

if ($usuario && password_verify($contrasena, $usuario["contrasena"])) {
    echo json_encode(["success" => true, "message" => "Login exitoso", "usuario" => $usuario["nombre_completo"]]);
} else {
    echo json_encode(["success" => false, "message" => "Credenciales inválidas"]);
}
?>
