import { Component, OnInit } from '@angular/core';

import { AuthDispatchers, PermissionDispatchers } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private permissionDispatchers: PermissionDispatchers, private authDispatchers: AuthDispatchers) {}

  public ngOnInit(): void {
    this.authDispatchers.loginByStorage();

    this.permissionDispatchers.getPermissions();
  }
}
