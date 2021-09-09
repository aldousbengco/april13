import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './clients/clients.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
];

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
    exports: [RouterModule]
})
export class EstablishmentModule { }
