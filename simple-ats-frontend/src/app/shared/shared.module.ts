import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TranslocoModule } from '@ngneat/transloco';
import { PoModule } from '@po-ui/ng-components';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, TranslocoModule, PoModule, StoreModule],
  exports: [HeaderComponent, TranslocoModule, PoModule],
})
export class SharedModule {}
