import { CommonModule } from "@angular/common";
import { ControlValueAccessor, FormsModule, NgControl } from "@angular/forms";
import { ChangeDetectorRef, Component, computed, HostBinding, input, Input, Optional, Self, signal, } from "@angular/core";
import { EpComponents } from "../init";
import { Color, DefaultInput, Disabled, InputType, ReadOnly, Rounded, Size, Variant } from "./theme/config";
import { getContainerClass, getFieldContainerClass, getLabelClass, getInputClass, getNumberIconClass, } from "./theme/classes";
import { EpNumberDirective } from "@ep/directives";
import { EpIconComponent } from "../icon/icon";
import { EpButtonComponent } from "../button/button";
import { EpFormValidationService } from "@ep/services";

@Component({
  selector: 'ep-input',
  standalone: true,
  imports: [CommonModule, FormsModule, EpIconComponent, EpButtonComponent, EpNumberDirective],
  templateUrl: './input.html',
  styleUrls: ['./input.css'],
})

export class EpInputComponent extends EpComponents implements ControlValueAccessor {
  // TODO: Propiedades de inyección
  @Input() readonly?: ReadOnly;
  @Input() block?: boolean;
  @Input() hasErrorMessage?: boolean;
  @Input() prependIcon?: string;
  @Input() appendIcon?: string;
  @Input() id: string = 'ep-input-' + Math.random().toString(36).substring(2, 9);
  @Input() step: number = DefaultInput.step;
  type = input<InputType>(DefaultInput.type);
  variant = input<Variant>(DefaultInput.variant);
  color = input<Color>(DefaultInput.color);
  size = input<Size>(DefaultInput.size);
  rounded = input<Rounded>(DefaultInput.rounded);
  label = input<string>();
  placeholder = input<string>(' ');
  clearable = input<boolean>();
  hasErrorIcon = input<boolean>();
  disabled = input<Disabled>();
  prependInnerIcon = input<string>();
  appendInnerIcon = input<string>();
  min = input<number>();
  max = input<number>();

  //TODO: Propiedades (UI)
  public value: string = '';
  public placeholderText = computed(() => this.label() ? ' ' : this.placeholder());
  public isDisabled = computed(() => this._disabled() || this.disabled());
  private _disabled = signal<boolean>(false);

  public containerClass = computed(() => getContainerClass({
    variant: this.variant(),
    color: this.color(),
    size: this.size(),
    type: this.type(),
    rounded: this.rounded(),
    disabled: this.isDisabled(),
    leftBorder: !!(this.prependInnerIcon()),
    rightBorder: !!(this.clearable() || this.appendInnerIcon()),
  }));
  public fieldContainerClass = computed(() => getFieldContainerClass({ size: this.size() }));
  public inputClass = computed(() => getInputClass({
    size: this.size(),
  }));
  public labelClass = computed(() => getLabelClass({
    variant: this.variant(),
    color: this.color(),
    size: this.size(),
  }));
  public numberIconClass = computed(() => getNumberIconClass({
    variant: this.variant(),
    color: this.color(),
  }));

  onChange = (_: any) => { };
  onTouched = () => { };

  constructor(
    private cd: ChangeDetectorRef,
    @Optional() @Self() public ngControl: NgControl | null,
    private validationService: EpFormValidationService
  ) {
    super();
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  // TODO: Métodos del template
  writeValue(val: string): void {
    this.value = val ?? '';
    this.cd.markForCheck();
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState?(isDisabled: boolean): void { this._disabled.set(isDisabled); }
  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let val = input.value;
    this.value = val;
    this.onChange(this.value);
  }
  restrictInput(event: KeyboardEvent): void {
    if (this.type() !== 'number') return;
    const allowedKeys = [
      'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End',
      '-', '.', ',', // signos y decimales
    ];
    // Permitir control y combinación de teclas (Ctrl+A, Ctrl+C, etc.)
    if (event.ctrlKey || event.metaKey) return;
    // Bloquear si no es número ni tecla permitida
    if (!allowedKeys.includes(event.key) && !/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }
  onBlur() {
    this.validateMinMax();
    this.onTouched();
  }
  clearInput() {
    if (this.disabled() || this.readonly) return;
    this.value = this.type() === 'number' ? "0" : '';
    this.onChange(this.value);
  }
  increment() {
    if (this.type() !== 'number' || this.disabled() || this.readonly) return;
    const num = parseFloat(this.value) || 0;
    const step = parseFloat(this.step as any) || 1;
    let result = num + step;
    const max = this.max();
    if (max !== undefined && result > max) result = max;
    this.value = result.toString();
    this.onChange(this.value);
  }
  decrement() {
    if (this.type() !== 'number' || this.disabled() || this.readonly) return;
    const num = parseFloat(this.value) || 0;
    const step = parseFloat(this.step as any) || 1;
    let result = num - step;
    let min = this.min();
    const max = this.max();
    if (min !== undefined && max !== undefined && min > max)
      min = undefined
    if (min !== undefined && result < min) result = min;
    if (max !== undefined && result > max) result = max;
    this.value = result.toString();
    this.onChange(this.value);
  }

  private validateMinMax() {
    if (this.type() === 'number') {
      let num = parseFloat(this.value);
      if (isNaN(num)) num = 0;

      let min = this.min();
      let max = this.max();
      if (min !== undefined && max !== undefined && min > max) min = undefined;
      if (min !== undefined && num < min) num = min;
      if (max !== undefined && num > max) num = max;

      const newValue = num.toString();
      if (newValue !== this.value) {
        this.value = newValue;
        this.onChange(this.value);
      }
    }
  }

  // TODO: Getters
  get minLength() {
    const min = this.min();
    return (this.type() !== 'number' && min !== undefined && min > 0) ? min : null
  }
  get maxLength() {
    const max = this.max();
    return (this.type() !== 'number' && max !== undefined && max > 0) ? max : null
  }
  get invalid(): boolean {
    //  Detecta errores tanto con Reactive Forms como con ngModel
    const control = this.ngControl?.control ?? (this.ngControl as any);
    return !!control?.invalid && (control?.touched || control?.dirty);
  }
  get errorMessage(): string | null {
    const control = this.ngControl?.control ?? (this.ngControl as any);
    return this.validationService.getErrorMessage(control, this.label());
  }

  // TODO: Host
  @HostBinding('class') get hostClass() { return 'grid gap-0.5'; }
  @HostBinding('class.w-full') get blockClass() { return this.block }
}