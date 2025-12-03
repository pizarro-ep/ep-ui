import { CommonModule } from '@angular/common';
import { Component, computed, ContentChild, HostBinding, input, Input, } from '@angular/core';
import { EpComponents } from '../init';
import { Color, Disabled, Rounded, ButtonType, Variant, Block, Size, DefaultButton } from './theme/config';
import { getButtonClass, } from './theme/classes';
import { EpContentDirective } from '@ep/directives';
import { EpIconComponent } from '../icon/icon';

@Component({
  selector: 'ep-button',
  standalone: true,
  imports: [CommonModule, EpIconComponent],
  templateUrl: './button.html',
  styleUrls: ['./button.css'],
})

export class EpButtonComponent extends EpComponents {
  // TODO: Propiedades de inyección
  @Input() icon?: string;
  @Input() prependIcon?: string;
  @Input() appendIcon?: string;
  @Input() value?: string;
  @Input() block?: Block;
  @Input() id: string = 'ep-button-' + Math.random().toString(36).substring(2, 9);
  type = input<ButtonType>(DefaultButton.type);
  variant = input<Variant>(DefaultButton.variant);
  color = input<Color>(DefaultButton.color);
  size = input<Size>(DefaultButton.size);
  rounded = input<Rounded>(DefaultButton.rounded);
  disabled = input<Disabled>();
  @ContentChild(EpIconComponent) buttonIcon?: EpIconComponent;
  @ContentChild(EpContentDirective) contentTpl?: EpContentDirective;

  //TODO: Propiedades (UI)
  public buttonClass = computed(() => getButtonClass({
    variant: this.variant(),
    color: this.color(),
    rounded: this.rounded(),
    size: this.size(),
    type: this.type(),
    disabled: this.disabled(),
  }));

  // TODO: Host
  @HostBinding('class')
  get hostClass() { return 'contents'; }
}