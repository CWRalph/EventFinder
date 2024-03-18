import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { User } from '@core/models/user';
import { MatIconModule } from '@angular/material/icon';
import {Store} from "@ngrx/store";
import {UserActions} from "@app/state/userActions";

export interface LoginFormDetails {
  username: string;
  password: string;
  email?: string;
}

export enum LoginFormState {
  LOGIN,
  REGISTER,
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatDialogModule, FormsModule, CommonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private currentFormState: LoginFormState = LoginFormState.LOGIN;
  public formDetails: LoginFormDetails = {
    email: '',
    password: '',
    username: '',
  };
  public showPassword: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) {}

  get isRegistration() {
    return this.currentFormState == LoginFormState.REGISTER;
  }
  get isLogin() {
    return this.currentFormState == LoginFormState.LOGIN;
  }

  get username(){return this.formDetails.username}
  set username(input:string){this.formDetails.username = input}
  get email(){return this.formDetails.email??""}
  set email(input:string){this.formDetails.email = input}
  get password(){return this.formDetails.password}
  set password(input:string){this.formDetails.password = input}

  get formTitle(){ return (this.currentFormState == LoginFormState.LOGIN)? "Sign In" : "Register"}

  public toggleFormState() {
    console.log("TOGGLED")
    this.currentFormState =
      this.currentFormState == LoginFormState.LOGIN
        ? LoginFormState.REGISTER
        : LoginFormState.LOGIN;
  }

  public togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  public onCancel(){
    this.dialogRef.close();
  }

  public onFormSubmission(form: any) {
    if(this.currentFormState == LoginFormState.LOGIN){
      this.store.dispatch(UserActions.loginUserWithProps({username: this.username, password: this.password}));
    }else{
      this.store.dispatch(UserActions.registerUserWithProps({username: this.username, password: this.password, email:this.email}))
    }
  }
}
