// Boton de scroll
const scrollUpButton = document.getElementById("scrollUpButton");

window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 400) {
    scrollUpButton.classList.add("show");
  } else {
    scrollUpButton.classList.remove("show");
  }
});

scrollUpButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//alternador de texto
const alternateText = document.querySelector(".alternate-text");
alternateText.addEventListener("animationiteration", () => {
  const words = [
    "un cumpleaños",
    "una fiesta",
    "un evento",
    "una reunión",
    "una boda",
  ];
  const currentWord = alternateText.innerText;
  const index = words.indexOf(currentWord);
  const nextIndex = (index + 1) % words.length;
  const nextWord = words[nextIndex];
  alternateText.innerText = nextWord;
});

// Sweet Alert
function btnPresupuesto(proveedor) {
  let correoElectronico = "";

  // Verificar el proveedor seleccionado y asignar el correo electrónico correspondiente
  if (proveedor === "lambda") {
    correoElectronico = "lambdavisual@gmail.com";
  } else if (proveedor === "proveedor2") {
    correoElectronico = "correo2@example.com";
  } else if (proveedor === "proveedor3") {
    correoElectronico = "correo3@example.com";
  }

  Swal.fire({
    title: "Pedir Presupuesto",
    html:
      '<form name="contact" id="presupuesto-form" netlify>' +
      '<input type="text" name="nombre" id="nombre" placeholder="Nombre completo (obligatorio)" class="swal2-input">' +
      '<input type="email" name="email" id="email" placeholder="Correo electrónico (obligatorio)" class="swal2-input">' +
      '<input type="tel" name="telefono" id="telefono" placeholder="Teléfono (obligatorio)" class="swal2-input">' +
      '<textarea name="mensaje" id="mensaje" placeholder="Escriba su motivo con la mayor cantidad de detalles (servicios que requiere para su fiesta)." class="swal2-textarea"></textarea>' +
      '<input type="submit" style="display:none">' +
      "</form>",
    confirmButtonText: "Enviar",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    focusConfirm: false,
    preConfirm: () => {
      return new Promise((resolve) => {
        const form = Swal.getPopup().querySelector("#presupuesto-form");
        const nombre = Swal.getPopup().querySelector("#nombre").value;
        const email = Swal.getPopup().querySelector("#email").value;
        const telefono = Swal.getPopup().querySelector("#telefono").value;
        const mensaje = Swal.getPopup().querySelector("#mensaje").value;

        // Validar campos
        if (!nombre || !email || !telefono) {
          Swal.showValidationMessage("Todos los campos son obligatorios");
          resolve(false);
        }

        // Validar formato de email
        if (!validateEmail(email)) {
          Swal.showValidationMessage(
            "El correo electrónico no tiene un formato válido"
          );
          resolve(false);
        }

        // Validar formato de teléfono móvil (Argentina)
        if (!validatePhoneNumber(telefono)) {
          Swal.showValidationMessage("El teléfono no tiene un formato válido");
          resolve(false);
        }

        form.addEventListener("submit", (event) => {
          event.preventDefault();
          resolve(new FormData(form));
        });

        form.querySelector('input[type="submit"]').click();
      });
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const formData = result.value;
      const mensaje = formData.get("mensaje");

      // Enviar los datos del formulario a través de FormSubmit
      const formSubmitEndpoint = 'https://formsubmit.co/319dcf5e5a7ea5828be06c22ad2395a3';
      fetch(formSubmitEndpoint, {
        method: "POST",
        body: formData,
      });

      // Los valores se encuentran en formData, no en result.value
      const nombre = formData.get("nombre");
      const email = formData.get("email");
      const telefono = formData.get("telefono");

      // Aquí puedes enviar la información del usuario, incluido el correo electrónico del proveedor seleccionado, a un servidor con una petición HTTP o utilizarla para otra acción.
      console.log(`Proveedor: ${proveedor}`);
      console.log(`Correo electrónico: ${correoElectronico}`);
      console.log(`Nombre: ${nombre}`);
      console.log(`Email: ${email}`);
      console.log(`Teléfono: ${telefono}`);
      console.log(`Mensaje: ${mensaje}`);

      Swal.fire(
        "¡Gracias!",
        "Tu solicitud de presupuesto ha sido enviada.",
        "success"
      );
    }
  });
}

// Función para validar el formato de un correo electrónico
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función para validar el formato de un teléfono móvil (Argentina)
function validatePhoneNumber(phoneNumber) {
  const phoneNumberRegex = /^\+?(\d{2})?(\d{10})$/;
  return phoneNumberRegex.test(phoneNumber);
}
