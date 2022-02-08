import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumComponent } from './album/album.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DetailsComponent } from './details/details.component';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {CreatePosteComponent} from "./create-poste/create-poste.component";
import { GuardService } from './guard.service';
import {guardedExpression} from "@angular/compiler/src/render3/util";

const routes: Routes = [
	{ path: '', component: AlbumComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'details/:id', component: DetailsComponent , canActivate: [GuardService]},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'create', component: CreatePosteComponent, canActivate: [GuardService]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }
