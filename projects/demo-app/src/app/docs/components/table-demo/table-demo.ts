import { Component, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Colors1, Sizes1, EpDedent, TYPE_GLOBAL_COLORS_1, TYPE_GLOBAL_COLORS_3, TYPE_GLOBAL_SIZES_1, TYPE_GLOBAL_ROUNDEDS, Colors3, EpBuildDocScriptBase, EpBuildNode, EpBuildInterface, Variants5, TYPE_GLOBAL_VARIANTS_5, TYPE_GLOBAL_FLEX_JUSTIFIES, EpBuildArrayObjects } from '@ep/global';
import { EpActionsDirective, EpContentDirective, EpDividerDirective, EpTableColumnDirective, EpTableCaptionDirective, EpTableFooterDirective, EpTextDirective } from "@ep/directives";
import { EpCardComponent, EpCheckboxComponent, EpInputComponent, EpSelectComponent, EpSelectItem, EpTableComponent, EpTableHeaders } from "@ep/components";
import { DOCUMENTATION } from 'src/app/global/const';
import { toSelectItems } from 'src/app/global/utils';
import { Partial } from "../../partial/partial";
import { AppCode } from "../../partial/code";

@Component({
  selector: 'app-table-demo',
  imports: [FormsModule, EpCardComponent, EpCheckboxComponent, EpSelectComponent, EpInputComponent, EpContentDirective, EpActionsDirective, Partial, AppCode, EpDividerDirective, EpTableComponent, EpTableColumnDirective, EpTableCaptionDirective, EpTableFooterDirective, EpTextDirective],
  templateUrl: './table-demo.html',
  styleUrl: './table-demo.css'
})
export class TableDemo {
  public variant?: Variants5;
  public color?: Colors1 | Colors3;
  public hoverColor?: Colors1 | Colors3;
  public size?: Sizes1;
  public bordered?: boolean;
  public striped?: boolean;
  public selectable?: boolean;
  public hoverable?: boolean;
  public shadow?: boolean;
  public headerVisible?: boolean;
  public hasPaginator?: boolean;
  public currentPage?: number;
  public itemsPerPage?: number;
  public slotCaption?: boolean;
  public slotCol?: boolean;
  public slotFoot?: boolean;

