import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

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
/**
 * Cambio de Idioma
 */
if (document.getElementById('cambiar_idioma')) {
  document.getElementById('cambiar_idioma').addEventListener('click', cambiarIdioma);
  function cambiarIdioma() {
    document.body.classList.toggle('lang-es');
    document.body.classList.toggle('lang-en');
  }
}
/**
 * Buscar interactivo
 */
if (document.getElementById("frmbuscar")) {
  const formulario = document.getElementById("frmbuscar");
  const data = new FormData(formulario);
  const buscar = document.getElementById("impbuscar");
  const resultados = document.getElementById("resultados");
  const btn_cerrar = document.getElementById("btn_cerrar");
  const resultados_busqueda = document.getElementById("resultados_busqueda");
  var typingTimer = 0;

  buscar.addEventListener("keyup", f_mostrar_resultados);

  function f_mostrar_resultados() {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(f_obtener_resultados, 200);
  }
  function f_obtener_resultados() {
    resultados.classList.remove("invisible");
    resultados.style.height = "auto";
    if (buscar.value != "") {
      const url = data.get("url") + buscar.value;
      const msg = data.get("msg");
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.length) {
            resultados_busqueda.innerHTML = `
                     <ul>
                        ${data
                .map(
                  (item) =>
                    `<li><a href="${item.link}">${item.title.rendered}</a></li>`
                )
                .join("")}
                     </ul>`;
          } else {
            resultados_busqueda.innerHTML = msg;
          }
        })
        .catch((err) => console.log(err));
    } else {
      resultados.classList.add("invisible");
    }
  }

  btn_cerrar.addEventListener("click", () => {
    buscar.value = "";
    buscar.focus();
    resultados.classList.add("invisible");
  });
}
/**
 * Habilita los tooltips en Bootstrap
 */
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
if (document.getElementById('frmingresar')) {
  const clave = document.getElementById('clave')
  const ver_clave = document.getElementById('ver_clave')
  ver_clave.addEventListener('click', () => {
    if (clave.type === 'password') {
      clave.type = 'text'
      ver_clave.classList.remove('bi-eye')
      ver_clave.classList.add('bi-eye-slash')
    } else {
      clave.type = 'password'
      ver_clave.classList.remove('bi-eye-slash')
      ver_clave.classList.add('bi-eye')
    }
  })
}
/**
 * Botón para editar posts
 */
if (document.getElementById("single")) {
  document.getElementById("btn_editar_post").addEventListener("click", () => {
    document.getElementById("single_post").setAttribute("hidden", "");
    document.getElementById("single_editar").removeAttribute("hidden");
  });
  document.getElementById("btn_cancelar").addEventListener("click", () => {
    document.getElementById("single_editar").setAttribute("hidden", "");
    document.getElementById("single_post").removeAttribute("hidden");
  });
}
/**
 * Captura archivos CSV
 */
if (document.getElementById("csvfilefrm")) {
  document.getElementById("csvfile").addEventListener("change", function () {
    const csvfile = document.getElementById("csvfile").value;
    const csvfile2 = csvfile.split("\\");
    document.getElementById("lbl_csvfile").innerHTML = csvfile2[2];
  });
}
/**
 * Captura archivos XLSX
 */
if (document.getElementById("xlsxfilefrm")) {
  document.getElementById("xlsxfile").addEventListener("change", function () {
    const xlsxfile = document.getElementById("xlsxfile").value;
    const xlsxfile2 = xlsxfile.split("\\");
    document.getElementById("lbl_xlsxfile").innerHTML = xlsxfile2[2];
  });
}
/**
 * Consulta de los tipos de cambio
 */
