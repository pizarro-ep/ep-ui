import { Component, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Colors1, Colors2, Colors3, EpBuildDocScriptBase, EpBuildNode, EpDedent, Sizes2, TYPE_GLOBAL_COLORS_1, TYPE_GLOBAL_COLORS_2, TYPE_GLOBAL_COLORS_3, TYPE_GLOBAL_SIZES_2, TYPE_GLOBAL_VARIANTS_6, Variants6 } from '@ep/global';
import { EpActionsDirective, EpContentDirective, EpDividerDirective, } from "@ep/directives";
import { EpCardComponent, EpIconComponent, EpInputComponent, EpSelectComponent, EpSelectItem, EpCheckboxComponent } from "@ep/components";
import { DOCUMENTATION } from 'src/app/global/const';
import { Partial } from "../../partial/partial";
import { AppCode } from "../../partial/code";
import { toSelectItems } from 'src/app/global/utils';

@Component({
  selector: 'app-icon-demo',
  imports: [FormsModule, EpCardComponent, EpContentDirective, EpActionsDirective, EpInputComponent, EpSelectComponent, Partial, EpIconComponent, EpDividerDirective, AppCode, EpCheckboxComponent],
  templateUrl: './icon-demo.html',
  styleUrl: './icon-demo.css'
})
export class IconDemo {
  public icon?: string;
  public variant?: Variants6;
  public color?: Colors1 | Colors2 | Colors3;
  public size?: Sizes2;
  public slotSvg?: boolean;

  public mapVariants: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_VARIANTS_6, "uppercase");
  public mapColors: EpSelectItem[] = toSelectItems([...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_2, ...TYPE_GLOBAL_COLORS_3], "uppercase");
  public mapSizes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_SIZES_2, "uppercase");;

  public documentation = {
    ...DOCUMENTATION.components.icon,
    usage: DOCUMENTATION.usage.replace("$s", "<ep-icon>"),
    props: DOCUMENTATION.props.replace("$s", "<ep-icon>"),
  }

  public data = [
    {
      prop: "icon",
      type: { base: "InputSignal", options: ["string", "undefined"] },
      default: "undefined",
      description: "Nombre o identificador del ícono a mostrar. Debe coincidir con un ícono existente en la librería Material Symbols instalada en el proyecto.",
      requirements: [
        {
          name: "marella/material-symbols",
          lib: "material-symbols",
          version: "^0.39.1",
          link: "https://github.com/marella/material-symbols/tree/main/material-symbols",
        },
      ],
      link: {
        type: "_blank",
        url: "https://fonts.google.com/icons",
        text: "Material Symbols",
      },
    },
    {
      prop: "variant",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_VARIANTS_6, "undefined"] },
      default: "outlined",
      description:
        "Determina el estilo visual del ícono según la variante disponible en Material Symbols.",
    },
    {
      prop: "color",
      type: {
        base: "InputSignal",
        options: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_2, ...TYPE_GLOBAL_COLORS_3, "undefined"],
      },
      default: "undefined",
      description: "Aplica un color al ícono utilizando la paleta del tema actual. Si no se especifica, hereda automáticamente el color de texto del contenedor más cercano.",
    },
    {
      prop: "size",
      type: { base: "InputSignal", options: [...TYPE_GLOBAL_SIZES_2, "undefined"] },
      default: "undefined",
      description: "Ajusta la escala visual del ícono en relación al tamaño de fuente actual. Si no se define, adopta el tamaño de fuente heredado del elemento padre más cercano.",
    },
  ];

  get codeTemplate() {
    const raw = {
      tag: 'ep-icon',
      attrs: {
        icon: this.icon,
        variant: this.variant,
        color: this.color,
        size: this.size
      },
      children: [
        this.slotSvg && !this.icon
          ? {
            tag: "svg",
            attrs: {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              class: "w-full h-full"
            },
            children: [
              '<path d="M20 20 H50 M20 50 H45 M20 80 H50" />',
              '<path d="M65 20 V80 M65 20 H90 Q95 20 95 35 Q95 50 90 50 H65" />'
            ]
          }
          : ''
      ].filter(Boolean)
    };
    return EpDedent(EpBuildNode(raw));
  }
  get codeScript() {
    return EpDedent(EpBuildDocScriptBase({
      imports: [{ from: '@ep/components', imports: ['EpIconComponent'] }],
      component: 'ExampleComponent',
      body: [],
    }));
  }

  @HostBinding('class')
  get hostClass() {
    return "contents";
  }
}