  public mapVariants: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_VARIANTS_5, 'uppercase');
  public mapColors: EpSelectItem[] = toSelectItems([...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3], 'uppercase');
  public mapSizes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_SIZES_1, 'uppercase');
  public mapRoundeds: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_ROUNDEDS, 'uppercase');

  public documentation = {
    ...DOCUMENTATION.components.table,
    usage: DOCUMENTATION.usage.replace("$s", "<ep-table>"),
    props: DOCUMENTATION.props.replace("$s", "<ep-table>"),
  }

  public data = [
    {
      prop: "headers",
      type: "EpTableHeaders[]",
      default: [],
      description: "Lista de columnas que define la estructura de la tabla. Cada elemento debe cumplir con la interfaz EpTableHeaders, donde `title` es el texto a mostrar, `key` la clave usada para obtener el valor de los items, y `align` permite definir la alineación horizontal del contenido.",
    },
    {
      prop: "items",
      type: { base: "InputSignal", options: "any[]" },
      default: [],
      description: "Lista de datos a renderizar en la tabla. Se recomienda usar objetos cuyas claves coincidan con los valores `key` definidos en los headers; solo se mostrarán las propiedades que coincidan.",
    },
    {
      prop: "variant",
      type: { base: "InputSignal", options: TYPE_GLOBAL_VARIANTS_5 },
      default: "default",
      description: "Define el estilo visual base de la tabla.",
    },
    {
      prop: "color",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3] },
      default: "secondary",
      description: "Color principal de la tabla, utilizado para resaltar las celdas de la tabla.",
    },
    {
      prop: "hoverColor",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3, 'undefined'] },
      default: "undefined",
      description: "Color de fondo aplicado cuando una fila se encuentra en estado hover. Si es `undefined`, se usará el color por defecto del tema.",
    },
    {
      prop: "size",
      type: { base: "InputSignal", options: TYPE_GLOBAL_SIZES_1 },
      default: "md",
      description: "Controla el tamaño general de la tabla (altura de filas, espaciado interno y tamaño del texto).",
    },
    {
      prop: "currentPage",
      type: { base: "ModelSignal", options: "number" },
      default: 1,
      description: "Página actual mostrada en la tabla. Puede vincularse bidireccionalmente usando `[(currentPage)]`. Si el valor es menor o igual a 0, se ajusta automáticamente a 1.",
    },
    {
      prop: "itemsPerPage",
      type: { base: "InputSignal", options: "number" },
      default: 10,
      description: "Cantidad de elementos visibles por página al usar paginación.",
    },
    {
      prop: "bordered",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Agrega bordes alrededor de las celdas de la tabla.",
    },
    {
      prop: "striped",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Alterna el color de fondo entre filas, mejorando la legibilidad.",
    },
    {
      prop: "selectable",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Agrega una columna inicial con checkboxes para permitir la selección de filas.",
    },
    {
      prop: "hoverable",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Activa el efecto hover al pasar el cursor sobre las filas.",
    },
    {
      prop: "shadow",
      type: { base: "InputSignal", options: ["boolean", "undefined"] },
      default: "undefined",
      description: "Aplica una sombra externa al contenedor de la tabla para destacar el bloque.",
    },
    {
      prop: "headerVisible",
      type: "boolean",
      default: true,
      description: "Controla la visibilidad del encabezado de la tabla (`<thead>`).",
    },
    {
      prop: "hasPaginator",
      type: ["boolean", "undefined"],
      default: "undefined",
      description: "Muestra el componente de paginación al pie de la tabla.",
    },
    {
      prop: "epCaption",
      type: "EpTableCaptionDirective?",
      default: "undefined",
      description: "Permite proyectar contenido en la sección de título de la tabla mediante `<ng-template epCaption>`.",
      link: { type: "self", url: "/docs/components/table/caption", text: "EpTableCaptionDirective" },
    },
    {
      prop: "epColumn",
      type: "EpTableColumnDirective?",
      default: "undefined",
      description: "Permite personalizar el contenido de las celdas usando `<ng-template epColumn>`.",
      link: { type: "self", url: "/docs/components/table/column", text: "EpTableColumnDirective" },
    },
    {
      prop: "epFoot",
      type: "EpTableFooterDirective?",
      default: "undefined",
      description: "Permite definir pies de columna o pies globales mediante `<ng-template epFooter>`.",
      link: { type: "self", url: "/docs/components/table/foot", text: "EpTableFooterDirective" },
    }
  ];


  get codeTemplate() {
    const hasChildren = this.slotCaption || this.slotCol || this.slotFoot;

    const select = {
      tag: 'ep-table',
      attrs: {
        "[headers]": "headers",
        "[items]": "items",
        variant: this.variant,
        color: this.color,
        hoverColor: this.hoverColor,
        size: this.size,
        "[(currentPage)]": this.currentPage,
        "[itemsPerPage]": this.itemsPerPage,
        "[bordered]": this.bordered,
        "[striped]": this.striped,
        "[selectable]": this.selectable,
        "[hoverable]": this.hoverable,
        "[shadow]": this.shadow,
        "[headerVisible]": this.headerVisible,
        "[hasPaginator]": this.hasPaginator,
      },
      children: hasChildren
        ? [
          this.slotCaption
            ? {
              tag: 'ng-template',
              attrs: {
                epCaption: "$_",
              },
              children: ["<span>Caption de la tabla</span>"],
            }
            : '',
          this.slotCol
            ? {
              tag: 'ng-template',
              attrs: {
                epColumn: "col1",
                "let-row": "row"
              },
              children: [
                '<span class="text-bold">EpColum</span>: {{ row.col1 }}'
              ]
            } : '',
          this.slotFoot
            ? {
              tag: 'ng-template',
              attrs: {
                epFooter: "$_",
                key: "col3"
              },
              children: ["<span>Total</span>"],
            } : '',
        ].filter(Boolean)
        : [],
    };

    return EpDedent(EpBuildNode(select));
  }
  get codeScript() {
    const body = [
      EpBuildArrayObjects("headers", this.headers, "EpTableHeaders"),
      EpBuildArrayObjects("items", this.items),
    ];

    const imports = [
      { from: '@ep/components', imports: ['EpTableComponent', 'EpTableHeaders'] },
      {
        from: '@ep/directives',
        imports: [
          this.slotCaption ? 'EpTableCaptionDirective' : '',
          this.slotCol ? 'EpTableColumnDirective' : '',
          this.slotFoot ? 'EpTableFooterDirective' : '',
        ].filter(Boolean),
      },
    ];

    return EpDedent(EpBuildDocScriptBase({
      imports,
      component: 'ExampleComponent',
      body,
    }));
  }
  get interfaces() {
    const interfaceCode = EpBuildInterface('EpTableHeaders', [
      { name: 'title', type: 'string', },
      { name: 'key', type: 'string', },
      { name: 'align', type: ['"', TYPE_GLOBAL_FLEX_JUSTIFIES.join('" | "'), '"'].join(""), optional: true, },
    ]);

    return EpDedent(interfaceCode);
  }
  get headers(): EpTableHeaders[] {
    return [
      { title: 'Col 1', key: 'col1', align: "center" },
      { title: 'Col 2', key: 'col2', },
      { title: 'Col 3', key: 'col3', },
    ];
  }
  get items() {
    return [
      { col1: "Cell 1.1", col2: "Cell 1.2", col3: "Cell 1.3" },
      { col1: "Cell 2.1", col2: "Cell 2.2", col3: "Cell 2.3" },
      { col1: "Cell 3.1", col2: "Cell 3.2", col3: "Cell 3.3" },
      { col1: "Cell 4.1", col2: "Cell 4.2", col3: "Cell 4.3" },
      { col1: "Cell 5.1", col2: "Cell 5.2", col3: "Cell 5.3" },
    ];
  }

  @HostBinding('class')
  get hostClass() {
    return 'contents';
  }
}