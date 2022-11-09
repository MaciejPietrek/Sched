import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';
import { navigationItem } from '../../utils/navigation-items';

@Component({
  selector: 'sched-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(private router: Router) {}

  items: MegaMenuItem[] = [navigationItem.signIn];

  ngOnInit(): void {}
}
