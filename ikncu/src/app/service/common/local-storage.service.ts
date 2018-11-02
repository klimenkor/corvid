import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  private tokenKey = 'Marmetrix';

  public add(value) {
      localStorage.setItem(this.tokenKey, value);
  }

  public get(): JSON {
      return JSON.parse(localStorage.getItem(this.tokenKey));
  }

  public remove() {
      localStorage.removeItem(this.tokenKey);
  }
}
