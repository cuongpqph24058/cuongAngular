import { Component,OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit{
  userName: string;
  role:string;
constructor(private userService: UserService,private router: Router){}
  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userName = user.user.name;
      this.role = user.user.role;

      if (this.role !== 'admin') {

        this.router.navigate(['**']);
      }
    } else {

      this.router.navigate(['/signin']);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/signin']);
  }
}
