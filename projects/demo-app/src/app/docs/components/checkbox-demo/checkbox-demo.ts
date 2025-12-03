import { Component, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Colors1, Sizes1, Roundeds, EpDedent, Variants3, TYPE_GLOBAL_VARIANTS_3, TYPE_GLOBAL_COLORS_1, TYPE_GLOBAL_COLORS_3, TYPE_GLOBAL_SIZES_1, TYPE_GLOBAL_ROUNDEDS, EpBuildNode, Colors3, EpBuildProp, EpBuildDocScriptBase } from '@ep/global';
import { EpActionsDirective, EpContentDirective, EpDividerDirective, } from "@ep/directives";
import { EpCardComponent, EpCheckboxComponent, EpInputComponent, EpSelectComponent, EpSelectItem } from "@ep/components";
import { DOCUMENTATION } from 'src/app/global/const';
import { Partial } from "../../partial/partial";
import { AppCode } from "../../partial/code";
import { toSelectItems } from 'src/app/global/utils';

@Component({
  selector: 'app-checkbox-demo',
  imports: [FormsModule, EpCardComponent, EpCheckboxComponent, EpSelectComponent, EpInputComponent, EpContentDirective, EpActionsDirective, Partial, AppCode, EpDividerDirective],
  templateUrl: './checkbox-demo.html',
  styleUrl: './checkbox-demo.css'
})
export class CheckboxDemo {
  public label?: string;
  public id?: string;
  public variant?: Variants3;
  public color?: Colors1 | Colors3;
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
    ...DOCUMENTATION.components.checkbox,
    usage: DOCUMENTATION.usage.replace("$s", "<ep-checkbox>"),
    props: DOCUMENTATION.props.replace("$s", "<ep-checkbox>"),
  }

  public data = [
    {
      prop: "id",
      type: "string",
      default: "ep-checkbox-{{Math.random()}}",
      description: "Identificador único del checkbox. Útil para accesibilidad (atributo for en labels) y pruebas automatizadas.",
    },
    {
      prop: "label",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Texto que se muestra como etiqueta del checkbox. Se ignora si se proyecta contenido mediante `<ng-template epContent>`.",
    },
    {
      prop: "variant",
      type: { base: "InputSignal", options: TYPE_GLOBAL_VARIANTS_3 },
      default: "default",
      description: "Define la variante de estilo del checkbox.",
    },
    {
      prop: "color",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3] },
      default: "secondary",
      description: "Esquema de color aplicado al checkbox, acorde al tema de la aplicación.",
    },
    {
      prop: "size",
      type: { base: "InputSignal", options: TYPE_GLOBAL_SIZES_1 },
      default: "md",
      description: "Controla el tamaño del checkbox, incluyendo alto, espacios internos y tipografía de la etiqueta.",
    },
    {
      prop: "rounded",
      type: { base: "InputSignal", options: TYPE_GLOBAL_ROUNDEDS },
      default: "md",
      description: "Define el nivel de redondeo de los bordes del checkbox.",
    },
    {
      prop: "containerRounded",
      type: { base: "InputSignal", options: TYPE_GLOBAL_ROUNDEDS },
      default: "sm",
      description: "Define el nivel de redondeo del área del contenedor.",
    },
    {
      prop: "block",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Hace que el checkbox se muestre como un elemento de bloque, ocupando todo el ancho disponible.",
    },
    {
      prop: "readonly",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Inhabilita la interacción directa con el checkbox pero mantiene el estado y estilos visuales.",
    },
    {
      prop: "disabled",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Desactiva completamente el checkbox, bloqueando la interacción y aplicando estilos de deshabilitado.",
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
      tag: 'ep-checkbox',
      attrs: {
        "[(ngModel)]": "value",
        id: this.id,
        label: this.label && !this.slotContent ? this.label : null,
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
        this.slotContent
          ? { tag: "ng-template", attrs: { epContent: "$_" }, children: ["<span>Este es el contenido del checkbox</span>"] }
          : ''
      ].filter(Boolean)
    };
    return EpDedent(EpBuildNode(raw));
  }
  get codeScript() {
    const body = [
      EpBuildProp("value", "", "boolean")
    ];
    const imports = [
      { from: '@ep/components', imports: ['EpCheckboxComponent'] },
      { from: '@ep/directives', imports: [this.slotContent ? "EpContentDirective" : ''].filter(Boolean) }
    ];

    return EpDedent(EpBuildDocScriptBase({
      imports,
      component: 'ExampleComponent',
      body,
    }));
  }

  @HostBinding('class')
  get hostClass() { return 'contents'; }
}
