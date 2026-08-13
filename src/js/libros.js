console.log('LIBROS')
if (document.getElementById('agregar_movimientos')) {
   const btn_close = document.getElementById('btn_close_mov')
   const t_categoria = document.getElementById('t_cat_mov')
   const categoria = document.getElementById('cat_mov')
   const subcategoria = document.getElementById('subcat_mov')

   const categorias = JSON.parse(document.getElementById('listaCategoriasMov').value)

   btn_close.addEventListener('click', () => {
      location.reload()
   })
   t_categoria.addEventListener('change', () => {
      categoria.innerHTML = '<option selected value="0">Categoría</option>'
      Object.entries(categorias).forEach(([index, datosCategoria]) => {
         if (datosCategoria.parent == t_categoria.value) {
            if (datosCategoria.id == categoria.value) {
               var selected = 'selected'
            } else {
               var selected = ''
            }
            categoria.innerHTML += `<option ${selected} value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
         }
      });
   })
   categoria.addEventListener('change', () => {
      subcategoria.innerHTML = '<option selected value="0">Subcategoría</option>'
      Object.entries(categorias).forEach(([index, datosCategoria]) => {
         if (datosCategoria.parent == categoria.value) {
            if (datosCategoria.id == subcategoria.value) {
               var selected = 'selected'
            } else {
               var selected = ''
            }
            subcategoria.innerHTML += `<option ${selected} value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
         }
      });
   })
}
if (document.getElementById('filtros')) {
   const formulario = document.getElementById('filtros')
   const f_inicial = document.getElementById('f_inicial')
   const f_final = document.getElementById('f_final')
   const t_categoria = document.getElementById('t_categoria')
   const categoria = document.getElementById('categoria')
   const subcategoria = document.getElementById('subcategoria')
   const categorias = JSON.parse(document.getElementById('listaCategorias').value)
   const btn_filtrar = document.getElementById('btn-filtrar')
   const url = document.getElementById('url')

   const ls_f_inicial_libro = localStorage.getItem('ls_f_inicial_libro')
   const ls_f_final_libro = localStorage.getItem('ls_f_final_libro')
   const ls_t_categoria_libro = localStorage.getItem('ls_t_categoria_libro')
   const ls_categoria_libro = localStorage.getItem('ls_categoria_libro')
   const ls_subcategoria_libro = localStorage.getItem('ls_subcategoria_libro')

   if (ls_f_inicial_libro) {
      f_inicial.value = ls_f_inicial_libro;
   }
   if (ls_f_final_libro) {
      f_final.value = ls_f_final_libro;
   }
   if (ls_t_categoria_libro) {
      t_categoria.value = ls_t_categoria_libro
      Object.entries(categorias).forEach(([index, datosCategoria]) => {
         if (datosCategoria.parent == ls_t_categoria_libro) {
            if (datosCategoria.id == localStorage.getItem('ls_categoria_libro')) {
               var selected = 'selected'
            } else {
               var selected = ''
            }
            categoria.innerHTML += `<option ${selected} value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
         }
      });
   }
   if (ls_categoria_libro) {
      categoria.value = ls_categoria_libro
      Object.entries(categorias).forEach(([index, datosCategoria]) => {
         if (datosCategoria.parent == ls_categoria_libro) {
            if (datosCategoria.id == localStorage.getItem('ls_subcategoria_libro')) {
               var selected = 'selected'
            } else {
               var selected = ''
            }
            subcategoria.innerHTML += `<option ${selected} value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
         }
      })
   }
   if (ls_subcategoria_libro) {
      subcategoria.value = ls_subcategoria_libro;
   }
   f_inicial.addEventListener('change', () => {
      localStorage.setItem('ls_f_inicial_libro', f_inicial.value);
   });
   f_final.addEventListener('change', () => {
      localStorage.setItem('ls_f_final_libro', f_final.value);
   });
   t_categoria.addEventListener('change', () => {
      localStorage.setItem('ls_t_categoria_libro', t_categoria.value);
      categoria.innerHTML = '<option selected value="0">Categoría</option>'
      localStorage.setItem('ls_categoria_libro', 0);
      subcategoria.innerHTML = '<option selected value="0">Subcategoría</option>'
      localStorage.setItem('ls_subcategoria_libro', 0);
      Object.entries(categorias).forEach(([index, datosCategoria]) => {
         if (datosCategoria.parent == localStorage.getItem('ls_t_categoria_libro')) {
            if (datosCategoria.id == localStorage.getItem('ls_categoria_libro')) {
               var selected = 'selected'
            } else {
               var selected = ''
            }
            categoria.innerHTML += `<option ${selected} value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
         }
      });
   })
   categoria.addEventListener('change', () => {
      localStorage.setItem('ls_categoria_libro', categoria.value);
      subcategoria.innerHTML = '<option selected value="0">Subcategoría</option>'
      localStorage.setItem('ls_subcategoria_libro', 0);
      Object.entries(categorias).forEach(([index, datosCategoria]) => {
         if (datosCategoria.parent == localStorage.getItem('ls_categoria_libro')) {
            if (datosCategoria.id == localStorage.getItem('ls_subcategoria_libro')) {
               var selected = 'selected'
            } else {
               var selected = ''
            }
            subcategoria.innerHTML += `<option ${selected} value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
         }
      })
   })
   subcategoria.addEventListener('change', () => {
      localStorage.setItem('ls_subcategoria_libro', subcategoria.value);
   })
   btn_filtrar.addEventListener('click', () => {
      actualizar()
   })

   // console.log('libros', ls_f_inicial_libro, ls_f_final_libro, ls_t_categoria_libro, ls_categoria_libro, ls_subcategoria_libro);

   function actualizar() {
      window.location.href = document.getElementById('url').value
         + '?modulo=sgf&cpt=libro&b_id=' + document.getElementById('b_id').value
         + '&f_inicial=' + document.getElementById('f_inicial').value
         + '&f_final=' + document.getElementById('f_final').value
         + '&tctg=' + document.getElementById('t_categoria').value
         + '&ctg=' + document.getElementById('categoria').value
         + '&sctg=' + document.getElementById('subcategoria').value
   }

} else {
   localStorage.removeItem('ls_f_inicial_libro');
   localStorage.removeItem('ls_f_final_libro');
   localStorage.removeItem('ls_t_categoria_libro');
   localStorage.removeItem('ls_categoria_libro');
   localStorage.removeItem('ls_subcategoria_libro');
}
if (document.getElementById('cat_masivo')) {
   /**
    * Controla botones para filtro libros
    */
   document.addEventListener('click', (e) => {
      if (document.getElementById('filtros')) {
         const boton = e.target.id
         const partes = boton.split('_')
         const post_id = partes.pop()

         let t_categoria, categoria, categorias, subcategoria, subcategorias
         switch (boton.substring(0, boton.lastIndexOf('_'))) {
            case 't_categoria':
               t_categoria = document.getElementById('t_categoria_' + post_id)
               categoria = document.getElementById('categoria_' + post_id)
               categorias = JSON.parse(document.getElementById('listaCategorias_' + post_id).value)

               t_categoria.addEventListener('change', () => {
                  categoria.innerHTML = '<option selected value="0">Categoría</option>'
                  Object.entries(categorias).forEach(([index, datosCategoria]) => {
                     if (datosCategoria.parent == t_categoria.value) {
                        if (datosCategoria.id == categoria.value) {
                           var selected = 'selected'
                        } else {
                           var selected = ''
                        }
                        categoria.innerHTML += `<option ${selected} value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
                     }
                  });
               })
               break;
            case 'categoria':
               categoria = document.getElementById('categoria_' + post_id)
               subcategoria = document.getElementById('subcategoria_' + post_id)
               subcategorias = JSON.parse(document.getElementById('listaSubCategorias_' + post_id).value)

               categoria.addEventListener('change', () => {
                  subcategoria.innerHTML = '<option selected value="0">Subcategoría</option>'
                  Object.entries(subcategorias).forEach(([nombreSubCategoria, datosSubCategoria]) => {
                     if (datosSubCategoria.parent == categoria.value) {
                        if (datosSubCategoria.ID == subcategoria.value) {
                           var selected = 'selected'
                        } else {
                           var selected = ''
                        }
                        subcategoria.innerHTML += `<option ${selected} value="${datosSubCategoria.ID}">${nombreSubCategoria}</option>`;
                     }
                  });
               })
               break;
            default:
               break;
         }
      }
      const registro = e.target.closest('tr')
      if (registro != null) {
         registro.classList.toggle('movimiento_filtrado')
      }
   })
   /**
    * Búsqueda interactiva para filtrar
    */
   if (document.getElementById('cat_masivo_buscar')) {

      const buscar = document.getElementById('buscar')
      const resultados = document.getElementById("resultados");
      const btn_cerrar = document.getElementById("btn_cerrar");
      const resultados_busqueda = document.getElementById("resultados_busqueda");

      const urlApi = document.getElementById('url').value
      const post_parent = document.getElementById('b_id').value
      const msg = document.getElementById('msg').value

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

            const url = urlApi + '?buscar=' + encodeURIComponent(buscar.value) + '&b_id=' + post_parent
            // const url = urlApi + '?search=' + encodeURIComponent(buscar.value)

            fetch(url)
               .then((res) => res.json())
               .then((data) => {
                  if (data.length) {
                     resultados_busqueda.innerHTML = `
                     <ul>
                        ${data
                           .map(
                              (item) =>
                                 `<li>${item.titulo}</li>`
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
         buscar.focus();
         resultados.classList.add("invisible");
      });

      const filtrar = document.getElementById('filtrar')
      const restablecer = document.getElementById('restablecer')
      restablecer.href = '/cat_masivo/?modulo=sgf&cpt=libro&b_id=' + document.getElementById('b_id').value

      let paginaActual = 1;
      let totalPaginas = 1;

      filtrar.addEventListener('click', async (e) => {
         e.preventDefault();

         filtrar.textContent = 'Cargando...';
         filtrar.disabled = true;
         const dataform = new FormData(document.getElementById('cat_masivo_buscar'));
         dataform.append('action', filtrar.value);
         dataform.append('paged', paginaActual);
         dataform.append('nonce', SGF_AJAX.nonce)

         try {
            const request = new Request(SGF_AJAX.endpoint, {
               method: "POST",
               body: dataform,
            });
            const response = await fetch(request);
            const data = await response.json();
            if (data.success) {
               const datos = data.data
               const cuerpoTabla = document.getElementById('cuerpoTabla')
               const resultados = datos.datos
               totalPaginas = datos.max_num_pages

               let cat, scat
               cuerpoTabla.innerHTML = ""
               Object.entries(resultados).forEach(([etiqueta, datosPost]) => {
                  const fecha_origen = datosPost.post_date
                  const objeto_fecha = new Date(fecha_origen)
                  const fecha = objeto_fecha.toISOString().slice(0, 10);
                  let color = "text-success"
                  if (datosPost.monto < 0) {
                     color = "text-danger"
                  }
                  let formatoAmericano = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
                  const monto = formatoAmericano.format(datosPost.monto)
                  cuerpoTabla.innerHTML +=
                     `
                  <tr id="${datosPost.ID}" class="movimiento_filtrado">
                  <th class="col" scope="row">${fecha}</th>
                  <td class="col post-title">${datosPost.post_title}</td>
                  <td class="${color} text-end" scope="col">${monto}</td>
                  <td class="col">Sin Categorizar</td>
                  <td class="col text-center">
                     <input type="checkbox" class="form-check-input" id="ckb_${datosPost.ID}"
                     data-post_id="${datosPost.ID}" 
                     data-post_date="${fecha}"
                     data-post_title="${datosPost.post_title}"
                     data-monto="${monto}"
                     checked>
                  </td>
               </tr>
               `
               });

               paginaActual++;

               if (paginaActual > totalPaginas) {
                  filtrar.textContent = 'No hay más movimientos';
                  filtrar.disabled = true;
               } else {
                  filtrar.textContent = 'Cargar más movimientos';
                  filtrar.disabled = false;
               }
            } else {
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
                  // location.reload();
               }, 4000);
               filtrar.innerHTML = `<i class="bi bi-funnel-fill" ></i > Filtrar`;
               filtrar.disabled = false;
            }

         } catch (error) {
            console.error('Error en la petición AJAX:', error);
            Swal.fire({
               icon: "error",
               title: "Error",
               showClass: {
                  popup: "animate__animated animate__fadeInDown",
               },
               hideClass: {
                  popup: "animate__animated animate__fadeOutUp",
               },
               text: 'Error en la comunicación con el servidor. Favor intentar de nuevo.',
               showConfirmButton: false,
               timer: 4000,
            });
            setTimeout(() => {
               location.reload();
            }, 4000);
         }
         resultados.classList.add("invisible");
      });
   }
   /**
    * Campos para Categorizar post filtrados
    */
   if (document.getElementById('cat_masivo_categoria')) {
      const dataform = new FormData();
      dataform.append("nonce", SGF_AJAX.nonce);

      const t_categoria = document.getElementById('t_categoria')
      const categoria = document.getElementById('categoria')
      const subcategoria = document.getElementById('subcategoria')

      const categorias = JSON.parse(document.getElementById('listaCategorias').value)

      t_categoria.addEventListener('change', () => {
         categoria.innerHTML = '<option selected value="0">Categoría</option>'
         Object.entries(categorias).forEach(([index, datosCategoria]) => {
            if (datosCategoria.parent == t_categoria.value) {
               categoria.innerHTML += `<option value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
            }
         });
      })

      categoria.addEventListener('change', () => {
         subcategoria.innerHTML = '<option selected value="0">Subcategoría</option>'
         Object.entries(categorias).forEach(([index, datosCategoria]) => {
            if (datosCategoria.parent == categoria.value) {
               subcategoria.innerHTML += `<option value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
            }
         });

      })

      document.getElementById('etiquetar').addEventListener('click', () => {
         dataform.append('action', document.getElementById('etiquetar').value)
         dataform.append('t_categoria', document.getElementById('t_categoria').value)
         dataform.append('categoria', document.getElementById('categoria').value)
         dataform.append('subcategoria', document.getElementById('subcategoria').value)
         const post_filtrados = document.querySelectorAll('.movimiento_filtrado')
         const ids_filtrados = [];
         post_filtrados.forEach(post => {
            dataform.append('id_filtrados[]', post.id);
         });
         etiquetar_movimientos(dataform)
      })
   }
}
if (document.getElementById('editar_movimiento_modal')) {
   const editar_movimiento = document.getElementById('editar_movimiento_modal')
   editar_movimiento.addEventListener('show.bs.modal', (event) => {
      const boton = event.relatedTarget
      const post_id = boton.dataset.post_id
      const fecha_origen = boton.dataset.post_date
      const objeto_fecha = new Date(fecha_origen)
      const post_date = objeto_fecha.toISOString().slice(0, 10);
      const post_title = boton.dataset.post_title
      let formatoAmericano = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
      const monto = formatoAmericano.format(boton.dataset.monto)
      const terms = JSON.parse(boton.dataset.terms)

      const t_categoria = document.getElementById('t_categoria_modal')
      const t_categoria_actual = document.getElementById('t_categoria_actual')
      const categoria = document.getElementById('categoria_modal')
      const categoria_actual = document.getElementById('categoria_actual')
      const subcategoria = document.getElementById('subcategoria_modal')
      const subcategoria_actual = document.getElementById('subcategoria_actual')
      const categorias = JSON.parse(document.getElementById('listaCategorias').value)

      document.getElementById('post_id_modal').value = post_id
      document.getElementById('post_date').value = post_date
      document.getElementById('post_title').value = post_title
      if (boton.dataset.monto < 0) {
         document.getElementById('monto').classList.add('text-danger')
      } else {
         document.getElementById('monto').classList.add('text-success')
      }
      document.getElementById('monto').value = monto

      const niveles = terms.length
      // console.log(niveles)
      const registros = Object.values(categorias)
      let registro = 0
      if (niveles == 3) {
         registro = registros.find(r => r.id === Number(terms[0]))
         t_categoria_actual.value = registro.id;
         registro = registros.find(r => r.id === Number(terms[1]))
         categoria_actual.value = registro.id;
         registro = registros.find(r => r.id === Number(terms[2]))
         subcategoria_actual.value = registro.id;
      } else if (niveles == 2) {
         registro = registros.find(r => r.id === Number(terms[0]))
         t_categoria_actual.value = registro.id;
         registro = registros.find(r => r.id === Number(terms[1]))
         categoria_actual.value = registro.id;
         subcategoria_actual.value = 0
      } else if (niveles == 0) {
         t_categoria_actual.value = 0
         t_categoria.innerHTML = '<option selected value="0">Tipo Categoría</option>'
         categoria_actual.value = 0
         categoria.innerHTML = '<option selected value="0">Categoría</option>'
         subcategoria_actual.value = 0
         subcategoria.innerHTML = '<option selected value="0">Subcategoría</option>'
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

      if (niveles == 3) {
         Object.entries(categorias).forEach(([index, datosCategoria]) => {
            if (datosCategoria.parent == Number(categoria.value)) {
               if (datosCategoria.id == Number(subcategoria_actual.value)) {
                  cat_sel = 'selected'
               } else {
                  cat_sel = ''
               }
               subcategoria.innerHTML += `<option ${cat_sel} value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
            }
         });
      } else {
         subcategoria.innerHTML = '<option selected value="0">Subcategoría</option>'
      }

      t_categoria.addEventListener('change', () => {
         categoria.innerHTML = '<option selected value="0">Categoría</option>'
         Object.entries(categorias).forEach(([index, datosCategoria]) => {
            // console.log(datosCategoria.parent, Number(t_categoria.value))
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
      categoria.addEventListener('change', () => {
         subcategoria.innerHTML = '<option selected value="0">Subcategoría</option>'
         Object.entries(categorias).forEach(([index, datosCategoria]) => {
            if (datosCategoria.parent == Number(categoria.value)) {
               if (datosCategoria.id == Number(subcategoria_actual.value)) {
                  cat_sel = 'selected'
               } else {
                  cat_sel = ''
               }
               subcategoria.innerHTML += `<option ${cat_sel} value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
            }
         });
      })
   })
   document.getElementById('btn-close').addEventListener('click', () => {
      location.reload()
   })
}
/**
 * Búsqueda interactiva para filtrar movimientos (categorizados o no)
 *  para categorizarlos.
 */
if (document.getElementById('cambiar_cat_masivo')) {
   const formatoAmericano = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
   const filtrar = document.getElementById('filtrar')
   let offsetActual = 1;
   let paginaActual = 1;
   let totalRegistros = 0;
   let control
   let reload

   if (document.getElementById('cambiar_cat_masivo_buscar')) {
      const billetera = document.getElementById('billetera')
      const f_inicial = document.getElementById('f_inicial')
      const f_final = document.getElementById('f_final')
      const categorias = JSON.parse(document.getElementById('listaCategorias').value)
      const t_categoria = document.getElementById('t_categoria')
      const categoria = document.getElementById('categoria')
      const subcategoria = document.getElementById('subcategoria')
      const monto_desde = document.getElementById('monto_desde')
      const monto_hasta = document.getElementById('monto_hasta')
      const buscar = document.getElementById('buscar')
      const resultados_busqueda = document.getElementById('resultados_busqueda')
      const btn_cerrar = document.getElementById('btn_cerrar')

      const selectorLimite = document.getElementById('selector-limite');
      const btnAnterior = document.getElementById('btn-anterior');
      const indicadorPagina = document.getElementById('pagina-actual');
      const btnSiguiente = document.getElementById('btn-siguiente');
      const restablecer = document.getElementById('restablecer')
      const tot_mov = document.getElementById('tot_mov')

      get_categorizacion(t_categoria, categoria, subcategoria, categorias)

      let url = ""
      async function get_datos(limit = 100, offset = 0) {
         try {
            url = `/wp-json/sgf/v1/filtrar?limit=${limit}&offset=${offset}`;
            url += `&f_inicial=${f_inicial.value}&f_final=${f_final.value}`
            if (billetera.value > 0) {
               url += `&b_id=${billetera.value}`
            }
            if (t_categoria.value > 0) {
               url += `&t_cat_id=${t_categoria.value}`
            }
            if (categoria.value > 0) {
               url += `&cat_id=${categoria.value}`
            }
            if (subcategoria.value > 0) {
               url += `&scat_id=${subcategoria.value}`
            }
            if (monto_desde.value > 0) {
               url += `&monto_desde=${monto_desde.value}`
            }
            if (monto_hasta.value > 0) {
               url += `&monto_hasta=${monto_hasta.value}`
            }
            if (buscar.value != "") {
               url += `&buscar=${encodeURIComponent(buscar.value)}`
            }
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error en la respuesta del servidor');
            const data = await response.json();
            if (!data.error && data.movimientos.length > 0) {
               totalRegistros = data.total_registros
               const cuerpoTabla = document.getElementById('cuerpoTabla')
               let t_cat, cat, scat
               cuerpoTabla.innerHTML = ""
               Object.entries(data.movimientos).forEach(([etiqueta, datosPost]) => {
                  const fecha_origen = datosPost.fecha
                  const objeto_fecha = new Date(fecha_origen)
                  const fecha = objeto_fecha.toISOString().slice(0, 10);
                  if (datosPost.t_cat == null) {
                     t_cat = "Sin Categorías"
                  } else {
                     t_cat = datosPost.t_cat
                  }
                  if (datosPost.cat == null) {
                     cat = ""
                  } else {
                     cat = "," + datosPost.cat
                  }
                  if (datosPost.scat == null) {
                     scat = ""
                  } else {
                     scat = "," + datosPost.scat
                  }
                  let color = "text-success"
                  if (datosPost.monto < 0) {
                     color = "text-danger"
                  }
                  const monto = formatoAmericano.format(datosPost.monto)
                  cuerpoTabla.innerHTML +=
                     `
                  <tr id="${datosPost.id}" class="movimiento_filtrado">
                  <th class="col" scope="row">${fecha}</th>
                  <td class="col post-title">${datosPost.billetera}-${datosPost.titulo}</td>
                  <td class="${color} text-end" scope="col">${monto}</td>
                  <td class="col">${t_cat}${cat}${scat}</td>
                  <td class="col text-center">
                     <input type="checkbox" class="form-check-input" id="ckb_${datosPost.id}"
                     data-post_id="${datosPost.id}" 
                     data-post_date="${fecha}"
                     data-post_title="${datosPost.titulo}"
                     data-monto="${monto}"
                     checked>
                  </td>
               </tr>
               `
               });
               btnAnterior.disabled = (offsetActual === 0);
               btnSiguiente.disabled = (data.movimientos.length < limit);
            } else {
               Swal.fire({
                  icon: "error",
                  title: "Error",
                  showClass: {
                     popup: "animate__animated animate__fadeInDown",
                  },
                  hideClass: {
                     popup: "animate__animated animate__fadeOutUp",
                  },
                  text: data.msg,
                  showConfirmButton: false,
                  timer: 4000,
               });
               setTimeout(() => {
                  // location.reload();
               }, 4000);
            }
         } catch (error) {
            console.error('Error en la petición AJAX:', error);
            Swal.fire({
               icon: "error",
               title: "Error",
               showClass: {
                  popup: "animate__animated animate__fadeInDown",
               },
               hideClass: {
                  popup: "animate__animated animate__fadeOutUp",
               },
               text: 'Error en la comunicación con el servidor. Favor intentar de nuevo.',
               showConfirmButton: false,
               timer: 4000,
            });
            setTimeout(() => {
               location.reload();
            }, 4000);
         }
         resultados.classList.add("invisible");
      };
      var typingTimer = 0;
      buscar.addEventListener("keyup", async () => {
         clearTimeout(typingTimer);
         typingTimer = setTimeout(await f_obtener_resultados, 200);

      });
      async function f_obtener_resultados() {
         let urlBuscar = '/wp-json/sgf/v1/filtrar?limit=5'
         urlBuscar += `&f_inicial=${f_inicial.value}&f_final=${f_final.value}`
         if (billetera.value > 0) {
            urlBuscar += `&b_id=${billetera.value}`
         }
         if (t_categoria.value > 0) {
            urlBuscar += `&t_cat_id=${t_categoria.value}`
         }
         if (categoria.value > 0) {
            urlBuscar += `&cat_id=${categoria.value}`
         }
         if (subcategoria.value > 0) {
            urlBuscar += `&scat_id=${subcategoria.value}`
         }
         if (monto_desde.value > 0) {
            urlBuscar += `&monto_desde=${monto_desde.value}`
         }
         if (monto_hasta.value > 0) {
            urlBuscar += `&monto_hasta=${monto_hasta.value}`
         }
         if (buscar.value != "") {
            urlBuscar += `&buscar=${encodeURIComponent(buscar.value)}`
         }
         resultados.classList.remove("invisible");
         resultados.style.height = "auto";
         if (buscar.value != "") {
            fetch(urlBuscar)
               .then((res) => res.json())
               .then((data) => {
                  console.log('data buscar', data)
                  if (!data.error && data.movimientos.length) {
                     resultados_busqueda.innerHTML = `
                     <ul>
                        ${data.movimientos
                           .map(
                              (item) =>
                                 `<li>${item.titulo}</li>`
                           )
                           .join("")}
                     </ul>`;
                  } else {
                     resultados_busqueda.innerHTML = 'No hay movimientos con los filtros seleccionados.';
                  }
               })
               .catch((err) => console.log(err));
         } else {
            resultados.classList.add("invisible");
         }
      }
      btn_cerrar.addEventListener("click", () => {
         buscar.focus();
         resultados.classList.add("invisible");
      });
      filtrar.addEventListener('click', async () => {
         const limiteDinamico = parseInt(selectorLimite.value, 10);
         document.getElementById('etiquetar').disabled = false
         offsetActual = 0;
         paginaActual = 1;
         totalRegistros = 0
         indicadorPagina.textContent = `Página ${paginaActual}`;
         await get_datos(limiteDinamico, offsetActual);
         console.log('Total Registros', totalRegistros, 'Pág', paginaActual, 'Límite', limiteDinamico, 'Pag*Lim', paginaActual * limiteDinamico, 'offsetActual', offsetActual)
         if (totalRegistros > 0) {
            tot_mov.removeAttribute('hidden')
            tot_mov.innerHTML = 'Total de movimientos: ' + totalRegistros
         }
      });
      btnSiguiente.addEventListener('click', async () => {
         const limiteDinamico = parseInt(selectorLimite.value, 10);
         offsetActual += limiteDinamico;
         paginaActual++;
         indicadorPagina.textContent = `Página ${paginaActual}`;
         await get_datos(limiteDinamico, offsetActual)
         console.log('Total', totalRegistros, 'Pág', paginaActual, 'Límite', limiteDinamico, 'Pag*Lim', paginaActual * limiteDinamico, 'offsetActual', offsetActual)
      });
      btnAnterior.addEventListener('click', async () => {
         const limiteDinamico = parseInt(selectorLimite.value, 10);
         offsetActual = Math.max(0, offsetActual - limiteDinamico); // Evita números negativos
         paginaActual--;
         indicadorPagina.textContent = `Página ${paginaActual}`;
         await get_datos(limiteDinamico, offsetActual);
      });
      restablecer.addEventListener('click', () => { location.reload() })
   }
   if (document.getElementById('cambiar_cat_masivo_categoria')) {
      const formulario = document.getElementById('cambiar_cat_masivo_categoria')
      const categorias = JSON.parse(document.getElementById('listaCategorias').value)
      const t_categoria = document.getElementById('t_categoria_nueva')
      const categoria = document.getElementById('categoria_nueva')
      const subcategoria = document.getElementById('subcategoria_nueva')
      const btn_etiquetar = document.getElementById('etiquetar')
      get_categorizacion(t_categoria, categoria, subcategoria, categorias)
      const selectorLimite = document.getElementById('selector-limite');

      const dataform = new FormData(formulario)
      btn_etiquetar.addEventListener('click', async () => {
         const limiteDinamico = parseInt(selectorLimite.value, 10);
         dataform.append('action', btn_etiquetar.value)
         dataform.append('t_categoria', t_categoria.value)
         dataform.append('categoria', categoria.value)
         dataform.append('subcategoria', subcategoria.value)
         dataform.append('nonce', SGF_AJAX.nonce)
         const post_filtrados = document.querySelectorAll('.movimiento_filtrado')
         const ids_filtrados = [];
         post_filtrados.forEach(post => {
            dataform.append('id_filtrados[]', post.id);
         });
         if (totalRegistros > 0) {
            reload = (totalRegistros < paginaActual * limiteDinamico) ? true : false
            console.log('Total', totalRegistros, 'Pág', paginaActual, 'Límite', limiteDinamico, 'Pag*Lim', paginaActual * limiteDinamico, 'offsetActual', offsetActual, 'reload', reload)
            await etiquetar_movimientos(dataform, reload)
            filtrar.click()
         }
      })
   }
}
function get_categorizacion(t_categoria, categoria, subcategoria, categorias) {

   t_categoria.addEventListener('change', () => {
      categoria.innerHTML = '<option selected value="0">Categoría</option>'
      if (t_categoria != 0) {
         Object.entries(categorias).forEach(([index, datosCategoria]) => {
            if (datosCategoria.parent == t_categoria.value) {
               categoria.innerHTML += `<option value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
            }
         });
      }
   })

   categoria.addEventListener('change', () => {
      subcategoria.innerHTML = '<option selected value="0">Subcategoría</option>'
      Object.entries(categorias).forEach(([index, datosCategoria]) => {
         if (datosCategoria.parent == categoria.value) {
            subcategoria.innerHTML += `<option value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
         }
      });

   })
}
/**
 * Envía consulta y recibe datos filtrados
 */
async function filtrar_movimientos(dataform) {
   const request = new Request(SGF_AJAX.endpoint, {
      method: "POST",
      body: dataform,
   });
   try {
      const response = await fetch(request);
      const data = await response.json();
      if (data.success) {
         if (data.data.datos) {
            const cuerpoTabla = document.getElementById('cuerpoTabla')
            const resultados = data.data.datos
            cuerpoTabla.innerHTML = ""
            Object.entries(resultados).forEach(([etiqueta, datosPost]) => {
               const fecha_origen = datosPost.post_date
               const objeto_fecha = new Date(fecha_origen)
               const fecha = objeto_fecha.toISOString().slice(0, 10);
               let color = "text-success"
               if (datosPost.monto < 0) {
                  color = "text-danger"
               }
               let formatoAmericano = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
               const monto = formatoAmericano.format(datosPost.monto)
               cuerpoTabla.innerHTML +=
                  `
                  <tr id="${datosPost.ID}" class="movimiento_filtrado">
                  <th class="col" scope="row">${fecha}</th>
                  <td class="col post-title">${datosPost.post_title}</td>
                  <td class="${color} text-end" scope="col">${monto}</td>
                  <td class="col">Sin Categoriza</td>
                  <td class="col text-center">
                     <input type="checkbox" class="form-check-input" id="ckb_${datosPost.ID}"
                     data-post_id="${datosPost.ID}" 
                     data-post_date="${fecha}"
                     data-post_title="${datosPost.post_title}"
                     data-monto="${monto}"
                     checked>
                  </td>
               </tr>
               `
            });
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
               // location.reload();
            }, 2000);
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
            // location.reload();
         }, 5000);
      }
   } catch (error) {
      console.log("Error: ", error);
   }
}
async function etiquetar_movimientos(dataform, reload = true) {
   const request = new Request(SGF_AJAX.endpoint, {
      method: "POST",
      body: dataform,
   });
   try {
      const response = await fetch(request);
      const data = await response.json();
      if (data.success) {
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
            if (reload) {
               location.reload();
            }
         }, 1000);
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
         }, 4000);
      }
   } catch (error) {
      console.log("Error: ", error);
   }
}
async function filtrar_movimientos_etiquetados(dataform) {
   const request = new Request(SGF_AJAX.endpoint, {
      method: "POST",
      body: dataform,
   });
   try {
      const response = await fetch(request);
      const data = await response.json();
      if (data.success) {
         if (data.data.datos) {
            const cuerpoTabla = document.getElementById('cuerpoTabla')
            const resultados = data.data.datos
            let scat
            cuerpoTabla.innerHTML = ""
            Object.entries(resultados).forEach(([etiqueta, datosPost]) => {
               const fecha_origen = datosPost.post_date
               const objeto_fecha = new Date(fecha_origen)
               const fecha = objeto_fecha.toISOString().slice(0, 10);
               if (datosPost.scat == null) {
                  scat = ""
               } else {
                  scat = "," + datosPost.scat
               }
               let color = "text-success"
               if (datosPost.monto < 0) {
                  color = "text-danger"
               }
               let formatoAmericano = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
               const monto = formatoAmericano.format(datosPost.monto)
               cuerpoTabla.innerHTML +=
                  `
                  <tr id="${datosPost.ID}" class="movimiento_filtrado">
                  <th class="col" scope="row">${fecha}</th>
                  <td class="col post-title">${datosPost.post_parent} -${datosPost.post_title}</td>
                  <td class="${color} text-end" scope="col">${monto}</td>
                  <td class="col">${datosPost.t_cat},${datosPost.cat}${scat}</td>
                  <td class="col text-center">
                     <input type="checkbox" class="form-check-input" id="ckb_${datosPost.ID}"
                     data-post_id="${datosPost.ID}" 
                     data-post_date="${fecha}"
                     data-post_title="${datosPost.post_title}"
                     data-monto="${monto}"
                     checked>
                  </td>
               </tr>
               `
            });
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
               // location.reload();
            }, 2000);
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
            // location.reload();
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
