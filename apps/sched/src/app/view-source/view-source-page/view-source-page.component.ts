import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';
import { GridOptions, SelectionChangedEvent } from 'ag-grid-community';
import { MegaMenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { handle401 } from '../../http-handlers/http-handler';
import { SessionService } from '../../services/session/session.service';
import { navigationItem } from '../../utils/navigation-items';
import { paths } from '../../utils/paths';

@Component({
  selector: 'sched-view-source-page',
  templateUrl: './view-source-page.component.html',
  styleUrls: ['./view-source-page.component.scss'],
})
export class ViewSourcePageComponent implements OnInit {
  constructor(
    private session: SessionService,
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  selectionChanged(event: SelectionChangedEvent) {
    this.selectedRow = event.api.getSelectedRows()[0];
  }

  public selectedRow: any = null;
  public editedRow: any = null;

  public defaultMonacoOptions: MonacoEditorConstructionOptions = {
    theme: 'vs-dark',
    language: 'json',
  };
  items: MegaMenuItem[] = [
    navigationItem.user(this.session.getSession().username),
    navigationItem.main,
    navigationItem.signOut,
  ];

  reactiveForm = this.fb.group({
    code: [''],
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
    this.httpClient
      .get('viewSource/getAll')
      .pipe(handle401(() => this.router.navigateByUrl(paths.signOut)))
      .subscribe((response) => {
        const sources = (response as any).data;
        this.sources.next(sources);
      });

    this.httpClient
      .get('viewSource/getByName/datasource')
      .pipe(handle401(() => this.router.navigateByUrl(paths.signOut)))
      .subscribe((response) => {
        this.viewSource = (response as any).data;
      });
  }

  public viewSource = null;

  onSave() {
    this.httpClient
      .post('viewSource/data/findByIdAndUpdate', {
        source: this.viewSource,
        ID: this.selectedRow['_id'],
        update: toJson(this.editedRow),
      })
      .subscribe();
  }

  public sources = new Subject();
}

function toJson(anything: any) {
  try {
    return JSON.parse(anything);
  } catch (error) {
    return {};
  }
}
