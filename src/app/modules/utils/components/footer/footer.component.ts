import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() content?: string;

  constructor() { 
    this.content = this.content ? this.content: "";
  }

  ngOnInit(): void {
  }
  setContent(content: string){
    this.content = content;
  }

}
