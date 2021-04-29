import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  @ViewChild('video') video: ElementRef<HTMLVideoElement>;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.tryPlayVideo();
  }

  private async tryPlayVideo(): Promise<void> {
    try {
      await this.video.nativeElement.play();
    } catch (err) {
      setTimeout(() => {
        this.tryPlayVideo();
      }, 1000);
    }
  }
}
