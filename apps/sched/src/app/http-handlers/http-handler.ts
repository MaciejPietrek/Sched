import { HttpResponse } from '@angular/common/http';
import { catchError, EMPTY, finalize } from 'rxjs';
import { ProgressElementService } from './../progress-element/progress-element.service';
import { PStorage } from './../utils/storage';

export const errorHandleExtras = new PStorage<{
  location: string;
  errorCode: number;
}>('runtime', 'errorHandleExtras');

const codes = {
  unauthorized: 401,
  notFound: 404,
  unknown: 600,
};

const error = (code: number) =>
  errorHandleExtras.set({ location: location.pathname, errorCode: code });

export const handle401 = (handler: (httpError: any) => void) => {
  return catchError((httpError: HttpResponse<any>) => {
    if (httpError.status != 401) throw httpError;
    error(codes.unauthorized);
    handler(httpError);
    return EMPTY;
  });
};
export const handle404 = (handler: (httpError: any) => void) => {
  return catchError((httpError: HttpResponse<any>) => {
    if (httpError.status != 404) throw httpError;
    error(codes.notFound);
    handler(httpError);
    return EMPTY;
  });
};

export const handle = (handler: (httpError: any) => void) => {
  return catchError((httpError: HttpResponse<any>) => {
    error(codes.unknown);
    handler(httpError);
    return EMPTY;
  });
};

export const handleProgress = (progress: ProgressElementService) => {
  progress.turnOn();
  return finalize(() => progress.turnOff());
};
