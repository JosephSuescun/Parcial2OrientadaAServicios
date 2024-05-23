import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  getToken ?:string | null = "";

  constructor( private router : Router){}


  logout(){
    localStorage.removeItem("token_access");
    this.router.navigate(["home"]);
  }
}
