import { SessionService } from './../../services/session/session.service';
import { Component, OnInit } from '@angular/core';

const someJwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

@Component({
  selector: 'sched-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss'],
})
export class DevComponent implements OnInit {
  constructor(private session: SessionService) {}

  public jwtString = someJwt;

  ngOnInit(): void {}

  signIn() {
    this.session.init(this.jwtString);
  }
}
