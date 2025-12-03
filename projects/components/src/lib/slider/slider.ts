import { CommonModule } from '@angular/common';
import { Component, ElementRef, forwardRef, HostListener, Input, ViewChild, AfterViewInit, signal, effect, input, computed, HostBinding } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EpComponents } from '../init';
import { Color, DefaultSlider, Disabled, ReadOnly, Size, Tooltip } from './theme/config';
import { getContainerClass, getIconClass, getInputClass, getLabelClass, getTrackOverClass, getTrackUnderClass } from './theme/classes';
import { EpTextDirective } from "@ep/directives";
import { EpIconComponent } from '../icon/icon';

@Component({
  selector: 'ep-slider',
  standalone: true,
  imports: [CommonModule, FormsModule, EpIconComponent, EpTextDirective],
  templateUrl: './slider.html',
  styleUrls: ['./slider.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EpSliderComponent),
    multi: true,
  },],
})
export class EpSliderComponent extends EpComponents implements ControlValueAccessor, AfterViewInit {
  // TODO: Propiedades de inyección
  @Input() topLabel?: string;
  @Input() id: string = 'ep-slider-' + Math.random().toString(36).substring(2, 9);
  @Input() hasMinMaxLabel?: boolean;
  @Input() tooltip?: Tooltip;
  @Input() appendIcon?: string;
  @Input() prependIcon?: string;
  label = input<string>();
  color = input<Color>(DefaultSlider.color);
  trackColor = input<Color>();
  thumbColor = input<Color>();
  size = input<Size>(DefaultSlider.size);
  step = input<number>(DefaultSlider.step);
  min = input<number>(DefaultSlider.min);
  max = input<number>(DefaultSlider.max);
  readonly = input<ReadOnly>();
  disabled = input<Disabled>();
  block = input<boolean>();
  @ViewChild('slider') sliderRef!: ElementRef<HTMLInputElement>;

  // TODO: Propiedades (UI)
  public containerClass = computed(() => getContainerClass({
    size: this.size()
  }));
  public inputClass = computed(() => getInputClass({
    color: this.thumbColor() ?? this.color(),
    size: this.size(),
    readonly: this.readonly(),
  }));
  public trackOverClass = computed(() => getTrackOverClass({
    color: this.color(),
    size: this.size(),
    readonly: this.readonly(),
    disabled: this.disabled(),
  }));
  public trackUnderClass = computed(() => getTrackUnderClass({
    color: this.trackColor() ?? this.color(),
    size: this.size(),
    readonly: this.readonly(),
    disabled: this.disabled(),
  }));
  public labelClass = computed(() => getLabelClass({
    size: this.size(),
    readonly: this.readonly(),
    disabled: this.disabled(),
  }));
  public iconClass = computed(() => getIconClass({
    color: this.color(),
    size: this.size(),
    readonly: this.readonly(),
    disabled: this.disabled(),
  }));

  public value = signal(0);
  public sliderWidth = signal(0);
  public thumbPosition = computed(() => {
    const percent = (this.value() - this._min()) / (this._max() - this._min());
    const sliderWidth = this.sliderWidth();

    const thumbWidth: Record<Size, number> = {
      "xs": 8, "sm": 10, "md": 14, "lg": 18, "xl": 22,
    };

    const w = thumbWidth[this.size()];
    return percent * (sliderWidth - w) + w / 2;
  });
  public _step = computed(() => Math.max(Number(this.step()), 0.01));
  public _min = computed(() => Number(this.min()));
  public _max = computed(() => {
    const step = Number(this._step());
    const min = Number(this._min());
    const max = Number(this.max());

    return min >= max ? min + step : max;
  });


  onChange = (_: number) => { };
  onTouched = () => { };

  constructor() {
    super();

    effect(() => {
      this.block();
      this.label();
      queueMicrotask(() => this.updateSliderWidth());
    });

    effect(() => {
      const min = this._min();
      const max = this._max();
      let val = this.value();

      if (val < min) this.value.set(min);
      else if (val > max) this.value.set(max);

      queueMicrotask(() => this.updateSliderWidth());
    });

    effect(() => {
      const step = this._step();
      const min = this._min();
      const max = this._max();
      const val = this.value();

      const rounded = Math.round((val - min) / step) * step + min;

      if (rounded !== val) {
        const _rounded = rounded > max ? rounded - step : rounded;
        this.value.set(Math.min(max, Math.max(min, _rounded)));
      }
    });

  }

  // TODO: Ciclo de vida
  ngAfterViewInit(): void {
    this.updateSliderWidth();
  }

  // TODO: Métodos del template
  writeValue(value: number): void { this.value.set(value ?? 0); }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value.set(+input.value);
    this.updateSliderWidth();
    this.onChange(this.value());
  }
  private updateSliderWidth() {
    if (this.sliderRef?.nativeElement) {
      this.sliderWidth.set(this.sliderRef.nativeElement.offsetWidth);
    }
  }

  // TODO: Eventos y otros
  @HostListener('window:resize')
  onResize() { this.updateSliderWidth(); }

  // TODO: Host
  @HostBinding('class')
  get hostClass() { return "grid gap-0.5 min-w-20"; }
  @HostBinding('class.w-full')
  get hostBlockClass() { return this.block(); }
}

