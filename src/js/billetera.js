console.log('BILLETERAS viejo')
/*
if (document.getElementById('parar_ejecucion_filtros_billeteras_old')) {
   const formulario = document.getElementById('filtros_billeteras')
   const f_inicial = document.getElementById('f_inicial')
   const f_final = document.getElementById('f_final')
   const t_categoria = document.getElementById('t_categoria')
   const categoria = document.getElementById('categoria')
   const subcategoria = document.getElementById('subcategoria')
   const categorias = JSON.parse(document.getElementById('listaCategorias').value)
   const btn_filtrar = document.getElementById('btn-filtrar')
   const url = document.getElementById('url')

   const ls_f_inicial = localStorage.getItem('ls_f_inicial')
   const ls_f_final = localStorage.getItem('ls_f_final')
   const ls_t_categoria = localStorage.getItem('ls_t_categoria')
   const ls_categoria = localStorage.getItem('ls_categoria')
   const ls_subcategoria = localStorage.getItem('ls_subcategoria')

   if (ls_f_inicial) {
      f_inicial.value = ls_f_inicial;
   }
   if (ls_f_final) {
      f_final.value = ls_f_final;
   }
   if (ls_t_categoria) {
      t_categoria.value = ls_t_categoria
      Object.entries(categorias).forEach(([index, datosCategoria]) => {
         if (datosCategoria.parent == localStorage.getItem('ls_t_categoria')) {
            if (datosCategoria.id == localStorage.getItem('ls_categoria')) {
               var selected = 'selected'
            } else {
               var selected = ''
            }
            categoria.innerHTML += `<option ${selected} value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
         }
      });
   }
   if (ls_categoria) {
      Object.entries(categorias).forEach(([index, datosCategoria]) => {
         if (datosCategoria.parent == localStorage.getItem('ls_categoria')) {
            if (datosCategoria.id == localStorage.getItem('ls_subcategoria')) {
               var selected = 'selected'
            } else {
               var selected = ''
            }
            subcategoria.innerHTML += `<option ${selected} value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
         }
      })
   }
   if (ls_subcategoria) {
      subcategoria.value = ls_subcategoria;
   }
   f_inicial.addEventListener('change', () => {
      localStorage.setItem('ls_f_inicial', f_inicial.value);
   });
   f_final.addEventListener('change', () => {
      localStorage.setItem('ls_f_final', f_final.value);
   });
   t_categoria.addEventListener('change', () => {
      localStorage.setItem('ls_t_categoria', t_categoria.value);
      categoria.innerHTML = '<option selected value="0">Categoría</option>'
      localStorage.setItem('ls_categoria', 0);
      subcategoria.innerHTML = '<option selected value="0">Subcategoría</option>'
      localStorage.setItem('ls_subcategoria', 0);
      Object.entries(categorias).forEach(([index, datosCategoria]) => {
         if (datosCategoria.parent == localStorage.getItem('ls_t_categoria')) {
            if (datosCategoria.id == localStorage.getItem('ls_categoria')) {
               var selected = 'selected'
            } else {
               var selected = ''
            }
            categoria.innerHTML += `<option ${selected} value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
         }
      });
   })
   categoria.addEventListener('change', () => {
      localStorage.setItem('ls_categoria', categoria.value);
      subcategoria.innerHTML = '<option selected value="0">Subcategoría</option>'
      localStorage.setItem('ls_subcategoria', 0);
      Object.entries(categorias).forEach(([index, datosCategoria]) => {
         if (datosCategoria.parent == localStorage.getItem('ls_categoria')) {
            if (datosCategoria.id == localStorage.getItem('ls_subcategoria')) {
               var selected = 'selected'
            } else {
               var selected = ''
            }
            subcategoria.innerHTML += `<option ${selected} value="${datosCategoria.id}">${datosCategoria.nombre}</option>`;
         }
      })
   })
   subcategoria.addEventListener('change', () => {
      localStorage.setItem('ls_subcategoria', subcategoria.value);
   })
   btn_filtrar.addEventListener('click', () => {
      dataform = new FormData(formulario)
      dataform.append('nonce', SGF_AJAX.nonce)
      dataform.append('action', btn_filtrar.value)
      filtrar_movimiento_billeteras(dataform)
   })

   console.log('Billeteras', ls_f_inicial, ls_f_final, ls_t_categoria, ls_categoria, ls_subcategoria);
} else {
   localStorage.removeItem('ls_f_inicial');
   localStorage.removeItem('ls_f_final');
   localStorage.removeItem('ls_t_categoria');
   localStorage.removeItem('ls_categoria');
   localStorage.removeItem('ls_subcategoria');
}
async function filtrar_movimiento_billeteras(dataform) {
   listarCampos(dataform)
   const request = new Request(SGF_AJAX.endpoint, {
      method: "POST",
      body: dataform,
   });
   try {
      const response = await fetch(request);
      const data = await response.json();
      if (data.success) {
         if (data.data.datos.itml < 0) {
            document.getElementById('itml').classList.add('text-danger')
            document.getElementById('itml').classList.remove('text-success')
         } else {
            document.getElementById('itml').classList.add('text-success')
            document.getElementById('itml').classList.remove('text-danger')
         }
         if (data.data.datos.gtml < 0) {
            document.getElementById('gtml').classList.add('text-danger')
            document.getElementById('gtml').classList.remove('text-success')
         } else {
            document.getElementById('gtml').classList.add('text-success')
            document.getElementById('gtml').classList.remove('text-danger')
         }
         if (data.data.datos.mnml < 0) {
            document.getElementById('mnml').classList.add('text-danger')
            document.getElementById('mnml').classList.remove('text-success')
         } else {
            document.getElementById('mnml').classList.add('text-success')
            document.getElementById('mnml').classList.remove('text-danger')
         }
         if (data.data.datos.itme < 0) {
            document.getElementById('itme').classList.add('text-danger')
            document.getElementById('itme').classList.remove('text-success')
         } else {
            document.getElementById('itme').classList.add('text-success')
            document.getElementById('itme').classList.remove('text-danger')
         }
         if (data.data.datos.gtme < 0) {
            document.getElementById('gtme').classList.add('text-danger')
            document.getElementById('gtme').classList.remove('text-success')
         } else {
            document.getElementById('gtme').classList.add('text-success')
            document.getElementById('gtme').classList.remove('text-danger')
         }
         if (data.data.datos.mnme < 0) {
            document.getElementById('mnme').classList.add('text-danger')
            document.getElementById('mnme').classList.remove('text-success')
         } else {
            document.getElementById('mnme').classList.add('text-success')
            document.getElementById('mnme').classList.remove('text-danger')
         }
         let formato = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
         document.getElementById('itml').value = formato.format(data.data.datos.itml)
         document.getElementById('gtml').value = formato.format(data.data.datos.gtml)
         document.getElementById('mnml').value = formato.format(data.data.datos.mnml)
         document.getElementById('itme').value = formato.format(data.data.datos.itme)
         document.getElementById('gtme').value = formato.format(data.data.datos.gtme)
         document.getElementById('mnme').value = formato.format(data.data.datos.mnme)

         console.log(data.data.datos.graficos)

         if (Object.keys(data.data.datos.graficos.ingresos_categoria_id).length === 0 || Object.keys(data.data.datos.graficos.egresos_categoria_id).length === 0) {
            document.getElementById('datos_graficos').setAttribute('hidden', '')
         } else {
            document.getElementById('datos_graficos').removeAttribute('hidden')
            console.log(data.data.datos.graficos.ingresos_acumulados)
            myCharts(data.data.datos.graficos.periodos, data.data.datos.graficos.ingresos_x_mes, data.data.datos.graficos.egresos_x_mes, data.data.datos.graficos.ingresos_acumulados, data.data.datos.graficos.egresos_acumulados)
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
// let ing_egr_gra, ing_acu_gra, egr_acu_gra
function myCharts(periodos, ingresos_x_mes, egresos_x_mes, ingresos_acumulados, egresos_acumulados) {
   if (ing_egr_gra) {
      ing_egr_gra.data.labels = periodos
      ing_egr_gra.data.datasets[0].data = Object.values(ingresos_x_mes).map(datos => datos.monto)
      ing_egr_gra.data.datasets[1].data = Object.values(egresos_x_mes).map(datos => datos.monto)
      ing_egr_gra.update()
   } else {
      const labels = periodos
      const ing_x_mes = Object.values(ingresos_x_mes).map(datos => datos.monto)
      const egr_x_mes = Object.values(egresos_x_mes).map(datos => datos.monto)
      ing_egr_gra = new Chart(document.getElementById('ingresosEgresos'), {
         type: 'line',
         data: {
            labels: labels,
            datasets: [
               {
                  label: 'Ingresos',
                  data: ing_x_mes,
                  tension: 0.3,
                  borderColor: 'rgba(0, 143, 48, 1)',
                  backgroundColor: 'rgba(0, 143, 48, 0.5)',
                  fill: {
                     // target: 'origin',
                  },
               },
               {
                  label: 'Egresos',
                  data: egr_x_mes,
                  tension: 0.3,
                  borderColor: 'rgba(206, 1, 1, 1)',
                  backgroundColor: 'rgba(206, 1, 1, 0.5)',
                  fill: {
                     // target: 'origin',
                  },
               },
            ]
         },
         options: {
            scales: {
               y: {
                  beginAtZero: true,
                  border: {
                     color: 'rgba(255,255,255,0.8)',
                  },
                  ticks: {
                     color: 'rgba(255,255,255,0.8)',
                  },
                  title: {
                     display: true,
                     text: 'Monto del movimiento',
                     color: 'rgba(255,255,255,0.8)',
                  },
                  grid: {
                     color: '',
                  },
               },
               x: {
                  border: {
                     color: 'rgba(255,255,255,0.8)',
                  },
                  ticks: {
                     color: 'rgba(255,255,255,0.8)',
                  },
                  title: {
                     display: true,
                     text: 'Periodo',
                     color: 'rgba(255,255,255,0.8)',
                  },
                  grid: {
                     color: '',
                  },

               }
            },
            plugins: {
               title: {
                  display: true,
                  text: 'Ingresos y Egresos',
                  color: 'rgba(255,255,255,0.8)',
                  font: {
                     size: 40
                  }
               },
               legend: {
                  labels: {
                     color: 'rgba(255,255,255,0.8)',
                  }
               }
            }
         }
      });
   }
   if (ing_acu_gra) {
      ing_acu_gra.data.lables = Object.values(ingresos_acumulados).map(datos => datos.categoria)
      ing_acu_gra.data.datasets[0].data = Object.values(ingresos_acumulados).map(datos => datos.monto)
      ing_acu_gra.update()
   } else {
      const etiquetas = Object.values(ingresos_acumulados).map(datos => datos.categoria)
      const ing_acum = Object.values(ingresos_acumulados).map(datos => datos.monto)
      ing_acu_gra = new Chart(document.getElementById('ingresosAcumulados'), {
         type: 'doughnut',
         data: {
            labels: etiquetas,
            datasets: [{
               data: ing_acum,
               hoverOffset: 4,
            }]
         },
         options: {
            plugins: {
               title: {
                  display: true,
                  text: 'Ingresos por Categoría',
                  color: 'rgba(255,255,255,0.8)',
                  font: {
                     size: 25
                  }
               },
               legend: {
                  labels: {
                     color: 'rgba(255,255,255,0.8)',
                  }
               }
            }
         }
      })
   }
   if (egr_acu_gra) {
      egr_acu_gra.data.labels = Object.values(egresos_acumulados).map(datos => datos.categoria)
      egr_acu_gra.data.datasets[0].data = Object.values(egresos_acumulados).map(datos => datos.monto)
      egr_acu_gra.update()
   } else {
      const etiquetas_egresos = Object.values(egresos_acumulados).map(datos => datos.categoria)
      const egresos_acum = Object.values(egresos_acumulados).map(datos => datos.monto)
      egr_acu_gra = new Chart(document.getElementById('egresosAcumulados'), {
         type: 'doughnut',
         data: {
            labels: etiquetas_egresos,
            datasets: [{
               data: egresos_acum,
               hoverOffset: 4,
            }]
         },
         options: {
            plugins: {
               title: {
                  display: true,
                  text: 'Egresos por Categoría',
                  color: 'rgba(255,255,255,0.8)',
                  font: {
                     size: 25
                  }
               },
               legend: {
                  labels: {
                     color: 'rgba(255,255,255,0.8)',
                  }
               }
            }
         }
      })
   }
}

function listarCampos(dataform) {
   for (var pair of dataform.entries()) {
      var nombre = pair[0];
      var valor = pair[1];
      console.log("Nombre:", nombre, "Valor:", valor);
   }
}
*/