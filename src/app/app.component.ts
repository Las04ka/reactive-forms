import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { delay, Observable, of, map } from "rxjs";

enum Technologies {
  Angular = 'angular',
  React = 'react',
  Vue = 'vue'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  technologies = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3']
  }
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      tech: [null, Validators.required],
      techVersion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,], this.emailValidator],
      hobbies: this.fb.array([
        this.fb.group({
          hobbyName: ['', Validators.required],
          hobbyDuration: ['', Validators.required],
        }),
      ]),
    })
  }

  emailValidator(control: FormControl,): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      delay(1000),
      map((value) => (value === 'test@test.test' ? {forbiddenEmail: true} : null)),
    );
  }

  onSubmit(): void {
    console.log(this.form.value)
  }

  onAddHobby():void {
    this.hobbies.push(
      this.fb.group({
          hobbyName: ['', Validators.required],
          hobbyDuration: ['', Validators.required]
        }
      )
    )
  }

  onDeleteHobby(i: number):void {
    this.hobbies.removeAt(i)
  }

  get selectedTechnology():Technologies {
    return this.form.get('tech')?.value
  }

  get hobbies():FormArray {
    return <FormArray>this.form.get('hobbies')
  }
}
