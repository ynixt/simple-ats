import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let spectator: Spectator<HeaderComponent>;

  const createComponent = createComponentFactory<HeaderComponent>({
    component: HeaderComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
