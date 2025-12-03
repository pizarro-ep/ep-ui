import { Component, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Colors1, Sizes1, Roundeds, EpDedent, TYPE_GLOBAL_COLORS_1, TYPE_GLOBAL_COLORS_3, TYPE_GLOBAL_SIZES_1, TYPE_GLOBAL_ROUNDEDS, Variants2, Colors3, TYPE_GLOBAL_VARIANTS_2, EpBuildFunction, EpBuildDocScriptBase, EpBuildNode, EpBuildInterface, EpBuildProp, EpBuildArrayObjects } from '@ep/global';
import { EpActionsDirective, EpContentDirective, EpDividerDirective, EpPrependDirective, EpAppendDirective, EpTextDirective } from "@ep/directives";
import { EpCardComponent, EpCheckboxComponent, EpInputComponent, EpSelectComponent, EpSelectItemComponent, EpSelectItem } from "@ep/components";
import { DOCUMENTATION } from 'src/app/global/const';
import { Partial } from "../../partial/partial";
import { AppCode } from "../../partial/code";
import { toSelectItems } from 'src/app/global/utils';

@Component({
  selector: 'app-select-demo',
  imports: [FormsModule, EpCardComponent, EpCheckboxComponent, EpSelectComponent, EpInputComponent, EpContentDirective, EpActionsDirective, Partial, AppCode, EpDividerDirective, EpSelectItemComponent, EpPrependDirective, EpAppendDirective, EpTextDirective],
  templateUrl: './select-demo.html',
  styleUrl: './select-demo.css'
})
export class SelectDemo {
  public label?: string;
  public placeholder?: string;
  public variant?: Variants2;
  public color?: Colors1 | Colors3;
  public size?: Sizes1;
  public rounded?: Roundeds;
  public readonly?: boolean;
  public disabled?: boolean;
  public prependIcon?: string;
  public appendIcon?: string;
  public prependInnerIcon?: boolean;
  public appendInnerIcon?: boolean;
  public hasErrorIcon?: boolean;
  public hasErrorMessage?: boolean;
  public block?: boolean;
  public slotSelectItem: boolean = true;
  public withItems: boolean = false;
  public onChangeValue?: boolean;

  public itemLabel: string = 'Ítem 1';
  public itemSubLabel?: string;
  public itemValue?: string;
  public itemPrependIcon?: boolean;
  public itemAppendIcon?: boolean;
  public itemSlotPrepend?: boolean;
  public itemSlotAppend?: boolean;
  public itemEventOnItemClick?: boolean;

