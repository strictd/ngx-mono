import { Injectable, OnDestroy } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { plainToClass } from 'class-transformer';

import { IUserPermissions } from './models/permissions';

import 'rxjs/add/operator/share';

@Injectable()
export class PermissionsApp implements OnDestroy {
  static _permissionObserver: Observer<IUserPermissions>;
  static _permissionObservable = new Observable((observer: Observer<IUserPermissions>) => {
   PermissionsApp._permissionObserver = observer; // Assign to static Permissions._permissionObserver
  }).share();

  private localUserPerms: Subscription;
  private _permissions: IUserPermissions;

  constructor() {
    this.localUserPerms = PermissionsApp._permissionObservable.subscribe(
      userPerms => this.permissions = this.convertPermissions(userPerms)
    );
  }

  ngOnDestroy() {
    this.localUserPerms.unsubscribe();
  }

  convertPermissions(value: any) {
    return plainToClass(IUserPermissions, value as Object);
  }

  set permissions(value: IUserPermissions) {
    this._permissions = value;
  }
  get permissions(): IUserPermissions {
    return this._permissions;
  }

  // Proxy functions to RolePermissions
  canCreate(component_id: number, is_self?: boolean, perms?: IUserPermissions): boolean {
    if (is_self && this.hasPermission(component_id, 7, perms)) {
      return true;
    } else {
      return this.hasPermission(component_id, 2, perms);
    }
  }

  canRead(component_id: number, is_self?: boolean, perms?: IUserPermissions): boolean {
    if (is_self && this.hasPermission(component_id, 8, perms)) {
      return true;
    } else {
      return this.hasPermission(component_id, 3, perms);
    }
  }

  canUpdate(component_id: number, is_self?: boolean, perms?: IUserPermissions): boolean {
    if (is_self && this.hasPermission(component_id, 9, perms)) {
      return true;
    } else {
      return this.hasPermission(component_id, 4, perms);
    }
  }

  canDelete(component_id: number, is_self?: boolean, perms?: IUserPermissions): boolean {
    if (is_self && this.hasPermission(component_id, 10, perms)) {
      return true;
    } else {
      return this.hasPermission(component_id, 5, perms);
    }
  }

  hasPermission(component_id: number, operation_id: number, perms?: IUserPermissions): boolean {
    if (perms === void 0) { perms = this.permissions; }

    try {
      if (perms.components[component_id].operations.indexOf(0) !== -1) { return false; }
      if (perms.components[component_id].operations.indexOf(1) !== -1) { return true; }
      if (perms.components[component_id].operations.indexOf(operation_id) !== -1) { return true; }
    } catch (e) { }

  return false;
  }


}
