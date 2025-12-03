import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorsAll, EpBuildDocScriptBase, EpBuildNode, EpDedent, FontWeights, Opacities, Sizes2, TextTransforms, TYPE_GLOBAL_COLORS_ALL, TYPE_GLOBAL_FONTWEIGHTS, TYPE_GLOBAL_OPACITIY, TYPE_GLOBAL_SIZES_2, TYPE_GLOBAL_TEXTTRANSFORMS, TYPE_GLOBAL_USERSELECTS, UserSelects, } from '@ep/global';
import { EpContentDirective, EpActionsDirective, EpTextDirective } from '@ep/directives';
import { EpCardComponent, EpSelectComponent, EpSelectItem, EpSliderComponent } from '@ep/components';
import { DOCUMENTATION } from 'src/app/global/const';
import { Partial } from '../../partial/partial';
import { AppCode } from "../../partial/code";
import { toSelectItems } from 'src/app/global/utils';

@Component({
  selector: 'app-text-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, EpCardComponent, EpContentDirective, Partial, AppCode, EpActionsDirective, EpSelectComponent, EpTextDirective, EpSliderComponent],
  templateUrl: './text-demo.html',
  styleUrls: ['./text-demo.css']
})
export class TextDemo {
  public color?: ColorsAll;
  public size?: Sizes2;
  public weight?: FontWeights;
  public transform?: TextTransforms;
  public select?: UserSelects;
  public opacity?: Opacities;

  public mapColors: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_COLORS_ALL, "uppercase");
  public mapSizes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_SIZES_2, "uppercase");
  public mapWeights: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_FONTWEIGHTS, "uppercase");
  public mapTransforms: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_TEXTTRANSFORMS, "uppercase");
  public mapSelects: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_USERSELECTS, "uppercase");

  public documentation = {
    ...DOCUMENTATION.directives.text,
    usage: DOCUMENTATION.usage.replace("$s", "<ng-template epText>"),
    props: DOCUMENTATION.props.replace("$s", "<ng-template epText>"),
  }

  public data = [
    {
      prop: "epText",
      type: "🡳",
      description:
        "Directiva que permite aplicar clases dinámicas para personalizar estilos tipográficos del texto.",
      link: {
        type: "_blank",
        url: "https://angular.dev/api/core/Directive",
        text: "Directive",
      },
    },
    {
      prop: "color",
      type: TYPE_GLOBAL_COLORS_ALL,
      default: "title",
      description: "Color del texto aplicado mediante la clase `color-{{color}}`.",
    },
    {
      prop: "size",
      type: TYPE_GLOBAL_SIZES_2,
      default: "undefined",
      description: "Tamaño del texto aplicado mediante la clase `size-{{size}}`.",
    },
    {
      prop: "weight",
      type: TYPE_GLOBAL_FONTWEIGHTS,
      default: "undefined",
      description: "Grosor del texto aplicado mediante la clase `weight-{{weight}}`.",
    },
    {
      prop: "transform",
      type: TYPE_GLOBAL_TEXTTRANSFORMS,
      default: "undefined",
      description: "Transformación tipográfica aplicada mediante la clase `transform-{{transform}}`.",
    },
    {
      prop: "select",
      type: TYPE_GLOBAL_USERSELECTS,
      default: "undefined",
      description: "Control de selección de texto aplicado mediante la clase `select-{{select}}`.",
    },
    {
      prop: "opacity",
      type: TYPE_GLOBAL_OPACITIY,
      default: "undefined",
      description: "Nivel de opacidad aplicado mediante la clase `opacity-{{opacity}}`.",
    },
  ];


  get codeTemplate() {
    const raw = {
      tag: "span",
      attrs: { epText: this.textClass ? this.textClass : "$_" },
      children: ["<!-- Contenido -->", "epText"]
    };
    return EpDedent(EpBuildNode(raw));
  }

  get codeScript() {
    return EpDedent(EpBuildDocScriptBase({
      imports: [{ from: '@ep/directives', imports: ["EpTextDirective",] }],
      component: 'ExampleComponent',
      body: [],
    }));
  }

  get textClass() {
    const color = this.color ? `color-${this.color}` : '';
    const size = this.size ? `size-${this.size}` : ''
    const weight = this.weight ? `weight-${this.weight}` : ''
    const transform = this.transform ? `transform-${this.transform}` : ''
    const select = this.select ? `select-${this.select}` : ''
    const opacity = this.opacity || this.opacity === 0 ? `opacity-${this.opacity}` : ''
    return [color, size, weight, transform, select, opacity].filter(Boolean).join(' ');
  }

  @HostBinding('class')
  get hostClass() { return "contents"; }
}
