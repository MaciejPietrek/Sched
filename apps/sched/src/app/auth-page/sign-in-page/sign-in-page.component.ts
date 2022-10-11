import { paths } from './../../utils/paths';
import { AuthPageService } from './../auth-page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sched-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['../sign-in-up-page.component.scss'],
  providers: [AuthPageService],
})
export class SignInPageComponent implements OnInit {
  constructor() {}

  routerPaths = paths;

  ngOnInit(): void {}
}
