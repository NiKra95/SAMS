import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../security.service';

@Injectable({
  providedIn: 'root'
})
export class IsApplicationAdminGuard implements CanActivate {

  constructor(private securityService: SecurityService, 
    private router: Router) {

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.securityService.getRole() === 'applicationAdmin'){
        return true;
      }
  
      this.router.navigate(['/login']);
      return false;
  }
  
}