  public mapVariants: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_VARIANTS_2, 'uppercase');
  public mapColors: EpSelectItem[] = toSelectItems([...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3], 'uppercase');
  public mapSizes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_SIZES_1, 'uppercase');
  public mapRoundeds: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_ROUNDEDS, 'uppercase');

  public documentation = {
    ...DOCUMENTATION.components.select,
    usage: DOCUMENTATION.usage.replace("$s", "<ep-select>"),
    props: DOCUMENTATION.props.replace("$s", "<ep-select>"),
  }

  public data = [
    /* ──────────────────────────────── */
    /* 🧩 EpSelectComponent             */
    /* ──────────────────────────────── */
    {
      prop: "EpSelectComponent",
      type: "🡳",
      description: "Referencia al componente EpSelectComponent.",
    },
    {
      prop: "label",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Etiqueta visible sobre el campo del select. Si se omite, se utiliza el placeholder.",
    },
    {
      prop: "placeholder",
      type: "string",
      default: " ",
      description: "Texto mostrado dentro del campo cuando no hay valor seleccionado. Solo se aplica si `label` está vacío.",
    },
    {
      prop: "variant",
      type: { base: "InputSignal", options: TYPE_GLOBAL_VARIANTS_2 },
      default: "filled",
      description: "Variante visual del input del select.",
    },
    {
      prop: "color",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3] },
      default: "secondary",
      description: "Define el esquema de color aplicado al select, de acuerdo al tema global de la aplicación.",
    },
    {
      prop: "size",
      type: { base: "InputSignal", options: TYPE_GLOBAL_SIZES_1 },
      default: "md",
      description: "Controla el tamaño del campo del select, incluyendo su altura, espaciado interno y tamaño de texto.",
    },
    {
      prop: "rounded",
      type: { base: "InputSignal", options: TYPE_GLOBAL_ROUNDEDS },
      default: "md",
      description: "Controla el nivel de redondeo de los bordes del select.",
    },
    {
      prop: "readonly",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Inhabilita la edición del select, pero mantiene su apariencia interactiva.",
    },
    {
      prop: "disabled",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Desactiva completamente el select, impidiendo la interacción y aplicando estilos de deshabilitado.",
    },
    {
      prop: "prependIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono antes del contenido del select. El valor debe ser un identificador válido de `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "appendIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono después del contenido del select. El valor debe ser un identificador válido de `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "prependInnerIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono dentro del campo, al inicio del input del select. El valor debe ser un identificador válido de `ep-icon`",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "appendInnerIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono dentro del campo, al final del input del select. El valor debe ser un identificador válido de `ep-icon`",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "hasErrorIcon",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Muestra un ícono de error dentro del campo cuando existe un error de validación.",
    },
    {
      prop: "hasErrorMessage",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Muestra un mensaje de error debajo del select cuando ocurre una validación fallida.",
    },
    {
      prop: "block",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Hace que el select ocupe el 100% del ancho disponible (modo bloque).",
    },
    {
      prop: "ep-select-item",
      type: "EpSelectItemComponent",
      description: "Proyección de contenido mediante `<ep-select-item>` dentro de `<ep-select>` para definir opciones personalizadas.",
    },
    {
      prop: "items",
      type: "EpSelectItem[]",
      default: "undefined",
      description: "Lista de opciones renderizadas dinámicamente dentro del componente. Solo se usa cuando no se proyectan elementos `<ep-select-item>` manualmente.",
    },
    {
      prop: "onChangeValue",
      type: { base: "EventEmitter", options: "EpSelectItem" },
      description: "Evento emitido cuando cambia el valor seleccionado. Devuelve la instancia del `EpSelectItem` correspondiente.",
    },

    /* ──────────────────────────────── */
    /* 🧩 EpSelectItemComponent         */
    /* ──────────────────────────────── */
    {
      prop: "EpSelectItemComponent",
      type: "🡳",
      description: "Referencia al componente EpSelectItemComponent.",
    },
    {
      prop: "label",
      type: "string",
      description: "Etiqueta visible del ítem del select. Campo obligatorio para identificar la opción.",
    },
    {
      prop: "value",
      type: { base: "InputSignal", options: ["string", "undefined"] },
      default: "undefined",
      description: "Valor interno del ítem. Si no se define, se utiliza el valor del `label`.",
    },
    {
      prop: "subLabel",
      type: "string",
      default: "undefined",
      description: "Texto auxiliar mostrado debajo del `label` principal (opcional).",
    },
    {
      prop: "prependIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono antes del contenido del ítem. El valor debe ser un identificador válido de `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "appendIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono después del contenido del ítem. El valor debe ser un identificador válido de `ep-icon`.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "epPrepend",
      type: "EpPrependDirective?",
      description: "Proyección de contenido mediante `<ng-template epPrepend>` dentro de un `<ep-select-item>`.",
      link: { type: "self", url: "/docs/directives/prepend", text: "EpPrependDirective" },
    },
    {
      prop: "epAppend",
      type: "EpAppendDirective?",
      description: "Proyección de contenido mediante `<ng-template epAppend>` dentro de un `<ep-select-item>`.",
      link: { type: "self", url: "/docs/directives/append", text: "EpAppendDirective" },
    },
  ];


  get codeTemplate() {
    const select = {
      tag: 'ep-select',
      attrs: {
        "[(ngModel)]": "value",
        label: this.label,
        placeholder: this.placeholder,
        variant: this.variant,
        color: this.color,
        size: this.size,
        rounded: this.rounded,
        '[readonly]': this.readonly,
        '[disabled]': this.disabled,
        prependIcon: this.prependIcon ? 'star' : null,
        appendIcon: this.appendIcon ? 'star' : null,
        prependInnerIcon: this.prependInnerIcon ? 'star' : null,
        appendInnerIcon: this.appendInnerIcon ? 'star' : null,
        '[block]': this.block,
        '[items]': this.withItems ? 'items' : null,
        '(onChangeValue)': this.onChangeValue ? 'eventChangeValue($event)' : null,
      },
      children: this.slotSelectItem
        ? [
          {
            tag: 'ep-select-item',
            attrs: {
              label: this.itemLabel,
              subLabel: this.itemSubLabel,
              value: this.itemValue,
              prependIcon: this.itemPrependIcon ? 'star' : null,
              appendIcon: this.itemAppendIcon ? 'star' : null,
            },
            children: [
              this.itemSlotPrepend
                ? {
                  tag: 'ng-template',
                  attrs: { epPrepend: "$_" },
                  children: ['<span>PREPEND</span>'],
                }
                : '',
              this.itemSlotAppend
                ? {
                  tag: 'ng-template',
                  attrs: { epAppend: "$_" },
                  children: ['<span>APPEND</span>'],
                }
                : '',
            ].filter(Boolean),
          },
          { tag: 'ep-select-item', attrs: { label: 'Ítem 2', value: 'Ítem 2' }, selfClose: true },
        ]
        : [],
    };

    return EpDedent(EpBuildNode(select));
  }
  get codeScript() {
    const imports = [
      {
        from: '@ep/components',
        imports: [
          'EpSelectComponent',
          this.withItems || this.onChangeValue ? 'EpSelectItem' : '',
          this.slotSelectItem ? 'EpSelectItemComponent' : '',
        ].filter(Boolean)
      },
      {
        from: '@ep/directives',
        imports: [
          this.slotSelectItem && this.itemSlotPrepend ? 'EpPrependDirective' : '',
          this.slotSelectItem && this.itemSlotAppend ? 'EpAppenDirective' : '',
        ].filter(Boolean)
      },
    ]
    const itemsArray = [
      {
        label: this.itemLabel,
        subLabel: this.itemSubLabel,
        value: this.itemValue,
        prependIcon: this.itemPrependIcon ? 'star' : null,
        appendIcon: this.itemAppendIcon ? 'star' : null,
      },
      { label: "Ítem 2", value: "Ítem 2" },
    ];

    const body = [
      EpBuildProp('value', "''", 'string'),
      this.withItems ? EpBuildArrayObjects('items', itemsArray, "EpSelectItem") : '',
      this.onChangeValue
        ? EpBuildFunction('eventChangeValue', ['item: EpSelectItem'], ['console.log(item);']) : '',
    ].filter(Boolean);

    return EpDedent(EpBuildDocScriptBase({
      imports,
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
  get hostClass() { return 'contents'; }
}