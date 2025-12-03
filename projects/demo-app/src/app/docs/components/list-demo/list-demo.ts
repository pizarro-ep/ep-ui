import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Colors1, Colors3, EpDedent, Roundeds, Sizes1, Variants1, EpBuildNode, EpBuildProp, EpBuildFunction, EpBuildDocScriptBase, EpBuildArrayObjects, EpBuildInterface, TYPE_GLOBAL_VARIANTS_1, TYPE_GLOBAL_COLORS_1, TYPE_GLOBAL_COLORS_3, TYPE_GLOBAL_SIZES_1, TYPE_GLOBAL_ROUNDEDS } from '@ep/global';
import { EpActionsDirective, EpAppendDirective, EpContentDirective, EpDividerDirective, EpPrependDirective, EpTextDirective } from "@ep/directives";
import { EpCardComponent, EpCheckboxComponent, EpInputComponent, EpListComponent, EpListItem, EpListItemComponent, EpSelectComponent, EpSelectItem } from "@ep/components";
import { DOCUMENTATION } from 'src/app/global/const';
import { Partial } from "../../partial/partial";
import { AppCode } from "../../partial/code";
import { toSelectItems } from 'src/app/global/utils';

@Component({
  selector: 'app-list-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, EpCardComponent, EpContentDirective, EpActionsDirective, EpInputComponent, EpSelectComponent, Partial, EpCheckboxComponent, EpDividerDirective, AppCode, EpListComponent, EpListItemComponent, EpPrependDirective, EpAppendDirective, EpTextDirective],
  templateUrl: './list-demo.html',
  styleUrl: './list-demo.css'
})
export class ListDemo {
  public variant?: Variants1;
  public color?: Colors1 | Colors3;
  public selectedColor?: Colors1 | Colors3;
  public size?: Sizes1;
  public rounded?: Roundeds;
  public space?: Sizes1;
  public hoverable?: boolean;
  public onItemClickParent?: boolean;
  public withItems?: boolean;

  public value?: string;
  public label?: string;
  public subLabel?: string;
  public route?: string;
  public prependIcon?: boolean;
  public appendIcon?: boolean;
  public expandable?: boolean;
  public expanded?: boolean;
  public expandedIcon?: boolean;
  public divider?: boolean;
  public selected?: boolean;
  public disabled?: boolean;
  public slotPrepend?: boolean;
  public slotAppend?: boolean;
  public onItemClickChild?: boolean;
  public slotChildLists?: boolean;

