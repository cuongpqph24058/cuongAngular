import { Component } from '@angular/core';
import {UserService} from '../../../services/user.service'



@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  users: any[] 
  constructor(private userr: UserService) {}
  ngOnInit() {
    this.userr.users().subscribe((data:any) => {
       this.users = data.user;
      console.log(this.users);
    });
  }

  // constructor(private userr: UserService) {
  //   this.userr.users().subscribe(data => {
  //     this.user = data
  //     console.log(this.user)
  //     console.log(this.user[0].name); // Truy cập thuộc tính 'name'
  //     console.log(this.user[0].email);
  //   })
  // }

  userDelete(id: string) {
    this.userr.usersDelete(id).subscribe(() => {
      console.log("1")
      // this.userr = this.userr.filter(user => user.id !== id)
    })}
}
