import { Component, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Colors1, Sizes1, Variants1, Roundeds, EpDedent, Colors3, EpBuildDocScriptBase, EpBuildNode, TYPE_GLOBAL_VARIANTS_1, TYPE_GLOBAL_COLORS_1, TYPE_GLOBAL_COLORS_3, TYPE_GLOBAL_SIZES_1, TYPE_GLOBAL_ROUNDEDS } from '@ep/global';
import { EpActionsDirective, EpContentDirective, EpDividerDirective } from "@ep/directives";
import { EpCardComponent, EpCheckboxComponent, EpChipComponent, EpInputComponent, EpSelectComponent, EpSelectItem } from "@ep/components";
import { DOCUMENTATION } from 'src/app/global/const';
import { Partial } from "../../partial/partial";
import { AppCode } from "../../partial/code";
import { toSelectItems } from 'src/app/global/utils';

@Component({
  selector: 'app-chip-demo',
  imports: [FormsModule, EpCardComponent, EpChipComponent, EpCheckboxComponent, EpSelectComponent, EpInputComponent, EpContentDirective, EpActionsDirective, Partial, AppCode, EpDividerDirective],
  templateUrl: './chip-demo.html',
  styleUrl: './chip-demo.css'
})
export class ChipDemo {
  public label?: string;
  public variant?: Variants1;
  public color?: Colors1 | Colors3;
  public size?: Sizes1;
  public rounded?: Roundeds;
  public visible?: boolean;
  public closable?: boolean;
  public hoverable?: boolean;
  public disabled?: boolean;
  public prependIcon?: boolean;
  public appendIcon?: boolean;
  public slotContent?: boolean;

  public mapVariants: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_VARIANTS_1, "uppercase");
  public mapColors: EpSelectItem[] = toSelectItems([...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3], "uppercase");
  public mapSizes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_SIZES_1, "uppercase");
  public mapRoundeds: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_ROUNDEDS, "uppercase");

  public documentation = {
    ...DOCUMENTATION.components.chip,
    usage: DOCUMENTATION.usage.replace("$s", "<ep-chip>"),
    props: DOCUMENTATION.props.replace("$s", "<ep-chip>")
  }

  public data = [
    {
      prop: "label",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Texto principal que se muestra dentro del chip. Se ignora si se proyecta contenido con `<ng-template epContent>`.",
    },
    {
      prop: "variant",
      type: { base: "InputSignal", options: TYPE_GLOBAL_VARIANTS_1 },
      default: "tonal",
      description: "Define el estilo visual del chip.",
    },
    {
      prop: "color",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3] },
      default: "primary",
      description: "Color base aplicado al chip.",
    },
    {
      prop: "size",
      type: { base: "InputSignal", options: TYPE_GLOBAL_SIZES_1 },
      default: "md",
      description: "Tamaño del chip (alto, paddings y tipografía).",
    },
    {
      prop: "rounded",
      type: { base: "InputSignal", options: TYPE_GLOBAL_ROUNDEDS },
      default: "full",
      description: "Nivel de redondeo de los bordes.",
    },
    {
      prop: "visible",
      type: "boolean",
      default: "true",
      description: "Controla la visibilidad del chip.",
    },
    {
      prop: "closable",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Si está activo, muestra un ícono de cierre que cambia `visible` a `false`.",
    },
    {
      prop: "hoverable",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Activa estilos de hover para resaltar el chip al pasar el cursor.",
    },
    {
      prop: "disabled",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Desactiva la interacción del chip.",
    },
    {
      prop: "prependIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono antes del texto o contenido proyectado del chip. El valor debe ser un identificador válido usado en `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "appendIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono después del texto o contenido del chip. El valor debe ser un identificador válido usado en `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "epContent",
      type: "EpContentDirective?",
      description: "Proyección de contenido principal mediante `<ng-template epContent>`.",
      link: { type: "self", url: "/docs/directives/content", text: "EpContentDirective" },
    },
  ];

  get codeTemplate() {
    const raw = {
      tag: "ep-chip",
      attrs: {
        label: this.label && !this.slotContent ? this.label : null,
        variant: this.variant,
        color: this.color,
        size: this.size,
        rounded: this.rounded,
        "[visible]": this.visible,
        "[closable]": this.closable,
        "[hoverable]": this.hoverable,
        "[disabled]": this.disabled,
        "[prependIcon]": this.prependIcon ? "star" : null,
        "[appendIcon]": this.appendIcon ? "star" : null,
      },
      children: [
        this.slotContent
          ? {
            tag: "ng-template",
            attrs: { epContent: "$_" },
            children: ["<span>CONTENT PROJECTION</span>"]
          }
          : ''
      ].filter(Boolean)
    };

    return EpDedent(EpBuildNode(raw));
  }
  get codeScript() {
    const imports = [
      { from: '@ep/components', imports: ['EpChipComponent'] },
      {
        from: '@ep/directives',
        imports: [this.slotContent ? 'EpContentDirective' : ''].filter(Boolean),
      }
    ];

    return EpDedent(EpBuildDocScriptBase({
      imports,
      component: 'ExampleComponent',
      body: [],
    }));
  }

  @HostBinding('class')
  get hostClass() { return 'contents'; }
}
