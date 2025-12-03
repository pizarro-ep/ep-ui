import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Angles, EpBuildDocScriptBase, EpBuildNode, EpDedent, Phases, TYPE_GLOBAL_ANGLES, TYPE_GLOBAL_PHASES, } from '@ep/global';
import { EpContentDirective, EpActionsDirective, EpRotateDirective } from '@ep/directives';
import { EpCardComponent, EpSelectComponent, EpSelectItem, EpIconComponent } from '@ep/components';
import { DOCUMENTATION } from 'src/app/global/const';
import { Partial } from '../../partial/partial';
import { AppCode } from "../../partial/code";
import { toSelectItems } from 'src/app/global/utils';

@Component({
  selector: 'app-rotate-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, EpCardComponent, EpContentDirective, Partial, AppCode, EpActionsDirective, EpSelectComponent, EpIconComponent, EpRotateDirective],
  templateUrl: './rotate-demo.html',
  styleUrls: ['./rotate-demo.css']
})
export class RotateDemo {
  public phase?: Phases;
  public from?: Angles;
  public fromX?: Angles;
  public fromY?: Angles;
  public fromZ?: Angles;
  public to?: Angles;
  public toX?: Angles;
  public toY?: Angles;
  public toZ?: Angles;

  public mapPhases: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_PHASES, "uppercase");
  public mapAngles: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_ANGLES, "uppercase");

  public documentation = {
    ...DOCUMENTATION.directives.rotate,
    usage: DOCUMENTATION.usage.replace("$s", "<ng-template epRotate>"),
    props: DOCUMENTATION.props.replace("$s", "<ng-template epRotate>"),
  }

  public data = [
    {
      prop: "epRotate",
      type: "🡳",
      description:
        "Directiva que permite aplicar clases dinámicas para controlar rotaciones del componente.",
      link: {
        type: "_blank",
        url: "https://angular.dev/api/core/Directive",
        text: "Directive"
      },
    },

    // ─────────────────────────────────────────────
    // FROM
    // ─────────────────────────────────────────────
    {
      prop: "from",
      type: TYPE_GLOBAL_ANGLES,
      description: "Ángulo inicial de rotación aplicado mediante la clase `from-{{from}}`.",
    },
    {
      prop: "fromX",
      type: TYPE_GLOBAL_ANGLES,
      description: "Ángulo inicial en el eje X aplicado mediante la clase `from-[x-{{fromX}}]`.",
    },
    {
      prop: "fromY",
      type: TYPE_GLOBAL_ANGLES,
      description: "Ángulo inicial en el eje Y aplicado mediante la clase `from-[y-{{fromY}}]`.",
    },
    {
      prop: "fromZ",
      type: TYPE_GLOBAL_ANGLES,
      description: "Ángulo inicial en el eje Z aplicado mediante la clase `from-[z-{{fromZ}}]`.",
    },

    // ─────────────────────────────────────────────
    // TO
    // ─────────────────────────────────────────────
    {
      prop: "to",
      type: TYPE_GLOBAL_ANGLES,
      description: "Ángulo final de rotación aplicado mediante la clase `to-{{to}}`.",
    },
    {
      prop: "toX",
      type: TYPE_GLOBAL_ANGLES,
      description: "Ángulo final en el eje X aplicado mediante la clase `to-[x-{{toX}}]`.",
    },
    {
      prop: "toY",
      type: TYPE_GLOBAL_ANGLES,
      description: "Ángulo final en el eje Y aplicado mediante la clase `to-[y-{{toY}}]`.",
    },
    {
      prop: "toZ",
      type: TYPE_GLOBAL_ANGLES,
      description: "Ángulo final en el eje Z aplicado mediante la clase `to-[z-{{toZ}}]`.",
    },
  ];

  get codeTemplate() {
    const raw = {
      tag: "ep-icon",
      attrs: { epRotate: this.rotateClass ? this.rotateClass : "$_" },
    };
    return EpDedent(EpBuildNode(raw));
  }

  get codeScript() {
    return EpDedent(EpBuildDocScriptBase({
      imports: [{ from: '@ep/directives', imports: ["EpRotateDirective",] }],
      component: 'ExampleComponent',
      body: [],
    }));
  }

  get rotateClass() {
    const phase = this.phase ? `phase-${this.phase}` : '';
    const from = this.from ? `from-${this.from}` : ''
    const fromX = this.fromX ? `from-[x-${this.fromX}]` : ''
    const fromY = this.fromY ? `from-[y-${this.fromY}]` : ''
    const fromZ = this.fromZ ? `from-[z-${this.fromZ}]` : ''
    const to = this.to ? `to-${this.to}` : ''
    const toX = this.toX ? `to-[x-${this.toX}]` : ''
    const toY = this.toY ? `to-[y-${this.toY}]` : ''
    const toZ = this.toZ ? `to-[z-${this.toZ}]` : ''
    return [phase, from, fromX, fromY, fromZ, to, toX, toY, toZ].filter(Boolean).join(' ');
  }

  @HostBinding('class')
  get hostClass() { return "contents"; }
}
