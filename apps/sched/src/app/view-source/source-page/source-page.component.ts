import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { MegaMenuItem } from 'primeng/api';
import { BehaviorSubject, forkJoin, map, of, Subject, tap } from 'rxjs';
import { ProgressElementService } from '../../progress-element/progress-element.service';
import { FormOptions } from '../../sched-form/form-options';
import { navigationItem } from '../../utils/navigation-items';
import { PStack } from '../../utils/stack';
import { RequestService } from '../source.service';
import { handle404 } from './../../http-handlers/http-handler';
import { SessionService } from './../../services/session/session.service';

@Component({
  selector: 'sched-source',
  templateUrl: './source-page.component.html',
  styleUrls: ['./../../../basic-layout.scss', './source-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RequestService],
})
export class SourcePageComponent implements AfterViewInit {
  constructor(
    private session: SessionService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private requestService: RequestService
  ) {}
  ngAfterViewInit(): void {
    this.requestService = this.requestService.useWith({
      progress: this.progress,
    });
    this.getGridOptions().subscribe();
  }

  private lastSelectedRecordIDs = new PStack<string>();

  @HostBinding('class.layout-host') readonly layoutHost: boolean = true;
  @ViewChild(ProgressElementService) public progress!: ProgressElementService;

  private source: any;
  private getGridOptions = () => {
    const gridOptions = this.requestService.sources
      .findRecordOfSourceByName({
        recordName: this.getViewSourceName()!,
        sourceName: 'gridOptions',
      })
      .pipe(handle404(() => of({ columnDefs: [] })));

    const formOptions = this.requestService.sources
      .findRecordOfSourceByName({
        recordName: this.getViewSourceName()!,
        sourceName: 'formOptions',
      })
      .pipe(map((options: any) => options.formDefinition))
      .pipe(handle404(() => of(null)));

    const source = this.requestService.sources.getSourceByName({
      name: this.getViewSourceName()!,
    });

    const sourceAndData = source.pipe(
      tap((response: any) => (this.source = response)),
      tap((response: any) => this.getViewData(response))
    );

    return forkJoin([gridOptions, sourceAndData, formOptions]).pipe(
      tap((data: any[]) => {
        const _columnDefs = data[0].columnDefs;
        const _structure = data[1].structure;
        const _formOptions = data[2];

        const _gridOptions = this.mapToGridOptions(_structure, _columnDefs);
        this.gridOptions.next(_gridOptions);
        this.formOptions.next(_formOptions);
      })
    );
  };

  public dynamicFormData: any;
  public dynamicFormDataOutput: any;

  private getViewData = (viewSource: any) =>
    this.requestService.sources
      .downloadAllRecords(viewSource)
      .pipe(tap((response: any) => this.updateGridData(response)))
      .subscribe();

  private getViewSourceName = () =>
    this.route.snapshot.paramMap.get('viewsourceName');

  private mapToGridOptions = (structure: any, columnDefs: ColDef[]) => {
    columnDefs = columnDefs.map((def) => ({
      ...def,
      sortable: true,
      sortingOrder: ['asc', 'desc', null],
    }));

    const gridOptions: GridOptions = {
      columnDefs,
      getRowId: (row) => row.data['_id'],
      onRowSelected: (event) => {
        if (!event.node.isSelected()) return;

        event.api
          .getSelectedNodes()
          .filter((node) => node !== event.node)
          .forEach((node) => node.setSelected(false, false, true));

        this.lastSelectedRecordIDs.set(event.node.data._id);

        const newValue = JSON.stringify(event.node.data, null, '\t');
        this.reactiveCode.setValue(newValue);
        this.selectedRow.next(event.node.data);
        this.selectedRowID = event.node.data._id;
        this.iconType.next('pencil');
        this.dynamicFormData = event.node.data;
      },
      suppressRowDeselection: true,
      rowSelection: 'multiple',
    };

    if (!gridOptions.columnDefs?.length)
      Object.entries(structure).forEach(([key]) => {
        gridOptions.columnDefs?.push({
          field: key,
          valueFormatter: (input) => {
            return JSON.stringify(input.value);
          },
        });
      });

    return gridOptions;
  };

  private selectedRowID!: string;

  public data = new BehaviorSubject<any[]>([]);
  public selectedRow = new BehaviorSubject<{ _id: string } | undefined>(
    undefined
  );
  public iconType = new BehaviorSubject<'plus' | 'copy' | 'pencil' | 'none'>(
    'none'
  );

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
  public onDelete = () => {
    const oldValue = this.reactiveCode.value;
    if (!oldValue) return;

    const asJson = JSON.parse(oldValue || '{}');
    this.requestService.sources
      .deleteSingleRecord({ source: this.source, ID: asJson._id })
      .subscribe(this.refreshAll);
  };
  private refreshAll = () => {
    this.requestService.sources
      .downloadAllRecords(this.source)
      .subscribe((records: any) => {
        const api = this.gridReady.api;
        api.setRowData(records);

        let selectedRowID = this.lastSelectedRecordIDs.pop();
        let selectedRow = api.getRowNode(selectedRowID);

        while (selectedRowID && !selectedRow) {
          selectedRowID = this.lastSelectedRecordIDs.pop();
          selectedRow = api.getRowNode(selectedRowID);
        }
        selectedRow?.setSelected(true);
      });
  };

  private gridReady!: GridReadyEvent;
  public onGridReady(gridReady: GridReadyEvent<any>) {
    this.gridReady = gridReady;
  }

  private updateGridData = (data: any[]) => this.data.next(data);

  private getFormDate = () => this.dynamicFormDataOutput;

  private prevValue: any;
  public parse = (val: any) => {
    try {
      this.prevValue = JSON.parse(val);
    } catch (error) {
    } finally {
      return this.prevValue;
    }
  };

  public onSave = () => {
    switch (this.iconType.value) {
      case 'plus':
      case 'copy': {
        const asJson = this.getFormDate();
        delete asJson._id;
        this.requestService.sources
          .createNewRecord({ source: this.source, update: asJson })
          .pipe(
            tap((response: any) =>
              this.lastSelectedRecordIDs.set(response._id)
            ),
            tap(this.refreshAll)
          )
          .subscribe();
        break;
      }
      case 'pencil': {
        const asJson = this.getFormDate();
        delete asJson._id;
        this.requestService.sources
          .findAndUpdate({
            source: this.source,
            ID: this.selectedRowID,
            update: asJson,
          })
          .pipe(tap(this.refreshAll))
          .subscribe();
        break;
      }
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
  public formOptions = new BehaviorSubject<FormOptions | null>(null);

  public reactiveForm = this.fb.group({
    code: [''],
  });
  public reactiveCode = this.reactiveForm.controls.code;
}
