import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from 'src/app/modules/utils/components/header/header.component';
import { SpinerCargaComponent } from 'src/app/modules/utils/components/spiner-carga/spiner-carga.component';
import { Card } from 'src/app/modules/utils/models/cards.model';
import { ResponseMensaje } from 'src/app/modules/utils/models/general.model';
import { Page } from 'src/app/modules/utils/models/page.model';
import { AlertasService } from 'src/app/modules/utils/services/alertas.service';
import { CardsService } from 'src/app/modules/utils/services/cards.service';
import { ObservablesService } from 'src/app/modules/utils/services/observables.service';
import { PageService } from 'src/app/modules/utils/services/page.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  cargarSpiner: MatDialogRef<unknown, any>;
  statusCards: boolean;
  infoPageDefault: Page = new Page();
  cards: Card[] = new Array();
  selectPage: string;

  statusSelectP: boolean = false;
  nombreIdP: string = 'id';
  nombreTextP: string = 'nombre';
  nombreLabelP: string = 'Selecciona la página';
  dataSelectP: Page[] = new Array();

  constructor(
    private cardsService: CardsService,
    private pageService: PageService,
    private dialog: MatDialog,
    private alert: AlertasService,
    private observableService: ObservablesService) { }

  ngOnInit(): void {
    this.getPaginas();
  }
  onSelectSeleccionadoP(result: string) {
    console.log("id recivido: ", result);
    if (this.selectPage != result) {
      this.selectPage = result;
      this.getPagina(parseInt(this.selectPage));
    }
  }

  getCardsPage(id: number) {
    this.cargarSpiner = this.dialog.open(SpinerCargaComponent, {
      width: '300px',
      height: '300px',
    });
    this.cardsService.getCardsPage(id).subscribe(
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

  getPaginas() {
    this.cargarSpiner = this.dialog.open(SpinerCargaComponent, {
      width: '300px',
      height: '300px',
    });
    this.pageService.getPages().subscribe(
      (result: ResponseMensaje) => {
        this.cargarSpiner ? this.cargarSpiner.close() : null;
        if (result.pages.length > 0) {
          this.selectPage = result.pages[0].id.toString();
          this.infoPageDefault = result.pages[0];
          this.setHeaderFooter(this.infoPageDefault);
          this.getCardsPage(this.infoPageDefault.id);
          this.dataSelectP = result.pages;
          this.statusSelectP = true;
        }
      }, error => {
        console.log(error);
        this.cargarSpiner ? this.cargarSpiner.close() : null;
      }
    )
  }

  getPagina(id: number) {
    this.cargarSpiner = this.dialog.open(SpinerCargaComponent, {
      width: '300px',
      height: '300px',
    });
    this.pageService.getPage(id).subscribe(
      (result: ResponseMensaje) => {
        this.cargarSpiner ? this.cargarSpiner.close() : null;
        if (result.pages.length > 0) {
          this.infoPageDefault = result.pages[0];
          this.setHeaderFooter(this.infoPageDefault);
          this.getCardsPage(this.infoPageDefault.id);
        }
      }, error => {
        console.log(error);
        this.cargarSpiner ? this.cargarSpiner.close() : null;
      }
    )
  }

  setHeaderFooter(infoPageDefault: Page){
    this.observableService.setHader(infoPageDefault.nombre);
    this.observableService.setFooter(infoPageDefault.footer);
  }


}
