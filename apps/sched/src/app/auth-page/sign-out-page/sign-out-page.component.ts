import { paths } from './../../utils/paths';
import { SessionService } from './../../services/session/session.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sched-sign-out-page',
  templateUrl: './sign-out-page.component.html',
  styleUrls: ['./sign-out-page.component.scss'],
})
export class SignOutPageComponent implements AfterViewInit {
  constructor(private session: SessionService, private router: Router) {}

  ngAfterViewInit(): void {
    this.session.clear();
    setTimeout(() => this.router.navigate([paths.welcomePage]));
  }
}
