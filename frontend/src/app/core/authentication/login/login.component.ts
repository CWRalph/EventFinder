import { Component } from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username:string = ""
  password:string = ""

  onLogin(){
    console.log("Logging in with", this.username, this.password);
  }
}
