import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../models/cards.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Input() admin?: boolean;
  @Input() nuevo?: boolean;
  @Input() statusEditar?: boolean;
  @Output() guardarCard: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Output() actualizarCard: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Output() eliminarCard: EventEmitter<number> = new EventEmitter<number>();
  @Output() cancelarCard: EventEmitter<boolean> = new EventEmitter<boolean>();

  cardTemporal: Card;
  selectFile: any;
  originalImagen: string;
  constructor() {
    console.log('data card: ', this.card);
    this.admin = this.admin ? this.admin : false;
    this.nuevo = this.nuevo ? this.nuevo : false;
    this.statusEditar = this.statusEditar ? this.statusEditar : false;
  }

  ngOnInit(): void {
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
    this.actualizarCard.emit(this.crearFromData());
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
    return formData;
  }

}
