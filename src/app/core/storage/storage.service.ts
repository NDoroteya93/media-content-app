import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable()
export class StorageService implements OnDestroy {

  private onSubject = new Subject<{ tabId: string }>();

  public changes = this.onSubject.asObservable().pipe(share());

  constructor() {
    localStorage.clear();
    this.start();
  }

  public ngOnDestroy(): void {
    this.stop();
  }

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

  public getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  public store(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    // the local application doesn't seem to catch changes to localStorage...
    this.onSubject.next({ tabId: key });
  }

  public clear(key) {
    localStorage.removeItem(key);
    // the local application doesn't seem to catch changes to localStorage...
  }


  private start(): void {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      let v;
      try { v = JSON.parse(event.newValue); } catch (e) { v = event.newValue; }
      // this.onSubject.next({ tabId: event.key });
    }
  }

  private stop(): void {
    // window.removeEventListener('storage', this.storageEventListener.bind(this));
    localStorage.clear();
    this.onSubject.complete();
  }
}
