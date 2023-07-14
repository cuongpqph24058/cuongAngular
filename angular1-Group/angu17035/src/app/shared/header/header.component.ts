import { Component,Input, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service'
import {Router} from '@angular/router'
@Component({
  
  selector: 'app-header',
  templateUrl: './header.component.html',
})


export class HeaderComponent implements OnInit {
  userName: string;
  role:string;
constructor(private userService: UserService,private router: Router){}
  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userName = user.user.name;
      this.role = user.user.role;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['signin']);
  }
}
