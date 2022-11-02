import { SignInData } from './../../auth-page/auth-page.interface';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';
import { MegaMenuItem } from 'primeng/api';
import { SessionService } from '../../services/session/session.service';
import { paths } from '../../utils/paths';
import { Subject } from 'rxjs';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'sched-view-source-page',
  templateUrl: './view-source-page.component.html',
  styleUrls: ['./view-source-page.component.scss'],
})
export class ViewSourcePageComponent implements OnInit {
  constructor(
    private session: SessionService,
    private fb: FormBuilder,
    private httpClient: HttpClient
  ) {}

  public selectedRow: any = null;

  public defaultMonacoOptions: MonacoEditorConstructionOptions = {
    theme: 'vs-dark',
    language: 'json',
  };
  items: MegaMenuItem[] = [
    {
      icon: 'pi pi-fw pi-user',
      label: this.session.getSession().username,
      routerLink: `/${paths.userPage}`,
    },
    {
      icon: 'pi pi-fw pi-sign-out',
      routerLink: `/${paths.signOut}`,
    },
  ];
  reactiveForm = this.fb.group({
    code: ['hej'],
  });
  rowData = [];
  pageGridDefinition: GridOptions = {
    columnDefs: [
      {
        field: 'name',
      },
      {
        field: '_id',
      },
    ],
  };

  ngOnInit(): void {
    this.httpClient.get('viewSource/getAll').subscribe((response) => {
      const sources = (response as any).data;
      this.sources.next(sources);
    });
  }

  public sources = new Subject();
}
