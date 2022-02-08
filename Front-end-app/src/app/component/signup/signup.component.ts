import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../../service/authenticate.service';
import { User } from '../../model/user.model';

//import { ConfirmEqualValidatorDirective } from '../../validator.directive';

import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  title = 'newMat';

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isRegistered = false;
  user: User = {
    uid: null,
    emailId: null,
    phoneNumber: null,
    lastname: null,
    userName: null,
    location: null,
    password: null,
    preferredCategory: null,
    gender: null,
    likedList: null,
    favoriteList: null,
    savedList: null,
  }
  //https://stackblitz.com/edit/angular-multi-step-reactive-form?embed=1&file=src/app/constants/multi-step-form.ts
  //  locations = [
  //   { name: 'United Stastes of America', code: 'us' },
  //   { name: 'United Kingdoms', code: 'gb' },
  //   { name: 'India', code: 'in' }
  // ];

  categories: string[] = ['technology', 'sports', 'business', 'science', 'health', 'entertainment'];
  txt: string;


  country: string;
  ngForm: FormGroup;
  form: FormGroup;
  constructor(private _formBuilder: FormBuilder, private authenticate: AuthenticateService) { }

  ngOnInit() {

    //Signup fields 
    this.firstFormGroup = this._formBuilder.group({
      userName: ['', Validators.required],
      emailId: ['', [Validators.required,
      Validators.pattern(/^[\w]{1,}[\w.+-]{0,}@[\w-]{1,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/)
      ]],
      phoneNumber: ['', Validators.required],
      lastname: [''],
      gender: ['', Validators.required],
      location: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)
      ]]
    });
    this.thirdFormGroup = this._formBuilder.group({
      preferredCategory: ['', Validators.required],
    });
  }

  submit() {
    console.log(this.firstFormGroup.value, this.user);
    console.log(this.secondFormGroup.value);
  }

  registerUser() {

    if (this.firstFormGroup.invalid || this.thirdFormGroup.invalid || this.thirdFormGroup.invalid) {
      return;
    }
    // alert('form fields are validated successfully!');

    this.authenticate.register(this.user).subscribe((res) => {
      console.log("register1", this.user)
      console.log(res)
      if (res) {
        this.isRegistered = true;
      }
    });
  }

  get val() {
    return this.firstFormGroup.controls;
  }

  get pass() {
    return this.secondFormGroup.controls;
  }
}
