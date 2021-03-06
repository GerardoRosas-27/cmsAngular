import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObservablesService } from '../../services/observables.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() nombreAPP?: string;
  @Input() editar?: boolean;
  
  constructor(private router: Router,
    private observableService: ObservablesService) { 
    this.nombreAPP = this.nombreAPP ? this.nombreAPP: "Mi APP"; 
  }

  ngOnInit(): void {
  }

  cambiarContent() {
    this.editar = false;
    this.observableService.setHader(this.nombreAPP);
  }
  
  onNavegacion(page: string){
  console.log("entro a la navegacion");
    this.router.navigate([page]);
  }
  cerrarSesion(){
    sessionStorage.clear();
    this.router.navigate(['inicio']);
  }

}
