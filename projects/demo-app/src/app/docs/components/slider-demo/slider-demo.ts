import { Component, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Colors1, Sizes1, EpDedent, TYPE_GLOBAL_COLORS_1, TYPE_GLOBAL_COLORS_3, TYPE_GLOBAL_SIZES_1, TYPE_GLOBAL_ROUNDEDS, Colors3, EpBuildDocScriptBase, EpBuildNode, EpBuildInterface, EpBuildProp } from '@ep/global';
import { EpActionsDirective, EpContentDirective, EpDividerDirective } from "@ep/directives";
import { EpCardComponent, EpCheckboxComponent, EpInputComponent, EpSelectComponent, EpSelectItem, EpSliderComponent } from "@ep/components";
import { DOCUMENTATION } from 'src/app/global/const';
import { toSelectItems } from 'src/app/global/utils';
import { Partial } from "../../partial/partial";
import { AppCode } from "../../partial/code";

@Component({
  selector: 'app-slider-demo',
  imports: [FormsModule, EpCardComponent, EpCheckboxComponent, EpSelectComponent, EpInputComponent, EpContentDirective, EpActionsDirective, Partial, AppCode, EpDividerDirective, EpSliderComponent],
  templateUrl: './slider-demo.html',
  styleUrl: './slider-demo.css'
})
export class SliderDemo {
  public id?: string;
  public label?: string;
  public topLabel?: string;
  public color?: Colors1 | Colors3;
  public trackColor?: Colors1 | Colors3;
  public thumbColor?: Colors1 | Colors3;
  public size?: Sizes1;
  public min?: number;
  public max?: number;
  public step?: number;
  public hasMinMaxLabel?: boolean;
  public tooltip?: boolean;
  public readonly?: boolean;
  public disabled?: boolean;
  public appendIcon?: string;
  public prependIcon?: string;
  public block?: boolean;

  public mapColors: EpSelectItem[] = toSelectItems([...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3], 'uppercase');
  public mapSizes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_SIZES_1, 'uppercase');
  public mapRoundeds: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_ROUNDEDS, 'uppercase');

  public documentation = {
    ...DOCUMENTATION.components.slider,
    usage: DOCUMENTATION.usage.replace("$s", "<ep-slider>"),
    props: DOCUMENTATION.props.replace("$s", "<ep-slider>"),
  }

  public data = [
    {
      prop: "id",
      type: "string",
      default: "ep-slider-{{Math.random()}}",
      description: "Identificador único del componente. Se genera automáticamente si no se especifica.",
    },
    {
      prop: "label",
      type: { base: "InputSignal", options: ["string", "undefined"] },
      default: "undefined",
      description: "Etiqueta que se muestra al lado izquierdo del control deslizante.",
    },
    {
      prop: "topLabel",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Etiqueta que se muestra encima del control deslizante.",
    },
    {
      prop: "color",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3] },
      default: "secondary",
      description: "Color principal del slider, aplicado al riel inactivo, riel activo activo y al pulgar (thumb) por defecto.",
    },
    {
      prop: "trackColor",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3, 'undefined'] },
      default: "undefined",
      description: "Color del riel inactivo (barra de fondo). Si no se define, usará el color principal.",
    },
    {
      prop: "thumbColor",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3, 'undefined'] },
      default: "undefined",
      description: "Color del pulgar (thumb) del slider. Si no se define, tomará el color principal.",
    },
    {
      prop: "size",
      type: { base: "InputSignal", options: TYPE_GLOBAL_SIZES_1 },
      default: "md",
      description: "Controla el tamaño general del slider, incluyendo la altura, el tamaño del pulgar y el espaciado interno.",
    },
    {
      prop: "step",
      type: { base: "InputSignal", options: "number" },
      default: 1,
      description: "Define el incremento entre valores consecutivos. Solo admite valores mayores o iguales a 0.01.",
    },
    {
      prop: "min",
      type: { base: "InputSignal", options: "number" },
      default: 0,
      description: "Valor mínimo permitido en el control deslizante.",
    },
    {
      prop: "max",
      type: { base: "InputSignal", options: "number" },
      default: 100,
      description: "Valor máximo permitido. Si es menor o igual a `min`, se ajustará automáticamente a `min + step`.",
    },
    {
      prop: "readonly",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Hace que el slider sea de solo lectura, manteniendo la apariencia activa pero sin permitir cambios de valor.",
    },
    {
      prop: "disabled",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Desactiva completamente el slider, impidiendo la interacción y aplicando estilos visuales de deshabilitado.",
    },
    {
      prop: "block",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Hace que el slider ocupe todo el ancho disponible (modo bloque).",
    },
    {
      prop: "prependIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono antes del control deslizante. Debe ser un identificador válido de `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "appendIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono después del control deslizante. Debe ser un identificador válido de `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
  ];

  get codeTemplate() {
    const select = {
      tag: 'ep-slider',
      attrs: {
        "[(ngModel)]": "value",
        id: this.id,
        label: this.label,
        topLabel: this.topLabel,
        color: this.color,
        trackColor: this.trackColor,
        thumbColor: this.thumbColor,
        size: this.size,
        "[step]": this.step,
        "[min]": this.min,
        "[max]": this.max,
        "[hasMinMaxLabel]": this.hasMinMaxLabel,
        "[tooltip]": this.tooltip,
        '[readonly]': this.readonly,
        '[disabled]': this.disabled,
        prependIcon: this.prependIcon ? 'star' : null,
        appendIcon: this.appendIcon ? 'star' : null,
        '[block]': this.block,
      },
    };

    return EpDedent(EpBuildNode(select));
  }
  get codeScript() {
    const body = [
      EpBuildProp('value', "0"),
    ];

    return EpDedent(EpBuildDocScriptBase({
      imports: [
        { from: '@ep/components', imports: ['EpSliderComponent'] },
      ],
      component: 'ExampleComponent',
      body,
    }));
  }

  get interfaces() {
    const interfaceCode = EpBuildInterface('EpSelectItem', [
      { name: 'label', type: 'string', },
      { name: 'subLabel', type: 'string', optional: true, },
      { name: 'value', type: 'string', optional: true, },
      { name: 'prependIcon', type: 'string', optional: true, },
      { name: 'appendIcon', type: 'string', optional: true, },
    ]);

    return EpDedent(interfaceCode);
  }

  @HostBinding('class')
  get hostClass() {
    return 'contents';
  }
}