import { Component, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Colors1, Sizes1, EpDedent, TYPE_GLOBAL_COLORS_1, TYPE_GLOBAL_COLORS_3, TYPE_GLOBAL_SIZES_1, TYPE_GLOBAL_ROUNDEDS, Colors3, EpBuildDocScriptBase, EpBuildNode, EpBuildInterface, EpBuildProp, Variants8, TYPE_GLOBAL_VARIANTS_8 } from '@ep/global';
import { EpActionsDirective, EpContentDirective, EpDividerDirective } from "@ep/directives";
import { EpCardComponent, EpCheckboxComponent, EpInputComponent, EpSelectComponent, EpSelectItem, EpSwitchComponent } from "@ep/components";
import { DOCUMENTATION } from 'src/app/global/const';
import { toSelectItems } from 'src/app/global/utils';
import { Partial } from "../../partial/partial";
import { AppCode } from "../../partial/code";

@Component({
  selector: 'app-switch-demo',
  imports: [FormsModule, EpCardComponent, EpCheckboxComponent, EpSelectComponent, EpInputComponent, EpContentDirective, EpActionsDirective, Partial, AppCode, EpDividerDirective, EpSwitchComponent],
  templateUrl: './switch-demo.html',
  styleUrl: './switch-demo.css'
})
export class SwitchDemo {
  public id?: string;
  public variant?: Variants8;
  public color?: Colors1 | Colors3;
  public size?: Sizes1;
  public readonly?: boolean;
  public disabled?: boolean;
  public indeterminate?: boolean;

  public mapVariants: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_VARIANTS_8, 'uppercase');
  public mapColors: EpSelectItem[] = toSelectItems([...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3], 'uppercase');
  public mapSizes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_SIZES_1, 'uppercase');

  public documentation = {
    ...DOCUMENTATION.components.switch,
    usage: DOCUMENTATION.usage.replace("$s", "<ep-switch>"),
    props: DOCUMENTATION.props.replace("$s", "<ep-switch>"),
  }

  public data = [
    {
      prop: "id",
      type: "string",
      default: "ep-switch-{{Math.random()}}",
      description: "Identificador único del componente. Si no se define, se genera automáticamente.",
    },
    {
      prop: "variant",
      type: { base: "InputSignal", options: TYPE_GLOBAL_VARIANTS_8 },
      default: "default",
      description: "Define el estilo visual del switch. Cambia la forma en que se renderiza el pulgar y el contenedor.",
    },
    {
      prop: "color",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3] },
      default: "primary",
      description: "Color principal del switch, aplicado tanto al contenedor como al pulgar según el estado (on/off).",
    },
    {
      prop: "size",
      type: { base: "InputSignal", options: TYPE_GLOBAL_SIZES_1 },
      default: "md",
      description: "Controla el tamaño general del switch: alto, ancho, tamaño del pulgar y distancia de desplazamiento.",
    },
    {
      prop: "readonly",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Hace que el switch sea de solo lectura. Mantiene el estilo interactivo pero no permite cambiar su estado.",
    },
    {
      prop: "disabled",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Desactiva por completo el switch, bloqueando la interacción y aplicando el estilo visual de deshabilitado.",
    },
    {
      prop: "indeterminate",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Activa un estado visual intermedio, útil cuando el valor del switch no puede determinarse como on u off.",
    },
  ];


  get codeTemplate() {
    const select = {
      tag: 'ep-switch',
      attrs: {
        "[(ngModel)]": "value",
        id: this.id,
        variant: this.variant,
        color: this.color,
        size: this.size,
        '[readonly]': this.readonly,
        '[disabled]': this.disabled,
        '[indeterminate]': this.indeterminate,
      },
    };

    return EpDedent(EpBuildNode(select));
  }
  get codeScript() {
    const body = [
      EpBuildProp('value', "false", "boolean"),
    ];

    return EpDedent(EpBuildDocScriptBase({
      imports: [
        { from: '@ep/components', imports: ['EpSwitchComponent'] },
      ],
      component: 'ExampleComponent',
      body,
    }));
  }

  @HostBinding('class')
  get hostClass() { return 'contents'; }
}