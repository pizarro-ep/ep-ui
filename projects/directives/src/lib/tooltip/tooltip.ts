import { Directive, ElementRef, Input, Renderer2, HostListener, OnDestroy, signal, effect } from '@angular/core';
import { EpDirectives } from '../init';
import { DefaultTooltip, Delay, Text } from './theme/config';

@Directive({
  selector: '[epTooltip]',
  standalone: true,
})
export class EpTooltipDirective extends EpDirectives implements OnDestroy {
  // TODO: Propiedades de inyección
  private _tooltipText = signal<Text>(DefaultTooltip.text);
  private _delay = signal<Delay>(DefaultTooltip.delay);
  private _isVisible = signal(false);

  @Input('epTooltip') set tooltipText(value: Text) {
    this._tooltipText.set(value);
  }
  @Input() set delay(value: Delay) {
    this._delay.set(value);
  }

  private tooltipEl!: HTMLElement;
  private timeoutId: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    super();
    // efecto reactivo: si cambia el texto y ya está visible → actualizar
    effect(() => {
      if (this._isVisible() && this.tooltipEl) {
        this.renderer.setProperty(this.tooltipEl, 'textContent', this._tooltipText());
        this.setPosition();
      }
    });
  }

  // clase: lista de estilos
  private tooltipClasses = [
    'absolute', 'z-99999',
    'px-2', 'py-1.5',
    'rounded',
    'bg-ep-secondary',
    'text-center', 'text-white', 'text-ep-sm', 'leading-none',
    'shadow-md',
    'opacity-0',
    'pointer-events-none',
    'wrap-anywhere'
  ];

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this._tooltipText()) return;

    this.timeoutId = setTimeout(() => {
      this.showTooltip();
    }, this._delay());
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    clearTimeout(this.timeoutId);
    this.destroyTooltip();
  }

  private showTooltip() {
    if (this._isVisible()) return;
    this._isVisible.set(true);

    this.tooltipEl = this.renderer.createElement('div');
    this.tooltipClasses.forEach(c => this.renderer.addClass(this.tooltipEl, c));

    const text = this.renderer.createText(this._tooltipText());
    this.renderer.appendChild(this.tooltipEl, text);
    const parent = this.el.nativeElement.offsetParent || document.body;
    this.renderer.appendChild(parent, this.tooltipEl);


    this.setPosition();
    requestAnimationFrame(() => {
      this.renderer.setStyle(this.tooltipEl, 'opacity', '1');
    });
  }

  private getRealHost(): HTMLElement {
    const native = this.el.nativeElement as HTMLElement;
    const style = getComputedStyle(native);

    if (style.display === 'contents') {
      const child = native.firstElementChild as HTMLElement;
      return child ?? native;
    }

    return native;
  }

  private setPosition() {
    const host = this.getRealHost();
    const hostRect = host.getBoundingClientRect();

    // 1. Máximo ancho permitido
    const maxWidth = window.innerWidth - 16; // 8px a cada lado
    this.renderer.setStyle(this.tooltipEl, 'max-width', `${maxWidth}px`);
    this.renderer.setStyle(this.tooltipEl, 'white-space', 'normal');

    // Volvemos a calcular porque puede cambiar el tamaño
    const newTooltipRect = this.tooltipEl.getBoundingClientRect();

    // 2. Posición vertical (sobre el host)
    const top = hostRect.top - newTooltipRect.height - 8 + window.scrollY;

    // 3. Posición horizontal centrada originalmente
    let left =
      hostRect.left +
      (hostRect.width - newTooltipRect.width) / 2 +
      window.scrollX;

    // 4. Corrección si se sale por la izquierda
    if (left < 8) left = 8;

    // 5. Corrección si se sale por la derecha
    const rightLimit = window.innerWidth - newTooltipRect.width - 8;
    if (left > rightLimit) left = rightLimit;

    // Aplicamos
    this.renderer.setStyle(this.tooltipEl, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipEl, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipEl, 'left', `${left}px`);
    this.renderer.setStyle(this.tooltipEl, 'z-index', '99999');
  }

  ngOnDestroy(): void {
    this.destroyTooltip();
  }

  private destroyTooltip() {
    if (this.tooltipEl) {
      this.renderer.removeChild(document.body, this.tooltipEl);
      this.tooltipEl = null as any;
    }
    this._isVisible.set(false);
  }
}
