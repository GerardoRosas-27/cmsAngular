import { Component, Input, OnInit } from '@angular/core';
import { ObservablesService } from '../../services/observables.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() content?: string;
  @Input() editar?: boolean;


  constructor(private observableService: ObservablesService) {
    this.content = this.content ? this.content : "";
  }
  ngOnInit(): void {
  }

  cambiarContent() {
    this.editar = false;
    this.observableService.setFooter(this.content);
  }

}
