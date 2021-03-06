import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinerCargaComponent } from 'src/app/modules/utils/components/spiner-carga/spiner-carga.component';
import { Card } from 'src/app/modules/utils/models/cards.model';
import { DataModal, DtoCard, ResponseMensaje } from 'src/app/modules/utils/models/general.model';
import { Page } from 'src/app/modules/utils/models/page.model';
import { AlertasService } from 'src/app/modules/utils/services/alertas.service';
import { CardsService } from 'src/app/modules/utils/services/cards.service';
import { ObservablesService } from 'src/app/modules/utils/services/observables.service';
import { PageService } from 'src/app/modules/utils/services/page.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

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
  dataPagesRespaldo: Page[] = new Array();
  nuevoPage: boolean = false;
  nuevoCard: boolean = false;
  dataCard: Card;
  constructor(
    private cardsService: CardsService,
    private pageService: PageService,
    private dialog: MatDialog,
    private alert: AlertasService,
    private observableService: ObservablesService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.alert.alertToast("Ya tienen una sesion activa", 'success');
      this.getPaginas();
    } else {
      this.iniciarSesionModal();
    }
  }
  onNuevoPage(){
    this.nuevoPage = true;
    this.observableService.setEditar(true);
  }
  onNuevoCard(){
    this.nuevoCard = true;
  }

  iniciarSesionModal() {
    let data = new DataModal();
    data.titulo = "Iniciar Sesión";
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '700px',
      height: '700px',
      data: data
    });

    dialogRef.afterClosed().subscribe(
      (result: any) => {
        console.log('resultado del modal: ', result);
        if (result) {
          this.getPaginas();
        }
      });
  }

  onSelectSeleccionadoP(result: string) {
    console.log("id recivido: ", result);
    if (this.selectPage != result) {
      this.statusCards = false;
      this.selectPage = result;
      console.log("data page antes: ", this.dataSelectP);
      console.log("pages respaldo", this.dataPagesRespaldo);
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
          console.log("page: ", id);
          console.log("paginas: ", this.dataSelectP);
          this.cards = result.cards;
          this.statusCards = true;
          
          this.alert.alertToast(result.mensaje, 'success');
        }
      }, error => {
        this.cargarSpiner.close();
        console.error(error);
        this.alert.alertToast(error.error.mensaje, 'error');
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
          
          this.dataPagesRespaldo = result.pages;
          console.log("pages respaldo", this.dataPagesRespaldo);
          this.selectPage = result.pages[0].id.toString();
          this.infoPageDefault = result.pages[0];
          this.setHeaderFooter(this.infoPageDefault);
          this.dataSelectP = result.pages;
          this.statusSelectP = true;
          this.getCardsPage(this.infoPageDefault.id);
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
          this.selectPage = id.toString();
          this.setHeaderFooter(this.infoPageDefault);
          this.getCardsPage(this.infoPageDefault.id);
        }
      }, error => {
        console.log(error);
        this.cargarSpiner ? this.cargarSpiner.close() : null;
      }
    )
  }

  setHeaderFooter(infoPageDefault: Page) {
    this.observableService.setHader(infoPageDefault.nombre);
    this.observableService.setFooter(infoPageDefault.footer);
  }

  onActualizarPage(page: FormData) {
    this.cargarSpiner = this.dialog.open(SpinerCargaComponent, {
      width: '300px',
      height: '300px',
    });
    console.log("page para actualizar");
    this.pageService.putPage(parseInt(this.selectPage), page).subscribe(
      (result: ResponseMensaje) => {
        this.cargarSpiner.close();
        if (result.mensaje) {
          this.alert.alertToast(result.mensaje, 'success');
        }
      }, error => {
        this.cargarSpiner.close();
        this.alert.alertToast(error.error.mensaje, 'error');
      })
  }
  onGuardarPage(page: FormData){
    this.cargarSpiner = this.dialog.open(SpinerCargaComponent, {
      width: '300px',
      height: '300px',
    });
    console.log("page para guardar");
    this.pageService.postPage(page).subscribe(
      (result: ResponseMensaje) => {
        this.cargarSpiner.close();
        if (result.mensaje) {
          this.alert.alertToast(result.mensaje, 'success');
        }
      }, error => {
        this.cargarSpiner.close();
        this.alert.alertToast(error.error.mensaje, 'error');
      })
  }
  onCancelarPage(page: boolean){
    this.nuevoPage = page;
  }
  onEliminarPage(){
    console.log("eliminar page:", this.selectPage);
  }

  onActualizarCard(data: DtoCard) {
    this.cargarSpiner = this.dialog.open(SpinerCargaComponent, {
      width: '300px',
      height: '300px',
    });
    this.cardsService.putCard(data.id, data.data).subscribe(
      (result: ResponseMensaje) => {
        this.cargarSpiner.close();
        if (result.mensaje) {
          this.alert.alertToast(result.mensaje, 'success');
          this.getCardsPage(parseInt(this.selectPage));
        }
      }, error => {
        this.cargarSpiner.close();
        this.alert.alertToast(error.error.mensaje, 'error');
      }
    )
  }
  onGuardarNuevoCard(data: FormData){
    console.log("guardar Card: " , data);
    this.cargarSpiner = this.dialog.open(SpinerCargaComponent, {
      width: '300px',
      height: '300px',
    });
    this.cardsService.postCard(data).subscribe(
      (result: ResponseMensaje) => {
        this.cargarSpiner.close();
        if (result.mensaje) {
          this.alert.alertToast(result.mensaje, 'success');
          this.nuevoCard = false;
          this.getCardsPage(parseInt(this.selectPage));
        }
      }, error => {
        this.cargarSpiner.close();
        this.alert.alertToast(error.error.mensaje, 'error');
      }
    )
  }
  onCancelarNuevoCard(cancelar: boolean){
    this.nuevoCard = cancelar;
  }
  onEliminarCard(id: number){
    console.log("eliminar Card: " , id);
    this.cargarSpiner = this.dialog.open(SpinerCargaComponent, {
      width: '300px',
      height: '300px',
    });
    this.cardsService.deleteCard(id).subscribe(
      (result: ResponseMensaje) => {
        this.cargarSpiner.close();
        if (result.mensaje) {
          this.alert.alertToast(result.mensaje, 'success');
          this.nuevoCard = false;
          this.getCardsPage(parseInt(this.selectPage));
        }
      }, error => {
        this.cargarSpiner.close();
        this.alert.alertToast(error.error.mensaje, 'error');
      }
    )
  }

}
