import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  constructor(private translocoService: TranslocoService) {}

  public translate(key: string): Promise<string> {
    return this.translocoService.selectTranslate(key).pipe(take(1)).toPromise();
  }
}
