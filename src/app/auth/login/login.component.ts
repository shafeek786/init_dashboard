import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginApiResponse } from 'src/app/interfaces/login-api-response';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { jwtDecode } from 'jwt-decode';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private service:AuthService,
              private toastr: ToastrService,
              private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
   
      this.service.verifyLogin(this.loginForm.value).subscribe((res:LoginApiResponse) => {
        if(res){
          console.log("valid")
          if (res.message === 'Success') {
            console.log("loooooogin")
            console.log("user token : "+res.token )
            localStorage.setItem('token', res.token);
 
          interface userdata{
            role:string
          }

          const dec:userdata =jwtDecode(res.token as string)
          localStorage.setItem('role', dec.role)
          console.log("looooooging")
        
          if(this.service.getUserRole() === 'user'){
            this.router.navigate(['userdashboard']); 
            this.snackBar.open('Login successfully!', 'Close', {
              duration: 3000,  
              verticalPosition: 'top',  
              horizontalPosition: 'center'  
            });
          }else if(this.service.getUserRole() === 'admin'){
            this.router.navigate(['admindashboard']); 
            console.log("snackbar")
            this.snackBar.open('Login successfully!', 'Close', {
              duration: 3000,  
              verticalPosition: 'top',  
              horizontalPosition: 'center'  
            });
          }
          
            
          } else if (res.message === 'You are blocked' || res.message === 'Wrong email ID or password' || res.message === 'User not found') {
           console.log("invalid")
            this.toastr.error(res.message);
          }
        }
      }

      )
      console.log('Form submitted!', this.loginForm.value);
    }
  }
}
