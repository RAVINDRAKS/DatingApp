import { Directive, Input, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  isVisble = false;

  constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private authService: AuthService) { }

  ngOnInit() {
    const userRoles = this.authService.decodedToken.role as Array<string>;
    if (!userRoles) {
      this.viewContainerRef.clear();
    }

    if (this.authService.roleMatch(this.appHasRole)) {
      if (!this.isVisble) {
        this.isVisble = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.isVisble = false;
        this.viewContainerRef.clear();
      }
    }

  }

}
