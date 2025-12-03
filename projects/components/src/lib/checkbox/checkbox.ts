import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, computed, ContentChild, forwardRef, HostBinding, input, Input, signal, } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EpComponents } from '../init';
import { Color, Disabled, Size, Variant, DefaultCheckbox, Rounded, ReadOnly, Block } from './theme/config';
import { getContainerClass, getCheckboxClass, getLabelClass } from './theme/classes';
import { EpContentDirective } from '@ep/directives';


@Component({
  selector: 'ep-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkbox.html',
  styleUrls: ['./checkbox.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EpCheckboxComponent),
    multi: true
  }]
})

export class EpCheckboxComponent extends EpComponents implements ControlValueAccessor {
  // TODO: Propiedades de inyección
  @Input() label?: string;
  @Input() id: string = 'ep-checkbox-' + Math.random().toString(36).substring(2, 9);
  @Input() readonly?: ReadOnly;
  @Input() indeterminate?: boolean;
  @Input() block?: Block;
  variant = input<Variant>(DefaultCheckbox.variant);
  color = input<Color>(DefaultCheckbox.color);
  size = input<Size>(DefaultCheckbox.size);
  rounded = input<Rounded>(DefaultCheckbox.rounded);
  containerRounded = input<Rounded>(DefaultCheckbox.containerRounded);
  disabled = input<Disabled>();
  @ContentChild(EpContentDirective) contentTpl?: EpContentDirective;

  //TODO: Propiedades (UI)
  public value: boolean = false;
  private _disabled = signal<boolean>(false);
  public isDisabled = computed(() => this._disabled() || this.disabled());

  public hostContainerClass = computed(() => getContainerClass({
    variant: this.variant(),
    color: this.color(),
    size: this.size(),
    rounded: this.containerRounded(),
    disabled: this.disabled(),
  }));
  public checkboxClass = computed(() => getCheckboxClass({
    variant: this.variant(),
    color: this.color(),
    size: this.size(),
    rounded: this.rounded(),
    disabled: this.disabled(),
  }));
  public labelClass = computed(() => getLabelClass({
    variant: this.variant(),
    color: this.color(),
    size: this.size(),
    rounded: this.containerRounded(),
    disabled: this.disabled(),
  }));

  private onChange: (_: boolean) => void = () => { };
  private onTouched: () => void = () => { };

  constructor(public cd: ChangeDetectorRef) { super() }

  // TODO: Métodos del template
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
  get hostClass() { return 'contents' }
} 