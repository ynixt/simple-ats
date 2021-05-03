import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Page, User } from 'src/app/core/models';
import { CandidatesService } from './candidates.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit, OnDestroy {
  public showLoading: boolean;
  public candidates: Page<User>;

  private reloadSubscription: Subscription;

  @Input() jobId: number;
  @Input() reload: Subject<void>;

  constructor(private candidatesService: CandidatesService) {}

  public ngOnInit(): void {
    this.getData();

    if (this.reload) {
      this.reloadSubscription = this.reload.subscribe(() => {
        this.getData();
      });
    }
  }

  public ngOnDestroy(): void {
    if (this.reloadSubscription) {
      this.reloadSubscription.unsubscribe();
    }
  }

  public nextPage(): Promise<void> {
    return this.getData(this.candidates.qPage.page + 1);
  }

  public async getData(page = 1): Promise<void> {
    try {
      this.showLoading = true;
      this.candidates = await this.candidatesService.getCandidates(this.jobId, page);
    } finally {
      this.showLoading = false;
    }
  }
}
