import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Page } from '../../models/page.model';
import { ObservablesService } from '../../services/observables.service';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  @Input() page: Page;
  @Input() admin?: boolean;
  @Input() nuevo?: boolean;
  @Input() statusEditar?: boolean;
  @Output() guardarpage: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Output() actualizarpage: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Output() eliminarpage: EventEmitter<number> = new EventEmitter<number>();
  @Output() cancelarpage: EventEmitter<boolean> = new EventEmitter<boolean>();


  nombrePage: string;
  footerPage: string;

  pageTemporal: Page;
  selectFile: any;
  originalImagen: string;
  constructor(
    private observableService: ObservablesService
  ) {
    console.log('data page: ', this.page);
    this.admin = this.admin ? this.admin : false;
    this.nuevo = this.nuevo ? this.nuevo : false;
    this.statusEditar = this.statusEditar ? this.statusEditar : false;
  }

  ngOnInit(): void {
    this.observableService.detectarHeader.subscribe(result =>{
      console.log("cambio header:", result);
      this.nombrePage = result;
    })
    
    this.observableService.detectarFooter.subscribe(result =>{
      console.log("cambio footer:", result);
      this.footerPage = result;
    })
  }

  onEditar() {
    this.originalImagen = this.page.imagen;
    this.pageTemporal = this.page;
    console.log("datos de page: ", this.page);
    this.observableService.setEditar(true);
    this.statusEditar = true;
  }
  onGuardar() {
    this.statusEditar = false;
    this.observableService.setEditar(false);
    this.guardarpage.emit(this.crearFromData());
  }
  onActualizar() {
    this.statusEditar = false;
    this.observableService.setEditar(false);
    this.actualizarpage.emit(this.crearFromData());
  }
  onCancelarLocal() {
    this.statusEditar = false;
    this.page = this.pageTemporal;
    this.selectFile = "";
    this.page.imagen = this.originalImagen;
    console.log(this.page);
    this.observableService.setEditar(false);
  }
  onCancelar() {
    this.statusEditar = false;
    this.observableService.setEditar(false);
    this.cancelarpage.emit(false);
  }
 
  renderImagen(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectFile = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.page.imagen = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  crearFromData() {
    let formData = new FormData();
    formData.append("archivo", this.selectFile);
    formData.append("nombre", this.nombrePage);
    formData.append("titulo", this.page.titulo);
    formData.append("descripcion", this.page.descripcion);
    formData.append("boton", this.page.boton);
    formData.append("link", this.page.link);
    formData.append("footer", this.footerPage);
    return formData;
  }

}

