
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("registerForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("contrasena");
  const roleInputs = document.querySelectorAll("input[name='role']");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita que recargue la página

    // Captura de datos
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let role = "beekeeper"; // por defecto
    roleInputs.forEach(input => {
      if (input.checked) role = input.value;
    });

    // Validaciones básicas en el cliente
    if (!email || !password) {
      alert("Por favor ingresa tu correo y contraseña.");
      return;
    }

    // Enviar los datos al backend (ejemplo con fetch)
    try {
      const response = await fetch("http://localhost:3000/login", { // Ajusta tu ruta
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role })
      });

      const data = await response.json();

      if (response.ok) {
        // Éxito: redirigir según rol
        if (role === "beekeeper") {
          window.location.href = "/dashboard-apicultor.html";
        } else if (role === "cooperative") {
          window.location.href = "/dashboard-cooperativa.html";
        }
      } else {
        // Error del servidor
        alert(data.message || "Error al iniciar sesión. Verifica tus datos.");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("No se pudo conectar con el servidor.");
    }
  });
});

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("contrasena").value;

    const response = await fetch("../backend/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasena })
    });

    const result = await response.json();
    alert(result.message);
});
