import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CounterValue } from 'src/app/model/counter-value';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //public counterValues: CounterValue[] = [{value:0, changes:0, type: 'start'}];

  public counterValuesSubject: BehaviorSubject<CounterValue[]> = new BehaviorSubject([{value:0, changes:0, type: 'start'}])

  constructor() { }

  increment(){

    const oldCounterValueArray= this.counterValuesSubject.value;
    const oldCounterValue=oldCounterValueArray[oldCounterValueArray.length-1];
    const oldValue=oldCounterValue.value;
    const oldChanges=oldCounterValue.changes;

    const newCounterValue:CounterValue=
      {
        value: oldValue+1,
        changes: oldChanges+1,
        type: 'increment'
      }

    oldCounterValueArray.push(newCounterValue);
    this.counterValuesSubject.next(oldCounterValueArray);

  }

  decrement(){
    const oldCounterValueArray= this.counterValuesSubject.value;
    const oldCounterValue=oldCounterValueArray[oldCounterValueArray.length-1];
    const oldValue=oldCounterValue.value;
    const oldChanges=oldCounterValue.changes;
    const newCounterValue:CounterValue=
      {
        value: oldValue-1,
        changes: oldChanges+1,
        type: 'decrement'
      }

    oldCounterValueArray.push(newCounterValue);
    this.counterValuesSubject.next(oldCounterValueArray);
  }

  resetOddCounterValues(){
    const oldCounterValueArray= this.counterValuesSubject.value;
    for (let i = 0; i < oldCounterValueArray.length; i++) {
      const element = oldCounterValueArray[i];
      if(element.changes%2!=0)
        element.value=0;
    }
    this.counterValuesSubject.next(oldCounterValueArray);
  }
}
