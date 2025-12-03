import { Component, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Colors1, Sizes1, EpDedent, TYPE_GLOBAL_COLORS_1, TYPE_GLOBAL_COLORS_3, TYPE_GLOBAL_SIZES_1, TYPE_GLOBAL_ROUNDEDS, Colors3, EpBuildDocScriptBase, EpBuildNode, Variants2, Roundeds, TYPE_GLOBAL_VARIANTS_2, EpBuildProp } from '@ep/global';
import { EpActionsDirective, EpContentDirective, EpDividerDirective } from "@ep/directives";
import { EpCardComponent, EpCheckboxComponent, EpInputComponent, EpSelectComponent, EpSelectItem, EpTextareaComponent } from "@ep/components";
import { DOCUMENTATION } from 'src/app/global/const';
import { toSelectItems } from 'src/app/global/utils';
import { Partial } from "../../partial/partial";
import { AppCode } from "../../partial/code";

@Component({
  selector: 'app-textarea-demo',
  imports: [FormsModule, EpCardComponent, EpCheckboxComponent, EpSelectComponent, EpInputComponent, EpContentDirective, EpActionsDirective, Partial, AppCode, EpDividerDirective, EpTextareaComponent],
  templateUrl: './textarea-demo.html',
  styleUrl: './textarea-demo.css'
})
export class TextareaDemo {
  public id?: string;
  public value?: string;
  public label?: string;
  public placeholder?: string;
  public variant?: Variants2;
  public color?: Colors1 | Colors3;
  public size?: Sizes1;
  public rounded?: Roundeds;
  public rows?: number;
  public resize?: boolean;
  public disabled?: boolean;
  public readonly?: boolean;
  public clearable?: boolean;
  public block?: boolean;
  public hasErrorMessage?: boolean;
  public hasErrorIcon?: boolean;
  public prependIcon?: boolean;
  public appendIcon?: boolean;
  public prependInnerIcon?: boolean;
  public appendInnerIcon?: boolean;
  public min?: number;
  public max?: number;

  public mapVariants: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_VARIANTS_2, 'uppercase');
  public mapColors: EpSelectItem[] = toSelectItems([...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3], 'uppercase');
  public mapSizes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_SIZES_1, 'uppercase');
  public mapRoundeds: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_ROUNDEDS, 'uppercase');

  public documentation = {
    ...DOCUMENTATION.components.textarea,
    usage: DOCUMENTATION.usage.replace("$s", "<ep-textarea>"),
    props: DOCUMENTATION.props.replace("$s", "<ep-textarea>"),
  }

  public data = [
    {
      prop: "id",
      type: "string",
      default: "ep-textarea-{{ Math.random() }}",
      description: "Identificador único del textarea. Se genera automáticamente si no se proporciona.",
    },
    {
      prop: "label",
      type: { base: "InputSignal", options: ["string", "undefined"] },
      default: "undefined",
      description: "Etiqueta visible del textarea. Si no se establece, solo se mostrará el placeholder.",
    },
    {
      prop: "placeholder",
      type: { base: "InputSignal", options: "string" },
      default: " ",
      description: "Texto auxiliar mostrado cuando no hay label o el textarea está vacío.",
    },
    {
      prop: "variant",
      type: { base: "InputSignal", options: TYPE_GLOBAL_VARIANTS_2 },
      default: "filled",
      description: "Define el estilo visual del textarea.",
    },
    {
      prop: "color",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3] },
      default: "secondary",
      description: "Controla el color principal aplicado al textarea.",
    },
    {
      prop: "size",
      type: { base: "InputSignal", options: TYPE_GLOBAL_SIZES_1 },
      default: "md",
      description: "Controla el tamaño del textarea (padding y fuente).",
    },
    {
      prop: "rounded",
      type: { base: "InputSignal", options: TYPE_GLOBAL_ROUNDEDS },
      default: "md",
      description: "Define el radio de borde (esquinas redondeadas).",
    },
    {
      prop: "rows",
      type: "number",
      default: 3,
      description: "Número mínimo de líneas visibles del textarea.",
    },
    {
      prop: "min",
      type: { base: "InputSignal", options: ["number", "undefined"] },
      default: 0,
      description: "Longitud mínima del contenido permitido.",
    },
    {
      prop: "max",
      type: { base: "InputSignal", options: ["number", "undefined"] },
      default: "undefined",
      description: "Longitud máxima del contenido permitido.",
    },
    {
      prop: "readonly",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Evita que el usuario modifique el contenido, pero sigue siendo seleccionable.",
    },
    {
      prop: "disabled",
      type: { base: "InputSignal", options: "boolean" },
      default: "undefined",
      description: "Deshabilita por completo la interacción con el textarea.",
    },
    {
      prop: "hasErrorMessage",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Muestra un mensaje de error cuando el control está inválido.",
    },
    {
      prop: "hasErrorIcon",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Muestra un ícono de error cuando el control está inválido.",
    },
    {
      prop: "prependIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono al inicio, fuera del área de escritura. Usa un identificador válido de `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "appendIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono al final, fuera del área de escritura. Usa un identificador válido de `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "prependInnerIcon",
      type: { base: "InputSignal", options: ["string", "undefined"] },
      default: "undefined",
      description: "Agrega un ícono dentro del textarea, al inicio. Usa un identificador válido de `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "appendInnerIcon",
      type: { base: "InputSignal", options: ["string", "undefined"] },
      default: "undefined",
      description: "Agrega un ícono dentro del textarea, al final. Usa un identificador válido de `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "resize",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Permite que el usuario cambie manualmente el tamaño del textarea.",
    },
    {
      prop: "clearable",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Muestra un botón para limpiar el contenido.",
    },
    {
      prop: "block",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Hace que el componente ocupe el ancho completo del contenedor.",
    },
  ];


  get codeTemplate() {
    const raw = {
      tag: 'ep-textarea',
      attrs: {
        "[(ngModel)]": "value",
        id: this.id,
        label: this.label,
        placeholder: this.placeholder,
        variant: this.variant,
        color: this.color,
        size: this.size,
        rounded: this.rounded,
        "[rows]": this.rows,
        "[min]": this.min,
        "[max]": this.max,
        "[readonly]": this.readonly,
        "[disabled]": this.disabled,
        "[hasErrorMessage]": this.hasErrorMessage,
        "[hasErrorIcon]": this.hasErrorIcon,
        "prependIcon": this.prependIcon ? "star" : undefined,
        "appendIcon": this.appendIcon ? "star" : undefined,
        "prependInnerIcon": this.prependInnerIcon ? "star" : undefined,
        "appendInnerIcon": this.appendInnerIcon ? "star" : undefined,
        "[resize]": this.resize,
        "[clearable]": this.clearable,
        "[block]": this.block,
      },
    };

    return EpDedent(EpBuildNode(raw));
  }
  get codeScript() {
    const body = [
      EpBuildProp("value", "''", "string")
    ];

    return EpDedent(EpBuildDocScriptBase({
      imports: [{ from: '@ep/components', imports: ['EpTextareaComponent'] }],
      component: 'ExampleComponent',
      body,
    }));
  }

  @HostBinding('class')
  get hostClass() {
    return 'contents';
  }
}