  public mapVariants: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_VARIANTS_1, "uppercase");
  public mapColors: EpSelectItem[] = toSelectItems([...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3], "uppercase");
  public mapSizes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_SIZES_1, "uppercase");
  public mapRoundeds: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_ROUNDEDS, "uppercase");
  public mapSpaces: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_SIZES_1, "uppercase");

  public documentation = {
    ...DOCUMENTATION.components.list,
    usage: DOCUMENTATION.usage.replace("$s", "<ep-list>"),
    props: DOCUMENTATION.props.replace("$s", "<ep-list> y <ep-list-item>"),
  }

  public data = [
    {
      prop: "EpListComponent",
      type: "🡳",
      description: "Referencia al componente EpListComponent.",
    },
    {
      prop: "variant",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_VARIANTS_1, "undefined"] },
      default: "text",
      description: "Define la variante visual del componente, controlando el estilo y relieve del List.",
    },
    {
      prop: "color",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3, "undefined"] },
      default: "secondary",
      description: "Establece el color principal del List o ListItem según la paleta del tema actual.",
    },
    {
      prop: "selectedColor",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3, "undefined"] },
      default: "undefined",
      description: "Color aplicado al ListItem cuando se encuentra seleccionado.",
    },
    {
      prop: "size",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_SIZES_1, "undefined"] },
      default: "md",
      description: "Controla el tamaño general del List o ListItem, ajustando paddings y tipografía.",
    },
    {
      prop: "rounded",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_ROUNDEDS, "undefined"] },
      default: "undefined",
      description: "Controla el radio de los bordes del componente para ajustar su curvatura visual.",
    },
    {
      prop: "space",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_SIZES_1, "undefined"] },
      default: "undefined",
      description: "Define el espaciado entre los elementos hijos del List.",
    },
    {
      prop: "hoverable",
      type: { base: 'InputSignal', options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Habilita el efecto hover para resaltar los elementos de la lista al pasar el cursor.",
    },
    {
      prop: "ep-list-item",
      type: "EpListItemComponent",
      description: "Proyección de contenido con `<ep-list-item>` dentro de un `<ep-list>` para definir los elementos de la lista.",
    },
    {
      prop: "items",
      type: "EpListItem[]",
      default: [],
      description: "Lista de elementos que se renderizan dinámicamente dentro del componente. Solo se utiliza cuando no se proyecta contenido manual mediante <ep-list-item>.",
    },
    {
      prop: "onItemClick",
      type: { base: 'EventEmitter', options: "EpListItem" },
      description: "Evento emitido al hacer clic sobre un ListItem. Retorna la instancia de EpListItem.",
    },
    {
      prop: "EpListItemComponent",
      type: "🡳",
      description: "Referencia interna al componente EpListItemComponent.",
    },
    {
      prop: "label !",
      type: "string",
      description: "Texto principal del ListItem. Es un campo obligatorio.",
    },
    {
      prop: "subLabel",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Texto secundario opcional mostrado debajo del label principal.",
    },
    {
      prop: "value",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Valor interno asociado al ListItem, útil para selección o identificación.",
    },
    {
      prop: "route",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Ruta de navegación asociada al ListItem. Si se define, el ítem actúa como enlace.",
    },
    {
      prop: "prependIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono antes del contenido del ListItem. El valor debe corresponder a un identificador de ep-icon.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "appendIcon",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Agrega un ícono después del contenido del ListItem. El valor debe corresponder a un identificador de ep-icon.",
      link: { type: "self", url: "/docs/components/icon", text: "EpIconComponent" },
    },
    {
      prop: "expandable",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Permite que el ListItem sea expandible si contiene elementos hijos.",
    },
    {
      prop: "expanded",
      type: { base: 'ModelSignal', options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Indica si el ListItem se encuentra expandido, mostrando su contenido secundario.",
    },
    {
      prop: "expandedIcon",
      type: ["boolean", "undefined"],
      default: true,
      description: "Controla la visualización del ícono indicador de expansión.",
    },
    {
      prop: "divider",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Muestra una línea divisoria antes del List hijo para mejorar la separación visual.",
    },
    {
      prop: "selected",
      type: { base: 'InputSignal', options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Marca el ListItem como seleccionado visualmente.",
    },
    {
      prop: "disabled",
      type: { base: 'InputSignal', options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Desactiva la interacción del ListItem.",
    },
    {
      prop: "epPrepend",
      type: "EpPrependDirective?",
      description: "Proyeccion de contenido con `<ng-template epPrepend>`.",
      link: { type: "self", url: "/docs/directives/prepend", text: "EpPrependDirective", },
    },
    {
      prop: "epAppend",
      type: "EpAppendDirective?",
      description: "Proyeccion de contenido con `<ng-template epAppend>`.",
      link: { type: "self", url: "/docs/directives/append", text: "EpAppendDirective", },
    },
    {
      prop: "ep-list",
      type: "EpListComponent?",
      description: "Proyección de contenido con `<ep-list>` dentro de un `<ep-list-item>` para crear sublistas jerárquicas.",
    },
    {
      prop: "onItemClick",
      type: { base: 'EventEmitter', options: "EpListItem" },
      description: "Evento emitido al hacer clic sobre un ListItem. Retorna la instancia de EpListItem.",
    },
  ];

  get getCodeTemplate() {
    const raw = {
      tag: "ep-list",
      attrs: {
        variant: this.variant,
        color: this.color,
        selectColor: this.selectedColor,
        size: this.size,
        rounded: this.rounded,
        space: this.space,
        "[hoverable]": this.hoverable,
        "[items]": this.withItems ? 'items' : null,
        "(onItemClick)": this.withItems && this.onItemClickParent ? 'itemClickEvent($event)' : null,
      },
      children: this.withItems ? [] : [
        {
          tag: "ep-list-item",
          attrs: {
            label: this.label ?? 'List 1',
            subLabel: this.subLabel,
            value: this.value,
            route: this.route,
            "[expandable]": this.expandable,
            "[(expanded)]": this.expanded === undefined ? '' : "expanded",
            "[expandedIcon]": this.expandedIcon,
            "[divider]": this.divider,
            "[selected]": this.selected,
            "[disabled]": this.disabled,
            "[prependIcon]": this.prependIcon ? "star" : null,
            "[appendIcon]": this.appendIcon ? "star" : null,
            "(onItemClick)": !this.withItems && this.onItemClickChild ? "itemClickEvent($event)" : null,
          },
          children: [
            this.slotPrepend
              ? {
                tag: "ng-template",
                attrs: { epPrepend: "$_" },
                children: ["PREPEND"]
              } : '',
            this.slotAppend
              ? {
                tag: "ng-template",
                attrs: { epAppend: "$_" },
                children: ["APPEND"]
              } : '',
            this.slotChildLists
              ? {
                tag: "ep-list",
                attrs: {},
                children: [1, 2].map((v) => {
                  return {
                    tag: "ep-list-item",
                    attrs: { label: `Child List 1.${v}` },
                    selfClose: true,
                  }
                })
              } : '',
          ].filter(Boolean)
        },
        {
          tag: "ep-list-item",
          attrs: {
            label: "List 2",
            "[divider]": true,
            "[expandable]": true,
          },
          children: [{
            tag: "ep-list",
            attrs: {},
            children:
              [1, 2].map((v) => {
                return {
                  tag: "ep-list-item",
                  attrs: {
                    label: `Sub List 2.${v}`,
                    subLabel: `Lorem ipsum dolor sit amet.`,
                    prependIcon: "shield_person",
                    appendIcon: "star",
                  },
                  selfClose: true,
                }
              })
          }],
        }
      ]
    };

    return EpDedent(EpBuildNode(raw));
  }

  get getCodeScript() {
    const imports = [
      {
        from: '@ep/components',
        imports: ['EpListComponent', 'EpListItemComponent', 'EpListItem']
      },
      {
        from: '@ep/directives',
        imports: [
          this.slotPrepend ? 'EpPrependDirective' : '',
          this.slotAppend ? 'EpAppendDirective' : '',
        ].filter(Boolean)
      },
    ]
    const body = [
      EpBuildProp("expanded", "true", "boolean"),
      EpBuildArrayObjects('items', this.items, 'EpListItem'), EpBuildFunction("itemClickEvent", ["item: EpListItem"], ["console.log(item.label);"])
    ];

    return EpDedent(EpBuildDocScriptBase({
      imports,
      component: "ExampleComponent",
      body,
    }));
  }

  get items(): EpListItem[] {
    return [
      {
        label: this.label ?? "List 1",
        subLabel: this.subLabel,
        value: this.value,
        route: this.route,
        prependIcon: this.prependIcon ? 'star' : undefined,
        appendIcon: this.appendIcon ? 'star' : undefined,
        expandable: this.expandable,
        expanded: this.expanded,
        expandedIcon: this.expandedIcon,
        divider: this.divider,
        selected: this.selected,
        disabled: this.disabled,
        children: this.slotChildLists ? [
          { label: "Child List 1.1" },
          { label: "Child List 1.2" },
        ] : undefined
      },
      {
        label: "List 2",
        expandable: true,
        divider: true,
        children: [
          {
            label: "Sub List 2.1",
            subLabel: "Lorem ipsum dolor sit amet.",
            prependIcon: "shield_person",
            appendIcon: "star",
          },
          {
            label: "Sub List 2.2",
            subLabel: "Lorem ipsum dolor sit amet.",
            prependIcon: "shield_person",
            appendIcon: "star",
          }
        ],
      }
    ];
  }

  get interfaces() {
    return EpBuildInterface("EpListItem", [
      { name: "label", type: "string" },
      { name: "subLabel", type: "string", optional: true },
      { name: "value", type: "string", optional: true },
      { name: "route", type: "string", optional: true },
      { name: "expandable", type: "boolean", optional: true },
      { name: "expanded", type: "boolean", optional: true },
      { name: "expandedIcon", type: "boolean", optional: true },
      { name: "divider", type: "boolean", optional: true },
      { name: "selected", type: "boolean", optional: true },
      { name: "disabled", type: "boolean", optional: true },
      { name: "prependIcon", type: "string", optional: true },
      { name: "appendIcon", type: "string", optional: true },
      { name: "children", type: "EpListItem[]", optional: true },
    ]);
  }

  itemClickEventParent(item: EpListItem) {
    if (this.onItemClickParent) console.log(item.label);
  }
  itemClickEventChild(item: EpListItem) {
    if (this.onItemClickChild) console.log(item.label);
  }

  @HostBinding('class') get hostClass() { return "contents"; }
}
