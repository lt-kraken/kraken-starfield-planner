import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {OutpostStructure} from "../../models/v1/outpost-structure";

@Component({
  selector: 'app-increment-input',
  templateUrl: './increment-input.component.html',
  styleUrls: ['./increment-input.component.scss']
})
export class IncrementInputComponent implements OnInit {

  @Input({required: false}) class!: string;
  @Input() data!: OutpostStructure;

  constructor() { }

  ngOnInit(): void {
  }

  myFormGroup = new FormGroup({
    formField: new FormControl()
  });

  _step: number = 1;
  _min: number = 0;
  _max: number = Infinity;
  _wrap: boolean = false;
  color: string = 'default';

  @Input('value')
  set inputValue(_value: number) {
    this.data.amount_queued = this.parseNumber(_value);
    this.onChange();
  }

  @Input()
  set step(_step: number) {
    this._step = this.parseNumber(_step);
  }

  @Input()
  set min(_min: number) {
    this._min = this.parseNumber(_min);
  }

  @Input()
  set max(_max: number) {
    this._max = this.parseNumber(_max);
  }

  @Input()
  set wrap(_wrap: boolean) {
    this._wrap = this.parseBoolean(_wrap);
  }

  @Output()
  valueUpdated = new EventEmitter();

  private parseNumber(num: any): number {
    return +num;
  }

  private parseBoolean(bool: any): boolean {
    return !!bool;
  }

  onChange(): void {
    if (this.data.amount_queued > this._max) {
      this.data.amount_queued = this._max;
    }
    else if(this.data.amount_queued < this._min) {
      this.data.amount_queued = this._min;
    }

    this.valueUpdated.emit({amount: this.data.amount_queued});
  }

  setColor(color: string): void {
    this.color = color;
  }

  getColor(): string {
    return this.color
  }

  incrementValue(step: number = 1): void {

    let inputValue = this.data.amount_queued + step;

    if (this._wrap) {
      inputValue = this.wrappedValue(inputValue);
    }

    this.data.amount_queued = inputValue;
    this.valueUpdated.emit({amount: this.data.amount_queued});
  }

  private wrappedValue(inputValue: any): number {
    if (inputValue > this._max) {
      return this._min + inputValue - this._max;
    }

    if (inputValue < this._min) {

      if (this._max === Infinity) {
        return 0;
      }

      return this._max + inputValue;
    }

    return inputValue;
  }

  shouldDisableDecrement(inputValue: number): boolean {
    return !this._wrap && inputValue <= this._min;
  }

  shouldDisableIncrement(inputValue: number): boolean {
    return !this._wrap && inputValue >= this._max;
  }

}
