import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EpBuildDocScriptBase, EpBuildNode, EpDedent } from '@ep/global';
import { EpContentDirective, } from '@ep/directives';
import { EpCardComponent, } from '@ep/components';
import { DOCUMENTATION } from 'src/app/global/const';
import { Partial } from 'src/app/docs/partial/partial';
import { AppCode } from 'src/app/docs/partial/code';

@Component({
  selector: 'app-footer-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, EpCardComponent, EpContentDirective, Partial, AppCode],
  templateUrl: './footer-demo.html',
  styleUrls: ['./footer-demo.css']
})
export class FooterDemo {
  public documentation = {
    ...DOCUMENTATION.directives.table.footer,
    usage: DOCUMENTATION.usage.replace("$s", "<ng-template epFooter>"),
    props: DOCUMENTATION.props.replace("$s", "<ng-template epFooter>"),
  }

  public data = [
    {
      prop: "ng-template",
      type: { base: "TemplateRef", options: "any" },
      description:
        "Contenedor estructural donde se define el contenido que será proyectado dentro del pie de página.",
      link: { type: "_blank", url: "https://angular.dev/guide/templates/ng-template", text: "ng-template" },
    },
    {
      prop: "epFooter",
      type: "Directive",
      description: "Directiva que identifica el ng-template como el pie de página de la tabla para que el componente padre pueda detectarlo y renderizarlo.",
      link: { type: "_blank", url: "https://angular.dev/api/core/Directive", text: "Directive" },
    },
    {
      prop: "key",
      type: ["string", "undefined"],
      default: "undefined",
      description: "Clave asociada a la columna del pie de página. Permite al componente padre ubicar y renderizar la celda correspondiente.",
    },
    {
      prop: "colspan",
      type: ["number", "undefined"],
      default: 1,
      description: "Número de columnas que abarca el pie de página a partir de la columna asociada al key.",
    },
  ];


  get codeTemplate() {
    const raw = {
      tag: "ep-table",
      children: [{
        tag: "ng-template",
        attrs: { epFooter: "$_", key: "columnKey", "[colspan]": 2 },
        children: ["<!-- Proyección de contenido con epFooter -->"],
      }]
    };
    return EpDedent(EpBuildNode(raw));
  }

  get codeScript() {
    return EpDedent(EpBuildDocScriptBase({
      imports: [{ from: '@ep/directives', imports: ["EpTableFooterDirective",] }],
      component: 'ExampleComponent',
      body: [],
    }));
  }

  @HostBinding('class')
  get hostClass() { return "contents"; }
}
