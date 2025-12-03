import { Component, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EpDedent, EpBuildNode, EpBuildDocScriptBase } from '@ep/global';
import { EpActionsDirective, EpActivatorDirective, EpContentDirective, EpDividerDirective, } from "@ep/directives";
import { EpButtonComponent, EpCardComponent, EpCheckboxComponent, EpInputComponent, EpListComponent, EpListItemComponent, EpMenuComponent } from "@ep/components";
import { DOCUMENTATION } from 'src/app/global/const';
import { Partial } from "../../partial/partial";
import { AppCode } from "../../partial/code";

@Component({
  selector: 'app-menu-demo',
  imports: [FormsModule, EpCardComponent, EpContentDirective, EpActionsDirective, EpInputComponent, EpMenuComponent, EpActivatorDirective, EpListComponent, EpListItemComponent, EpButtonComponent, EpCheckboxComponent, Partial, EpDividerDirective, AppCode],
  templateUrl: './menu-demo.html',
  styleUrl: './menu-demo.css'
})
export class MenuDemo {
  public activator?: string;
  public label?: string;
  public activatorSlot: boolean = true;
  public activatorSibling: boolean = false;

  public documentation = {
    ...DOCUMENTATION.components.menu,
    usage: DOCUMENTATION.usage.replace('$s', "<ep-menu>"),
    props: DOCUMENTATION.props.replace('$s', "<ep-menu>"),
  };

  public data = [
    {
      prop: "activator",
      type: {
        base: 'InputSignal',
        options: ["string", "null"],
      },
      default: "null",
      description: "Se usa para especificar un activador externo mediante un selector (ID). Si se proporciona, el menú se abrirá al hacer clic en el elemento coincidente.",
    },
    {
      prop: "epActivator",
      type: "EpActivatorDirective?",
      description: "Directiva para definir un activador personalizado dentro del menú. Proporciona una variable de plantilla `toggle` para controlar la apertura/cierre del menú.",
      link: { type: "self", url: "/docs/directives/activator", text: "EpActivatorDirective" },
    },
    {
      prop: "epList",
      type: "EpListComponent?",
      description: "Proyección de contenido con `<ep-list epMenuContent>` para el contenido del menú. Debe contener elementos de lista (ep-list-item).",
      link: { type: "self", url: "/docs/components/list", text: "EpListComponent" },
    },
  ];

  get codeTemplate() {
    const menu = {
      tag: "ep-menu",
      attrs: {
        activator: this.activatorSibling ? `#${this.activator ? this.activator : 'menuId'}` : null
      },
      children: [
        this.activatorSlot ? {
          tag: "ng-template",
          attrs: { epActivator: "$_", "let-toggle": "toggle" },
          children: [{
            tag: "ep-button",
            attrs: { value: "SLOT ACTIVATOR", "(click)": "toggle()" },
            selfClose: true,
          }]
        } : '',
        {
          tag: "ep-list",
          attrs: { epMenuComponent: "$_" },
          children: [1, 2].map((v) => {
            return { tag: "ep-list-item", attrs: { label: `Ítem ${v}` }, selfClose: true }
          })
        }
      ].filter(Boolean)
    }

    const button = {
      tag: "ep-button",
      attrs: { id: this.activator ? this.activator : 'menuId', value: "SIBLING ACTIVATOR" },
      selfClose: true,
    }

    const raw = [
      this.activatorSibling ? EpBuildNode(button) : '',
      EpBuildNode(menu)].filter(Boolean).join("\n\n");

    return EpDedent(raw);
  }
  get codeScript() {
    const imports = [
      { from: '@ep/components', imports: ['EpMenuComponent', "EpButtonComponent", "EpListComponent", "EpListItemComponent"] },
      { from: '@ep/directives', imports: [this.activatorSlot ? "EpActivatorDirective" : ""].filter(Boolean) }
    ]

    return EpDedent(EpBuildDocScriptBase({
      imports,
      component: 'ExampleComponent',
      body: [],
    }));
  }

  @HostBinding('class') get hostClass() { return 'contents' }
}
