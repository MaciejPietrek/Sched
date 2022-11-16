import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';
import { GridOptions } from 'ag-grid-community';
import { MegaMenuItem } from 'primeng/api';
import { BehaviorSubject, map, Subject, tap } from 'rxjs';
import { ProgressElementService } from '../../progress-element/progress-element.service';
import { navigationItem } from '../../utils/navigation-items';
import {
  handle404,
  handle401,
  handleProgress,
} from './../../http-handlers/http-handler';
import { SessionService } from './../../services/session/session.service';

@Component({
  selector: 'sched-source',
  templateUrl: './source-page.component.html',
  styleUrls: ['./../../../basic-layout.scss', './source-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourcePageComponent implements AfterViewInit {
  constructor(
    private session: SessionService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}
  ngAfterViewInit(): void {
    this.getGridOptions().subscribe();
  }

  @HostBinding('class.layout-host') readonly layoutHost: boolean = true;
  @ViewChild(ProgressElementService) public progress!: ProgressElementService;

  private source: any;
  private getGridOptions = () =>
    this.http.get(`viewSource/getByName/${this.getViewSourceName()}`).pipe(
      handleProgress(this.progress),
      this.handle401,
      tap((response: any) => this.getGridData(response.data)),
      tap((response: any) => (this.source = response.data)),
      this.getStructure,
      this.mapToGridOptions,
      tap((options) => this.gridOptions.next(options))
    );

  private getGridData = (viewSource: any) => {
    this.http
      .post(`viewSource/data/all`, viewSource)
      .pipe(
        handleProgress(this.progress),
        map((response: any) => response.data),
        tap((data) => this.data.next(data))
      )
      .subscribe();
  };

  private getViewSourceName = () =>
    this.route.snapshot.paramMap.get('viewsourceName');

  private handle401 = handle404(() => {});
  private getStructure = map(
    (response: any) => response?.data?.structure ?? {}
  );
  private mapToGridOptions = map((structure: any) => {
    const gridOptions: GridOptions = {
      columnDefs: [],
      onRowSelected: (event) => {
        if (!event.node.isSelected()) return;

        event.api
          .getSelectedNodes()
          .filter((node) => node !== event.node)
          .forEach((node) => node.setSelected(false, false, true));

        const newValue = JSON.stringify(event.node.data, null, '\t');
        this.reactiveCode.setValue(newValue);
        this.selectedRow.next(event.node.data);
        this.iconType.next('pencil');
      },
      suppressRowDeselection: true,
      rowSelection: 'multiple',
    };

    Object.entries(structure).forEach(([key]) => {
      gridOptions.columnDefs?.push({
        field: key,
        valueFormatter: (input) => {
          return JSON.stringify(input.value);
        },
      });
    });

    return gridOptions;
  });

  public data = new Subject();
  public selectedRow = new BehaviorSubject<{ _id: string } | undefined>(
    undefined
  );
  public iconType = new BehaviorSubject<'plus' | 'copy' | 'pencil'>('plus');

  public editedRow?: Record<any, any> = undefined;

  public onInsert = () => {
    this.reactiveCode.setValue('');
    this.iconType.next('plus');
  };
  public onCopy = () => {
    const oldValue = this.reactiveCode.value;
    const asJson = JSON.parse(oldValue || '{}');
    delete asJson._id;
    const asString = JSON.stringify(asJson, null, '\t');
    this.reactiveForm.setValue({ code: asString });
    this.iconType.next('copy');
  };
  public onSave = () => {
    switch (this.iconType.value) {
      case 'copy': {
        const newValue = this.reactiveCode.value;
        const asJson = JSON.parse(newValue);
        delete asJson._id;
        this.http
          .post('viewSource/data/create', {
            source: this.source,
            update: asJson,
          })
          .pipe(handleProgress(this.progress))
          .subscribe();
        break;
      }
      case 'pencil': {
        const newValue = this.reactiveCode.value;
        const asJson = JSON.parse(newValue);
        delete asJson._id;
        this.http
          .post('viewSource/data/findByIdAndUpdate', {
            source: this.source,
            ID: this.selectedRow.value?._id,
            update: asJson,
          })
          .pipe(handleProgress(this.progress))
          .subscribe();
        break;
      }
      case 'plus':
        break;

      default:
        break;
    }
  };

  public defaultMonacoOptions: MonacoEditorConstructionOptions = {
    theme: 'vs-dark',
    language: 'json',
  };

  public items: MegaMenuItem[] = [
    navigationItem.user(this.session.getSession().username),
    navigationItem.main,
    navigationItem.signOut,
  ];

  public gridOptions = new Subject<GridOptions>();

  public reactiveForm = this.fb.group({
    code: [''],
  });
  public reactiveCode = this.reactiveForm.controls.code;
}
