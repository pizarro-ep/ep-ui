import { Component, HostBinding } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Colors1, Colors3, EpBuildDocScriptBase, EpBuildNode, EpBuildProp, EpDedent, Roundeds, Sizes1, TYPE_GLOBAL_COLORS_1, TYPE_GLOBAL_COLORS_3, TYPE_GLOBAL_ROUNDEDS, TYPE_GLOBAL_SIZES_1, TYPE_GLOBAL_TYPES_1, TYPE_GLOBAL_VARIANTS_2, Types1, Variants2 } from '@ep/global';
import { EpActionsDirective, EpContentDirective, EpDividerDirective } from "@ep/directives";
import { EpCardComponent, EpCheckboxComponent, EpInputComponent, EpSelectComponent, EpSelectItem } from "@ep/components";
import { DOCUMENTATION, MAP_FORM_TYPES } from 'src/app/global/const';
import { Partial } from "../../partial/partial";
import { AppCode } from "../../partial/code";
import { CommonModule } from '@angular/common';
import { toSelectItems } from 'src/app/global/utils';

@Component({
  selector: 'app-input-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, EpCardComponent, EpContentDirective, EpActionsDirective, EpInputComponent, EpSelectComponent, Partial, EpCheckboxComponent, EpDividerDirective, AppCode],
  templateUrl: './input-demo.html',
  styleUrl: './input-demo.css'
})
export class InputDemo {
  public value?: string;
  public typeForm?: string;
  public id?: string;
  public label?: string;
  public placeholder?: string;
  public type?: Types1;
  public variant?: Variants2;
  public color?: Colors1 | Colors3;
  public size?: Sizes1;
  public rounded?: Roundeds;
  public step?: number;
  public min?: number;
  public max?: number;
  public disabled?: boolean;
  public readonly?: boolean;
  public hasErrorMessage?: boolean;
  public hasErrorIcon?: boolean;
  public clearable?: boolean;
  public block?: boolean;
  public prependIcon?: boolean;
  public appendIcon?: boolean;
  public prependInnerIcon?: boolean;
  public appendInnerIcon?: boolean;

