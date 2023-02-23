import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { distinctUntilChanged, Subscription } from 'rxjs';

import { FormService } from './form.service';
import { TechnologiesTypes } from './technologies-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy{
  technologies = [
    'angular',
    'react',
    'vue'
  ]
  form: FormGroup;
  private technologySubscription!: Subscription;

  constructor(private fb: FormBuilder, public formService: FormService) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      technology: [null, Validators.required],
      technologyVersion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,]],
      hobbies: this.fb.array([
        this.fb.group({
          hobbyName: ['', Validators.required],
          hobbyDuration: ['', Validators.required],
        }),
      ]),
    })
  }

  ngOnInit(): void {
    this.technologySubscription = this.form.get('technology')!.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((technology: TechnologiesTypes) => {
        this.formService.getTechnologiesVersions(technology);
      });
  }

  ngOnDestroy(): void {
    this.technologySubscription.unsubscribe()
  }

  fieldIsEmpty(field: string): boolean {
    return (this.form.controls[field].hasError('required'))
  }

  onSubmit(): void {
    console.log(this.form.value)
  }

  onAddHobby(): void {
    this.hobbies.push(
      this.fb.group({
          hobbyName: ['', Validators.required],
          hobbyDuration: ['', Validators.required]
        }
      )
    )
    console.log(this.fieldIsEmpty('technology'))
  }

  onDeleteHobby(index: number): void {
    this.hobbies.removeAt(index)
  }

  get hobbies(): FormArray {
    return <FormArray>this.form.get('hobbies')
  }
}
