import { Component, OnInit } from '@angular/core';
import { ObservablesService } from './modules/utils/services/observables.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  nombreAPP: string;
  descripcion: string;
  editar: boolean;
  constructor(
  private observableService: ObservablesService) { 
  }

  ngOnInit(): void {
    this.observableService.detectarHeader.subscribe(result =>{
      console.log("cambio header:", result);
      this.nombreAPP = result;
    })
    
    this.observableService.detectarFooter.subscribe(result =>{
      console.log("cambio footer:", result);
      this.descripcion = result;
    })

    this.observableService.detectarEditar.subscribe(result =>{
      console.log("cambio usuario header:", result);
      this.editar = result;
    })
  }
}
