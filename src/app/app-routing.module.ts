import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {path: '', component: ViewComponent},
  {path: ':uuid', component: TarjetaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
