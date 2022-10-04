import { AuthPageService } from './../auth-page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sched-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
  providers: [AuthPageService],
})
export class SignInPageComponent implements OnInit {
  constructor(private authService: AuthPageService) {}

  ngOnInit(): void {}
}
