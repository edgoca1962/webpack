
console.log('PRESUPUESTO')
if (document.getElementById('monedaSel')) {
   const monedaSel = document.getElementById('monedaSel')
   const ls_moneda = localStorage.getItem('ls_moneda')
   if (ls_moneda) {
      monedaSel.value = ls_moneda
   }

   monedaSel.addEventListener('change', () => {
      localStorage.setItem('ls_moneda', monedaSel.value);
      window.location.href = monedaSel.dataset.url
         + '?moneda=' + document.getElementById('monedaSel').value
   })
} else {
   localStorage.removeItem('ls_moneda');
}
if (document.getElementById('editar_presupuesto_modal')) {
   const editar_presupuesto = document.getElementById('editar_presupuesto_modal')
   editar_presupuesto.addEventListener('show.bs.modal', (event) => {
      const boton = event.relatedTarget
      const post_id = boton.dataset.post_id
      const anio = boton.dataset.anio
      const post_title = boton.dataset.post_title
      const moneda = boton.dataset.moneda
      let formatoAmericano = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
      const monto = formatoAmericano.format(boton.dataset.monto)

      const terms = JSON.parse(boton.dataset.terms)
      const t_categoria = document.getElementById('t_categoria_modal')
      const t_categoria_actual = document.getElementById('t_categoria_actual')
      const categoria = document.getElementById('categoria_modal')
      const categoria_actual = document.getElementById('categoria_actual')
      const categorias = JSON.parse(document.getElementById('listaCategorias').value)

      document.getElementById('post_id_modal').value = post_id
      document.getElementById('anio').value = anio

      if (moneda == 1) {
         document.getElementById('moneda').innerHTML = '<option value="1" selected>Moneda Local</option>'
         document.getElementById('moneda').innerHTML += '<option value="2">Moneda Extranjera</option>'
      } else {
         document.getElementById('moneda').innerHTML = '<option value="1">Moneda Local</option>'
         document.getElementById('moneda').innerHTML += '<option value="2" selected>Moneda Extranjera</option>'
      }

      if (boton.dataset.monto < 0) {
         document.getElementById('monto').classList.add('text-danger')
      } else {
         document.getElementById('monto').classList.add('text-success')
      }
      document.getElementById('monto').value = monto

      const niveles = terms.length
      const registros = Object.values(categorias)
      let registro = 0
      if (niveles == 2) {
         registro = registros.find(r => r.id === Number(terms[0]))
         t_categoria_actual.value = registro.id;
         registro = registros.find(r => r.id === Number(terms[1]))
         categoria_actual.value = registro.id;
      } else if (niveles == 0) {
         t_categoria_actual.value = 0
         t_categoria.innerHTML = '<option selected value="0">Tipo Categoría</option>'
         categoria_actual.value = 0
         categoria.innerHTML = '<option selected value="0">Categoría</option>'
      }
      let cat_sel
      Object.entries(categorias).forEach(([index, datosCategoria]) => {
         if (datosCategoria.parent == 0) {
            if (datosCategoria.id == Number(t_categoria_actual.value)) {
               cat_sel = 'selected'
            } else {
               cat_sel = ''
            }
            t_categoria.innerHTML += `<option ${cat_sel} value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
         }
      });

      Object.entries(categorias).forEach(([index, datosCategoria]) => {
         if (datosCategoria.parent == Number(t_categoria.value)) {
            if (datosCategoria.id == Number(categoria_actual.value)) {
               cat_sel = 'selected'
            } else {
               cat_sel = ''
            }
            categoria.innerHTML += `<option ${cat_sel} value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
         }
      });

      t_categoria.addEventListener('change', () => {
         categoria.innerHTML = '<option selected value="0">Categoría</option>'
         Object.entries(categorias).forEach(([index, datosCategoria]) => {
            console.log(datosCategoria.parent, Number(t_categoria.value))
            if (datosCategoria.parent == Number(t_categoria.value)) {
               if (datosCategoria.id == Number(categoria_actual.value)) {
                  cat_sel = 'selected'
               } else {
                  cat_sel = ''
               }
               categoria.innerHTML += `<option ${cat_sel} value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
            }
         });
      })
   })
   document.getElementById('btn-close').addEventListener('click', () => {
      location.reload()
   })
}
