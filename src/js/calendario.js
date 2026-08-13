console.log('CALENDARIO')
if (document.getElementById('citas')) {
   const mes = document.getElementById('mes')
   const anio = document.getElementById('anio')
   const ls_mes = localStorage.getItem('ls_mes')
   const ls_anio = localStorage.getItem('ls_anio')
   if (ls_mes) {
      mes.value = ls_mes
   }
   if (ls_anio) {
      anio.value = ls_anio
   }
   document.getElementById('mes').addEventListener('change', actualizar)
   document.getElementById('anio').addEventListener('change', actualizar)

   function actualizar() {
      localStorage.setItem('ls_mes', mes.value);
      localStorage.setItem('ls_anio', anio.value);
      window.location.href = document.getElementById('url').value + '?modulo=sgf&cpt=calendario'
         + '&anio=' + document.getElementById('anio').value
         + '&mes=' + document.getElementById('mes').value
   }

   const calendario = document.getElementById('cuerpoCalendario')
   calendario.addEventListener('click', (e) => {
      const fila = e.target.closest('td')
      if (fila) {
         const boton = fila.querySelector('button')
         const horario = document.getElementById('horario')
         if (boton) {
            if (boton.classList.contains('disabled')) {
               horario.innerHTML = ""
               document.getElementById('titulo_horario').innerHTML = 'Fecha no disponible'
            } else {
               const f_cita = fila.querySelector('input[type=hidden]')
               const titulo_horario = boton.dataset.fecha
               if (f_cita) {
                  document.getElementById('titulo_horario').innerHTML = titulo_horario
                  dataform = new FormData
                  dataform.append('nonce', SGF_AJAX.nonce)
                  dataform.append('action', 'citas_disponibles')
                  dataform.append('f_cita', f_cita.value)
                  dataform.append('lbl_fecha', titulo_horario)
                  listarCampos(dataform)
                  filtrar_horario_disponible(dataform)
               }
            }
         }
      }
   })
   let lbl_fecha
   async function filtrar_horario_disponible(dataform) {
      const f_cita = dataform.get('f_cita')
      lbl_fecha = dataform.get('lbl_fecha')
      const request = new Request(SGF_AJAX.endpoint, {
         method: "POST",
         body: dataform,
      });
      try {
         const response = await fetch(request);
         const data = await response.json();
         if (data.success) {
            const horario = document.getElementById('horario')
            const horas_disponibles = data.data.datos
            if (horas_disponibles) {
               horario.innerHTML = ""
               horas_disponibles.forEach((hora, index) => {
                  horario.innerHTML += `
               <input type="radio" class="btn-check" name="time-slot" id="h${hora}" autocomplete="off">
               <label
                  data-bs-toggle="modal" data-bs-target="#reservar_cita"
                  class="btn_horario btn btn-outline-primary border-1 shadow-sm py-2 px-3 d-flex justify-content-between align-items-center rounded-3"
                  for="h${hora}">
                  <span>${hora}</span>
                  <i class="bi bi-clock-history small opacity-50"></i>
               </label>
                  `
               });
            }
            hora_select(f_cita)
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
   function hora_select(f_cita) {
      const botonesHoras = document.querySelectorAll('.btn_horario');
      // const formulario = document.getElementById('reservar_cita_form')
      botonesHoras.forEach((boton, index) => {
         const hora = boton.innerText;
         const fechaAsociada = boton.dataset.fecha;
         boton.addEventListener('click', function () {
            botonesHoras.forEach(b => {
               b.classList.remove('btn-primary')
               const iconoReset = b.querySelector('i')
               iconoReset.classList.remove('bi-check-circle-fill');
               iconoReset.classList.add('bi-clock-history');
            });
            this.classList.add('btn-primary');
            const icono = boton.querySelector('i')
            icono.classList.remove('bi-clock-history')
            icono.classList.add('bi-check-circle-fill')
            document.getElementById('modal_title').innerText = 'Reservar Cita el:  ' + lbl_fecha + ' a las ' + hora
            const f_cita_hora = f_cita + ' ' + hora
            document.getElementById('f_cita_hora').value = f_cita_hora
         });
      });
   }
   if (document.getElementById('reservar_cita_form')) {
      /************************************************************************
       * Captura de invitados adicionales
       ***********************************************************************/
      let guests = [];
      const btn_agregar = document.getElementById('btn_agregar')
      btn_agregar.addEventListener('click', () => {
         const input = document.getElementById('guest_input');
         const email = input.value.trim();
         if (email && input.checkValidity() && !guests.includes(email)) {
            guests.push(email);
            renderGuests();
            input.value = '';
         }
      })
      function removeGuest(email) {
         guests = guests.filter(g => g !== email);
         renderGuests();
      }
      function renderGuests() {
         const container = document.getElementById('guests_container');
         const hiddenInput = document.getElementById('guests_hidden');

         if (guests.length === 0) {
            container.innerHTML = '<small class="text-muted w-100">No hay invitados adicionales.</small>';
         } else {
            container.innerHTML = guests.map(email => `
            <span class="badge bg-info text-dark d-flex align-items-center p-2">
                ${email}
                <button type="button" class="btn-close ms-2" style="font-size: 0.6rem" onclick="removeGuest('${email}')"></button>
            </span>
        `).join('');
         }
         hiddenInput.value = guests.join(',');
      }
   }

   function listarCampos(dataform) {
      for (var pair of dataform.entries()) {
         var nombre = pair[0];
         var valor = pair[1];
         console.log("Nombre:", nombre, "Valor:", valor);
      }
   }
} else {
   localStorage.removeItem('ls_mes');
   localStorage.removeItem('ls_anio');
}
