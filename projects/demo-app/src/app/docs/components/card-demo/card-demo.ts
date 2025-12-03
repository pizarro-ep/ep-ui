import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Colors1, Colors3, EpBuildDocScriptBase, EpBuildNode, EpDedent, Roundeds, Sizes1, TYPE_GLOBAL_COLORS_1, TYPE_GLOBAL_COLORS_3, TYPE_GLOBAL_ROUNDEDS, TYPE_GLOBAL_SIZES_1, TYPE_GLOBAL_TYPES_3, TYPE_GLOBAL_VARIANTS_1, Types3, Variants1 } from '@ep/global';
import { EpActionsDirective, EpContentDirective, EpDividerDirective, EpSubTitleDirective, EpTitleDirective } from '@ep/directives';
import { EpButtonComponent, EpCardComponent, EpCheckboxComponent, EpInputComponent, EpSelectComponent, EpSelectItem } from '@ep/components';
import { FormsModule } from '@angular/forms';
import { DOCUMENTATION } from 'src/app/global/const';
import { Partial } from "../../partial/partial";
import { AppCode } from "../../partial/code";
import { toSelectItems } from 'src/app/global/utils';

@Component({
  selector: 'app-card-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, EpInputComponent, EpSelectComponent, EpCheckboxComponent, EpContentDirective, EpActionsDirective, EpButtonComponent, EpSubTitleDirective, EpTitleDirective, Partial, EpCardComponent, AppCode, EpDividerDirective],
  templateUrl: './card-demo.html',
  styleUrls: ['./card-demo.css']
})
export class CardDemo {
  public label?: string;
  public subLabel?: Types3;
  public text?: Types3;
  public href?: string;
  public variant?: Variants1;
  public color?: Colors1 | Colors3;
  public size?: Sizes1;
  public rounded?: Roundeds;
  public hoverable?: boolean;
  public disabled?: boolean;
  public prependIcon?: boolean;
  public appendIcon?: boolean;
  public slotTitle?: boolean;
  public slotSubTitle?: boolean;
  public slotContent?: boolean;
  public slotActions?: boolean;

  public mapTypes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_TYPES_3, "uppercase");
  public mapVariants: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_VARIANTS_1, "uppercase");
  public mapColors: EpSelectItem[] = toSelectItems([...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3], "uppercase");
  public mapSizes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_SIZES_1, "uppercase");
  public mapRoundeds: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_ROUNDEDS, "uppercase");

  public documentation = {
    ...DOCUMENTATION.components.card,
    usage: DOCUMENTATION.usage.replace("$s", "<ep-card>"),
    props: DOCUMENTATION.props.replace("$s", "<ep-card>"),
  }
  public data = [
    {
      prop: "label",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Texto mostrado como título del card. Se ignora si se proyecta contenido mediante `<ng-template epTitle>`.",
    },
    {
      prop: "subLabel",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Texto mostrado como subtítulo del card. Se ignora si se proyecta contenido mediante `<ng-template epSubTitle>`.",
    },
    {
      prop: "text",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Texto mostrado en el cuerpo del card. Se ignora si se proyecta contenido mediante `<ng-template epContent>`.",
    },
    {
      prop: "href",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Convierte el card en un enlace. Se abre al hacer clic en cualquier parte del card.",
    },
    {
      prop: "variant",
      type: { base: "InputSignal", options: TYPE_GLOBAL_VARIANTS_1 },
      default: "outlined",
      description: "Define la apariencia visual del card.",
    },
    {
      prop: "color",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3] },
      default: "secondary",
      description: "Esquema de color aplicado al card, según la paleta del tema.",
    },
    {
      prop: "size",
      type: { base: "InputSignal", options: TYPE_GLOBAL_SIZES_1 },
      default: "md",
      description: "Controla el tamaño general del card, afectando espaciado, tipografía y altura.",
    },
    {
      prop: "rounded",
      type: { base: "InputSignal", options: TYPE_GLOBAL_ROUNDEDS },
      default: "md",
      description: "Nivel de redondeo aplicado a los bordes del card.",
    },
    {
      prop: "hoverable",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Activa estilos de hover para resaltar el card al pasar el cursor.",
    },
    {
      prop: "disabled",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Deshabilita la interacción con el card, aplicando un estilo visual de inactivo.",
    },
    {
      prop: "prependIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono antes del título o subtítulo. El valor debe ser un identificador válido de `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "appendIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono después del título o subtítulo. El valor debe ser un identificador válido de `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "epTitle",
      type: "EpTitleDirective?",
      description: "Proyección de contenido para el título mediante `<ng-template epTitle>`.",
      link: { type: "self", url: "/docs/directives/title", text: "EpTitleDirective" },
    },
    {
      prop: "epSubTitle",
      type: "EpSubTitleDirective?",
      description: "Proyección de contenido para el subtítulo mediante `<ng-template epSubTitle>`.",
      link: { type: "self", url: "/docs/directives/subtitle", text: "EpSubTitleDirective" },
    },
    {
      prop: "epContent",
      type: "EpContentDirective?",
      description: "Proyección de contenido principal mediante `<ng-template epContent>`.",
      link: { type: "self", url: "/docs/directives/content", text: "EpContentDirective" },
    },
    {
      prop: "epActions",
      type: "EpActionsDirective?",
      description: "Proyección de contenido para la sección de acciones mediante `<ng-template epActions>`.",
      link: { type: "self", url: "/docs/directives/actions", text: "EpActionsDirective" },
    },
  ];

  get codeTemplate() {
    const hasHeaders = this.label || this.slotTitle || this.subLabel || this.slotSubTitle;
    const raw = {
      tag: "ep-card",
      attrs: {
        label: this.label && !this.slotTitle ? this.label : undefined,
        subLabel: this.subLabel && !this.slotSubTitle ? this.subLabel : undefined,
        text: this.text && !this.slotContent ? this.text : undefined,
        href: this.href,
        variant: this.variant,
        color: this.color,
        size: this.size,
        rounded: this.rounded,
        "[hoverable]": this.hoverable,
        "[disabled]": this.disabled,
        prependIcon: this.prependIcon && hasHeaders ? "star" : undefined,
        appendIcon: this.appendIcon && hasHeaders ? "star" : undefined,
      },
      children: [
        this.slotTitle
          ? { tag: "ng-template", attrs: { epTitle: "$_" }, children: ["<span>Este es un título</span>"] }
          : '',
        this.slotSubTitle
          ? { tag: "ng-template", attrs: { epSubTitle: "$_" }, children: ["<span>Este es un subtítulo</span>"] }
          : '',
        this.slotContent
          ? { tag: "ng-template", attrs: { epContent: "$_" }, children: ["<span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus!</span>"] }
          : '',
        this.slotActions
          ? {
            tag: "ng-template",
            attrs: { epActions: "$_" },
            children: [{ tag: "ep-button", attrs: { value: "ACTION BUTTON" }, selfClose: true }]
          }
          : '',
      ].filter(Boolean),
    };
    return EpDedent(EpBuildNode(raw));
  }
  get codeScript() {
    const imports = [
      { from: '@ep/components', imports: ['EpCardComponent'] },
      {
        from: '@ep/directives',
        imports: [
          this.slotTitle ? 'EpTitleDirective' : '',
          this.slotSubTitle ? 'EpSubTitleDirective' : '',
          this.slotContent ? 'EpContentDirective' : '',
          this.slotActions ? 'EpActionsDirective' : '',
        ].filter(Boolean)
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
