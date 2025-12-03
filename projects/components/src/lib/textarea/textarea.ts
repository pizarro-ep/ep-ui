import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, computed, HostBinding, input, Input, Optional, Self, signal } from "@angular/core";
import { ControlValueAccessor, FormsModule, NgControl } from "@angular/forms";
import { EpComponents } from "../init";
import { Color, DefaultTextarea, Disabled, ReadOnly, Rounded, Size, Variant } from "./theme/config";
import { getContainerClass, getFieldContainerClass, getInnerIconClass, getLabelClass, getLabelFloatingContainerClass, getOuterIconClass, getTextareaClass } from "./theme/classes";
import { EpIconComponent } from "../icon/icon";
import { EpButtonComponent } from "../button/button";
import { EpFormValidationService } from "@ep/services";

@Component({
  selector: 'ep-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule, EpIconComponent, EpButtonComponent],
  templateUrl: './textarea.html',
  styleUrls: ['./textarea.css'],
})

export class EpTextareaComponent extends EpComponents implements ControlValueAccessor {
  // TODO: Propiedades de inyección
  @Input() readonly?: ReadOnly;
  @Input() rows: number = DefaultTextarea.rows;
  @Input() hasErrorMessage?: boolean;
  @Input() hasErrorIcon?: boolean;
  @Input() prependIcon?: string;
  @Input() appendIcon?: string;
  @Input() block?: boolean;
  @Input({ transform: (value: unknown) => value != null && `${value}` !== 'false' }) resize?: boolean;
  // resize = input(false, { transform: (value: unknown) => value != null && `${value}` !== 'false' });
  @Input() id: string = 'ep-textarea-' + Math.random().toString(36).substring(2, 9);
  variant = input<Variant>(DefaultTextarea.variant);
  color = input<Color>(DefaultTextarea.color);
  size = input<Size>(DefaultTextarea.size);
  rounded = input<Rounded>(DefaultTextarea.rounded);
  label = input<string>();
  placeholder = input<string>(' ');
  clearable = input<boolean>();
  disabled = input<Disabled>();
  prependInnerIcon = input<string>();
  appendInnerIcon = input<string>();
  min = input<number>();
  max = input<number>();

  //TODO: Propiedades (UI)
  public value: string = '';
  public placeholderText = computed(() => this.label() ? ' ' : this.placeholder());
  public hasLabel = computed(() => !!this.label());
  public isDisabled = computed(() => this._disabled() || this.disabled());
  private _disabled = signal<boolean>(false);
  public _min = computed(() => this.min() ?? 0);
  public _max = computed(() => {
    const max = this.max();
    if (max !== undefined && max <= this._min()) return this._min() + 1;
    return max;
  });

  public containerClass = computed(() => getContainerClass({
    variant: this.variant(),
    color: this.color(),
    size: this.size(),
    rounded: this.rounded(),
    disabled: this.isDisabled(),
    leftBorder: !!(this.prependInnerIcon()),
    rightBorder: !!(this.clearable() || this.appendInnerIcon()),
  }));
  public fieldContainerClass = computed(() => getFieldContainerClass({ size: this.size() }));
  public textareaClass = computed(() => getTextareaClass({
    size: this.size(),
  }));
  public labelClass = computed(() => getLabelClass({
    variant: this.variant(),
    color: this.color(),
    size: this.size(),
  }));
  public innerIconClass = computed(() => getInnerIconClass({
    size: this.size(),
  }));
  public outerIconClass = computed(() => getOuterIconClass({
    size: this.size(),
  }));
  public labelFloatingContainerClass = computed(() => getLabelFloatingContainerClass({
    variant: this.variant(),
    color: this.color(),
    size: this.size(),
    rounded: this.rounded(),
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
    this.value = input.value;
    this.onChange(this.value);
  }
  onBlur() { this.onTouched(); }
  clearTextarea(textarea?: HTMLTextAreaElement) {
    if (this.isDisabled() || this.readonly) return;
    this.value = '';
    this.onChange(this.value);

    this.cd.detectChanges();
    textarea?.focus();
  }

  // TODO: Getters
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