  public mapFormTypes: EpSelectItem[] = MAP_FORM_TYPES;
  public mapTypes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_TYPES_1, "uppercase");
  public mapVariants: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_VARIANTS_2, "uppercase");
  public mapColors: EpSelectItem[] = toSelectItems([...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3], "uppercase");
  public mapSizes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_SIZES_1, "uppercase");
  public mapRoundeds: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_ROUNDEDS, "uppercase");

  public documentation = {
    ...DOCUMENTATION.components.input,
    usage: DOCUMENTATION.usage.replace("$s", "<ep-input>"),
    props: DOCUMENTATION.props.replace("$s", "<ep-input>"),
  }

  public data = [
    {
      prop: "id",
      type: "string",
      default: "ep-input-{{Math.random()}}",
      description: "Identificador único del input, útil para pruebas, etiquetas asociadas y accesibilidad (atributo `for`).",
    },
    {
      prop: "label",
      type: { base: "InputSignal", options: ["string", "undefined"] },
      default: "undefined",
      description: "Etiqueta descriptiva mostrada encima o dentro del campo. Si no se especifica, se mostrará el `placeholder`.",
    },
    {
      prop: "placeholder",
      type: { base: "InputSignal", options: "string" },
      default: " ",
      description: "Texto de ayuda que se muestra cuando el campo está vacío. Solo visible si no hay `label`.",
    },
    {
      prop: "type",
      type: { base: "InputSignal", options: TYPE_GLOBAL_TYPES_1 },
      default: "text",
      description: "Tipo de entrada del campo según los valores admitidos por el elemento `<input>` estándar.",
    },
    {
      prop: "variant",
      type: { base: "InputSignal", options: TYPE_GLOBAL_VARIANTS_2 },
      default: "filled",
      description: "Determina el estilo visual del input.",
    },
    {
      prop: "color",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3] },
      default: "secondary",
      description: "Define el color principal del input o sus iconos, según la paleta de colores del tema activo.",
    },
    {
      prop: "size",
      type: { base: "InputSignal", options: TYPE_GLOBAL_SIZES_1 },
      default: "md",
      description: "Ajusta el tamaño visual del input para adaptarlo al diseño general de la interfaz.",
    },
    {
      prop: "rounded",
      type: { base: "InputSignal", options: TYPE_GLOBAL_ROUNDEDS },
      default: "md",
      description: "Controla el radio de los bordes del input.",
    },
    {
      prop: "step",
      type: "number",
      default: 1,
      description: "Define el incremento o decremento permitido para valores numéricos (`type='number'`).",
    },
    {
      prop: "min",
      type: { base: "InputSignal", options: "number" },
      default: "undefined",
      description: "Valor mínimo permitido si el tipo es numérico; de lo contrario, representa la longitud mínima de caracteres.",
    },
    {
      prop: "max",
      type: { base: "InputSignal", options: "number" },
      default: "undefined",
      description: "Valor máximo permitido si el tipo es numérico; de lo contrario, representa la longitud máxima de caracteres.",
    },
    {
      prop: "readonly",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Permite visualizar el valor pero impide modificarlo.",
    },
    {
      prop: "disabled",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Desactiva la interacción con el input.",
    },
    {
      prop: "clearable",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Muestra un botón para limpiar el contenido del input de forma rápida.",
    },
    {
      prop: "block",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Hace que el input ocupe todo el ancho disponible del contenedor.",
    },
    {
      prop: "hasErrorMessage",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Indica si se debe mostrar el mensaje de error del formulario asociado.",
    },
    {
      prop: "hasErrorIcon",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Muestra un icono visual cuando el input presenta un error de validación.",
    },
    {
      prop: "prependIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono antes del contenido del input. Usa un identificador válido de `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent", },
    },
    {
      prop: "appendIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono después del contenido del input. Usa un identificador válido de `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent", },
    },
    {
      prop: "prependInnerIcon",
      type: { base: "InputSignal", options: ["string", "undefined"] },
      default: "undefined",
      description: "Agrega un ícono dentro del input, alineado a la izquierda. Usa un identificador válido de `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent", },
    },
    {
      prop: "appendInnerIcon",
      type: { base: "InputSignal", options: ["string", "undefined"] },
      default: "undefined",
      description: "Agrega un ícono dentro del input, alineado a la derecha. Usa un identificador válido de `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent", },
    },
  ];


  get codeTemplate() {
    const raw = {
      tag: 'ep-input',
      attrs: {
        "formControl": this.typeForm === 'formControl' ? 'valueControl' : null,
        "[(ngModel)]": this.typeForm !== 'formControl' ? 'valueModel' : null,
        id: this.id,
        label: this.label,
        placeholder: this.placeholder,
        type: this.type,
        variant: this.variant,
        color: this.color,
        size: this.size,
        rounded: this.rounded,
        "[step]": this.step,
        "[min]": this.min,
        "[max]": this.max,
        "[readonly]": this.readonly,
        "[disabled]": this.disabled,
        "[clearable]": this.clearable,
        "[block]": this.block,
        "[hasErrorMessage]": this.hasErrorMessage,
        "[hasErrorIcon]": this.hasErrorIcon,
        required: this.hasErrorIcon || this.hasErrorMessage ? "$_" : null,
        "prependIcon": this.prependIcon ? "star" : undefined,
        "appendIcon": this.appendIcon ? "star" : undefined,
        "prependInnerIcon": this.prependInnerIcon ? "star" : undefined,
        "appendInnerIcon": this.appendInnerIcon ? "star" : undefined,
      }
    }
    return EpDedent(EpBuildNode(raw));
  }
  get codeScript() {
    const imports = [
      {
        from: '@angular/forms',
        imports: [
          this.typeForm !== 'formControl' ? 'FormModule' : '',
          this.typeForm === 'formControl' ? 'ReactiveFormsModule' : '',
        ].filter(Boolean),
      },
      { from: '@ep/components', imports: ['EpInputComponent'] },
    ]

    const body = [
      this.typeForm !== 'formControl'
        ? EpBuildProp("valueModel?", "''", "string") : '',
      this.typeForm === 'formControl'
        ? EpBuildProp("valueControl?", "new FormControl('')", "FormControl") : '',
    ].filter(Boolean);

    return EpDedent(EpBuildDocScriptBase({
      imports,
      component: 'ExampleComponent',
      body,
    }));
  }

  @HostBinding('class') get hostClass() { return "contents"; }
}
