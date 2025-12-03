import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Colors1, Colors3, EpBuildDocScriptBase, EpBuildFunction, EpBuildNode, EpBuildProp, EpDedent, TYPE_GLOBAL_COLORS_1, TYPE_GLOBAL_COLORS_3, TYPE_GLOBAL_TYPES_4, TYPE_GLOBAL_TYPES_5, TYPE_GLOBAL_VARIANTS_4, Types4, Types5, Variants4 } from '@ep/global';
import { EpActionsDirective, EpContentDirective, EpDividerDirective } from "@ep/directives";
import { EpCardComponent, EpCheckboxComponent, EpInputComponent, EpSelectComponent, EpSelectItem, EpButtonComponent, EpModalComponent } from "@ep/components";
import { DOCUMENTATION, } from 'src/app/global/const';
import { Partial } from "../../partial/partial";
import { AppCode } from "../../partial/code";
import { toSelectItems } from 'src/app/global/utils';

@Component({
  selector: 'app-modal-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, EpCardComponent, EpContentDirective, EpActionsDirective, EpInputComponent, EpSelectComponent, Partial, EpCheckboxComponent, EpDividerDirective, AppCode, EpButtonComponent, EpModalComponent, EpContentDirective],
  templateUrl: './modal-demo.html',
  styleUrl: './modal-demo.css'
})
export class ModalDemo {
  public show: boolean = false;
  public type?: Types4;
  public label?: string;
  public subLabel?: string;
  public variant?: Variants4;
  public confirmButtonShow?: boolean;
  public confirmButtonText?: string;
  public confirmButtonColor?: Colors1 | Colors3;
  public onConfirm?: boolean;
  public denyButtonShow?: boolean;
  public denyButtonText?: string;
  public denyButtonColor?: Colors1 | Colors3;
  public onDeny?: boolean;
  public cancelButtonShow?: boolean;
  public cancelButtonText?: string;
  public cancelButtonColor?: Colors1 | Colors3;
  public onCancel?: boolean;
  public icon?: Types5;
  public slotContent?: boolean;
  public slotActions?: boolean;

