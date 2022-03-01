import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  date!: Date;
  // tslint:disable-next-line:ban-types
  bool: Boolean =  false;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.date = new Date();
  }

  // tslint:disable-next-line:typedef
  logOut(){
    localStorage.clear();
    sessionStorage.clear();
    const newLocal = this;
    newLocal.router.navigateByUrl('/');
  }
}
