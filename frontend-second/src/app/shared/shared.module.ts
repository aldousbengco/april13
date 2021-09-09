import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/main/header/header.component';
import { FooterComponent } from './layout/main/footer/footer.component';
import { MaterialModule } from './material/material/material.module';
import { RouterModule } from '@angular/router';
import { UsersModule } from '@app/users/users.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { AccountModule } from '@app/account/account.module';
import { ClientsModule } from '@app/establishment/clients/clients.module';
import { ClientsRoutingModule } from '@app/establishment/clients/clients-routing.module';
import { AccountRoutingModule } from '@app/account/account-routing.module';
import { AppModule } from '@app/app.module';
import {Appmodule} from '@app/establishment/clients/app.module';
import { UsersRoutingModule } from '@app/users/users-routing.module';
import { HomeComponent } from '@app/home';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    UsersModule,
    UsersRoutingModule,
    ClientsRoutingModule,
    ClientsModule,
    AppRoutingModule,
    AppModule,
    AccountModule,
    AccountRoutingModule,
    ClientsRoutingModule,
    AccountRoutingModule,
    Appmodule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  ],
})
export class SharedModule { }
