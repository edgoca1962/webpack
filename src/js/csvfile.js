import Swal from 'sweetalert2'
if (document.getElementById('csvfilefrm')) {
   const formulario = document.getElementById('csvfilefrm')
   const btn_enviarfile = document.getElementById('btn_enviarfile')
   formulario.addEventListener('submit', function (e) {
      e.preventDefault()
      const datosformulario = new FormData(formulario);
      fetch(datosformulario.get('endpoint'), {
         method: 'POST',
         body: datosformulario,
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.success) {
               console.log(data.data)
               Swal.fire({
                  icon: 'success',
                  title: 'CSV Procesado',
                  showConfirmButton: false,
                  showClass: {
                     popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                     popup: 'animate__animated animate__fadeOutUp'
                  },
                  text: datosformulario.get('msgtxt'),
                  timer: 2000
               });
               setTimeout(() => {
                  // location.reload()
               }, 2000);
            } else {
               console.log(data)
               Swal.fire({
                  icon: 'error',
                  title: 'CSV File Error',
                  showClass: {
                     popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                     popup: 'animate__animated animate__fadeOutUp'
                  },
                  text: data.data,
                  showConfirmButton: false,
                  timer: 2000
               });
            }
         })
         .catch((err) => console.log(err));
   })

}