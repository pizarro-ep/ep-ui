import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef, ElementRef, HostListener, AfterContentInit, ViewChild, AfterViewChecked, ChangeDetectorRef, Output, EventEmitter, HostBinding, QueryList, ContentChildren, signal, computed, input, } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { EpComponents } from '../init';
import { ReadOnly, Color, Disabled, Rounded, Size, Variant, DefaultSelect, PositionX, PositionY } from './theme/config';
import { getPanelClass } from './theme/classes';
import { EpInputComponent } from '../input/input';
import { EpSelectItemComponent } from './select-item';
import { EP_SELECT_TOKEN } from './select.token';

export interface EpSelectItem {
  label: string;
  subLabel?: string;
  value?: string;
  prependIcon?: string;
  appendIcon?: string;
}

@Component({
  selector: 'ep-select',
  standalone: true,
  imports: [CommonModule, FormsModule, EpInputComponent, EpSelectItemComponent],
  templateUrl: './select.html',
  styleUrls: ['./select.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EpSelectComponent),
    multi: true
  }, { provide: EP_SELECT_TOKEN, useExisting: forwardRef(() => EpSelectComponent) }]
})
export class EpSelectComponent extends EpComponents implements ControlValueAccessor, AfterViewChecked, AfterContentInit {
  // TODO: Propiedades de inyección
  @Input() variant: Variant = DefaultSelect.variant;
  @Input() label?: string;
  @Input() placeholder: string = ' ';
  @Input() items?: EpSelectItem[];
  @Input() readonly?: ReadOnly;
  @Input() disabled?: Disabled;
  @Input() block?: boolean;
  @Input() prependIcon?: string;
  @Input() appendIcon?: string;
  @Input() prependInnerIcon?: string;
  @Input() appendInnerIcon?: string;
  @Input() hasErrorIcon?: boolean;
  @Input() hasErrorMessage?: boolean;
  @Output() onChangeValue = new EventEmitter<EpSelectItem>();
  color = input<Color>(DefaultSelect.color);
  size = input<Size>(DefaultSelect.size);
  rounded = input<Rounded>(DefaultSelect.rounded);
  @ViewChild('selectPanel') selectPanel!: ElementRef;
  @ContentChildren(EpSelectItemComponent) selectItems?: QueryList<EpSelectItemComponent>;

  //TODO: Propiedades (UI)
  public value = signal<string>('');
  public isOpen = signal(false);
  public displayLabel: string = '';
  public panelPositionX = signal<PositionX>('left');
  public panelPositionY = signal<PositionY>('bottom');
  public panelClass = computed(() => getPanelClass({
    positionX: this.panelPositionX(),
    positionY: this.panelPositionY(),
    rounded: this.rounded(),
  }));

  onChange = (_: any) => { };
  onTouched = () => { };

  constructor(private el: ElementRef, private cd: ChangeDetectorRef) { super(); }

  // TODO: Ciclos de vida
  ngAfterViewChecked() {
    if (this.isOpen()) this.updateDropdownPosition();
  }
  ngAfterContentInit() {
    this.setupItems();
    this.selectItems?.changes.subscribe(() => this.setupItems());
    this.validateValue();
    this.syncDisplayLabel();
  }

  // TODO: Métodos del template
  writeValue(val: string): void {
    this.value.set(val ?? '');
    this.syncDisplayLabel();
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  toggleDropdown() {
    this.isOpen.update(v => !v);
    if (this.isOpen()) this.updateDropdownPosition();
  }
  itemSelected(item: EpSelectItem) {
    if (this.disabled || this.readonly) return;
    if (this.value() === item.value) return;

    this.value.set(item.value ?? item.label);
    this.displayLabel = item.label;
    this.isOpen.set(false);

    this.onChange(this.value());
    this.onTouched();
  }
  private setupItems() {
    if (this.selectItems) {
      this.selectItems?.forEach(child => {
        child.onItemClick.subscribe(item => this.itemSelected(item));
      });
    }
  }
  private validateValue() {
    const source = this.hasProyectionItem ? this.selectItems : this.items;
    const allowedValues = source?.map((i: any) =>
      this.hasProyectionItem ? i._value() : i.value
    ) ?? [];

    const current = this.value();

    if (!allowedValues.includes(current)) {
      Promise.resolve().then(() => {
        if (!allowedValues.includes(this.value())) {
          this.value.set('');
          this.displayLabel = '';
          this.cd.detectChanges();
        }
      });
    } else {
      this.syncDisplayLabel();
    }
  }
  private syncDisplayLabel(): void {
    const val = this.value();
    let label = '';

    if (this.hasProyectionItem) {
      const selectedChild = this.selectItems?.find(c => c._value() === val);
      label = selectedChild?.label ?? '';
    } else if (this.items?.length) {
      const selected = this.items.find(i => (i.value ?? i.label) === val);
      label = selected?.label ?? '';
    }

    this.displayLabel = label;
  }


  protected updateDropdownPosition() {
    if (!this.selectPanel) return;

    const containerRect = this.el.nativeElement.getBoundingClientRect();
    const spaceBelow = window.innerHeight - containerRect.bottom - 12;
    const spaceAbove = containerRect.top - 12;

    const panelEl = this.selectPanel.nativeElement as HTMLElement;
    const panelContentHeight = panelEl.offsetHeight;

    if (spaceBelow >= panelContentHeight || spaceBelow > spaceAbove) {
      this.panelPositionY.update(() => 'bottom');
    } else {
      this.panelPositionY.update(() => 'top');
    }
  }

  // TODO: Getters
  get hasProyectionItem() {
    return (this.selectItems?.length ?? 0) > 0
  }

  // TODO:Events
  @HostListener('document:click', ['$event.target'])
  onOutsideClick(target: EventTarget | null) {
    if (target instanceof HTMLElement && !this.el.nativeElement.contains(target)) {
      this.isOpen.update(() => false);
    }
  }
  @HostBinding('class')
  get hostClasses() {
    return "relative inline-flex text-left"
  }
  @HostBinding('class.w-full')
  get hostBlockClasses() { return this.block }
}
