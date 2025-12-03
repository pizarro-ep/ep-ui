import { Component, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Colors1, EpDedent, Colors3, Variants7, Sizes4, Opacities, EpBuildNode, EpBuildDocScriptBase, TYPE_GLOBAL_VARIANTS_7, TYPE_GLOBAL_SIZES_4, TYPE_GLOBAL_OPACITIY, TYPE_GLOBAL_COLORS_1, TYPE_GLOBAL_COLORS_3 } from '@ep/global';
import { EpActionsDirective, EpContentDirective, EpDividerDirective, } from "@ep/directives";
import { EpCardComponent, EpSelectComponent, EpSelectItem, EpSliderComponent, } from "@ep/components";
import { DOCUMENTATION, } from 'src/app/global/const';
import { toSelectItems } from 'src/app/global/utils';
import { AppCode } from "../../partial/code";
import { Partial } from "../../partial/partial";

@Component({
    selector: 'app-divider-demo',
    imports: [FormsModule, EpCardComponent, EpSelectComponent, EpContentDirective, EpActionsDirective, EpSliderComponent, EpDividerDirective, AppCode, Partial],
    templateUrl: './divider-demo.html',
    styleUrl: './divider-demo.css'
})
export class DividerDemo {
    public variant?: Variants7;
    public color?: Colors1 | Colors3;
    public thickness?: Sizes4;
    public opacity?: Opacities;

    public mapVariants: EpSelectItem[] = toSelectItems(TYPE_GLOBAL_VARIANTS_7, "uppercase");
    public mapColors: EpSelectItem[] = toSelectItems([...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3], "uppercase");

    public documentation = {
        ...DOCUMENTATION.directives.divider,
        usage: DOCUMENTATION.usage.replace("$s", "<ng-template epDivider>"),
        props: DOCUMENTATION.props.replace("$s", "<ng-template epDivider>"),
    }

    public data = [
        {
            prop: "epDivider",
            type: "🡳",
            description: "Directiva que permite aplicar clases dinámicas al divisor.",
            link: { type: "_blank", url: "https://angular.dev/api/core/Directive", text: "Directive" },
        },
        {
            prop: "variant",
            type: TYPE_GLOBAL_VARIANTS_7,
            description: "Define el estilo visual del divisor mediante la clase `variant-{{variant}}`.",
        },
        {
            prop: "color",
            type: [...TYPE_GLOBAL_COLORS_1, ...TYPE_GLOBAL_COLORS_3],
            description: "Define el color del divisor mediante la clase `color-{{color}}`.",
        },
        {
            prop: "thickness",
            type: TYPE_GLOBAL_SIZES_4,
            description: "Controla el grosor del divisor mediante la clase `thickness-{{thickness}}`.",
        },
        {
            prop: "opacity",
            type: TYPE_GLOBAL_OPACITIY,
            description: "Ajusta la opacidad del divisor mediante la clase `opacity-{{opacity}}`.",
        },
    ];


    get codeTemplate() {
        const raw = {
            tag: "div",
            attrs: { epDivider: this.dividerClass ? this.dividerClass : '$_' },
        }
        // dedent para normalizar la sangría
        return EpDedent(EpBuildNode(raw));
    }
    get codeScript() {
        return EpDedent(EpBuildDocScriptBase({
            imports: [{ from: '@ep/directives', imports: ["EpDividerDirective",] }],
            component: 'ExampleComponent',
            body: [],
        }));
    }

    get dividerClass() {
        const variant = this.variant ? `variant-${this.variant}` : '';
        const color = this.color ? `color-${this.color}` : '';
        const thickness = this.thickness ? `thickness-${this.thickness}` : '';
        const opacity = this.opacity || this.opacity === 0 ? `opacity-${this.opacity}` : '';
        return [variant, color, thickness, opacity].filter(Boolean).join(' ');
    }

    @HostBinding('class')
    get hostClass() { return "contents"; }
}
