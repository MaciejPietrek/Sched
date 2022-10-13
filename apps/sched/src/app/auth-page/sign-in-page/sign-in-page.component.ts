import { BehaviorSubject } from 'rxjs';
import { paths } from './../../utils/paths';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthPageService } from '../auth-page.service';
import { handle401 } from '../../http-handlers/http-handler';

@Component({
  selector: 'sched-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['../sign-in-up-page.component.scss'],
  providers: [AuthPageService],
})
export class SignInPageComponent implements OnInit {
  constructor(private auth: AuthPageService) {}

  routerPaths = paths;
  errorMessage = new BehaviorSubject('');

  @ViewChild('signInForm') form!: ElementRef<HTMLFormElement>;

  signIn() {
    const formData = new FormData(this.form.nativeElement);
    const formProps = Object.fromEntries(formData as any);

    this.auth
      .signIn(formProps as any)
      .pipe(
        handle401((response) => this.errorMessage.next(response.error.message))
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
