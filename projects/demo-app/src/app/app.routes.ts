import { Routes } from '@angular/router';
import { ButtonDemo } from './docs/components/button-demo/button-demo';
import { ChipDemo } from './docs/components/chip-demo/chip-demo';
import { CardDemo } from './docs/components/card-demo/card-demo';
import { CheckboxDemo } from './docs/components/checkbox-demo/checkbox-demo';
import { DividerDemo } from './docs/directives/divider-demo/divider-demo';
import { CopyDemo } from './docs/components/copy-demo/copy-demo';
import { MenuDemo } from './docs/components/menu-demo/menu-demo';
import { EntriesSelectorDemo } from './docs/components/entries-selector-demo/entries-selector-demo';
import { IconDemo } from './docs/components/icon-demo/icon-demo';
import { InputDemo } from './docs/components/input-demo/input-demo';
import { ListDemo } from './docs/components/list-demo/list-demo';
import { ModalDemo } from './docs/components/modal-demo/modal-demo';
import { PaginatorDemo } from './docs/components/paginator-demo/paginator-demo';
import { RadioDemo } from './docs/components/radio-demo/radio-demo';
import { SelectDemo } from './docs/components/select-demo/select-demo';
import { SliderDemo } from './docs/components/slider-demo/slider-demo';
import { TableDemo } from './docs/components/table-demo/table-demo';
import { TextareaDemo } from './docs/components/textarea-demo/textarea-demo';
import { ActionsDemo } from './docs/directives/actions-demo/actions-demo';
import { ActivatorDemo } from './docs/directives/activator-demo/activator-demo';
import { AppendDemo } from './docs/directives/append-demo/append-demo';
import { ContainerDemo } from './docs/directives/container-demo/container-demo';
import { ContentDemo } from './docs/directives/content-demo/content-demo';
import { FooterDemo } from './docs/directives/footer-demo/footer-demo';
import { HeaderDemo } from './docs/directives/header-demo/header-demo';
import { NumberDemo } from './docs/directives/number-demo/number-demo';
import { PrependDemo } from './docs/directives/prepend-demo/prepend-demo';
import { RotateDemo } from './docs/directives/rotate-demo/rotate-demo';
import { CaptionDemo } from './docs/directives/table/caption-demo/caption-demo';
import { ColumnDemo } from './docs/directives/table/column-demo/column-demo';
import { FooterDemo as TableFooterDemo } from './docs/directives/table/footer-demo/footer-demo';
import { TextDemo } from './docs/directives/text-demo/text-demo';
import { TitleDemo } from './docs/directives/title-demo/title-demo';
import { SwitchDemo } from './docs/components/switch-demo/switch-demo';
import { TooltipDemo } from './docs/directives/tooltip-demo/tooltip-demo';
import { Home } from './pages/home/home';
import { Layout } from './layout/layout';
import { Layout2 } from './layout2/layout2';


export const routes: Routes = [

    // ===============================
    //   RUTAS SIN LAYOUT (SIMPLE)
    // ===============================
    {
        path: '',
        component: Layout2,
        children: [
            { path: '', component: Home },
            // aquí puedes agregar más rutas sin layout
            // { path: 'login', component: Login },
            // { path: 'landing', component: Landing },
        ],
    },

    // ===============================
    //   RUTAS CON LAYOUT COMPLETO
    // ===============================
    {
        path: '',
        component: Layout,
        children: [
            { path: 'docs/components/button', component: ButtonDemo },
            { path: 'docs/components/card', component: CardDemo },
            { path: 'docs/components/checkbox', component: CheckboxDemo },
            { path: 'docs/components/chip', component: ChipDemo },
            { path: 'docs/components/copy', component: CopyDemo },
            { path: 'docs/components/entries-selector', component: EntriesSelectorDemo },
            { path: 'docs/components/icon', component: IconDemo },
            { path: 'docs/components/input', component: InputDemo },
            { path: 'docs/components/list', component: ListDemo },
            { path: 'docs/components/menu', component: MenuDemo },
            { path: 'docs/components/modal', component: ModalDemo },
            { path: 'docs/components/paginator', component: PaginatorDemo },
            { path: 'docs/components/radio', component: RadioDemo },
            { path: 'docs/components/select', component: SelectDemo },
            { path: 'docs/components/slider', component: SliderDemo },
            { path: 'docs/components/switch', component: SwitchDemo },
            { path: 'docs/components/table', component: TableDemo },
            { path: 'docs/components/textarea', component: TextareaDemo },
            { path: 'docs/directives/actions', component: ActionsDemo },
            { path: 'docs/directives/activator', component: ActivatorDemo },
            { path: 'docs/directives/append', component: AppendDemo },
            { path: 'docs/directives/container', component: ContainerDemo },
            { path: 'docs/directives/content', component: ContentDemo },
            { path: 'docs/directives/divider', component: DividerDemo },
            { path: 'docs/directives/footer', component: FooterDemo },
            { path: 'docs/directives/header', component: HeaderDemo },
            { path: 'docs/directives/number', component: NumberDemo },
            { path: 'docs/directives/prepend', component: PrependDemo },
            { path: 'docs/directives/rotate', component: RotateDemo },
            { path: 'docs/directives/table/caption', component: CaptionDemo },
            { path: 'docs/directives/table/column', component: ColumnDemo },
            { path: 'docs/directives/table/footer', component: TableFooterDemo },
            { path: 'docs/directives/text', component: TextDemo },
            { path: 'docs/directives/title', component: TitleDemo },
            { path: 'docs/directives/tooltip', component: TooltipDemo },
        ],
    },

    // fallback
    { path: '**', redirectTo: '' },
];
