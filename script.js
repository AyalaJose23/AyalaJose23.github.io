// Función para validar email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Función para mostrar errores
function markError(fieldId, message) {
  const field = document.getElementById(fieldId);
  field.classList.add('error');

  let errorElement = field.nextElementSibling;
  if (!errorElement || !errorElement.classList.contains('error-message')) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    field.parentNode.insertBefore(errorElement, field.nextSibling);
  }
  errorElement.textContent = message;
}

// Función para limpiar errores
function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  field.classList.remove('error');

  const errorElement = field.nextElementSibling;
  if (errorElement && errorElement.classList.contains('error-message')) {
    errorElement.remove();
  }
}

// Función principal cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', function() {
  // Configurar EmailJS con tu User ID (public key)
  (function() {
    emailjs.init('jy0A_MFp_dxSoM6Vo');
  })();

  const formulario = document.getElementById('formulario-contacto');
  if (!formulario) return;

  formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    let isValid = true;

    // Validación de nombre
    if (nombre === '') {
      markError('nombre', 'Por favor ingresa tu nombre');
      isValid = false;
    } else {
      clearError('nombre');
    }

    // Validación de email
    if (email === '') {
      markError('email', 'Por favor ingresa tu email');
      isValid = false;
    } else if (!isValidEmail(email)) {
      markError('email', 'Por favor ingresa un email válido');
      isValid = false;
    } else {
      clearError('email');
    }

    // Validación de mensaje
    if (mensaje === '') {
      markError('mensaje', 'Por favor ingresa un mensaje');
      isValid = false;
    } else {
      clearError('mensaje');
    }

    // Si todo es válido, enviar el formulario
    if (isValid) {
      // Mostrar estado de carga
      const btnEnviar = document.getElementById('btn-enviar');
      btnEnviar.disabled = true;
      btnEnviar.innerHTML = 'Enviando... <i class="fa-solid fa-paper-plane"></i>';

      emailjs.send("service_4yu6uoe", "template_qosx41i", {
        from_name: nombre,
        from_email: email,
        message: mensaje,
        time: new Date().toLocaleString()
      }).then(function(response) {
        alert("¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.");
        formulario.reset();
      }, function(error) {
        alert("Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.");
        console.error("Error EmailJS:", error);
      }).finally(() => {
        btnEnviar.disabled = false;
        btnEnviar.innerHTML = 'Enviar Mensaje <i class="fa-solid fa-paper-plane"></i>';
      });
    }
  });
});