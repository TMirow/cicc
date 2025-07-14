import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Beispiel: Redirect zum Login oder Token löschen
        localStorage.removeItem('token');
        // window.location.href = '/login'; // Optional: Login-Seite neu laden
      }
      // Weiterreichen des Fehlers
      return throwError(() => error);
    })
  );
};
