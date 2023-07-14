import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  errorMessage: string = '';
  submitted: boolean = false;
  formSignin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(6)]]
  });
  userName: string;
  constructor(private fb: FormBuilder, private auth: UserService,private router: Router) {

  }

  onHandleSubmit() {
    this.submitted = true;
    if (this.formSignin.valid) {
      this.auth.signin(this.formSignin.value).subscribe(data => {
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data));
          this.userName = data.user.name;
          this.router.navigate([""])
          alert("đăng nhập thành công")
        } else {
          this.errorMessage = data.message; 
          }
      
      }, error => {
        // Xử lý khi có lỗi từ phía backend
        // this.errorMessage = error.message;
      });

      
      
    }
    
  }
}
