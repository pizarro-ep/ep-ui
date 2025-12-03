import { Component, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Colors1, Sizes1, Roundeds, EpDedent, Variants3, TYPE_GLOBAL_VARIANTS_3, TYPE_GLOBAL_COLORS_1, TYPE_GLOBAL_COLORS_3, TYPE_GLOBAL_SIZES_1, TYPE_GLOBAL_ROUNDEDS, EpBuildNode, EpBuildDocScriptBase } from '@ep/global';
import { EpActionsDirective, EpContentDirective, EpDividerDirective, } from "@ep/directives";
import { EpCardComponent, EpCheckboxComponent, EpInputComponent, EpSelectComponent, EpSelectItem, EpRadioComponent } from "@ep/components";
import { DOCUMENTATION } from 'src/app/global/const';
import { toSelectItems } from 'src/app/global/utils';
import { Partial } from "../../partial/partial";
import { AppCode } from "../../partial/code";

@Component({
  selector: 'app-radio-demo',
  imports: [FormsModule, EpCardComponent, EpCheckboxComponent, EpSelectComponent, EpInputComponent, EpContentDirective, EpActionsDirective, Partial, AppCode, EpDividerDirective, EpRadioComponent],
  templateUrl: './radio-demo.html',
  styleUrl: './radio-demo.css'
})
export class RadioDemo {
  public id?: string;
  public name?: string;
  public label?: string;
  public variant?: Variants3;
  public color?: Colors1;
  public size?: Sizes1;
  public rounded?: Roundeds;
  public containerRounded?: Roundeds;
  public block?: boolean;
  public readonly?: boolean;
  public disabled?: boolean;
  public slotContent?: boolean;

  public mapVariants: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_VARIANTS_3, "uppercase");
  public mapColors: EpSelectItem[] = toSelectItems([...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3], "uppercase");
  public mapSizes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_SIZES_1, "uppercase");
  public mapRoundeds: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_ROUNDEDS, "uppercase");

  public documentation = {
    ...DOCUMENTATION.components.radio,
    usage: DOCUMENTATION.usage.replace("$s", "<ep-radio>"),
    props: DOCUMENTATION.props.replace("$s", "<ep-radio>"),
  }

  public data = [
    {
      prop: "id",
      type: "string",
      default: "ep-radio-{{Math.random()}}",
      description: "Identificador único del radio. Útil para accesibilidad (atributo for en labels) y pruebas automatizadas.",
    },
    {
      prop: "name",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Identificador para agrupar radios. Útil para accesibilidad y pruebas automatizadas. Es importante asignar este propiedad, para tener relación con otros radios.",
    },
    {
      prop: "label",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Texto que se muestra como etiqueta del radio. Se ignora si se proyecta contenido mediante `<ng-template epContent>`.",
    },
    {
      prop: "variant",
      type: { base: "InputSignal", options: TYPE_GLOBAL_VARIANTS_3 },
      default: "default",
      description: "Define la variante de estilo del radio.",
    },
    {
      prop: "color",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3] },
      default: "secondary",
      description: "Esquema de color aplicado al radio, acorde al tema de la aplicación.",
    },
    {
      prop: "size",
      type: { base: "InputSignal", options: TYPE_GLOBAL_SIZES_1 },
      default: "md",
      description: "Controla el tamaño del radio, incluyendo alto, espacios internos y tipografía de la etiqueta.",
    },
    {
      prop: "rounded",
      type: { base: "InputSignal", options: TYPE_GLOBAL_ROUNDEDS },
      default: "md",
      description: "Define el nivel de redondeo de los bordes del radio.",
    },
    {
      prop: "containerRounded",
      type: { base: "InputSignal", options: TYPE_GLOBAL_ROUNDEDS },
      default: "sm",
      description: "Define el nivel de redondeo del área del contenedor.",
    },
    {
      prop: "readonly",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Inhabilita la interacción directa con el radio pero mantiene el estado y estilos visuales.",
    },
    {
      prop: "disabled",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Desactiva completamente el radio, bloqueando la interacción y aplicando estilos de deshabilitado.",
    },
    {
      prop: "block",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Hace que el radio se muestre como un elemento de bloque, ocupando todo el ancho disponible.",
    },
    {
      prop: "epContent",
      type: "EpContentDirective?",
      description: "Proyección de contenido principal mediante `<ng-template epContent>`.",
      link: {
        type: "self",
        text: "EpContentDirective",
        url: "/docs/directives/content",
      },
    },
  ];


  get codeTemplate() {
    const raw = {
      tag: "ep-radio",
      attrs: {
        id: this.id,
        name: this.name,
        label: !this.slotContent ? this.label : null,
        variant: this.variant,
        color: this.color,
        size: this.size,
        rounded: this.rounded,
        containerRounded: this.containerRounded,
        "[readonly]": this.readonly,
        "[disabled]": this.disabled,
        "[block]": this.block,
      },
      children: [
        this.slotContent ? {
          tag: "ng-template",
          attrs: { epContent: "$_" },
          children: [{ tag: "span", children: ["Este es el contenido de Ep Radio"] }]
        } : ''
      ].filter(Boolean)
    };

    return EpDedent(EpBuildNode(raw));
  }
  get codeScript() {
    return EpDedent(EpBuildDocScriptBase({
      imports: [
        { from: "@ep/components", imports: ["EpRadioComponent"] },
        { from: "@ep/directives", imports: [this.slotContent ? "EpContentDirective" : ''].filter(Boolean) },
      ],
      component: "ExampleComponent",
      body: [],
    }));
  }

  @HostBinding('class')
  get hostClass() { return 'contents'; }
}
