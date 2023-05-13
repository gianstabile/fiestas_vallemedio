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
// const btnPresupuesto = document.getElementById("btn-pedir-presupuesto");
function btnPresupuesto() {
  Swal.fire({
    title: "Pedir Presupuesto",
    html:
      '<input type="text" id="nombre" placeholder="Nombre completo" class="swal2-input">' +
      '<input type="email" id="email" placeholder="Correo electrónico" class="swal2-input">' +
      '<input type="tel" id="telefono" placeholder="Teléfono" class="swal2-input">',
    confirmButtonText: "Enviar",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    focusConfirm: false,
    preConfirm: () => {
      const nombre = Swal.getPopup().querySelector("#nombre").value;
      const email = Swal.getPopup().querySelector("#email").value;
      const telefono = Swal.getPopup().querySelector("#telefono").value;
      if (!nombre || !email || !telefono) {
        Swal.showValidationMessage(`Todos los campos son obligatorios`);
      }
      return { nombre: nombre, email: email, telefono: telefono };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { nombre, email, telefono } = result.value;

      // Aquí puedes enviar la información del usuario a un servidor con una petición HTTP o utilizarla para otra acción.
      Swal.fire(
        "¡Gracias!",
        "Tu solicitud de presupuesto ha sido enviada.",
        "success"
      );
    }
  });
}
