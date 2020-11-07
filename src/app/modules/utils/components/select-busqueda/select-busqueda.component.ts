import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSelect } from '../../models/general.model';

@Component({
  selector: 'app-select-busqueda',
  templateUrl: './select-busqueda.component.html',
  styleUrls: ['./select-busqueda.component.css']
})

export class SelectBusquedaComponent implements OnInit {
  @Output() selectSeleccionado: EventEmitter<string> = new EventEmitter<string>();
  @Input() nombreId: string;
  @Input() nombreText: string;
  @Input() dataSelect: any[];
  @Input() nombreLabel: string;
  @Input() seleccionadoId?: string;

  dataSelectBuscar: DataSelect[] = new Array();
  dataSelectBuscarResult: DataSelect[] = new Array();
  valorFiltrar: string = '';

  statusSelect: boolean = false;
  constructor() { }

  ngOnInit() {
    this.seleccionadoId = this.seleccionadoId ? this.seleccionadoId : '0';
    this.obtenerDataSelect();
  }

  enviarSeleccionado() {
    console.log("seleccionado: ", this.seleccionadoId);
    this.selectSeleccionado.emit(this.seleccionadoId);
  }

  onResetSelect() {
    this.valorFiltrar = '';
    this.filtrarSelect();
  }

  filtrarSelect() {
    let result = this.valorFiltrar ? this.filterData(this.valorFiltrar, this.dataSelectBuscar) : this.dataSelectBuscar.slice();
    console.log("result: ");
    console.log(result);
    if (result.length == 0) {
      this.dataSelectBuscarResult = [{ id: '0', text: "sin resultados" }];
    } else {
      this.dataSelectBuscarResult = result;
    }
  }

  filterData(value: string, data: any) {
    console.log("Valor de entrada: ")
    console.log(value);
    const filterValue = value.toLowerCase();
    let result = data.filter(state => state.text.toLowerCase().indexOf(filterValue) === 0);
    console.log("Valor filtrado: ")
    console.log(result);
    return result;
  }
  obtenerDataSelect() {
    this.dataSelect.forEach(element => {
      let data: DataSelect = {
        id: element[this.nombreId],
        text: element[this.nombreText]
      }
      this.dataSelectBuscar.push(data);
    });
    this.dataSelectBuscarResult = this.dataSelectBuscar;
    this.statusSelect = true;
  }

}
