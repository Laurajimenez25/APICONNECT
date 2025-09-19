<?php
header("Content-Type: application/json");
require_once "../config/db.php";

// Crear conexión usando tu clase Database
$db = new Database();
$pdo = $db->getConnection();

// Recibir datos del frontend
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["nombre_completo"], $data["email"], $data["contrasena"])) {
    echo json_encode(["success" => false, "message" => "Faltan campos"]);
    exit;
}

$id = uniqid(); // ID simple (puedes usar UUID() en SQL si prefieres)
$nombre = $data["nombre_completo"];
$email = $data["email"];
$contrasena = password_hash($data["contrasena"], PASSWORD_BCRYPT);

try {
    $stmt = $pdo->prepare(
        "INSERT INTO usuarios (id, nombre_completo, email, contrasena, fecha_creacion) 
         VALUES (?, ?, ?, ?, NOW())"
    );
    $stmt->execute([$id, $nombre, $email, $contrasena]);

    // Verificar si insertó
    if ($stmt->rowCount() > 0) {
        echo json_encode(["success" => true, "message" => "Usuario registrado correctamente"]);
    } else {
        echo json_encode(["success" => false, "message" => "No se insertó ningún registro"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
