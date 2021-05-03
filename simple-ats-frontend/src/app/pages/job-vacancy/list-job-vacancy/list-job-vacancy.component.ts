import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoDisclaimer, PoDynamicFormField, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Page, JobVacancy } from 'src/app/core/models';
import { TranslateService } from 'src/app/shared/translate.service';
import { ListJobVacancyService } from './list-job-vacancy.service';

@Component({
  selector: 'app-list-job-vacancy',
  templateUrl: './list-job-vacancy.component.html',
  styleUrls: ['./list-job-vacancy.component.scss'],
})
export class ListJobVacancyComponent implements OnInit {
  public filters: PoDynamicFormField[] = [];
  public columns: PoTableColumn[];
  public loading: boolean;
  public page: Page<JobVacancy>;
  public actions: PoTableAction[] = [];

  private nameFilter: string;

  constructor(private listJobVacancyService: ListJobVacancyService, private translateService: TranslateService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.filters = [{ property: 'name', label: await this.translateService.translate('jobs.listJobVacancy.name'), gridColumns: 6 }];

    this.columns = [
      { property: 'name', label: (await this.translateService.translate('jobs.listJobVacancy.name')).toString(), width: '20%' },
    ];

    this.actions = [
      { action: this.view.bind(this), label: (await this.translateService.translate('jobs.listJobVacancy.view')).toString() },
    ];

    this.getData();
  }

  public onQuickSearch(query: string): void {
    this.searchyByName(query);
  }

  public onAdvancedSearch(filter: any): void {
    this.searchyByName(filter.name);
  }

  public searchyByName(name: string): Promise<void> {
    return this.getData(1, name);
  }

  public async getData(pageNumber: number = 1, name?: string): Promise<void> {
    try {
      this.loading = true;
      this.nameFilter = name;

      this.page = await this.listJobVacancyService.list({
        qPage: {
          page: pageNumber,
        },
        name,
      });
    } finally {
      this.loading = false;
    }
  }

  public showMore(): Promise<void> {
    return this.getData(this.page.qPage.page + 1, this.nameFilter);
  }

  public onChangeDisclaimers(disclaimers: PoDisclaimer[]): Promise<void> {
    const filter: any = {};

    disclaimers.forEach(item => {
      filter[item.property] = item.value;
    });

    return this.getData(1, filter.name);
  }

  public view(line: JobVacancy): void {
    this.router.navigateByUrl(`/jobs/${line.id}`);
  }
}
