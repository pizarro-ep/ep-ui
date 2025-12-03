import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorsAll, EpBuildDocScriptBase, EpBuildNode, EpDedent, Paddings, Roundeds, Sizes3, TYPE_GLOBAL_COLORS_ALL, TYPE_GLOBAL_PADDINGS, TYPE_GLOBAL_ROUNDEDS, TYPE_GLOBAL_SIZES_3 } from '@ep/global';
import { EpContentDirective, EpActionsDirective, EpContainerDirective } from '@ep/directives';
import { EpCardComponent, EpSelectComponent, EpSelectItem } from '@ep/components';
import { DOCUMENTATION } from 'src/app/global/const';
import { Partial } from '../../partial/partial';
import { AppCode } from "../../partial/code";
import { toSelectItems } from 'src/app/global/utils';

@Component({
  selector: 'app-container-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, EpCardComponent, EpContentDirective, Partial, AppCode, EpActionsDirective, EpContainerDirective, EpSelectComponent],
  templateUrl: './container-demo.html',
  styleUrls: ['./container-demo.css']
})
export class ContainerDemo {
  public color?: ColorsAll;
  public rounded?: Roundeds;
  public width?: Sizes3;
  public height?: Sizes3;
  public padding?: Paddings;

  public mapColors: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_COLORS_ALL, "uppercase");
  public mapRoundeds: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_ROUNDEDS, "uppercase");
  public mapWidths: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_SIZES_3, "uppercase");
  public mapHeights: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_SIZES_3, "uppercase");
  public mapPaddings: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_PADDINGS, "uppercase");

  public documentation = {
    ...DOCUMENTATION.directives.container,
    usage: DOCUMENTATION.usage.replace("$s", "<ng-template epContainer>"),
    props: DOCUMENTATION.props.replace("$s", "<ng-template epContainer>"),
  }
  public data = [
    {
      prop: "epContainer",
      type: "🡳",
      description:
        "Directiva que permite aplicar clases dinámicas al contenedor.",
      link: {
        type: "_blank",
        url: "https://angular.dev/api/core/Directive",
        text: "Directive"
      },
    },
    {
      prop: "color",
      type: TYPE_GLOBAL_COLORS_ALL,
      description:
        "Color de fondo aplicado al contenedor mediante la clase `color-{{color}}`.",
    },
    {
      prop: "rounded",
      type: TYPE_GLOBAL_ROUNDEDS,
      description:
        "Define el radio del borde aplicado al contenedor mediante clases `rounded-{{rounded}}`.",
    },
    {
      prop: "w",
      type: TYPE_GLOBAL_SIZES_3,
      description:
        "Asigna el ancho del contenedor mediante la clase `w-{{w}}`.",
    },
    {
      prop: "h",
      type: TYPE_GLOBAL_SIZES_3,
      description:
        "Asigna la altura del contenedor mediante la clase `h-{{h}}`.",
    },
    {
      prop: "p",
      type: TYPE_GLOBAL_PADDINGS,
      description:
        "Padding interno aplicado al contenedor mediante la clase `p-{{p}}`.",
    },
  ];

  get codeTemplate() {
    const raw = {
      tag: "div",
      attrs: { epContainer: this.containerClass ? this.containerClass : "$_" },
      children: ["<!-- Contenido con epContainer -->", "epContainer"],
    };
    return EpDedent(EpBuildNode(raw));
  }

  get codeScript() {
    return EpDedent(EpBuildDocScriptBase({
      imports: [{ from: '@ep/directives', imports: ["EpContainerDirective",] }],
      component: 'ExampleComponent',
      body: [],
    }));
  }

  get containerClass() {
    const color = this.color ? `color-${this.color}` : '';
    const rounded = this.rounded ? `rounded-${this.rounded}` : ''
    const width = this.width ? `w-${this.width}` : ''
    const height = this.height ? `h-${this.height}` : ''
    const padding = this.padding ? `p-${this.padding}` : ''
    return [color, rounded, width, height, padding].filter(Boolean).join(' ');
  }

  @HostBinding('class')
  get hostClass() { return "contents"; }
}
