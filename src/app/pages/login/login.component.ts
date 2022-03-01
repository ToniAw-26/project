import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  listRegion: any;
  message: any;
  public loading = false;
  loginForm = new FormGroup({
    username:  new FormControl(null, [Validators.email, Validators.required]),
    userpassword:  new FormControl(null, [ Validators.required, Validators.minLength(6)]),
    region: new FormControl(null, [ Validators.required])
  });

  // tslint:disable-next-line:typedef
  get username(){return this.loginForm.get('username'); }
  // tslint:disable-next-line:typedef
  get userpassword(){return this.loginForm.get('userpassword'); }
  // tslint:disable-next-line:typedef
  get region(){return this.loginForm.get('region'); }


  constructor(private loginService: LoginService,  private router: Router) { }

  ngOnInit(): void {
    this.GetRegion();
  }

  // tslint:disable-next-line:typedef
  checkLogin(){
    this.loading = true;
    const onSuccess = (response: any) => {
        if (response.status === 200){
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            sessionStorage.setItem('id_utilisateur', response.data.id_utilisateur);
            sessionStorage.setItem('username', response.data.username);
            sessionStorage.setItem('email', response.data.email);
            sessionStorage.setItem('region', this.loginForm.value.region);
            this.loading = false;
            this.router.navigateByUrl('/home');

        }else{
          this.message = response.message;
          this.loading = false;
          this.loginForm.reset();
        }
    };
    const onError = (response: any) => {
      if (response.status === 400){
          this.message = response.message;
          this.loading = true;
          this.loginForm.reset();
      }
    };
    const data = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.userpassword
    };
    this.loginService.login(data).subscribe(onSuccess, onError);
  }

  // tslint:disable-next-line:typedef
  GetRegion(){
    this.loading = true;
    const success  = (response: any) => {
      if (response.status === 200){
        this.loading = false;
        this.listRegion = response.data;
      }else{
        this.loading = false;
        this.message = response.message;
      }
    };
    const error  = (response: any) => {
      if (response.status === 400){
        this.loading = false;
        this.message = response.message;
    }
    };

    this.loginService.GetRegion().subscribe(success, error);
  }

}
