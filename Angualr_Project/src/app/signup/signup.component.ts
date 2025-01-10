import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone : false
})
export class SignupComponent implements OnInit 
{
  signupForm!: FormGroup
  constructor(private formbuilder: FormBuilder, private _http:HttpClient, private _router:Router) 
  { }
  navigateToSignUp() {
    this._router.navigate(['/login']);
  }
  
  ngOnInit(): void 
  {
    this.signupForm = this.formbuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      password: ['']
    })
  }

  signUp() 
  {
    console.log(this.signupForm.value);
          alert("Marvellous" + ' signup in successfully');
          this._router.navigate(['/login']);
          this.signupForm.reset();    
  }
  }
  
  
  

