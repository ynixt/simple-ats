import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let spectator: Spectator<DashboardComponent>;

  const createComponent = createComponentFactory<DashboardComponent>({
    component: DashboardComponent,
    providers: [mockProvider(DashboardService)],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