  public mapVariants: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_VARIANTS_4, 'uppercase');
  public mapTypes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_TYPES_4, 'uppercase');
  public mapIcons: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_TYPES_5, 'uppercase');;
  public mapColors: EpSelectItem[] = toSelectItems([...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3], 'uppercase');

  public documentation = {
    ...DOCUMENTATION.components.modal,
    usage: DOCUMENTATION.usage.replace("$s", "<ep-modal>"),
    props: DOCUMENTATION.props.replace("$s", "<ep-modal>"),
  }

  public data = [
    {
      prop: "show",
      type: { base: "ModelSignal", options: ["boolean", "undefined"] },
      description: "Controla la visibilidad del modal. Soporta binding bidireccional mediante `[(show)]`.",
    },
    {
      prop: "label",
      type: ["string", "undefined"],
      description: "Título principal del modal.",
    },
    {
      prop: "subLabel",
      type: ["string", "undefined"],
      description: "Texto secundario o subtítulo del modal. Solo se mostrará si no se proyecta contenido con `<ng-template epContent>`.",
    },
    {
      prop: "variant",
      type: { base: "InputSignal", options: TYPE_GLOBAL_VARIANTS_4 },
      default: "static",
      description: "Define el tipo de modal según su comportamiento o presentación.",
    },
    {
      prop: "type",
      type: TYPE_GLOBAL_TYPES_4,
      default: "alert",
      description: "Especifica el tipo de modal predefinido. Cada tipo ajusta la disposición y botones mostrados automáticamente.",
    },
    {
      prop: "icon",
      type: { base: "InputSignal", options: TYPE_GLOBAL_TYPES_5 },
      default: "success",
      description: "Ícono del modal. El valor corresponde a un identificador de `ep-icon`.",
      requirements: [
        {
          name: "marella/material-symbols",
          lib: "material-symbols",
          version: "^0.39.1",
          link: "https://github.com/marella/material-symbols/tree/main/material-symbols",
        },
      ],
    },
    {
      prop: "confirmButtonShow",
      type: "boolean",
      default: true,
      description: "Controla la visibilidad del botón de confirmación. Solo se mostrará si no se proyecta contenido con `<ng-template epActions>`.",
    },
    {
      prop: "confirmButtonText",
      type: "string",
      default: "Aceptar",
      description: "Texto del botón de confirmación.",
    },
    {
      prop: "confirmButtonColor",
      type: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3],
      default: "primary",
      description: "Color del botón de confirmación.",
    },
    {
      prop: "denyButtonShow",
      type: ["boolean", "undefined"],
      default: false,
      description: "Controla la visibilidad del botón de rechazo. Por defecto estará activo (`true`) cuando el tipo del modal sea `'alert'`. Solo se mostrará si no se proyecta contenido con `<ng-template epActions>`.",
    },
    {
      prop: "denyButtonText",
      type: "string",
      default: "Cancelar",
      description: "Texto del botón de rechazo.",
    },
    {
      prop: "denyButtonColor",
      type: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3],
      default: "error",
      description: "Color del botón de rechazo.",
    },
    {
      prop: "cancelButtonShow",
      type: "boolean",
      default: false,
      description: "Controla la visibilidad del botón de cancelación. Solo se mostrará si no se proyecta contenido con `<ng-template epActions>`.",
    },
    {
      prop: "cancelButtonText",
      type: "string",
      default: "Cancelar",
      description: "Texto del botón de cancelación.",
    },
    {
      prop: "cancelButtonColor",
      type: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3],
      default: "secondary",
      description: "Color del botón de cancelación.",
    },
    {
      prop: "onConfirm",
      type: { base: "EventEmitter", options: "void", },
      description: "Evento emitido al hacer clic en el botón de confirmación.",
    },
    {
      prop: "onDeny",
      type: { base: "EventEmitter", options: "void", },
      description: "Evento emitido al hacer clic en el botón de rechazo.",
    },
    {
      prop: "onCancel",
      type: { base: "EventEmitter", options: "void", },
      description: "Evento emitido al hacer clic en el botón de cancelación.",
    },
    {
      prop: "epContent",
      type: "EpContentDirective?",
      description: "Proyección de contenido con `<ng-template epContent>`.",
      link: { type: "self", url: "/docs/directives/content", text: "EpContentDirective" },
    },
    {
      prop: "epActions",
      type: "EpActionsDirective?",
      description: "Proyección de contenido con `<ng-template epActions>`. Si se utiliza, los botones internos (`confirm`, `deny`, `cancel`) serán ignorados.",
      link: { type: "self", url: "/docs/directives/actions", text: "EpActionsDirective" },
    },
  ];


  get codeTemplate() {
    const modal = {
      tag: "ep-modal",
      attrs: {
        "[(show)]": "show",
        label: this.label,
        subLabel: this.subLabel,
        variant: this.variant,
        type: this.type,
        icon: this.icon,
        '[confirmButtonShow]': !this.slotActions ? this.confirmButtonShow : null,
        confirmButtonText: !this.slotActions && (this.confirmButtonShow || this.confirmButtonShow === undefined) ? this.confirmButtonText : null,
        confirmButtonColor: !this.slotActions && (this.confirmButtonShow || this.confirmButtonShow === undefined) ? this.confirmButtonColor : null,
        '[denyButtonShow]': !this.slotActions ? this.denyButtonShow : null,
        denyButtonText: !this.slotActions && this.denyButtonShow ? this.denyButtonText : null,
        denyButtonColor: !this.slotActions && this.denyButtonShow ? this.denyButtonColor : null,
        '[cancelButtonShow]': !this.slotActions ? this.cancelButtonShow : null,
        cancelButtonText: !this.slotActions && this.cancelButtonShow ? this.cancelButtonText : null,
        cancelButtonColor: !this.slotActions && this.cancelButtonShow ? this.cancelButtonColor : null,
        onConfirm: this.onConfirm ? 'onConfirmEvent()' : null,
        onDeny: this.onDeny ? 'onDenyEvent()' : null,
        onCancel: this.onCancel ? 'onCancelEvent()' : null,
      },
      children: [
        this.slotContent ? {
          tag: "ng-template",
          attrs: { epContent: "$_" },
          children: [{
            tag: "span",
            children: ["Lorem ipsum dolor sit amet consectetur adipisicing elit."]
          }]
        } : '',
        this.slotActions ? {
          tag: "ng-template",
          attrs: { epActions: "$_" },
          children: [{
            tag: "ep-button",
            attrs: { value: "ACTION BUTTON" },
            selfClose: true,
          }]
        } : '',
      ].filter(Boolean)
    }

    const button = {
      tag: "ep-button",
      attrs: { "(click)": "openModal()", value: "ABRI MODAL" },
      selfClose: true,
    }
    const raw = [EpBuildNode(button), EpBuildNode(modal)].filter(Boolean).join("\n\n");

    return EpDedent(raw);
  }

  get codeScript() {
    const imports = [
      { from: "@ep/components", imports: ["EpModalComponent"] },
      {
        from: "@ep/directives", imports: [
          this.slotContent ? "EpContentDirective" : '',
          this.slotActions ? "EpActionsDirevtive" : '',
        ].filter(Boolean)
      },
    ];
    const body = [
      EpBuildProp("show", "false", "boolean"),
      EpBuildFunction("openModal", [], ["this.show = true;"]),
      (this.confirmButtonShow === undefined || this.confirmButtonShow) && this.onConfirm && !this.slotActions
        ? EpBuildFunction("onConfirmEvent", [], ['console.log("Confirmado!!")']) : '',
      this.denyButtonShow && this.onDeny && !this.slotActions
        ? EpBuildFunction("onDenyEvent", [], ['console.log("Denegado!!")']) : '',
      this.cancelButtonShow && this.onCancel && !this.slotActions
        ? EpBuildFunction("onCancelEvent", [], ['console.log("Cancelado!!")']) : '',
    ].filter(Boolean);

    return EpDedent(EpBuildDocScriptBase({
      imports,
      component: "ExampleComponent",
      body
    }));
  }

  @HostBinding('class') get hostClass() { return "contents"; }
}
