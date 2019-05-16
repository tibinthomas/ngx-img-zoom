import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myForm: FormGroup;
  constructor() {}
  @ViewChild('form') formRef: NgForm;
  
   get email() {
    return this.myForm.controls['email'];
  };

ngOnInit() {
  this.myForm = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  message: new FormControl('', [Validators.required, Validators.minLength(3)])
  });
}

onSubmit(form: FormGroup) {
  console.log('Valid?', form.valid); // true or false
  console.log('Email', form.value.email);
  console.log('Message', form.value.message);
  console.log(this.formRef);
  this.formRef.resetForm();
}

}
