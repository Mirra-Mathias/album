import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthentificationService} from "../authentification.service";

interface User {
  token: string;
  user : {
    id: number;
    login: string;
  }
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
	pages = [
		{ href: "", text: "Home" },
		{ href: "about", text: "About" },
		{ href: "contact", text: "Contact" },
    { text: "lagout"}
	];

  pages2 = [
    { href: "", text: "Home" },
    { href: "about", text: "About" },
    { href: "contact", text: "Contact" },
    { href: "register", text: "register"},
    { href: "login", text: "login"}
  ]

  currentUser: User | undefined;
  constructor(
    private router: Router,
    private authenticationService: AuthentificationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

	ngOnInit(): void {

	}
}
