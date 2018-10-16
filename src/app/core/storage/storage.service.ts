import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable()
export class StorageService {

  private onSubject = new Subject<{ tabId: string }>();

  public changes = this.onSubject.asObservable().pipe(share());

  constructor() {
    this.clearLocalStorage();
  }

  /**
   * @name getStorage
   * @description get all data in the storage
   *
   * @returns {any[]}
   * @memberof StorageService
   */
  public getStorage(): any[] {
    const storage = [];
    for (let i = 0; i < localStorage.length; i++) {
      storage.push({
        key: localStorage.key(i),
        value: this.getItem(localStorage.key(i))
      });
    }
    return storage;
  }

  /**
   * @name getItem
   *
   * @param {string} key
   * @returns {*}
   * @memberof StorageService
   */
  public getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  /**
   * @name store
   * @description store the new key
   *
   * @param {string} key
   * @param {*} data
   * @memberof StorageService
   */
  public store(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.onSubject.next({ tabId: key });
  }

  /**
   * @name clear
   * @description remove item from local storage
   *
   * @param {*} key
   * @memberof StorageService
   */
  public clear(key): void {
    localStorage.removeItem(key);
  }

  /**
   * @name clearLocalStorage
   * @description clear local storage on init
   *
   * @private
   * @memberof StorageService
   */
  private clearLocalStorage(): void {
    localStorage.clear();
    this.onSubject.complete();
  }
}
