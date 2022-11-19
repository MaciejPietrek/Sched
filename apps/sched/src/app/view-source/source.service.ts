import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { IDatasource } from 'ag-grid-community';
import { map, mergeMap } from 'rxjs';
import { ProgressElementService } from '../progress-element/progress-element.service';
import { paths } from '../utils/paths';
import { handle401, handleProgress } from './../http-handlers/http-handler';

const getData = map((response: any) => response.data);

@Injectable()
export class RequestService {
  constructor(
    @Optional() private http: HttpClient,
    @Optional() private progress: ProgressElementService,
    @Optional() private router: Router
  ) {}

  public useWith = (useWith: {
    http?: HttpClient;
    progress?: ProgressElementService;
    router?: Router;
  }) => {
    return new RequestService(
      useWith.http ?? this.http,
      useWith.progress ?? this.progress,
      useWith.router ?? this.router
    );
  };

  private createRequest = <Type>(
    url: string,
    creationOptions?: {
      getData?: boolean;
      handleProgress?: boolean;
      handle401?: boolean;
    }
  ) => {
    return (
      data: Type,
      options?: {
        progress?: ProgressElementService;
        http?: HttpClient;
        router: Router;
      }
    ) => {
      let result = (options?.http ?? this.http).post(url, data);

      if (creationOptions?.handleProgress ?? true) {
        const handle: any = handleProgress(options?.progress ?? this.progress);
        result = result.pipe(handle);
      }
      if (creationOptions?.handle401 ?? true) {
        const handle: any = handle401(() => {
          this.router.navigateByUrl(paths.signOut);
        });
        result = result.pipe(handle);
      }
      if (creationOptions?.getData ?? true) {
        result = result.pipe(getData);
      }

      return result;
    };
  };

  private downloadSingleRecord = this.createRequest<{
    source: IDatasource;
    ID: string;
  }>('viewSource/data/findById');

  private downloadAllRecords = this.createRequest<IDatasource>(
    'viewSource/data/all'
  );

  private deleteSingleRecord = this.createRequest<{
    source: IDatasource;
    ID: string;
  }>('viewSource/data/findByIdAndDelete');

  private getSourceByName = this.createRequest<{ name: string }>(
    'viewSource/getByName'
  );

  private findRecordByName = this.createRequest<{
    source: IDatasource;
    name: string;
  }>('viewSource/data/findByName');

  private findRecordOfSourceByName = (data: {
    sourceName: string;
    recordName: string;
  }) =>
    this.getSourceByName({ name: data.sourceName }).pipe(
      mergeMap((response: any) =>
        this.findRecordByName({ source: response, name: data.recordName })
      )
    );

  private findRecordById = this.createRequest<{
    source: IDatasource;
    name: string;
  }>('viewSource/data/findByName');

  private createNewRecord = this.createRequest<{
    source: IDatasource;
    update: any;
  }>('viewSource/data/create');

  private findAndUpdate = this.createRequest<{
    source: IDatasource;
    update: any;
    ID: string;
  }>('viewSource/data/findByIdAndUpdate');

  public sources = {
    findRecordByName: this.findRecordByName,
    findRecordOfSourceByName: this.findRecordOfSourceByName,
    findRecordById: this.findRecordById,
    downloadSingleRecord: this.downloadSingleRecord,
    downloadAllRecords: this.downloadAllRecords,
    deleteSingleRecord: this.deleteSingleRecord,
    getSourceByName: this.getSourceByName,
    createNewRecord: this.createNewRecord,
    findAndUpdate: this.findAndUpdate,
  };

  private signIn = this.createRequest<{
    username: string;
    passwordHash: string;
  }>('auth/signIn', { getData: false, handle401: false });

  private signOut = this.createRequest<{
    sessionID: string;
  }>('auth/signOut', { getData: false, handle401: false });

  private signUp = this.createRequest<{
    username: string;
    password: string;
  }>('auth/signUp', { getData: false, handle401: false });

  public authorization = {
    signIn: this.signIn,
    signOut: this.signOut,
    signUp: this.signUp,
  };
}
