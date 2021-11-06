import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: Router) { 
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })

  }

  isInvalid(formControlName: string) {
    return this.registerForm.get(formControlName)?.invalid && this.registerForm.get(formControlName)?.touched && this.registerForm.get(formControlName)?.dirty
  }

  submit() {
    if (!this.registerForm.invalid) {
      this.authService.register(this.registerForm.value).subscribe((res) => {
      const user = { ...res.user, token: res.token.token }
      sessionStorage.setItem('user', JSON.stringify(user))
      this.route.navigate(['/'])
      })
    } else this.registerForm.disable()
  }
}
