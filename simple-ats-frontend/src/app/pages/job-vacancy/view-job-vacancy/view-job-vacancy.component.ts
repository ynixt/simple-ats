import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { JobVacancy } from 'src/app/core/models';
import { PermissionsSelectors } from 'src/app/store/services/selectors';
import { ViewJobVacancyService } from './view-job-vacancy.service';

@Component({
  selector: 'app-view-job-vacancy',
  templateUrl: './view-job-vacancy.component.html',
  styleUrls: ['./view-job-vacancy.component.scss'],
})
export class ViewJobVacancyComponent implements OnInit, OnDestroy {
  public showLoading: boolean;
  public jobVacancy: JobVacancy;
  public canApply: boolean;
  public hasPermissionToSeeCandidates: boolean;
  public reloadSubject = new Subject<void>();

  private paramsSubscription: Subscription;
  private paramsPermission: Subscription;

  constructor(
    private viewJobVacancyService: ViewJobVacancyService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private permissionsSelector: PermissionsSelectors,
  ) {}

  ngOnInit(): void {
    this.dealWithParams();

    this.paramsPermission = this.permissionsSelector.permissions$.subscribe(permissions => {
      this.hasPermissionToSeeCandidates = permissions.map(permission => permission.code).includes('view_candidates');
    });
  }

  private dealWithParams(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(params => {
      const id = this.tryParseId(params['id']);

      if (Number.isNaN(id) === false) {
        this.loadJob(id);
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
    if (this.paramsPermission) {
      this.paramsPermission.unsubscribe();
    }
  }

  public async apply(): Promise<void> {
    try {
      this.showLoading = true;
      await this.viewJobVacancyService.apply(this.jobVacancy.id);
      this.reloadSubject.next();
    } finally {
      this.showLoading = false;
    }

    this.canApply = false;
  }

  public async removeApplication(): Promise<void> {
    try {
      this.showLoading = true;
      await this.viewJobVacancyService.removeApplication(this.jobVacancy.id);
      this.reloadSubject.next();
    } finally {
      this.showLoading = false;
    }

    this.canApply = true;
  }

  private tryParseId(id: string): number {
    try {
      return Number(id);
    } catch (err) {
      this.navigateTo404();
      return NaN;
    }
  }

  private navigateTo404(): void {
    this.router.navigateByUrl('/404');
  }

  private async loadJob(id: number): Promise<void> {
    try {
      this.showLoading = true;

      this.jobVacancy = await this.viewJobVacancyService.getById(id);

      if (this.jobVacancy == null) {
        this.navigateTo404();
      } else {
        this.canApply = (await this.viewJobVacancyService.isApplied(id)) === false;
      }
    } finally {
      this.showLoading = false;
    }
  }
}
