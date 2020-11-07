import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './modules/admin/components/admin/admin.component';
import { InicioComponent } from './modules/cliente/components/inicio/inicio.component';

const routes: Routes = [
  {
    path: "", redirectTo: "/inicio", pathMatch: "full"
  },
  { path: "inicio", component: InicioComponent },
  { path: "admin", component: AdminComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
