console.log('SGF')
if (document.getElementById('arbol_categorias')) {
   document.addEventListener('click', (event) => {
      if (event.target.id == 'btn_close_cat') {
         location.reload()
      }
   })
}
if (document.getElementById('modificar_categoria')) {
   const categorias = document.getElementById('modificar_categoria');
   categorias.addEventListener('show.bs.modal', function (event) {
      const boton = event.relatedTarget;
      const term_id = boton.dataset.term_id
      const termID = document.getElementById('term_id')
      termID.value = term_id
      const term_name = boton.dataset.term_name;
      const termName = document.getElementById('term_name')
      termName.value = term_name
   });
}
if (document.getElementById('sustituir_categoria')) {
   const sustituir_categoria = document.getElementById('sustituir_categoria')
   sustituir_categoria.addEventListener('show.bs.modal', (event) => {
      const boton = event.relatedTarget
      const term_id = boton.dataset.term_id
      document.getElementById('id_categoria_actual').value = term_id
      const ancestros = boton.dataset.ancestros
      const categoriasActuales = ancestros.split(',').map(Number)
      categoriasActuales.unshift(Number(term_id))
      const niveles = categoriasActuales.length

      const t_categoria_actual = document.getElementById('t_categoria_actual')
      const categoria_actual = document.getElementById('categoria_actual')
      const subcategoria_actual = document.getElementById('subcategoria_actual')
      const t_categoria_nueva = document.getElementById('t_categoria_nueva')
      const categoria_nueva = document.getElementById('categoria_nueva')
      const subcategoria_nueva = document.getElementById('subcategoria_nueva')
      const categorias = JSON.parse(document.getElementById('listaCategorias').value)

      const registros = Object.values(categorias)
      let registro = 0
      if (niveles === 2) {
         subcategoria_actual.value = 'Subcategoria'
         registro = registros.find(r => r.id === Number(categoriasActuales[0]))
         categoria_actual.value = registro.nombre;
         registro = registros.find(r => r.id === Number(categoriasActuales[1]))
         t_categoria_actual.value = registro.nombre;
      } else {
         registro = registros.find(r => r.id === Number(categoriasActuales[0]))
         subcategoria_actual.value = registro.nombre;
         registro = registros.find(r => r.id === Number(categoriasActuales[1]))
         categoria_actual.value = registro.nombre;
         registro = registros.find(r => r.id === Number(categoriasActuales[2]))
         t_categoria_actual.value = registro.nombre;
      }

      t_categoria_nueva.addEventListener('change', () => {
         categoria_nueva.innerHTML = '<option selected value="0">Categoría</option>'
         Object.entries(categorias).forEach(([index, datosCategoria]) => {
            if (datosCategoria.parent == t_categoria_nueva.value) {
               categoria_nueva.innerHTML += `<option value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
            }
         });
      })
      categoria_nueva.addEventListener('change', () => {
         subcategoria_nueva.innerHTML = '<option selected value="0">Subcategoría</option>'
         Object.entries(categorias).forEach(([index, datosCategoria]) => {
            if (datosCategoria.parent == categoria_nueva.value) {
               subcategoria_nueva.innerHTML += `<option value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
            }
         });
         document.getElementById('id_categoria_nueva').value = categoria_nueva.value
      })
      subcategoria_nueva.addEventListener('change', () => {
         document.getElementById('id_categoria_nueva').value = subcategoria_nueva.value
      })
   })
}
