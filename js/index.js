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

//enviar por whatsapp
function enviarWhatsApp(proveedor) {
  let numeroTelefono = ""; // Variable para almacenar el número de teléfono según el proveedor

  // Asignar el número de teléfono correspondiente según el proveedor
  if (proveedor === "lambda") {
    numeroTelefono = "5492984899820"; // Número de teléfono del proveedor 1
  } else if (proveedor === "maquilleria") {
    numeroTelefono = "5492984735925"; // Número de teléfono del proveedor 2
  } else if (proveedor === "proveedor3") {
    numeroTelefono = "ZZZZZZZZZ"; // Número de teléfono del proveedor 3
  }

  const mensaje =
    "¡Hola! Estoy interesado/a en tus servicios y quiero solicitar un presupuesto.";
  const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(
    mensaje
  )}`;
  window.open(enlaceWhatsApp);
}
