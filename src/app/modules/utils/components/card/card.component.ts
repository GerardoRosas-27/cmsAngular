import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../models/cards.model';
import { DtoCard } from '../../models/general.model';
import { Page } from '../../models/page.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Input() pages: Page[];
  @Input() selectPage: string;
  @Input() admin?: boolean;
  @Input() nuevo?: boolean;
  @Input() statusEditar?: boolean;
  @Output() guardarCard: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Output() actualizarCard: EventEmitter<DtoCard> = new EventEmitter<DtoCard>();
  @Output() eliminarCard: EventEmitter<number> = new EventEmitter<number>();
  @Output() cancelarCard: EventEmitter<boolean> = new EventEmitter<boolean>();

  cardTemporal: Card;
  selectFile: any;
  originalImagen: string;

  nombreIdP: string = 'id';
  nombreTextP: string = 'nombre';
  nombreLabelP: string = 'Selecciona la página';
 
  constructor() {
    console.log('data card: ', this.card);
    this.admin = this.admin ? this.admin : false;
    this.nuevo = this.nuevo ? this.nuevo : false;
    this.statusEditar = this.statusEditar ? this.statusEditar : false;
  }

  ngOnInit(): void {
    
  }
  onSelectSeleccionadoP(result: string){
    if(this.selectPage != result){
      this.card.page = parseInt(result);
    }
  }

  onEditar() {
    this.originalImagen = this.card.imagen;
    this.cardTemporal = this.card;
    console.log("datos de card: ", this.card);
    this.statusEditar = true;
  }
  onGuardar() {
    this.statusEditar = false;
    this.guardarCard.emit(this.crearFromData());
  }
  onActualizar() {
    this.statusEditar = false;
    this.actualizarCard.emit({ id: this.card.id , data: this.crearFromData() });
  }
  onCancelarLocal() {
    this.statusEditar = false;
    this.card = this.cardTemporal;
    this.selectFile = "";
    this.card.imagen = this.originalImagen;
    console.log(this.card);
  }
  onCancelar() {
    this.cancelarCard.emit(true);
  }
  onEliminar() {
    this.eliminarCard.emit(this.card.id);
  }

  renderImagen(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectFile = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.card.imagen = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  crearFromData() {
    let formData = new FormData();
    formData.append("archivo",  this.selectFile);
    formData.append("nombre", this.card.nombre);
    formData.append("descripcion", this.card.descripcion);
    formData.append("boton", this.card.boton);
    formData.append("page", this.card.page.toString());
    return formData;
  }

}
