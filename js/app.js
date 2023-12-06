// Agrega un evento de 'submit' al formulario
document.querySelector('form').addEventListener('submit', function (e) {
    // Previene la acción por defecto del formulario (enviar los datos)
    e.preventDefault();

    // Obtiene el campo de país
    let countrySelect = document.querySelector('.select');

    // Verifica si el campo de país está seleccionado
    if (countrySelect.value === "País") {
        // Muestra una alerta si el país no está seleccionado
        alert('Por favor, selecciona un país');
        return;
    }

    // Obtiene todos los campos de entrada en el formulario
    let inputs = document.querySelectorAll('input, select');

    // Verifica si todos los campos están llenos
    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
            // Si un campo está vacío, muestra un mensaje y detiene la función
            alert('Todos los campos son obligatorios');
            return;
        }
    }

    // Muestra el spinner
    document.querySelector('.spinner').parentElement.classList.remove('hidden');

    // Oculta el spinner y muestra el mensaje de éxito después de 3 segundos
    setTimeout(function () {
        // Oculta el spinner
        document.querySelector('.spinner').parentElement.classList.add('hidden');

        // Muestra la alerta
        setTimeout(function () {
            alert('Registrado correctamente, revisa tu correo para confirmar tu registro');

            // Restablece el formulario
            document.querySelector('form').reset();
        }, 100);  // Muestra la alerta 100 milisegundos después de ocultar el spinner
    }, 3000);  // Espera 3 segundos antes de ocultar el spinner
});

// Agrega un evento de 'input' a cada campo de entrada
document.querySelectorAll('input, select').forEach(function (input) {
    // Establece un mensaje de validación personalizado cuando el campo está vacío
    input.oninvalid = function (event) {
        event.target.setCustomValidity('Este campo es obligatorio');
    }

    // Limpia el mensaje de validación personalizado cuando el campo no está vacío
    input.oninput = function (event) {
        event.target.setCustomValidity('');
    }
});