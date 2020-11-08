import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservablesService {

  private cambiarHeader = new BehaviorSubject<string>('');
  private cambiarFooter  = new BehaviorSubject<string>('');
  private cambiarEditar  = new BehaviorSubject<boolean>(false);
 
  //Detectar los cambios en los Observables
  public detectarHeader = this.cambiarHeader.asObservable();
  public detectarFooter = this.cambiarFooter.asObservable();
  public detectarEditar = this.cambiarEditar.asObservable();


  constructor() {}
  //Cambiar el estado de los observables
  public setHader(titulo: string): void {
    this.cambiarHeader.next(titulo);
  }

  public setFooter(titulo: string): void {
    this.cambiarFooter.next(titulo);
  }
  public setEditar(titulo: boolean): void {
    this.cambiarEditar.next(titulo);
  }

 
}
