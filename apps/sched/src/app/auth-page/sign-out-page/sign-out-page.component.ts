import { paths } from './../../utils/paths';
import { SessionService } from './../../services/session/session.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sched-sign-out-page',
  templateUrl: './sign-out-page.component.html',
  styleUrls: ['./sign-out-page.component.scss'],
})
export class SignOutPageComponent implements OnInit {
  constructor(private session: SessionService, private router: Router) {}

  ngOnInit(): void {
    this.session.clear();
    this.router.navigateByUrl(paths.welcomePage);
  }
}
