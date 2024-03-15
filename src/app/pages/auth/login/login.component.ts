import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    RouterModule,
    ReactiveFormsModule,
    MatIconModule

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {

  private authServices = inject(AuthService);
  public authData = this.authServices.authData;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })

  public errorMsg = signal('');

  login(){
    this.errorMsg.set('');
    if (
      this.form.invalid
    ) {
      this.form.markAllAsTouched();
      return;
    }
    this.authServices.login(this.form.value)
    .subscribe({
      next:data=>{
        this.router.navigate(['/home'])
      },
      error:({error:{error}})=>{
        if(error[0]?.msg){
          this.errorMsg.set(error[0]?.msg)
        }else{
          this.errorMsg.set(error);
        }
      }
    })
  }

  getTypeError(field: any, type: any) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched && this.form.get(field)?.hasError(type)
  }

  getInputError(field: any){
    return this.form.get(field)?.invalid && this.form.get(field)?.touched
  }
 }
