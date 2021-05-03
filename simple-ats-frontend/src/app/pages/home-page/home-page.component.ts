import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoMenuItem } from '@po-ui/ng-components';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public reactiveForm: FormGroup;
  public showLoading: boolean;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.reactiveForm = this.formBuilder.group({
      curriculum: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1000)])],
    });
  }

  ngOnInit(): void {
    this.getCurriculum();
  }

  public async save(): Promise<boolean> {
    if (this.reactiveForm.valid) {
      this.userService.updateCurriculum(this.reactiveForm.value.curriculum);
      return true;
    }

    return false;
  }

  private async getCurriculum(): Promise<void> {
    const curriculum = await this.userService.getCurriculum();

    this.reactiveForm.setValue({
      curriculum,
    });
  }
}
