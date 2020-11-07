import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinerCargaComponent } from 'src/app/modules/utils/components/spiner-carga/spiner-carga.component';
import { Card } from 'src/app/modules/utils/models/cards.model';
import { ResponseMensaje } from 'src/app/modules/utils/models/general.model';
import { AlertasService } from 'src/app/modules/utils/services/alertas.service';
import { CardsService } from 'src/app/modules/utils/services/cards.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  cargarSpiner: MatDialogRef<unknown, any>;
  statusCards: boolean;
  cards: Card[] = new Array();
  constructor(
    private cardsService: CardsService,
    private dialog: MatDialog,
    private alert: AlertasService) { }

  ngOnInit(): void {
    this.getCards();
  }

  getCards() {
    this.cargarSpiner = this.dialog.open(SpinerCargaComponent, {
      width: '300px',
      height: '300px',
    });
    this.cardsService.getCards().subscribe(
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
  

}
