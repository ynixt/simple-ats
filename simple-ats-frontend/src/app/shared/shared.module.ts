import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TranslocoModule } from '@ngneat/transloco';
import { PoModule } from '@po-ui/ng-components';
import { StoreModule } from '@ngrx/store';
import { MenuComponent } from './menu/menu.component';
import { TranslateService } from './translate.service';

@NgModule({
  declarations: [HeaderComponent, MenuComponent],
  imports: [CommonModule, TranslocoModule, PoModule, StoreModule],
  exports: [HeaderComponent, MenuComponent, TranslocoModule, PoModule],
  providers: [TranslateService],
})
export class SharedModule {}

// @NgModule({
//   declarations: [HeaderComponent, MenuComponent],
//   imports: [CommonModule, TranslocoModule, StoreModule, PoToolbarModule, PoMenuModule, PoDirectivesModule],
//   exports: [HeaderComponent, MenuComponent, TranslocoModule, PoDirectivesModule],

// })
// export class SharedModule {}
