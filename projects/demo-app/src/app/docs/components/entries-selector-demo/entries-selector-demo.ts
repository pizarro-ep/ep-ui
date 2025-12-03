import { Component, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Colors1, Colors3, EpDedent, Sizes1, Variants2, Roundeds, EpBuildNode, EpBuildDocScriptBase, EpBuildArray, EpBuildProp, TYPE_GLOBAL_VARIANTS_2, TYPE_GLOBAL_COLORS_1, TYPE_GLOBAL_COLORS_3, TYPE_GLOBAL_SIZES_1, TYPE_GLOBAL_ROUNDEDS } from '@ep/global';
import { EpActionsDirective, EpContentDirective, EpDividerDirective } from "@ep/directives";
import { EpCardComponent, EpCheckboxComponent, EpEntriesSelectorComponent, EpInputComponent, EpSelectComponent, EpSelectItem } from "@ep/components";
import { DOCUMENTATION } from 'src/app/global/const';
import { Partial } from "../../partial/partial";
import { AppCode } from "../../partial/code";
import { toSelectItems } from 'src/app/global/utils';

@Component({
  selector: 'app-entries-selector-demo',
  imports: [FormsModule, EpCardComponent, EpContentDirective, EpActionsDirective, EpInputComponent, EpCheckboxComponent, EpEntriesSelectorComponent, EpSelectComponent, Partial, EpDividerDirective, AppCode],
  templateUrl: './entries-selector-demo.html',
  styleUrl: './entries-selector-demo.css'
})
export class EntriesSelectorDemo {
  public value?: number;
  public variant?: Variants2;
  public color?: Colors1 | Colors3;
  public size?: Sizes1;
  public rounded?: Roundeds;
  public avaliableLimits?: boolean;

  public mapVariants: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_VARIANTS_2, "uppercase");
  public mapColors: EpSelectItem[] = toSelectItems([...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3], "uppercase");
  public mapSizes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_SIZES_1, "uppercase");
  public mapRoundeds: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_ROUNDEDS, "uppercase");

  public mapAvaliableLimits = [{ label: '10', value: "10" }, { label: '25', value: "25" }, { label: '50', value: "50" }, { label: '100', value: "100" }];
  public mapAvaliableLimits2 = [{ label: '15', value: "15" }, { label: '30', value: "30" }, { label: '45', value: "45" }, { label: '60', value: "60" }];

  public documentation = {
    ...DOCUMENTATION.components.entriesSelector,
    usage: DOCUMENTATION.usage.replace("$s", "selector de entradas"),
    props: DOCUMENTATION.props.replace("$s", "<ep-entries-selector>"),
  }

  public data = [
    {
      prop: "value",
      type: { base: "ModelSignal", options: ["number", "undefined"] },
      default: "undefined",
      description: "Valor actual del selector. Representa la cantidad de elementos visibles y puede vincularse bidireccionalmente mediante [(value)].",
    },
    {
      prop: "variant",
      type: TYPE_GLOBAL_VARIANTS_2,
      default: "filled",
      description: "Define el estilo visual del componente modificando su apariencia y fondo.",
    },
    {
      prop: "color",
      type: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3],
      default: "secondary",
      description: "Determina la tonalidad aplicada al componente según la paleta de colores del tema activo.",
    },
    {
      prop: "size",
      type: { base: "InputSignal", options: TYPE_GLOBAL_SIZES_1 },
      default: "xs",
      description: "Ajusta las dimensiones generales del componente, incluyendo la altura, el espaciado y el tamaño de fuente.",
    },
    {
      prop: "rounded",
      type: TYPE_GLOBAL_ROUNDEDS,
      default: "md",
      description: "Controla el nivel de redondeo en los bordes del componente, desde esquinas rectas hasta completamente redondeadas.",
    },
    {
      prop: "avaliableLimits",
      type: "EpSelectItem[]",
      default: [
        { label: '10', value: "10" },
        { label: '25', value: "25" },
        { label: '50', value: "50" },
        { label: '100', value: "100" }
      ],
      description: "Colección de opciones disponibles para seleccionar el número de elementos mostrados en una lista o tabla.",
      link: { type: "self", url: "/docs/components/select", text: "EpSelectComponent" },
    },
  ];


  get getCodeTemplate() {
    const raw = {
      tag: "ep-entries-selector",
      attrs: {
        "[(value)]": "value",
        variant: this.variant,
        color: this.color,
        size: this.size,
        rounded: this.rounded,
        "[avaliableLimits]": this.avaliableLimits ? "avaliableLimits" : null,
      }
    };

    return EpDedent(EpBuildNode(raw));
  }
  get getCodeScript() {
    const limitsSelects = [15, 30, 45, 60].map((v, _) => {
      return `{ label: '${v}', value: '${v}' }`;
    })
    const body = [
      EpBuildProp("value?", "", "number"),
      EpBuildArray("avaliableLimits", limitsSelects, "EpSelectItem")
    ];

    return EpDedent(EpBuildDocScriptBase({
      imports: [{ from: '@ep/components', imports: ['EpEntriesSelectorComponent'] }],
      component: "ExampleComponent",
      body: body,
    }));
  }

  @HostBinding('class')
  get hostClass() {
    return "contents";
  }
}
