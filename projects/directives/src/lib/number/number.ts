import { Directive, HostListener, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { EpDirectives } from '../init';

@Directive({
  selector: '[epNumber]',
  standalone: true,
})
export class EpNumberDirective extends EpDirectives {
  @Input() epNumber = true;

  constructor(@Optional() @Self() private ngControl: NgControl) { super(); }


  @HostListener('input', ['$event'])
  onInput(event: Event) {
    if (!this.epNumber) return;

    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9.-]/g, '');

    // Permite solo un punto decimal
    const parts = value.split('.');
    if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');

    // Mueve o elimina guiones incorrectos
    value = value.replace(/-/g, ''); // elimina todos los guiones
    if (input.value.startsWith('-')) value = '-' + value; // conserva uno al inicio si el usuario lo escribió allí

    input.value = value;
    if (this.ngControl?.control) {
      this.ngControl.control.setValue(value ? parseFloat(value) : null, { emitEvent: true });
    }
  }
}
