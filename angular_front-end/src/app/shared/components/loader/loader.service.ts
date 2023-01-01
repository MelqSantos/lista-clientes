import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  public isLoading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
