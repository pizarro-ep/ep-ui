import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Colors1, Colors3, EpBuildDocScriptBase, EpBuildNode, EpDedent, Roundeds, Sizes1, TYPE_GLOBAL_COLORS_1, TYPE_GLOBAL_COLORS_3, TYPE_GLOBAL_ROUNDEDS, TYPE_GLOBAL_SIZES_1, TYPE_GLOBAL_TYPES_3, TYPE_GLOBAL_VARIANTS_1, Types3, Variants1 } from '@ep/global';
import { EpActionsDirective, EpContentDirective, EpDividerDirective } from '@ep/directives';
import { EpButtonComponent, EpCardComponent, EpCheckboxComponent, EpIconComponent, EpInputComponent, EpSelectComponent, EpSelectItem } from '@ep/components';
import { FormsModule } from '@angular/forms';
import { DOCUMENTATION } from 'src/app/global/const';
import { Partial } from '../../partial/partial';
import { AppCode } from "../../partial/code";
import { toSelectItems } from 'src/app/global/utils';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, EpButtonComponent, EpCardComponent, EpInputComponent, EpSelectComponent, EpCheckboxComponent, EpIconComponent, EpContentDirective, EpActionsDirective, Partial, EpDividerDirective, AppCode],
  templateUrl: './button-demo.html',
  styleUrls: ['./button-demo.css']
})
export class ButtonDemo {
  public value?: string;
  public id?: string;
  public type?: Types3;
  public variant?: Variants1;
  public color?: Colors1 | Colors3;
  public size?: Sizes1;
  public rounded?: Roundeds;
  public block?: boolean;
  public disabled?: boolean;
  public icon?: boolean;
  public prependIcon?: boolean;
  public appendIcon?: boolean;
  public slotContentIcon?: boolean;

  public mapTypes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_TYPES_3, 'uppercase');
  public mapVariants: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_VARIANTS_1, 'uppercase');
  public mapColors: EpSelectItem[] = toSelectItems([...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3], 'uppercase');
  public mapSizes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_SIZES_1, 'uppercase');
  public mapRoundeds: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_ROUNDEDS, 'uppercase');

  public documentation = {
    ...DOCUMENTATION.components.button,
    usage: DOCUMENTATION.usage.replace("$s", "<ep-button>"),
    props: DOCUMENTATION.props.replace("$s", "<ep-button>"),
  }
  public data = [
    {
      prop: "id",
      type: "string",
      default: "ep-button-{{Math.random()}}",
      description: "Identificador único del botón, útil para pruebas, accesibilidad y referencia.",
    },
    {
      prop: "value",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Texto visible dentro del botón. Se ignora si el botón es de tipo `icon` o si se proyecta contenido.",
    },
    {
      prop: "type",
      type: { base: "InputSignal", options: TYPE_GLOBAL_TYPES_3 },
      default: "button",
      description: "Define la función del botón en formularios o si se utiliza como botón solo de ícono.",
    },
    {
      prop: "variant",
      type: { base: "InputSignal", options: TYPE_GLOBAL_VARIANTS_1 },
      default: "tonal",
      description: "Controla el estilo visual del botón.",
    },
    {
      prop: "color",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3] },
      default: "primary",
      description: "Define el color principal del botón, acorde a la paleta del tema.",
    },
    {
      prop: "size",
      type: { base: "InputSignal", options: TYPE_GLOBAL_SIZES_1 },
      default: "md",
      description: "Controla las dimensiones del botón: altura, espacios y tamaño de tipografía.",
    },
    {
      prop: "rounded",
      type: { base: "InputSignal", options: TYPE_GLOBAL_ROUNDEDS },
      default: "md",
      description: "Controla el nivel de redondeo en los bordes del botón.",
    },
    {
      prop: "block",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Hace que el botón se expanda para ocupar el ancho completo del contenedor.",
    },
    {
      prop: "disabled",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Deshabilita el botón e impide cualquier interacción.",
    },
    {
      prop: "icon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Muestra un ícono cuando el botón es de tipo `icon` y no se proyecta contenido. Debe ser un identificador válido de `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "prependIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono al inicio del botón, solo si el botón no es de tipo `icon`. Requiere un identificador válido de `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "appendIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono al final del botón, solo si el botón no es de tipo `icon`. Requiere un identificador válido de `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "ep-icon",
      type: "EpIconComponent?",
      description: "Permite proyectar manualmente un `<ep-icon>` dentro del botón. Visible solo si el botón es de tipo `icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "epContent",
      type: "EpContentDirective?",
      description: "Proyección de contenido usando `<ng-template epContent>`. Aplicable cuando el botón no es de tipo `icon`.",
      link: { type: "self", url: "/docs/directives/content", text: "EpContentDirective" },
    },
  ];


  get codeTemplate() {
    const raw = {
      tag: "ep-button",
      attrs: {
        id: this.id,
        value: this.value && this.type !== 'icon' && !this.slotContentIcon ? this.value : undefined,
        type: this.type,
        variant: this.variant,
        color: this.color,
        size: this.size,
        rounded: this.rounded,
        "[disabled]": this.disabled,
        "[block]": this.block,
        icon: this.icon && this.type === 'icon' && !this.slotContentIcon ? "account_circle" : undefined,
        prependIcon: this.prependIcon && this.type !== 'icon' ? "star" : undefined,
        appendIcon: this.appendIcon && this.type !== 'icon' ? "star" : undefined,
      },
      children: [
        this.slotContentIcon
          ? (this.type === 'icon'
            ? { tag: "ep-icon", attrs: { icon: "star", size: this.size ?? "md" }, selfClose: true }
            : { tag: "ng-template", attrs: { epContent: "$_" }, children: ["<span>PROJECTED</span>"] })
          : '',
      ].filter(Boolean),
    };

    return EpDedent(EpBuildNode(raw));
  }

  get codeScript() {
    const imports = [
      {
        from: '@ep/components',
        imports: [
          "EpButtonComponent",
          this.slotContentIcon && this.type === 'icon' ? 'EpIconComponent' : '',].filter(Boolean),
      },
      {
        from: '@ep/directives',
        imports: [
          this.slotContentIcon && this.type !== 'icon' ? 'EpContentDirective' : '',].filter(Boolean),
      },
    ]

    return EpDedent(EpBuildDocScriptBase({
      imports,
      component: 'ExampleComponent',
      body: [],
    }));
  }

  @HostBinding('class')
  get hostClass() { return "contents"; }
}
