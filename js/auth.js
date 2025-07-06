// Variables globales
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", function () {
  if (currentUser) {
    showDashboard();
  }

  // Event listeners para los formularios
  document
    .getElementById("loginFormElement")
    .addEventListener("submit", handleLogin);
  document
    .getElementById("registerFormElement")
    .addEventListener("submit", handleRegister);
});

// Mostrar formulario de registro
function showRegister() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  loginForm.classList.add("slide-out");

  setTimeout(() => {
    loginForm.classList.add("hidden");
    loginForm.classList.remove("slide-out");
    registerForm.classList.remove("hidden");
  }, 250);

  clearErrors();
}

// Mostrar formulario de login
function showLogin() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  registerForm.classList.add("slide-out");

  setTimeout(() => {
    registerForm.classList.add("hidden");
    registerForm.classList.remove("slide-out");
    loginForm.classList.remove("hidden");
  }, 250);

  clearErrors();
}

// Mostrar dashboard
function showDashboard() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const dashboard = document.getElementById("dashboard");

  loginForm.classList.add("slide-out");
  registerForm.classList.add("slide-out");

  setTimeout(() => {
    loginForm.classList.add("hidden");
    registerForm.classList.add("hidden");
    loginForm.classList.remove("slide-out");
    registerForm.classList.remove("slide-out");
    dashboard.classList.remove("hidden");
  }, 250);

  // Mostrar solo el nombre del usuario
  document.getElementById(
    "userName"
  ).textContent = `${currentUser.name} ${currentUser.lastname}`;
}

// Limpiar errores
function clearErrors() {
  const errors = document.querySelectorAll(".error");
  errors.forEach((error) => (error.textContent = ""));
}

// Mostrar mensaje
function showMessage(text, type = "success") {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = text;
  messageDiv.className = `message ${type} show`;

  setTimeout(() => {
    messageDiv.classList.remove("show");
  }, 3000);
}

// Validar email con dominios específicos
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;

  // Lista de dominios válidos
  const validDomains = [
    "gmail.com",
    "hotmail.com",
    "outlook.com",
    "yahoo.com",
    "protonmail.com",
    "icloud.com",
    "live.com",
    "msn.com",
    "yandex.com",
    "aol.com",
    "mail.com",
    "zoho.com",
    "tutanota.com",
    "fastmail.com",
    "gmx.com",
    "me.com",
  ];

  const domain = email.split("@")[1]?.toLowerCase();
  return validDomains.includes(domain);
}

// Manejar login
function handleLogin(e) {
  e.preventDefault();
  clearErrors();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  // Validaciones
  if (!email) {
    document.getElementById("loginEmailError").textContent =
      "El email es requerido";
    return;
  }

  if (!isValidEmail(email)) {
    document.getElementById("loginEmailError").textContent =
      "Usa un email válido (Gmail, Hotmail, Outlook, etc.)";
    return;
  }

  if (!password) {
    document.getElementById("loginPasswordError").textContent =
      "La contraseña es requerida";
    return;
  }

  // Buscar usuario
  const user = users.find(
    (u) => u.email === email.toLowerCase() && u.password === password
  );

  if (user) {
    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    showMessage("¡Bienvenido de vuelta!");
    setTimeout(() => showDashboard(), 1000);
  } else {
    document.getElementById("loginPasswordError").textContent =
      "Email o contraseña incorrectos";
  }
}

// Manejar registro
function handleRegister(e) {
  e.preventDefault();
  clearErrors();

  const name = document.getElementById("registerName").value.trim();
  const lastname = document.getElementById("registerLastName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById(
    "registerConfirmPassword"
  ).value;

  let hasError = false;

  // Validaciones
  if (!name) {
    document.getElementById("registerNameError").textContent =
      "El nombre es requerido";
    hasError = true;
  }

  if (!lastname) {
    document.getElementById("registerLastNameError").textContent =
      "El apellido es requerido";
    hasError = true;
  }

  if (!email) {
    document.getElementById("registerEmailError").textContent =
      "El email es requerido";
    hasError = true;
  } else if (!isValidEmail(email)) {
    document.getElementById("registerEmailError").textContent =
      "Usa un email válido (Gmail, Hotmail, Outlook, etc.)";
    hasError = true;
  } else if (users.find((u) => u.email === email.toLowerCase())) {
    document.getElementById("registerEmailError").textContent =
      "Este email ya está registrado";
    hasError = true;
  }

  if (!password) {
    document.getElementById("registerPasswordError").textContent =
      "La contraseña es requerida";
    hasError = true;
  } else if (password.length < 6) {
    document.getElementById("registerPasswordError").textContent =
      "La contraseña debe tener al menos 6 caracteres";
    hasError = true;
  }

  if (!confirmPassword) {
    document.getElementById("registerConfirmPasswordError").textContent =
      "Confirma tu contraseña";
    hasError = true;
  } else if (password !== confirmPassword) {
    document.getElementById("registerConfirmPasswordError").textContent =
      "Las contraseñas no coinciden";
    hasError = true;
  }

  if (hasError) return;

  // Crear nuevo usuario
  const newUser = {
    id: Date.now(),
    name: name,
    lastname: lastname,
    email: email.toLowerCase(),
    password: password,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  showMessage("¡Cuenta creada exitosamente!");
  document.getElementById("registerFormElement").reset();
  setTimeout(() => showLogin(), 1500);
}

// Cerrar sesión
function logout() {
  const dashboard = document.getElementById("dashboard");
  const loginForm = document.getElementById("loginForm");

  dashboard.classList.add("slide-out");

  setTimeout(() => {
    currentUser = null;
    localStorage.removeItem("currentUser");

    dashboard.classList.add("hidden");
    dashboard.classList.remove("slide-out");
    loginForm.classList.remove("hidden");

    document.getElementById("loginFormElement").reset();
    clearErrors();

    showMessage("Sesión cerrada correctamente");
  }, 250);
}
