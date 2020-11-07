import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SpinerCargaComponent } from 'src/app/modules/utils/components/spiner-carga/spiner-carga.component';
import { DataModal, ResponseMensaje } from 'src/app/modules/utils/models/general.model';
import { Usuario } from 'src/app/modules/utils/models/usuarios.model';
import { AlertasService } from 'src/app/modules/utils/services/alertas.service';
import { UsuariosService } from 'src/app/modules/utils/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tipoContra: boolean = true;
  cargarSpiner: MatDialogRef<unknown, any>;
 
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
    private usuarioService: UsuariosService,
    private alertas: AlertasService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DataModal) {
  }

  ngOnInit() {
    this.dialogRef.disableClose = true;
    console.log("datos recibidos:", this.data);
  }

  onNoClick(): void {
    console.log("modal cerrado datos Enviados:");
    console.log(this.data);
    this.dialogRef.close(false);
    this.router.navigate(['inicio']);
  }

  onIniciarSesion(){
    if(this.data.username && this.data.contra){
      this.cargarSpiner = this.dialog.open(SpinerCargaComponent, {
        width: '300px',
        height: '300px',
      });
      const user: Usuario = {
        username: this.data.username,
        contra: this.data.contra
      }
      this.usuarioService.postUserSignin(user).subscribe(
        (result: ResponseMensaje)=> {
          this.cargarSpiner.close();
          console.log(result);
          
          if(result.token){
            this.dialogRef.close(true);
            sessionStorage.setItem('token', result.token);
            this.alertas.alertToast(result.mensaje, 'success');
          }
        }, error =>{
          this.cargarSpiner.close();
          console.log(error);
          this.alertas.alertToast(error.mensaje, 'error')
        }
      )
    }else{
      this.alertas.alertToast("Los dos campos son obligatorios", 'error')
    }
    
  }

}
