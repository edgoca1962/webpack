console.log('Perfiles de Usuarios')
if (document.getElementById('crear_usuario')) {
   const formulario = document.getElementById('mantener_usuario')
   const user_email = document.getElementById('user_email')
   const first_name = document.getElementById('first_name')
   const last_name = document.getElementById('last_name')
   const agregar_usuario = document.getElementById('agregar_usuario')
   if (document.getElementById('usuario_imagen')) {
      document.getElementById('usuario_imagen').addEventListener('change', function () {
         const imagen = this.files[0]
         if (imagen) {
            const reader = new FileReader()
            document.getElementById('imagennueva').display = 'block'
            reader.addEventListener('load', function () {
               document.getElementById('imagennueva').setAttribute('src', this.result)
            })
            reader.readAsDataURL(imagen)
         } else {
            console.log('por definir')
         }
      })
   }
   user_email.addEventListener('change', () => {
      let datos = new FormData()
      datos.append('nonce', SGF_AJAX.nonce)
      datos.append('action', 'wpphp_validar_user_email')
      datos.append('user_email', user_email.value)

      send_data(datos)
      async function send_data(dataform) {
         const request = new Request(SGF_AJAX.endpoint, {
            method: "POST",
            body: dataform,
         });
         try {
            const response = await fetch(request);
            const data = await response.json();
            if (data.success) {
               if (data.data) {
                  agregar_usuario.classList.remove('disabled')
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

   })
}
if (document.getElementById('cambiar_clave_nuevo')) {
   const formulario = document.getElementById('cambiar_clave_nuevo')
   const clave_nueva = document.getElementById('clave_nueva')
   const ver_clave_nueva = document.getElementById('ver_clave_nueva')
   const confirmacion = document.getElementById('confirmacion')
   const ver_confirmacion = document.getElementById('ver_confirmacion')
   ver_clave_nueva.addEventListener('click', () => {
      if (clave_nueva.type === 'text') {
         clave_nueva.type = "password";
         ver_clave_nueva.classList.add('bi', 'bi-eye')
         ver_clave_nueva.classList.remove('bi', 'bi-eye-slash')
      } else {
         clave_nueva.type = "text";
         ver_clave_nueva.classList.remove('bi', 'bi-eye')
         ver_clave_nueva.classList.add('bi', 'bi-eye-slash')
      }
   })
   ver_confirmacion.addEventListener('click', () => {
      if (confirmacion.type === 'text') {
         confirmacion.type = "password";
         ver_confirmacion.classList.add('bi', 'bi-eye')
         ver_confirmacion.classList.remove('bi', 'bi-eye-slash')
      } else {
         confirmacion.type = "text";
         ver_confirmacion.classList.remove('bi', 'bi-eye')
         ver_confirmacion.classList.add('bi', 'bi-eye-slash')
      }
   })
}
if (document.getElementById('mantener_perfil')) {
   const formulario = document.getElementById("mantener_usuario");
   const first_name = document.getElementById("first_name");
   const last_name = document.getElementById("last_name");
   const user_pass = document.getElementById("user_pass");
   const btn_modificar = document.getElementById("modificar_usuario");
   const clave_actual = document.getElementById('clave_actual')
   const ver_clave_actual = document.getElementById('ver_clave_actual')
   const clave_nueva = document.getElementById('clave_nueva')
   const ver_clave_nueva = document.getElementById('ver_clave_nueva')
   const confirmacion = document.getElementById('confirmacion')
   const ver_confirmacion = document.getElementById('ver_confirmacion')

   if (document.getElementById('usuario_imagen')) {
      document.getElementById('usuario_imagen').addEventListener('change', function () {
         const imagen = this.files[0]
         if (imagen) {
            const reader = new FileReader()
            document.getElementById('imagennueva').display = 'block'
            reader.addEventListener('load', function () {
               document.getElementById('imagennueva').setAttribute('src', this.result)
            })
            reader.readAsDataURL(imagen)
         } else {
            console.log('por definir')
         }
      })
   }
   ver_clave_actual.addEventListener('click', () => {
      if (clave_actual.type === 'text') {
         clave_actual.type = 'password'
         ver_clave_actual.classList.remove('bi', 'bi-eye-slash')
         ver_clave_actual.classList.add('bi', 'bi-eye')
      } else {
         clave_actual.type = 'text'
         ver_clave_actual.classList.remove('bi', 'bi-eye')
         ver_clave_actual.classList.add('bi', 'bi-eye-slash')
      }
   })
   ver_clave_nueva.addEventListener('click', () => {
      if (clave_nueva.type === 'text') {
         clave_nueva.type = 'password'
         ver_clave_nueva.classList.remove('bi', 'bi-eye-slash')
         ver_clave_nueva.classList.add('bi', 'bi-eye')
      } else {
         clave_nueva.type = 'text'
         ver_clave_nueva.classList.remove('bi', 'bi-eye')
         ver_clave_nueva.classList.add('bi', 'bi-eye-slash')
      }
   })
   ver_confirmacion.addEventListener('click', () => {
      if (confirmacion.type === 'text') {
         confirmacion.type = 'password'
         ver_confirmacion.classList.remove('bi', 'bi-eye-slash')
         ver_confirmacion.classList.add('bi', 'bi-eye')
      } else {
         confirmacion.type = 'text'
         ver_confirmacion.classList.remove('bi', 'bi-eye')
         ver_confirmacion.classList.add('bi', 'bi-eye-slash')
      }
   })
}
