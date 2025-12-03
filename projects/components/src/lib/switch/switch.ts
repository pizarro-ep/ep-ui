import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, computed, forwardRef, HostBinding, Input, input, signal } from '@angular/core';
import { getContainerClass, getHostContainerClass, getThumbClass, getTrackClass } from './theme/classes';
import { Color, DefaultSwitch, Disabled, ReadOnly, Size, Variant } from './theme/config';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EpComponents } from '../init';

@Component({
  selector: 'ep-switch',
  imports: [CommonModule],
  templateUrl: './switch.html',
  styleUrl: './switch.css',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EpSwitchComponent),
    multi: true
  }]
})
export class EpSwitchComponent extends EpComponents implements ControlValueAccessor {
  // TODO: Propiedades de inyección
  @Input() readonly?: ReadOnly;
  @Input() indeterminate?: boolean;
  @Input() id: string = 'ep-switch-' + Math.random().toString(36).substring(2, 9);
  variant = input<Variant>(DefaultSwitch.variant);
  color = input<Color>(DefaultSwitch.color);
  size = input<Size>(DefaultSwitch.size);
  disabled = input<Disabled>();

  // TODO: Propiedades (UI)
  public value: boolean = false;
  private _disabled = signal<boolean>(false);
  public isDisabled = computed(() => this._disabled() || this.disabled());

  public hostContainerClass = computed(() => getHostContainerClass({
    size: this.size(),
  }));
  public containerClass = computed(() => getContainerClass({
    variant: this.variant(),
    color: this.color(),
    size: this.size(),
    disabled: this.isDisabled(),
  }));
  public trackClass = computed(() => getTrackClass({
    color: this.color(),
    size: this.size(),
    disabled: this.isDisabled(),
  }));
  public thumbClass = computed(() => getThumbClass({
    variant: this.variant(),
    color: this.color(),
    size: this.size(),
    disabled: this.isDisabled(),
  }));

  private onChange: (_: boolean) => void = () => { };
  private onTouched: () => void = () => { };

  constructor(public cd: ChangeDetectorRef) { super() }

  writeValue(value: any): void {
    this.value = Boolean(value);
    this.cd.markForCheck();
  }
  registerOnChange(fn: any): void { this.onChange = (value: any) => fn(Boolean(value)); }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
    this.cd.markForCheck();
  }

  public onInputChange() {
    if (this.isDisabled() || this.readonly) return;
    this.value = !this.value;
    this.onChange(this.value);
    this.onTouched();
  }

  // TODO: Host
  @HostBinding('class')
  get hostClass() {
    return ['inline-flex', this.hostContainerClass()].join(' ');
  }
}
