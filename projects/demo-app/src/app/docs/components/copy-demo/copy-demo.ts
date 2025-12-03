import { Component, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Colors1, EpDedent, Colors3, Sizes1, EpBuildDocScriptBase, EpBuildNode, TYPE_GLOBAL_COLORS_1, TYPE_GLOBAL_COLORS_3, TYPE_GLOBAL_SIZES_1 } from '@ep/global';
import { EpActionsDirective, EpContentDirective, EpDividerDirective, } from "@ep/directives";
import { EpCardComponent, EpCopyComponent, EpInputComponent, EpSelectComponent, EpSelectItem, } from "@ep/components";
import { DOCUMENTATION } from 'src/app/global/const';
import { Partial } from "../../partial/partial";
import { AppCode } from "../../partial/code";
import { toSelectItems } from 'src/app/global/utils';

@Component({
  selector: 'app-copy-demo',
  imports: [FormsModule, EpCardComponent, EpSelectComponent, EpContentDirective, EpActionsDirective, EpCopyComponent, EpInputComponent, EpDividerDirective, Partial, AppCode],
  templateUrl: './copy-demo.html',
  styleUrl: './copy-demo.css'
})
export class CopyDemo {
  public color?: Colors1 | Colors3;
  public size?: Sizes1;
  public text?: string;
  public label?: string;

  public mapColors: EpSelectItem[] = toSelectItems([...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3], "uppercase");
  public mapSizes: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_SIZES_1, "uppercase");

  public documentation = {
    ...DOCUMENTATION.components.copy,
    usage: DOCUMENTATION.usage.replace("$s", "<ep-copy>"),
    props: DOCUMENTATION.props.replace("$s", "<ep-copy>")
  }

  public data = [
    {
      prop: "text",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Texto que será copiado al portapapeles cuando el usuario ejecute la acción. Si es `undefined` se podrá el componente como desactivado.",
    },
    {
      prop: "label",
      type: "string",
      default: "Copiar",
      description: "Etiqueta que se muestra en el botón de copiar para guiar al usuario.",
    },
    {
      prop: "color",
      type: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3],
      default: "secondary",
      description: "Define el esquema de color del botón de copiar, adaptado a la paleta de colores del tema.",
    },
    {
      prop: "size",
      type: TYPE_GLOBAL_SIZES_1,
      default: "sm",
      description: "Controla el tamaño visual del botón de copiar, ajustando el espaciado y la tipografía.",
    },
  ];

  get codeTemplate() {
    const raw = {
      tag: "ep-copy",
      attrs: {
        text: this.text,
        label: this.label,
        color: this.color,
        size: this.size,
      }
    }
    return EpDedent(EpBuildNode(raw));
  }
  get codeScript() {
    return EpDedent(EpBuildDocScriptBase({
      imports: [{ from: '@ep/components', imports: ['EpCopyComponent'] }],
      component: 'ExampleComponent',
      body: [],
    }));
  }

  @HostBinding('class') get hostClass() { return 'contents' }
}
