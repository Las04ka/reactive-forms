import { Injectable } from '@angular/core';
import { map, of, Subject, take } from 'rxjs';

import { ITechnologiesData, TechnologiesTypes } from './technologies-model'

const technologiesData:ITechnologiesData = {
  angular: ['1.1.1', '1.2.1', '1.3.3'],
  react: ['2.1.2', '3.2.4', '4.3.1'],
  vue: ['3.3.1', '5.2.1', '5.1.3'],
};

@Injectable({
  providedIn: 'root'
})
export class FormService {
  technologiesVersions = new Subject<string[]>();

  getTechnologiesVersions(technology: TechnologiesTypes): void {
    of(technologiesData)
      .pipe(
        take(1),
        map((technologiesData: ITechnologiesData) => technologiesData[technology]))
      .subscribe((versions) => {
        this.technologiesVersions.next(versions);
      });
  }
}
