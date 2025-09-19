document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const inputs = form.querySelectorAll("input");
  const password = document.getElementById("contrasena");
  const confirmPassword = document.getElementById("confirm-contrasena");

  // Crear contenedor de mensajes dinámicos
  const showMessage = (message, type = "error") => {
    let messageBox = document.querySelector("#form-message");
    if (!messageBox) {
      messageBox = document.createElement("div");
      messageBox.id = "form-message";
      messageBox.className = "mt-4 text-sm font-medium";
      form.appendChild(messageBox);
    }
    messageBox.textContent = message;
    messageBox.className =
      type === "error"
        ? "mt-4 text-sm font-medium text-red-600"
        : "mt-4 text-sm font-medium text-green-600";
  };

  // Validación de contraseñas
  const validatePasswords = () => {
    if (password.value !== confirmPassword.value) {
      showMessage("⚠️ Las contraseñas no coinciden.", "error");
      return false;
    }
    if (password.value.length < 6) {
      showMessage("⚠️ La contraseña debe tener al menos 6 caracteres.", "error");
      return false;
    }
    return true;
  };

  // Validación de email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validación + envío al backend
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const nombre_completo = formData.get("nombre")?.trim();
    const email = formData.get("email")?.trim();
    const contrasena = password.value;
    const role = formData.get("role");

    if (!nombre_completo || !email || !contrasena || !confirmPassword.value) {
      showMessage("⚠️ Por favor, completa todos los campos.", "error");
      return;
    }

    if (!validateEmail(email)) {
      showMessage("⚠️ Ingresa un correo electrónico válido.", "error");
      return;
    }

    if (!validatePasswords()) return;

    try {
      const response = await fetch("../backend/api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre_completo, email, contrasena, role })
      });

      const result = await response.json();

      if (response.ok) {
        showMessage("🎉 Registro exitoso. Redirigiendo...", "success");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1500);
      } else {
        showMessage(`⚠️ ${result.message}`, "error");
      }
    } catch (error) {
      showMessage("⚠️ Error de conexión con el servidor.", "error");
      console.error(error);
    }
  });

  // Validación en tiempo real
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (password.value && confirmPassword.value) validatePasswords();
    });
  });
});
