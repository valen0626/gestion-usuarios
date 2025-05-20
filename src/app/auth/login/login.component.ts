import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder, private router: Router){
    this.loginForm = this.fb.group({
      email:[''],
      password: ['']
    })
  }

  onSubmit(){
    const {email, password} = this.loginForm.value
    if (email === "camargovalen06@gmail.com" && password === '1234') {
      localStorage.setItem('auth', 'true')
      localStorage.setItem('correo', email)
      this.router.navigate(['/dashboard'])
      console.log('entra')
    }else{
      alert('Credenciales inválidas')
      console.log('noo')
    }
  }
}
