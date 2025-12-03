import { Component, computed, ContentChild, EventEmitter, HostBinding, input, Input, model, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpComponents } from '../init';
import { Color, DefaultModal, Icon, Show, Text, Type, Variant } from './theme/config';
import { getModalIconClass, getModalLabelClass, getModalSubLabelClass } from './theme/classes';
import { EpButtonComponent } from "../button/button";
import { EpIconComponent } from '../icon/icon';
import { EpActionsDirective, EpContentDirective } from '@ep/directives';

@Component({
  selector: 'ep-modal',
  imports: [CommonModule, EpIconComponent, EpButtonComponent],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class EpModalComponent extends EpComponents implements OnInit {
  // TODO: Propiedades de inyección
  @Input() label?: Text;
  @Input() subLabel?: Text;
  @Input() type: Type = DefaultModal.type;
  @Input() confirmButtonShow: Show = DefaultModal.confirmButtonShow;
  @Input() confirmButtonText: Text = DefaultModal.confirmButtonText;
  @Input() confirmButtonColor: Color = DefaultModal.confirmButtonColor;
  @Input() denyButtonShow?: Show;
  @Input() denyButtonText: Text = DefaultModal.denyButtonText;
  @Input() denyButtonColor: Color = DefaultModal.denyButtonColor;
  @Input() cancelButtonShow: Show = DefaultModal.cancelButtonShow;
  @Input() cancelButtonText: Text = DefaultModal.cancelButtonText;
  @Input() cancelButtonColor: Color = DefaultModal.cancelButtonColor;
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onDeny = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
  show = model<Show>();
  variant = input<Variant>(DefaultModal.variant);
  icon = input<Icon>(DefaultModal.icon);
  @ContentChild(EpContentDirective, { descendants: false }) contentTpl?: EpContentDirective;
  @ContentChild(EpActionsDirective, { descendants: false }) actionsTpl?: EpActionsDirective;

  // TODO: Propiedades (UI)
  public iconClass = computed(() => getModalIconClass({
    variant: this.variant(),
    icon: this.icon(),
  }));
  public modalLabelClass = computed(() => getModalLabelClass({
    variant: this.variant(),
  }));
  public modalSubLabelClass = computed(() => getModalSubLabelClass({
    variant: this.variant(),
  }));

  // TODO: Ciclo de vida
  ngOnInit(): void {
    this.denyButtonShow ??= this.type !== 'alert' ? true : DefaultModal.denyButtonShow;
  }

  // TODO: Métodos del template
  confirm() {
    this.onClose();
    this.onConfirm.emit();
  }
  deny() {
    this.onClose();
    this.onDeny.emit();
  }
  cancel() {
    this.onClose();
    this.onCancel.emit();
  }
  onBackdropClick(event: MouseEvent) {
    this.onClose();
  }
  onClose() {
    this.show.set(false);
  }

  // TODO: Host
  @HostBinding('class') get hostClass() { return 'contents' }
}