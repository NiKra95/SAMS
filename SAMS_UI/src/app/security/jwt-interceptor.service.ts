import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private securityService: SecurityService,
    private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.securityService.getToken();

    if(token){
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }

    return next.handle(req).pipe(
        catchError((error) => {
        // Perform logout on 401 – Unauthorized HTTP response errors
        if (error instanceof HttpErrorResponse && error.status === 401) {
        this.securityService.logout();
        this.router.navigate(['login']);
        }
        return throwError(error);
      })
      );
  }
}
