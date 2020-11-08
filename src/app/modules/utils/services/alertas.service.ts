import { Injectable } from '@angular/core';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor() { 
  }
  alertToast(mensaje: string, tipo: string) {
    if (tipo === "success") {
      swal.fire({
        toast: true,
        position: 'bottom',
        icon: 'success',
        title: mensaje,
        showConfirmButton: false,
        timer: 2500
      })
    } else {
      if (tipo === "error") {
        swal.fire({
          toast: true,
          position: 'bottom',
          icon: 'error',
          title: mensaje,
          showConfirmButton: false,
          timer: 4500
        })
      } else {
        swal.fire({
          toast: true,
          position: 'bottom',
          icon: 'info',
          title: mensaje,
          showConfirmButton: false,
          timer: 3500
        })
      }

    }
  }
  alertBarraSpiner(mensaje) {

    const Toast = swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer)
        toast.addEventListener('mouseleave', swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'info',
      title: '<h3>' + mensaje + '</h3>'
    })

  }
  alertaDefault(mensaje: string, tipo: string) {
    if (tipo === 'error') {
      swal.fire("Error", mensaje, "error");
    }
    if (tipo === 'success') {
      swal.fire("Exito", mensaje, "success");
    }
    if (tipo === 'info') {
      swal.fire("Información", mensaje, "info");
    }
  }

}