if (document.getElementById("resumengeneral")) {
  const moneda = document.getElementById("resumengeneral").dataset.moneda_pais;
  async function getData() {
    const dataform = new FormData();
    dataform.append("action", "tipocambio");
    dataform.append("nonce", SGF_AJAX.nonce);
    const url = SGF_AJAX.endpoint;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: dataform,
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      if (result.data.action) {
        console.log(result.data.action);
        console.log(result.data.msg);
        const response_tc = await fetch(
          "https://v6.exchangerate-api.com/v6/16244990692db4dc913e0bea/latest/USD"
        );
        if (!response_tc.ok) {
          console.log(
            "Error en la API de tipo de cambio. Estado:",
            response_tc.status
          );
          return 0;
        }
        const data_tc = await response_tc.json();
        return data_tc.conversion_rates[moneda];
      } else {
        console.log(result.data.msg);
        return false;
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  async function cambiarTc() {
    const tipocambio = await getData();
    if (tipocambio > 0) {
      const dataform = new FormData();
      dataform.append("action", "actualiza_tipocambio");
      dataform.append("nonce", SGF_AJAX.nonce);
      dataform.append("tipocambio", tipocambio);
      const url = SGF_AJAX.endpoint;
      try {
        const response = await fetch(url, {
          method: "POST",
          body: dataform,
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        if (result.data.action) {
          console.log(result.data.tipocambio);
          location.reload();
        } else {
          console.log(result.data.msg);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  }
  cambiarTc();
}
/**
 * Manejo del contenido del resumen general
 */
if (document.getElementById("tab-container")) {
  const tabsContainer = document.getElementById("tab-container");
  const tabLinks = tabsContainer.querySelectorAll(".nav-link");
  const tabContents = tabsContainer.querySelectorAll(".tab-content");
  tabLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      // Remueve la clase 'active' de todos los enlaces de pestañas
      tabLinks.forEach(function (l) {
        l.classList.remove("active");
      });
      // Añade la clase 'active' al enlace clickeado
      event.target.classList.add("active");
      // Oculta todos los contenidos de las pestañas
      tabContents.forEach(function (content) {
        content.classList.add("d-none");
      });
      // Muestra el contenido correspondiente a la pestaña clickeada
      const targetTab = event.target.getAttribute("data-tab");
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.remove("d-none");
      }
    });
  });
}
/**
 * Manejo del contenido de los números telefónicos
 */

if (document.getElementById('whatsapp')) {
  const whatsapp = document.getElementById("whatsapp");
  const fullNumberInput = document.getElementById("whatsapp_full");

  const iti = intlTelInput(whatsapp, {
    initialCountry: "auto",
    autoPlaceholder: "aggressive",
    geoIpLookup: (success, failure) => {
      fetch("https://ipapi.co/json")
        .then(res => res.json())
        .then(data => success(data.country_code))
        .catch(() => failure());
    },
    loadUtils: () => import("intl-tel-input/utils"),
  });
  whatsapp.addEventListener('input', () => {
    fullNumberInput.value = iti.getNumber();
  })
}

/******************************************************************************
 *
 * Función para validar datos de cualquier formulario antes del envío de datos.
 *
 *****************************************************************************/

document.addEventListener("submit", function (event) {
  if (event.submitter.name != "wpphp") {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target;
    const formulario = document.getElementById(form.id);
    const dataform = new FormData(formulario);
    dataform.append("action", event.submitter.name);
    dataform.append("nonce", SGF_AJAX.nonce);
    let boton = event.submitter.name;
    let accion = (boton.match(/^[^_]+/) || [])[0] || "filtrar"
    // let accion = boton.match(/^[^_]+/)[0]
    console.log(accion)
    if (formulario.checkValidity()) {
      switch (accion) {
        case "eliminar":
          Swal.fire({
            title: dataform.get("msg_eliminar"),
            text: "¡No podrá revertir esta acción!",
            icon: "warning",
            showClass: {
              popup: "animate__animated animate__fadeInUp",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sí, deseo borrar.",
          }).then((result) => {
            if (result.isConfirmed) {
              send_data(dataform);
            } else {
              location.reload();
            }
          });
          break;
        case "csvfile":
          Swal.fire({
            title: "Procesando Archivo CSV",
            didOpen: () => {
              Swal.showLoading();
            },
          });
          send_data(dataform);
          break;
        case "xlsxfile":
          Swal.fire({
            title: "Procesando Archivo EXCEL",
            didOpen: () => {
              Swal.showLoading();
            },
          });
          send_data(dataform);
          break;
        case "pjs":
          console.log("Procesado por JS particular");
          break;
        case "filtrar":
        case "etiquetar":
          console.log("filtrar y etiquetar");
          break;
        default:
          if (typeof dataform !== "undefined" && dataform !== null) {
            console.log("pasó por default");
            send_data(dataform);
          }
      }
    }
    listarCampos(dataform);
    form.classList.add("was-validated");
  }
});
/******************************************************************************
 *
 * Función para enviar datos de cualquier formulario por medio de AJAX
 *
 *****************************************************************************/
async function send_data(dataform) {
  const request = new Request(SGF_AJAX.endpoint, {
    method: "POST",
    body: dataform,
  });
  try {
    const response = await fetch(request);
    const data = await response.json();
    if (data.success) {
      if (data.data.action === "ingresar") {
        window.location = SGF_AJAX.home;
      } else {
        Swal.fire({
          icon: "success",
          title: data.data.titulo,
          showConfirmButton: false,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          text: data.data.msg,
          timer: 2000,
        });
        setTimeout(() => {
          if (data.data.action === "recuperar") {
            window.location = data.data.redireccion
          } else if (data.data.action === "nuevo") {
            window.location = data.data.redireccion
          } else {
            location.reload();
          }
        }, 2500);
      }
    } else {
      console.log("ERROR", data);
      Swal.fire({
        icon: "error",
        title: "Error",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        text: data.data.msg,
        showConfirmButton: false,
        timer: 4000,
      });
      setTimeout(() => {
        location.reload();
      }, 5000);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}
function listarCampos(dataform) {
  for (var pair of dataform.entries()) {
    var nombre = pair[0];
    var valor = pair[1];
    console.log("Nombre:", nombre, "Valor:", valor);
  }
}
