import { CommonModule } from '@angular/common';
import { Component, computed, ContentChild, HostBinding, input, Input, } from '@angular/core';
import { EpComponents } from '../init';
import { Color, DefaultCard, Disabled, Hoverable, Rounded, Size, Variant } from './theme/config';
import { getCardClass, getLabelClass, getSubLabelClass } from './theme/classes';
import { EpActionsDirective, EpContentDirective, EpSubTitleDirective, EpTitleDirective } from "@ep/directives";
import { EpIconComponent } from "../icon/icon";

@Component({
  selector: 'ep-card',
  standalone: true,
  imports: [CommonModule, EpIconComponent],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class EpCardComponent extends EpComponents {
  // TODO: Propiedades de inyección
  @Input() label?: string;
  @Input() subLabel?: string;
  @Input() text?: string;
  @Input() href?: string;
  @Input() prependIcon?: string;
  @Input() appendIcon?: string;
  variant = input<Variant>(DefaultCard.variant);
  color = input<Color>(DefaultCard.color);
  size = input<Size>(DefaultCard.size);
  rounded = input<Rounded>(DefaultCard.rounded);
  hoverable = input<Hoverable>();
  disabled = input<Disabled>();
  @ContentChild(EpTitleDirective, { descendants: false }) labelTpl?: EpTitleDirective;
  @ContentChild(EpSubTitleDirective, { descendants: false }) subLabelTpl?: EpSubTitleDirective;
  @ContentChild(EpContentDirective, { descendants: false }) contentTpl?: EpContentDirective;
  @ContentChild(EpActionsDirective, { descendants: false }) actionsTpl?: EpActionsDirective;

  // TODO: Propiedades (UI)
  public cardClass = computed(() => getCardClass({
    variant: this.variant(),
    color: this.color(),
    size: this.size(),
    rounded: this.rounded(),
    hoverable: this.hoverable(),
    disabled: this.disabled(),
  }));
  public labelClass = computed(() => getLabelClass({ size: this.size() }));
  public subLabelClass = computed(() => getSubLabelClass({ size: this.size() }));

  // TODO: Host
  @HostBinding('class')
  get hostClass() { return 'contents'; }
}
