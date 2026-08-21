console.log("WP THEME FRAMEWORK");
/**
 * Cambio de fondo del Navbar con scroll
 */
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const logo = document.getElementById("site-logo");
  logo.style.transition = "width 0.3s ease, height 0.3s ease";
  const shrinkOn = 50;
  function resizeLogo() {
    if (window.scrollY > shrinkOn) {
      logo.classList.add("logo-small");
      logo.setAttribute("width", "30px");
      logo.setAttribute("height", "30px");
      navbar.classList.remove("bg-transparent");
      navbar.classList.add("bg-body-tertiary");
    } else {
      logo.classList.remove("logo-small");
      logo.setAttribute("width", "60px");
      logo.setAttribute("height", "60px");
      navbar.classList.remove("bg-body-tertiary");
      navbar.classList.add("bg-transparent");
    }
  }
  window.addEventListener("scroll", resizeLogo);
});
