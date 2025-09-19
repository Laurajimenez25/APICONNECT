<?php
require_once __DIR__ . '/../models/User.php';

class AuthController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function register($name, $email, $password, $role = "usuario") {
        $user = new User($this->db);
        $user->name = $name;
        $user->email = $email;
        $user->password = password_hash($password, PASSWORD_BCRYPT);
        $user->role = $role;

        return $user->register();
    }

    public function login($email, $password) {
        $user = new User($this->db);
        $user->email = $email;
        $stmt = $user->login();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row && password_verify($password, $row['password'])) {
            return ["status" => "success", "user" => $row];
        }
        return ["status" => "error", "message" => "Credenciales inválidas"];
    }
}
?>
