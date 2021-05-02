import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';
import { User } from 'src/app/core/models';
import { AuthDispatchers } from 'src/app/store';
import { AuthSelectors } from 'src/app/store/services/selectors';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public profile: PoToolbarProfile;
  public profileActions: Array<PoToolbarAction>;

  constructor(
    private authSelectors: AuthSelectors,
    private translateService: TranslateService,
    private authDispatchers: AuthDispatchers,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.authSelectors.state$.subscribe(state => {
      if (state.user) {
        this.fillProfile(state.user);
      } else {
        this.profile = undefined;
        this.profileActions = undefined;
      }
    });
  }

  private async fillProfile(user: User): Promise<void> {
    this.profile = {
      avatar: `https://ui-avatars.com/api/?name=${user.name}`,
      subtitle: user.email,
      title: user.name,
    };

    this.profileActions = [
      {
        icon: 'po-icon-exit',
        label: await this.translateService.translate('header.logout'),
        type: 'danger',
        separator: true,
        action: this.logout.bind(this),
      },
    ];
  }

  private logout(): void {
    this.authDispatchers.logout();
    this.router.navigateByUrl('/login');
  }
}
