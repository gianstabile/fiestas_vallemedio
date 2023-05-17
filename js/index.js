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
