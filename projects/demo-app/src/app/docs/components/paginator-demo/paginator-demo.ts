import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Colors1, Colors3, EpBuildAttrs, EpBuildDocScriptBase, EpBuildNode, EpDedent, PositionsY, Roundeds, Sizes1, TYPE_GLOBAL_COLORS_1, TYPE_GLOBAL_COLORS_3, TYPE_GLOBAL_POSITIONS_Y, TYPE_GLOBAL_ROUNDEDS, TYPE_GLOBAL_SIZES_1, Types4, Types5, Variants4 } from '@ep/global';
import { EpActionsDirective, EpContentDirective, EpDividerDirective, } from "@ep/directives";
import { EpCardComponent, EpCheckboxComponent, EpInputComponent, EpSelectComponent, EpSelectItem, EpPaginatorComponent } from "@ep/components";
import { DOCUMENTATION, } from 'src/app/global/const';
import { toSelectItems } from 'src/app/global/utils';
import { Partial } from "../../partial/partial";
import { AppCode } from "../../partial/code";

@Component({
  selector: 'app-paginator-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, EpCardComponent, EpContentDirective, EpActionsDirective, EpInputComponent, EpSelectComponent, Partial, EpCheckboxComponent, EpDividerDirective, AppCode, EpContentDirective, EpPaginatorComponent],
  templateUrl: './paginator-demo.html',
  styleUrl: './paginator-demo.css'
})
export class PaginatorDemo {
  public show: boolean = false;
  public type?: Types4;
  public label?: string;
  public subLabel?: string;
  public variant?: Variants4;
  public confirmButtonShow?: boolean;
  public confirmButtonText?: string;
  public confirmButtonColor?: Colors1 | Colors3;
  public onConfirm?: boolean;
  public denyButtonShow?: boolean;
  public denyButtonText?: string;
  public denyButtonColor?: Colors1 | Colors3;
  public onDeny?: boolean;
  public cancelButtonShow?: boolean;
  public cancelButtonText?: string;
  public cancelButtonColor?: Colors1 | Colors3;
  public onCancel?: boolean;
  public icon?: Types5;
  public slotContent?: boolean;
  public slotActions?: boolean;

  public color?: Colors1 | Colors3;
  public size?: Sizes1;
  public rounded?: Roundeds;
  public currentPage?: number;
  public totalItems?: number;
  public itemsPerPage?: number;
  public hasText?: boolean;
  public textPosition?: PositionsY;
  public pageChange?: boolean;

  public mapColors: EpSelectItem[] = toSelectItems([...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3], 'uppercase');
  public mapSizes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_SIZES_1, 'uppercase');
  public mapRoundeds: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_ROUNDEDS, 'uppercase');
  public mapTextPositions: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_POSITIONS_Y, 'uppercase');

  public documentation = {
    ...DOCUMENTATION.components.paginator,
    usage: DOCUMENTATION.usage.replace("$s", "<ep-paginator>"),
    props: DOCUMENTATION.props.replace("$s", "<ep-paginator>"),
  }

  public data = [
    {
      prop: "color",
      type: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3],
      default: "brand-2",
      description: "Color principal del paginador (botones y estados activos).",
    },
    {
      prop: "size",
      type: { base: "InputSignal", options: TYPE_GLOBAL_SIZES_1 },
      default: "md",
      description: "Tamaño general de los botones del paginador.",
    },
    {
      prop: "rounded",
      type: TYPE_GLOBAL_ROUNDEDS,
      default: "md",
      description: "Nivel de redondeo para los botones del paginador.",
    },
    {
      prop: "totalItems",
      type: { base: "InputSignal", options: ["number"] },
      default: 0,
      description: "Cantidad total de elementos a paginar.",
    },
    {
      prop: "itemsPerPage",
      type: { base: "InputSignal", options: ["number", "undefined"] },
      default: 10,
      description: "Número de elementos mostrados por página.",
    },
    {
      prop: "currentPage",
      type: { base: "ModelSignal", options: ["number", "undefined"] },
      default: 1,
      description: "Página actual del paginador. Soporta enlace bidireccional con [(currentPage)].",
    },
    {
      prop: "hasText",
      type: "boolean",
      default: true,
      description: "Muestra o no el texto informativo de paginación.",
    },
    {
      prop: "textPosition",
      type: TYPE_GLOBAL_POSITIONS_Y,
      default: "bottom",
      description: "Posición del texto relativo al paginador.",
    },
  ];

  get codeTemplate() {
    const raw = {
      tag: "ep-paginator",
      attrs: {
        color: this.color,
        size: this.size,
        rounded: this.rounded,
        "[totalItems]": this.totalItems,
        "[itemsPerPage]": this.itemsPerPage,
        "[currentPage]": this.currentPage,
        "[hasText]": this.hasText,
        "textPosition": this.hasText ? this.textPosition : null,
      }
    };

    return EpDedent(EpBuildNode(raw));
  }
  get codeScript() {
    return EpDedent(EpBuildDocScriptBase({
      imports: [{ from: "@ep/components", imports: ["EpPaginatorComponent"] }],
      component: "ExampleComponent",
      body: [],
    }));
  }

  @HostBinding('class') get hostClass() { return "contents"; }
}
