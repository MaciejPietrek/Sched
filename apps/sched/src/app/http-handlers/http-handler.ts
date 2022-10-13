import { HttpResponse } from '@angular/common/http';
import { catchError, EMPTY, finalize } from 'rxjs';
import { ProgressElementService } from './../progress-element/progress-element.service';

export const httpStandardHandler = (progress?: ProgressElementService) => {
  progress?.turnOn();
  return finalize(() => progress?.turnOff());
};

export const handle401 = (handler: (httpError: any) => void) => {
  return catchError((httpError: HttpResponse<any>) => {
    if (httpError.status != 401) throw httpError;
    handler(httpError);
    return EMPTY;
  });
};
