import Chart from 'chart.js/auto';

console.log('TABLERO')

if (document.getElementById('tablero')) {
   let ing_egr_gra_ml, ing_acu_gra_ml, egr_acu_gra_ml, ing_egr_gra_me, ing_acu_gra_me, egr_acu_gra_me, ing_var_ml_rel, egr_var_ml_rel, neto_var_ml_rel
   const formulario = document.getElementById('filtros_billeteras')
   const tipoCambioEval = document.getElementById('tipoCambio')
   const tipoCambio = tipoCambioEval ? tipoCambioEval : 1
   const monedaConsolidacion = document.getElementById('monedaConsolidacion')
   const t_categoria = document.getElementById('t_categoria')
   const categoria = document.getElementById('categoria')
   const subcategoria = document.getElementById('subcategoria')
   const categorias = JSON.parse(document.getElementById('listaCategorias').value)
   const btn_filtrar = document.getElementById('btn-filtrar')

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

   const periodos = JSON.parse(document.getElementById('periodos').value)
   const imc = JSON.parse(document.getElementById('ingresos_x_mes_ml').value).map(datos => datos.monto);
   const emc = JSON.parse(document.getElementById('egresos_x_mes_ml').value).map(datos => datos.monto)
   const ilblcat = JSON.parse(document.getElementById('ingresos_acumulados_ml').value).map(datos => datos.categoria)
   const icat = JSON.parse(document.getElementById('ingresos_acumulados_ml').value).map(datos => datos.monto)
   const elblcat = JSON.parse(document.getElementById('egresos_acumulados_ml').value).map(datos => datos.categoria)
   const ecat = JSON.parse(document.getElementById('egresos_acumulados_ml').value).map(datos => datos.monto)

   graficos_ml(periodos, imc, emc, ilblcat, icat, elblcat, ecat)

   btn_filtrar.addEventListener('click', () => {
      if (document.getElementById('monedas').value > 1) {
         if (tipoCambio.value > 1) {
            document.getElementById('ver_datos').removeAttribute('hidden')
            document.getElementById('alerta_monedas').setAttribute('hidden', '')
         } else {
            document.getElementById('ver_datos').setAttribute('hidden', '')
            document.getElementById('alerta_monedas').removeAttribute('hidden')
         }
      } else {
         document.getElementById('ver_datos').removeAttribute('hidden')
         document.getElementById('alerta_monedas').setAttribute('hidden', '')
      }
      const dataform = new FormData(formulario)
      dataform.append('nonce', SGF_AJAX.nonce)
      dataform.append('action', btn_filtrar.value)
      filtrar_movimiento_billeteras(dataform)
   })

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
            const ingresosID = data.data.datos.ingresosID
            const egresosID = data.data.datos.egresosID
            let im_monto, em_monto, icat_lbl, icat_monto, ecat_lbl, ecat_monto
            let formato = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
            switch (data.data.datos.monedaConsolidacion) {
               case 2:
                  document.getElementById('itml').value = formato.format(data.data.datos.TOTALES[ingresosID].TCME)
                  document.getElementById('gtml').value = formato.format(data.data.datos.TOTALES[egresosID].TCME)
                  document.getElementById('mnml').value = formato.format(data.data.datos.TOTALES.NETOS.MNCME)
                  im_monto = Object.values(data.data.datos.MCME[ingresosID]).map(datos => datos.monto)
                  em_monto = Object.values(data.data.datos.MCME[egresosID]).map(datos => datos.monto)
                  icat_lbl = Object.values(data.data.datos.CATCME[ingresosID]).map(datos => datos.categoria)
                  icat_monto = Object.values(data.data.datos.CATCME[ingresosID]).map(datos => datos.monto)
                  ecat_lbl = Object.values(data.data.datos.CATCME[egresosID]).map(datos => datos.categoria)
                  ecat_monto = Object.values(data.data.datos.CATCME[egresosID]).map(datos => datos.monto)
                  break;
               case 3:
                  document.getElementById('itml').value = formato.format(data.data.datos.TOTALES[ingresosID].TML)
                  document.getElementById('gtml').value = formato.format(data.data.datos.TOTALES[egresosID].TML)
                  document.getElementById('mnml').value = formato.format(data.data.datos.TOTALES.NETOS.MNML)
                  im_monto = Object.values(data.data.datos.MML[ingresosID]).map(datos => datos.monto)
                  em_monto = Object.values(data.data.datos.MML[egresosID]).map(datos => datos.monto)
                  icat_lbl = Object.values(data.data.datos.CATML[ingresosID]).map(datos => datos.categoria)
                  icat_monto = Object.values(data.data.datos.CATML[ingresosID]).map(datos => datos.monto)
                  ecat_lbl = Object.values(data.data.datos.CATCML[egresosID]).map(datos => datos.categoria)
                  ecat_monto = Object.values(data.data.datos.CATML[egresosID]).map(datos => datos.monto)
                  break;
               case 4:
                  document.getElementById('itml').value = formato.format(data.data.datos.TOTALES[ingresosID].TME)
                  document.getElementById('gtml').value = formato.format(data.data.datos.TOTALES[egresosID].TME)
                  document.getElementById('mnml').value = formato.format(data.data.datos.TOTALES.NETOS.MNME)
                  im_monto = Object.values(data.data.datos.MME[ingresosID]).map(datos => datos.monto)
                  em_monto = Object.values(data.data.datos.MME[egresosID]).map(datos => datos.monto)
                  icat_lbl = Object.values(data.data.datos.CATME[ingresosID]).map(datos => datos.categoria)
                  icat_monto = Object.values(data.data.datos.CATME[ingresosID]).map(datos => datos.monto)
                  ecat_lbl = Object.values(data.data.datos.CATCME[egresosID]).map(datos => datos.categoria)
                  ecat_monto = Object.values(data.data.datos.CATME[egresosID]).map(datos => datos.monto)
                  break;

               default:
                  document.getElementById('itml').value = formato.format(data.data.datos.TOTALES[ingresosID].TCML)
                  document.getElementById('gtml').value = formato.format(data.data.datos.TOTALES[egresosID].TCML)
                  document.getElementById('mnml').value = formato.format(data.data.datos.TOTALES.NETOS.MNCML)
                  im_monto = Object.values(data.data.datos.MCML[ingresosID]).map(datos => datos.monto)
                  em_monto = Object.values(data.data.datos.MCML[egresosID]).map(datos => datos.monto)
                  icat_lbl = Object.values(data.data.datos.CATCML[ingresosID]).map(datos => datos.categoria)
                  icat_monto = Object.values(data.data.datos.CATCML[ingresosID]).map(datos => datos.monto)
                  ecat_lbl = Object.values(data.data.datos.CATCML[egresosID]).map(datos => datos.categoria)
                  ecat_monto = Object.values(data.data.datos.CATCML[egresosID]).map(datos => datos.monto)
                  break;
            }

            graficos_ml(data.data.datos.PERIODOS, im_monto, em_monto, icat_lbl, icat_monto, ecat_lbl, ecat_monto)

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

      function listarCampos(dataform) {
         for (var pair of dataform.entries()) {
            var nombre = pair[0];
            var valor = pair[1];
            console.log("Nombre:", nombre, "Valor:", valor);
         }
      }
   }
   function graficos_ml(periodos, ingresos_x_mes, egresos_x_mes, ingresos_categorias, ingresos_acumulados, egresos_categorias, egresos_acumulados) {
      if (ing_egr_gra_ml) {
         ing_egr_gra_ml.data.labels = periodos
         ing_egr_gra_ml.data.datasets[0].data = ingresos_x_mes
         ing_egr_gra_ml.data.datasets[1].data = egresos_x_mes
         ing_egr_gra_ml.update()
      } else {
         const labels = periodos
         const ing_x_mes = ingresos_x_mes
         const egr_x_mes = egresos_x_mes
         ing_egr_gra_ml = new Chart(document.getElementById('ingresosEgresos_ml'), {
            type: 'line',
            data: {
               labels: labels,
               datasets: [
                  {
                     label: 'Ingresos',
                     data: ing_x_mes,
                     tension: 0.3,
                     borderColor: 'rgb(6, 214, 160)',
                     backgroundColor: 'rgba(0, 143, 48, 0.5)',
                     fill: {
                        // target: 'origin',
                     },
                  },
                  {
                     label: 'Egresos',
                     data: egr_x_mes,
                     tension: 0.3,
                     borderColor: 'rgb(239, 71, 111)',
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
                     text: 'Ingresos y Egresos Mensuales',
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
         });
      }
      if (ing_acu_gra_ml) {
         ing_acu_gra_ml.data.lables = ingresos_categorias
         ing_acu_gra_ml.data.datasets[0].data = ingresos_acumulados
         ing_acu_gra_ml.update()
      } else {
         const etiquetas = ingresos_categorias
         const ing_acum = ingresos_acumulados
         ing_acu_gra_ml = new Chart(document.getElementById('ingresosAcumulados_ml'), {
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
      if (egr_acu_gra_ml) {
         egr_acu_gra_ml.data.labels = egresos_categorias
         egr_acu_gra_ml.data.datasets[0].data = egresos_acumulados
         egr_acu_gra_ml.update()
      } else {
         const etiquetas_egresos = egresos_categorias
         const egresos_acum = egresos_acumulados
         egr_acu_gra_ml = new Chart(document.getElementById('egresosAcumulados_ml'), {
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

   if (document.getElementById('datos_resultado')) {
      const formulario = document.getElementById('datos_resultado')
      const btn_totales_resultado = document.getElementById('btn_totales_resultado')
      const anio = document.getElementById('anio')
      const mes = document.getElementById('mes')
      const ls_anio = localStorage.getItem('ls_anio')
      const ls_mes = localStorage.getItem('ls_mes')
      if (ls_anio) {
         anio.value = ls_anio
      }
      if (ls_mes) {
         mes.value = ls_mes
      }
      anio.addEventListener('change', () => {
         localStorage.setItem('ls_anio', anio.value);
      })
      mes.addEventListener('change', () => {
         localStorage.setItem('ls_mes', mes.value);
      })
      btn_totales_resultado.addEventListener('click', () => {
         const dataform = new FormData(formulario)
         dataform.append('nonce', SGF_AJAX.nonce)
         dataform.append('action', btn_totales_resultado.value)
         dataform.append('tipoCambio', tipoCambio.value)
         get_data_resultados(dataform)
      })
   }
   async function get_data_resultados(dataform) {
      listarCampos(dataform)
      const request = new Request(SGF_AJAX.endpoint, {
         method: "POST",
         body: dataform,
      });
      try {
         const response = await fetch(request);
         const data = await response.json();
         if (data.success) {
            console.log(data.data.datos)

            let formato = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, })

            const ing_ml = data.data.datos.ing_ml_con;
            const ing_ml_tbl = document.getElementById('ingresos_ml');
            let ing_real_ml_tot = 0;
            let ing_pre_ml_tot = 0
            let ing_var_ml_tot = 0
            ing_ml_tbl.innerHTML = '';
            Object.entries(ing_ml).forEach(([categoria, valores]) => {
               ing_real_ml_tot += valores.real;
               ing_pre_ml_tot += valores.presupuesto;
               ing_var_ml_tot += valores.variacion;
               const fila = document.createElement('tr');
               fila.innerHTML = `
                  <td class="ps-3">${categoria}</td>
                  <td class="text-end ${valores.real < 0 ? 'text-danger' : 'text-success'}">${formato.format(valores.real)}</td>
                  <td class="text-end ${valores.presupuesto < 0 ? 'text-danger' : 'text-success'}">${formato.format(valores.presupuesto)}</td>
                  <td class="text-end ${valores.variacion < 0 ? 'text-danger' : 'text-success'}">${formato.format(valores.variacion)}</td>
                  <td class="text-end  ${valores.variacion < 0 ? 'text-danger' : 'text-success'}">${valores.porcentaje}</td>
               `;
               ing_ml_tbl.appendChild(fila);
            });

            const ing_ml_tot = document.createElement('tr');

            if (ing_pre_ml_tot == 0) {
               ing_var_ml_rel = 100
            } else {
               ing_var_ml_rel = (ing_var_ml_tot / ing_pre_ml_tot) * 100
            }

            ing_ml_tot.innerHTML = `
                  <td class="ps-3">Total Ingresos</td>
                  <td class="text-end ${ing_real_ml_tot < 0 ? 'text-danger' : 'text-success'}">${formato.format(ing_real_ml_tot)}</td>
                  <td class="text-end ${ing_pre_ml_tot < 0 ? 'text-danger' : 'text-success'}">${formato.format(ing_pre_ml_tot)}</td>
                  <td class="text-end ${ing_var_ml_tot < 0 ? 'text-danger' : 'text-success'}">${formato.format(ing_var_ml_tot)}</td>
                  <td class="text-end ${ing_var_ml_rel < 0 ? 'text-danger' : 'text-success'}">${formato.format(Math.abs(ing_var_ml_rel))}%</td>
               `;
            ing_ml_tbl.appendChild(ing_ml_tot);

            const egr_ml = data.data.datos.egr_ml_con;
            const egr_ml_tbl = document.getElementById('egresos_ml');
            let egr_real_ml_tot = 0;
            let egr_pre_ml_tot = 0
            let egr_var_ml_tot = 0
            egr_ml_tbl.innerHTML = '';
            Object.entries(egr_ml).forEach(([categoria, valores]) => {
               egr_real_ml_tot += valores.real;
               egr_pre_ml_tot += valores.presupuesto;
               egr_var_ml_tot += valores.variacion;
               const fila = document.createElement('tr');
               fila.innerHTML = `
                  <td class="ps-3">${categoria}</td>
                  <td class="text-end ${valores.real < 0 ? 'text-danger' : 'text-success'}">${formato.format(valores.real)}</td>
                  <td class="text-end ${valores.presupuesto < 0 ? 'text-danger' : 'text-success'}">${formato.format(valores.presupuesto)}</td>
                  <td class="text-end ${valores.variacion < 0 ? 'text-danger' : 'text-success'}">${formato.format(valores.variacion)}</td>
                  <td class="text-end  ${valores.variacion < 0 ? 'text-danger' : 'text-success'}">${valores.porcentaje}</td>
               `;
               egr_ml_tbl.appendChild(fila);
            });

            if (egr_pre_ml_tot == 0) {
               egr_var_ml_rel = -100
            } else {
               egr_var_ml_rel = (egr_var_ml_tot / egr_pre_ml_tot) * 100
            }

            const egr_ml_tot = document.createElement('tr');
            egr_ml_tot.innerHTML = `
                  <td class="ps-3">Total Egresos/Gastos</td>
                  <td class="text-end ${egr_real_ml_tot < 0 ? 'text-danger' : 'text-success'}">${formato.format(egr_real_ml_tot)}</td>
                  <td class="text-end ${egr_pre_ml_tot < 0 ? 'text-danger' : 'text-success'}">${formato.format(egr_pre_ml_tot)}</td>
                  <td class="text-end ${egr_var_ml_tot < 0 ? 'text-danger' : 'text-success'}">${formato.format(egr_var_ml_tot)}</td>
                  <td class="text-end ${egr_var_ml_rel < 0 ? 'text-danger' : 'text-success'}">${formato.format(Math.abs(egr_var_ml_rel))}%</td>
               `;
            egr_ml_tbl.appendChild(egr_ml_tot);

            const totales_tbl = document.getElementById('totales_tbl')
            const neto_real = ing_real_ml_tot + egr_real_ml_tot
            const neto_pre = ing_pre_ml_tot + egr_pre_ml_tot
            const neto_var = ing_var_ml_tot + egr_var_ml_tot
            const fila = document.getElementById('resultado_neto');

            if (neto_pre == 0) {
               neto_var_ml_rel = 100
            } else {
               neto_var_ml_rel = (neto_var / neto_pre) * 100
            }

            fila.innerHTML = `
                  <td class="fw-bold fs-5">Resultado Neto</td>
                  <td class="text-end ${neto_real < 0 ? 'text-danger' : 'text-success'}">${formato.format(neto_real)}</td>
                  <td class="text-end ${neto_pre < 0 ? 'text-danger' : 'text-success'}">${formato.format(neto_pre)}</td>
                  <td class="text-end ${neto_var < 0 ? 'text-danger' : 'text-success'}">${formato.format(neto_var)}</td>
                  <td class="text-end ${neto_var_ml_rel < 0 ? 'text-danger' : 'text-success'}">${Math.abs(neto_var_ml_rel)}%</td>
               `;
            console.log()
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

      function listarCampos(dataform) {
         for (var pair of dataform.entries()) {
            var nombre = pair[0];
            var valor = pair[1];
            console.log("Nombre:", nombre, "Valor:", valor);
         }
      }
   }
} else {
   localStorage.removeItem('ls_anio');
   localStorage.removeItem('ls_mes');
}