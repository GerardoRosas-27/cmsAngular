import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() nombreAPP: string;

  
  constructor(private router: Router) { 
    this.nombreAPP = this.nombreAPP ? this.nombreAPP: "Mi APP"; 
  }

  ngOnInit(): void {
  }
  onNavegacion(page: string){
  console.log("entro a la navegacion");
    this.router.navigate([page]);
  }

}
