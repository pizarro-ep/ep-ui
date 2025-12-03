import {
  Component, ContentChild, ElementRef, HostListener, Inject,
  ViewChild, AfterViewInit, computed, signal, ChangeDetectorRef,
  HostBinding, AfterViewChecked, OnDestroy, input, effect
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { EpComponents } from '../init';
import { getPanelClass } from './theme/classes';
import { PositionX, PositionY } from './theme/config';
import { EpActivatorDirective } from '@ep/directives';
import { EpListComponent } from '../list/list';

@Component({
  selector: 'ep-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class EpMenuComponent extends EpComponents implements AfterViewInit, AfterViewChecked, OnDestroy {
  public activator = input<string | null>(null);
  @ContentChild(EpActivatorDirective) activatorSlot?: EpActivatorDirective;
  @ContentChild(EpListComponent) contentSlot?: EpListComponent;
  @ViewChild('menuContent') menuContentTpl!: ElementRef;

  private parentEl?: HTMLElement;
  private externalEl?: HTMLElement;

  public isOpen = signal(false);
  public panelPositionX = signal<PositionX>('left');
  public panelPositionY = signal<PositionY>('bottom');

  public panelClass = computed(() => getPanelClass({
    positionX: this.panelPositionX(),
    positionY: this.panelPositionY(),
  }));

  constructor(
    private host: ElementRef<HTMLElement>,
    private el: ElementRef,
    private cd: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: Document
  ) {
    super();

    // Escuchar cambios reactivos en activator
    effect(() => {
      const value = this.activator();
      if (value && value.startsWith('#')) {
        this.externalEl?.removeEventListener('click', this.toggle); // limpiar viejo
        this.externalEl = this.doc.querySelector(value) as HTMLElement;
        this.externalEl?.addEventListener('click', this.toggle);
      }
    });
  }

  ngAfterViewInit() { }
  ngAfterViewChecked() {
    if (this.isOpen()) this.updateDropdownPosition();
  }
  ngOnDestroy() {
    this.parentEl?.removeEventListener('click', this.toggle);
    this.externalEl?.removeEventListener('click', this.toggle);
  }

  toggle = () => {
    this.isOpen.update((isOpen) => !isOpen);
    if (this.isOpen()) this.updateDropdownPosition();
  };

  close = () => this.isOpen.set(false);

  protected updateDropdownPosition() {
    if (!this.menuContentTpl) return;
    const containerRect = this.el.nativeElement.getBoundingClientRect();

    const spaceBelow = window.innerHeight - containerRect.bottom - 12;
    const spaceAbove = containerRect.top - 12;
    const spaceRight = window.innerWidth - containerRect.right - 12;
    const spaceLeft = containerRect.left - 12;

    const panelEl = this.menuContentTpl.nativeElement as HTMLElement;
    const panelContentHeight = panelEl.offsetHeight;
    const panelContentWidth = panelEl.offsetWidth;

    this.panelPositionY.set(
      spaceBelow >= panelContentHeight || spaceBelow > spaceAbove ? 'bottom' : 'top'
    );

    this.panelPositionX.set(
      spaceRight >= panelContentWidth || spaceRight > spaceLeft ? 'left' : 'right'
    );

    this.cd.detectChanges();
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: Event) {
    const target = e.target as HTMLElement;
    if (
      !this.host.nativeElement.contains(target) &&
      !this.parentEl?.contains(target) &&
      !this.externalEl?.contains(target)
    ) {
      this.close();
    }
  }

  // TODO: Host
  @HostBinding('class') get hostClass() { return 'relative'; }
}
