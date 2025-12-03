import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, computed, ContentChild, forwardRef, HostBinding, input, Input, } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EpComponents } from '../init';
import { Block, Color, DefaultRadio, Disabled, ReadOnly, Rounded, Size, Variant } from './theme/config';
import { getContainerClass, getRadioClass, getLabelClass } from './theme/classes';
import { EpContentDirective } from '@ep/directives';

@Component({
  selector: 'ep-radio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './radio.html',
  styleUrls: ['./radio.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EpRadioComponent),
    multi: true
  }]
})
export class EpRadioComponent extends EpComponents implements ControlValueAccessor {
  // TODO: Propiedades de inyección
  @Input() label?: string;
  @Input() disabled?: Disabled;
  @Input() readonly?: ReadOnly;
  @Input() block?: Block;
  @Input() value?: any;
  @Input() name?: string;
  @Input() id: string = 'ep-radio-' + Math.random().toString(36).substring(2, 9);
  variant = input<Variant>(DefaultRadio.variant);
  color = input<Color>(DefaultRadio.color);
  size = input<Size>(DefaultRadio.size);
  rounded = input<Rounded>(DefaultRadio.rounded);
  containerRounded = input<Rounded>(DefaultRadio.containerRounded);
  @ContentChild(EpContentDirective) contentTpl?: EpContentDirective;

  // TODO: Propiedades (UI)
  public hostContainerClass = computed(() => getContainerClass({
    variant: this.variant(),
    color: this.color(),
    size: this.size(),
    rounded: this.containerRounded(),
  }));
  public radioClass = computed(() => getRadioClass({
    variant: this.variant(),
    color: this.color(),
    size: this.size(),
    rounded: this.rounded(),
  }));
  public labelClass = computed(() => getLabelClass({
    variant: this.variant(),
    color: this.color(),
    size: this.size(),
    rounded: this.containerRounded(),
  }));

  private _value: any;
  private onChange = (_: any) => { };
  private onTouched = () => { };

  constructor(private cd: ChangeDetectorRef) { super(); }

  // TODO: Métodos de ControlValueAccessor
  writeValue(value: any): void {
    this._value = value;
    this.cd.markForCheck();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onInputChange() {
    if (this.disabled) return;
    this._value = this.value;
    this.onChange(this.value);
    this.onTouched();
  }

  // TODO: Getters y Setters
  get checked(): boolean {
    return this._value === this.value;
  }

  // TODO: Host
  @HostBinding('class')
  get hostClass() {
    return `flex items-center gap-2 ${this.hostContainerClass()}`;
  }
  @HostBinding('class.w-full')
  get blockClass() { return this.block; }
}
