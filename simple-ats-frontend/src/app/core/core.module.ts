import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService, TokenService, ApiService],
})
export class CoreModule {}
