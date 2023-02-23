import { Directive } from '@angular/core';
import { AsyncValidator, FormControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';

@Directive({
  selector: '[myAsyncValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: AsyncValidatorDirective, multi: true}]
})
export class AsyncValidatorDirective implements AsyncValidator{
  validate(control: FormControl): Observable<ValidationErrors|null> {
    return of(control.value).pipe(
      delay(1000),
      map((value) => (value === 'test@test.test' ? {forbiddenEmail: true} : null)),
    );
  }
}
