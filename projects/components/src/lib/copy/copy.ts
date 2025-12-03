import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpComponents } from '../init';
import { Color, DefaultCopy, Size } from './theme/config';
import { EpContentDirective } from "@ep/directives";
import { EpButtonComponent } from "../button/button";

@Component({
  selector: 'ep-copy',
  imports: [CommonModule, EpButtonComponent, EpContentDirective],
  templateUrl: './copy.html',
  styleUrl: './copy.css'
})
export class EpCopyComponent extends EpComponents {
  // TODO: Propiedades de inyección
  @Input() color: Color = DefaultCopy.color;
  @Input() size: Size = DefaultCopy.size;
  @Input() label: string = DefaultCopy.label;
  @Input() text?: string;

  // TODO: Propiedades (UI)
  copied = false;

  // TODO: Métodos del template
  async copyToClipboard() {
    if (!this.text) return;
    await navigator.clipboard.writeText(this.text);
    this.copied = true;
    setTimeout(() => (this.copied = false), 1500);
  }

  // TODO: Host
  @HostBinding('class') get hostClass() { return 'contents'; }
}