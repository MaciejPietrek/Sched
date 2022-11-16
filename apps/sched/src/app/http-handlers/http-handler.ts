import { HttpResponse } from '@angular/common/http';
import { catchError, EMPTY, finalize } from 'rxjs';
import { ProgressElementService } from './../progress-element/progress-element.service';

export const handle401 = (handler: (httpError: any) => void) => {
  return catchError((httpError: HttpResponse<any>) => {
    if (httpError.status != 401) throw httpError;
    handler(httpError);
    return EMPTY;
  });
};
export const handle404 = (handler: (httpError: any) => void) => {
  return catchError((httpError: HttpResponse<any>) => {
    if (httpError.status != 404) throw httpError;
    handler(httpError);
    return EMPTY;
  });
};

export const handle = (handler: (httpError: any) => void) => {
  return catchError((httpError: HttpResponse<any>) => {
    handler(httpError);
    return EMPTY;
  });
};

export const handleProgress = (progress: ProgressElementService) => {
  progress.turnOn();
  return finalize(() => progress.turnOff());
};
