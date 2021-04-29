import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { CoreModule } from './core/core.module';
import { AppStoreModule } from './store/app-store.module';
import { PoTemplatesModule } from '@po-ui/ng-templates';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, TranslocoRootModule, CoreModule, AppStoreModule, PoTemplatesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
