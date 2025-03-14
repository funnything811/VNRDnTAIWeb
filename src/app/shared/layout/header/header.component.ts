import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
  }

  logOut(){
    sessionStorage.setItem('token', '');
    localStorage.setItem('token', '');
    this.router.navigate(['/']);
  }

}
