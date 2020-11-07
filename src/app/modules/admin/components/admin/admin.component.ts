import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinerCargaComponent } from 'src/app/modules/utils/components/spiner-carga/spiner-carga.component';
import { Card } from 'src/app/modules/utils/models/cards.model';
import { DataModal, ResponseMensaje } from 'src/app/modules/utils/models/general.model';
import { AlertasService } from 'src/app/modules/utils/services/alertas.service';
import { CardsService } from 'src/app/modules/utils/services/cards.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 
  cargarSpiner: MatDialogRef<unknown, any>;
  statusCards: boolean;
  cards: Card[] = new Array();
  constructor(
    private cardsService: CardsService,
    private dialog: MatDialog,
    private alert: AlertasService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('token')){
      this.getData();
    }
    this.iniciarSesionModal();
  }

  iniciarSesionModal(){
    if(sessionStorage.getItem('token')){
      this.alert.alertToast("Ya tienen una sesion activa", 'success');
    }else{
      let data = new DataModal();
      data.titulo = "Iniciar Sesión";
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '700px',
        height: '700px',
        data: data
      });
  
      dialogRef.afterClosed().subscribe(
        (result: any) => {
          console.log('resultado del modal: ',  result);
          if(result){
            this.getData();
          }
        });
    }
  }

  getCards() {
    this.cargarSpiner = this.dialog.open(SpinerCargaComponent, {
      width: '300px',
      height: '300px',
    });
    this.cardsService.getCardsPage(1).subscribe(
      (result: ResponseMensaje) => {
        this.cargarSpiner.close();
        if (result.cards) {
          this.statusCards = true;
          this.cards = result.cards;
          this.alert.alertToast(result.mensaje, 'success');
        }
      }, error => {
        this.cargarSpiner.close();
        console.error(error);
        this.alert.alertToast(error.mensaje, 'error');
      }
    )
  }

  getData(){
    this.getCards();
  }
  


}
