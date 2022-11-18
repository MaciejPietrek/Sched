import { SessionService } from './../../services/session/session.service';
import { Router } from '@angular/router';
import { RequestService } from './../../view-source/source.service';
import { ProgressElementService } from './../../progress-element/progress-element.service';
import { BehaviorSubject, tap } from 'rxjs';
import { paths } from './../../utils/paths';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { AuthPageService } from '../auth-page.service';
import {
  handle,
  handle401,
  handleProgress,
} from '../../http-handlers/http-handler';
import { signInGuardReturnURL } from '../../utils/storages';

@Component({
  selector: 'sched-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['../sign-in-up-page.component.scss'],
  providers: [AuthPageService, RequestService],
})
export class SignInPageComponent implements AfterViewInit {
  constructor(
    private auth: AuthPageService,
    private requestService: RequestService,
    private router: Router,
    private session: SessionService
  ) {}

  ngAfterViewInit(): void {
    this.requestService = this.requestService.useWith({
      progress: this.progress,
    });
  }

  routerPaths = paths;
  errorMessage = new BehaviorSubject('');

  @ViewChild(ProgressElementService) public progress!: ProgressElementService;

  @ViewChild('signInForm') form!: ElementRef<HTMLFormElement>;

  signIn() {
    const formData = new FormData(this.form.nativeElement);
    const formProps = Object.fromEntries(formData as any);

    this.requestService.authorization
      .signIn(formProps as any)
      .pipe(
        handle401((response) => this.setError(response.error.message)),
        handle(() => this.setError('Connection error')),
        this.initializeSession,
        this.navigateAfterSignIn
      )
      .subscribe();
  }

  private navigateAfterSignIn = tap(() => {
    if (signInGuardReturnURL.has())
      this.router.navigateByUrl(signInGuardReturnURL.pop()!);
    else this.router.navigateByUrl(paths.main);
  });

  private initializeSession = tap((response: any) =>
    this.session.init(response.token)
  );

  clearError() {
    this.errorMessage.next('');
  }

  setError(error: string) {
    this.errorMessage.next(error);
  }
}
