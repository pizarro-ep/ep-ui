import { Component, computed, HostBinding, input, Input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpComponents } from '../init';
import { Color, DefaultEntriesSelector, Rounded, Size, Variant } from './theme/config';
import { getContainerClass, getLabelSize } from './theme/classes';
import { EpSelectComponent, EpSelectItem } from '../select/select';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'ep-entries-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, EpSelectComponent],
  templateUrl: './entries-selector.html',
  styleUrl: './entries-selector.css'
})
export class EpEntriesSelectorComponent extends EpComponents {
  //TODO: Inputs (entradas)
  @Input() variant: Variant = DefaultEntriesSelector.variant;
  @Input() color: Color = DefaultEntriesSelector.color;
  @Input() rounded: Rounded = DefaultEntriesSelector.rounded;
  @Input() avaliableLimits?: EpSelectItem[] = DefaultEntriesSelector.avaliableLimits;
  size = input<Size>(DefaultEntriesSelector.size);
  value = model<number>();

  //TODO: Propiedades (UI)
  public containerClass = computed(() => getContainerClass({ size: this.size() }));
  public labelClass = computed(() => getLabelSize({ size: this.size() }));

  // TODO: Métodos del template
  changeLimitValue(input: any) {
    const rawValue = typeof input === 'string' || typeof input === 'number'
      ? String(input)
      : String(input?.target?.value ?? '');

    const match = this.avaliableLimits?.find(i => i.value === rawValue);

    this.value.set(match ? parseInt(match.value!, 10) : DefaultEntriesSelector.value);
  }



  // TODO: Host
  @HostBinding('class')
  get hostClass() {
    return "flex items-center justify-center flex-wrap gap-2";
  }

}
