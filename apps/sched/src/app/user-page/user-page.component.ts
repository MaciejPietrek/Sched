import { Component } from '@angular/core';
import { JwtSession } from '../services/session/session.interface';
import { SessionService } from './../services/session/session.service';

@Component({
  selector: 'sched-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent {
  constructor(private session: SessionService) {
    this.userData = this.session.getSession();
  }

  userData: JwtSession;
}
