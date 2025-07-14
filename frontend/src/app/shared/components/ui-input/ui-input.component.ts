import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule
} from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UiInputComponent),
    multi: true
  }]
})
export class UiInputComponent implements ControlValueAccessor {

  /* ---------- API ---------- */
  @Input() label = '';
  @Input() name  = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'password' | 'email' = 'text';
  @Input() required = false;
  @Input() disabled = false;

  /* ---------- CVA ---------- */
  value = '';
  onChange = (v: any) => {};
  onTouched = () => {};

  writeValue(v: any): void   { this.value = v ?? ''; }
  registerOnChange(fn: any)  { this.onChange   = fn; }
  registerOnTouched(fn: any) { this.onTouched  = fn; }
  setDisabledState(s: boolean) { this.disabled = s; }

  /* 2-Way Binding Helper */
  get model()      { return this.value; }
  set model(value) { this.value = value; this.onChange(value); }
}
