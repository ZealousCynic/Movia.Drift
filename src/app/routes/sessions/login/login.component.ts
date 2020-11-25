import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService, StartupService, SettingsService } from '@core';
import { LoginDto, IntegrationRepositoryService } from '../../../../domain/index';
import { HttpErrorResponse } from '@angular/common/http';
import { SymmetricEncryptionService } from '@shared/services/symmetric.encryption.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private token: TokenService,
    private startup: StartupService,
    private settings: SettingsService,
    private integrationRepositoryService: IntegrationRepositoryService,
    private symmetricEncryptionService: SymmetricEncryptionService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }



  login() {

    let loginDto: LoginDto = {
      email: this.username.value,
      passWord: this.password.value,
      //passWord: this.symmetricEncryptionService.Encrypt(this.password),
    };
    
    this.integrationRepositoryService.getToken(loginDto).subscribe(
      (returnToken) => {
        const { token, username, uid } = { token: returnToken.token, uid: returnToken.userID, username: returnToken.email };
        // Set user info
        //{ "userID": 0, "firstName": "string", "lastName": "string", "email": "string","token": "string"}
        this.settings.setUser({ 
          id: returnToken.userID, 
          name: `${returnToken.firstName} ${returnToken.lastName}`, 
          email: returnToken.email,
          avatar: '' });
        // Set token info
        this.token.set({ token, uid, username });
        // Regain the initial data
        this.startup.load().then(() => {
          let url = this.token.referrer!.url || '/';
          if (url.includes('/auth')) {
            url = '/';
          }
          this.router.navigateByUrl(url);
        });        

      },
      (error: HttpErrorResponse) => {       
        console.log(loginDto);        
      }
    );


  }
}
