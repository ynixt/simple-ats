import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  readonly menus: Array<PoMenuItem> = [{ label: 'Home' }];

  constructor() {}

  ngOnInit(): void {}
}
