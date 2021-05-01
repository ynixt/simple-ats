import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let spectator: Spectator<LoginPageComponent>;

  const createComponent = createComponentFactory<LoginPageComponent>({
    component: LoginPageComponent,
    declarations: [MockComponents(HeaderComponent, LoginFormComponent)],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    spyOn<any>(component, 'tryPlayVideo').and.stub();

    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component['tryPlayVideo']).toHaveBeenCalled();
  });

  it('tryPlayVideo', () => {
    (<jasmine.Spy>component['tryPlayVideo']).and.callThrough();
    spyOn<any>(component.video.nativeElement, 'play').and.stub();

    component['tryPlayVideo']();

    expect(component.video.nativeElement.play).toHaveBeenCalled();
  });
});
