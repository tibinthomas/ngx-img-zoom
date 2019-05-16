import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tryityourself',
  templateUrl: './tryityourself.component.html',
  styleUrls: ['./tryityourself.component.css']
})
export class TryityourselfComponent implements OnInit {
  myForm: FormGroup;
  onceDone = false;
  @Input('randomUrl') set randomUrl(val) {
    if (this.onceDone) {
      this.myForm.controls.url.setValue(val);
    }
  };
  @Output() formSubmited = new EventEmitter<{}>();
  constructor() { }

  ngOnInit() {
      this.onceDone = true;
      this.myForm = new FormGroup({
        iStyle: new FormControl(''),
        rStyle: new FormControl(''),
        lStyle: new FormControl(''),
        url: new FormControl('')
      });

}
onSubmit(form: FormGroup) {
  console.log(form.value)
this.formSubmited.emit(form.value);

}
}
