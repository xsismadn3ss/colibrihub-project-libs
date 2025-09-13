import {Component, inject, OnInit} from '@angular/core';
import {DevContainer} from '../../../common/dev/dev';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService, ValidationService} from 'colibrihub-shared-services';
import {LoginDto} from 'colibrihub-shared-dtos';

@Component({
  selector: 'dev-badge',
  imports: [DevContainer, ReactiveFormsModule],
  templateUrl: './dev-badge.html',
  styleUrl: './dev-badge.css'
})
export class DevBadge implements OnInit {
  protected readonly authService = inject(AuthService);
  protected readonly validationService = inject(ValidationService);

  protected hide = true
  protected isValid = false;

  protected loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  protected toggle(){
    this.hide = !this.hide;
  }

  ngOnInit() {
    this.validationService.validate().subscribe({
      next: () => {
        this.isValid = true;
      },
      error: () => {
        this.isValid = false;
      }
    });
  }

  protected login(){
    if(this.loginForm.valid){
      const data = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      } as LoginDto
      this.authService.login(data).subscribe({
        next: () =>{
          window.location.reload();
        },
        error: () => {
          window.alert("Usuario o contraseña incorrectos")
        }
      })
    }else{
      window.alert("El formulario no es valido")
    }
  }

  protected logout(){
    this.authService.logout().subscribe({
      next: () =>{
        window.location.reload();
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
