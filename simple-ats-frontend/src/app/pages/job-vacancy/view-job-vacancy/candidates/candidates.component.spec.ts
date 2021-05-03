import { Spectator, createComponentFactory, mockProvider } from '@ngneat/spectator';

import { CandidatesComponent } from './candidates.component';
import { CandidatesService } from './candidates.service';

describe('CandidatesComponent', () => {
  let component: CandidatesComponent;
  let spectator: Spectator<CandidatesComponent>;

  const createComponent = createComponentFactory<CandidatesComponent>({
    component: CandidatesComponent,
    providers: [mockProvider(CandidatesService)],
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
