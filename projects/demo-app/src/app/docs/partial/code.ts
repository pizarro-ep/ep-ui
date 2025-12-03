import { Component, HostBinding, Input } from "@angular/core";
import { EpDividerDirective } from "@ep/directives";
import { EpButtonComponent, EpCopyComponent, } from "@ep/components";
import { CommonModule } from "@angular/common";
import { EpTokenizeScript, EpTokenizeTemplate } from "@ep/global";

@Component({
    selector: 'app-code',
    imports: [CommonModule, EpButtonComponent, EpCopyComponent, EpDividerDirective],
    template: `
        <div class="flex items-center justify-between gap-2">
            <div class="flex gap-1">
                <ep-button [variant]=" typeCode === 'template' ? 'tonal' :'text'"
                            color="secondary"
                            size="xs"
                            value="Html"
                            (click)="typeCode = 'template'" />
                @if(codeScript){
                    <ep-button [variant]=" typeCode === 'script' ? 'tonal' :'text'"
                                color="secondary"
                                size="xs"
                                value="Script"
                                (click)="typeCode = 'script'" />
                }
            </div>
            <ep-copy [text]="typeCode === 'template' ? codeTemplate : codeScript" />
        </div>
        <div epDivider="opacity-10"></div>
        @if(typeCode==='template'){
            <pre class="overflow-x-auto"><code class="whitespace-pre">@for(token of codeTemplateTokens; track $index) {@if(token.type === 'whitespace') {{{ token.value }}} @else {<span [ngClass]="{
                    'text-purple-300': token.type === 'tag-delimiter',
                    'text-fuchsia-500': token.type === 'tag-name' || token.type === 'attr-equal',
                    'text-emerald-500': token.type === 'attr-name',
                    'text-yellow-500': token.type === 'attr-value',
                    'text-gray-500': token.type === 'comment',
                    'text-blue-300': token.type === 'text'
                }">{{ token.value }}</span>}}</code></pre>
        } @else if (typeCode === 'script'){
            <pre class="overflow-x-auto"><code class="whitespace-pre">@for(token of codeScriptTokens; track $index) {@if(token.type === 'whitespace') {{{ token.value }}} @else {<span [ngClass]="{
                    'text-fuchsia-500': token.type === 'keyword',
                    'text-fuchsia-400': token.type === 'number' || token.type === 'boolean',
                    'text-sky-500': token.type === 'identifier',
                    'text-emerald-500': token.type === 'function-name',
                    'text-amber-400': token.type === 'string',
                    'text-slate-300': token.type === 'property',
                    'text-fuchsia-300': token.type === 'operator' || token.type === 'punctuation',
                    'text-gray-500': token.type === 'comment'
                }">{{ token.value }}</span>}}</code></pre>
        }
    `,
})
export class AppCode {
    @Input() codeTemplate?: string;
    @Input() codeScript?: string;

    public typeCode: 'template' | 'script' = 'template';
    //public typeCode: 'template' | 'script' = 'script';

    get codeTemplateTokens() {
        return EpTokenizeTemplate(this.codeTemplate ?? '');
    }
    get codeScriptTokens() {
        return EpTokenizeScript(this.codeScript ?? '');
    }

    @HostBinding('class')
    get hostClass() { return "grid gap-2"; }
}