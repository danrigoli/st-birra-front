import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: Router) { 
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })

  }

  ngOnInit(): void {
    this.loginForm.get('email')?.pristine
  }

  isInvalid(formControlName: string) {
    return this.loginForm.get(formControlName)?.invalid && this.loginForm.get(formControlName)?.touched && this.loginForm.get(formControlName)?.dirty
  }

  submit() {
    if (!this.loginForm.invalid) {
      this.authService.login(this.loginForm.value).subscribe((res) => {
      const user = { ...res.user, token: res.token.token }
      sessionStorage.setItem('user', JSON.stringify(user))
      this.route.navigate(['/'])
      })
    } else this.loginForm.disable()
  }

}
