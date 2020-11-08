import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-spiner-carga',
  templateUrl: './spiner-carga.component.html',
  styleUrls: ['./spiner-carga.component.css']
})
export class SpinerCargaComponent implements OnInit {

  color = 'F1CF0B';
  constructor(
    public dialogRef: MatDialogRef<SpinerCargaComponent>) {}

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }

}
