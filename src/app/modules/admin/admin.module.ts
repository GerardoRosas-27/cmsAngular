import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { UtilsModule } from '../utils/utils.module';


@NgModule({
  declarations: [AdminComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialUiModule,
    UtilsModule
  ]
})
export class AdminModule { }
