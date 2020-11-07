import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { BannerComponent } from './components/banner/banner.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { SpinerCargaComponent } from './components/spiner-carga/spiner-carga.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const modulesUtils = [
  CardComponent,
  BannerComponent,
  HeaderComponent,
  FooterComponent,
  SpinerCargaComponent
]


@NgModule({
  declarations: modulesUtils,
  imports: [
    CommonModule,
    MaterialUiModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: modulesUtils
})
export class UtilsModule { }
