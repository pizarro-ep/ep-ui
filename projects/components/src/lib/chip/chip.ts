import { CommonModule } from '@angular/common';
import { Component, computed, ContentChild, HostBinding, input, Input, } from '@angular/core';
import { EpComponents } from '../init';
import { Closable, Color, DefaultChip, Disabled, Rounded, Size, Variant, Visible } from './theme/config';
import { getChipClass, } from './theme/classes';
import { EpButtonComponent } from '../button/button';
import { EpIconComponent } from "../icon/icon";
import { EpContentDirective } from '@ep/directives';

@Component({
  selector: 'ep-chip',
  standalone: true,
  imports: [CommonModule, EpButtonComponent, EpIconComponent],
  templateUrl: './chip.html',
  styleUrls: ['./chip.css'],
})

export class EpChipComponent extends EpComponents {
  // TODO: Propiedades de inyección
  @Input() label?: string;
  @Input() visible: Visible = DefaultChip.visible;
  @Input({ transform: (value: unknown) => value != null && `${value}` !== 'false' }) closable?: Closable;
  @Input() appendIcon?: string;
  @Input() prependIcon?: string;
  variant = input<Variant>(DefaultChip.variant);
  color = input<Color>(DefaultChip.color);
  size = input<Size>(DefaultChip.size);
  rounded = input<Rounded>(DefaultChip.rounded);
  disabled = input<Disabled>();
  hoverable = input<boolean>();
  @ContentChild(EpContentDirective) contentTpl?: EpContentDirective;

  //TODO: Propiedades (UI)
  public chipClass = computed(() => getChipClass({
    variant: this.variant(),
    color: this.color(),
    size: this.size(),
    rounded: this.rounded(),
    disabled: this.disabled(),
    hoverable: this.hoverable(),
  }));

  // TODO: Métodos del template
  public close(event: any) {
    event.stopPropagation();
    this.visible = false;
  }

  // TODO: Host
  @HostBinding('class')
  get hostClass() {
    return 'contents';
  }
}