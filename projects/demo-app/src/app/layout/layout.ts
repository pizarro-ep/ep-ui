import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EpThemeService } from '@ep/services';
import { EpAppendDirective, EpContainerDirective, EpDividerDirective, EpPrependDirective, EpTextDirective, EpTooltipDirective } from "@ep/directives";
import { EpSidebarComponent, EpSidebarHeaderComponent, EpSidebarContentComponent, EpSidebarFooterComponent, EpAppbarComponent, EpAppbarHeaderComponent, EpButtonComponent, EpAppbarMenuComponent } from "@ep/components";
@Component({
    selector: 'app-layout',
    imports: [RouterOutlet, EpSidebarComponent, EpSidebarHeaderComponent, EpSidebarContentComponent, EpSidebarFooterComponent, EpAppbarComponent, EpAppbarHeaderComponent, EpButtonComponent, EpAppbarMenuComponent, EpPrependDirective, EpTextDirective, EpAppendDirective, EpTooltipDirective, EpContainerDirective, EpDividerDirective],
    templateUrl: './layout.html',
    styleUrl: './layout.css'
})
export class Layout {
    public menuItems = [
        {
            label: 'Components', expanded: true, expandable: true, children: [
                { label: 'Button', prependIcon: 'videogame_asset', route: 'docs/components/button' },
                { label: 'Card', prependIcon: 'view_agenda', route: 'docs/components/card' },
                { label: 'Checkbox', prependIcon: 'check_box', route: 'docs/components/checkbox' },
                { label: 'Chip', prependIcon: 'chips', route: 'docs/components/chip' },
                { label: 'Copy', prependIcon: 'content_copy', route: 'docs/components/copy' },
                { label: 'Entries Selector', prependIcon: 'expansion_panels', route: 'docs/components/entries-selector' },
                { label: 'Icon', prependIcon: 'gallery_thumbnail', route: 'docs/components/icon' },
                { label: 'Input', prependIcon: 'text_fields', route: 'docs/components/input' },
                { label: 'List', prependIcon: 'list', route: 'docs/components/list' },
                { label: 'Menu', prependIcon: 'widget_menu', route: 'docs/components/menu' },
                { label: 'Modal', prependIcon: 'picture_in_picture_center', route: 'docs/components/modal' },
                { label: 'Paginator', prependIcon: 'page_control', route: 'docs/components/paginator' },
                { label: 'Radio', prependIcon: 'radio_button_checked', route: 'docs/components/radio' },
                { label: 'Select', prependIcon: 'read_more', route: 'docs/components/select' },
                { label: 'Slider', prependIcon: 'sliders', route: 'docs/components/slider' },
                { label: 'Switch', prependIcon: 'toggle_on', route: 'docs/components/switch' },
                { label: 'Table', prependIcon: 'table', route: 'docs/components/table' },
                { label: 'Textarea', prependIcon: 'text_ad', route: 'docs/components/textarea' },
            ]
        },
        {
            label: 'Directives', expanded: false, expandable: true, children: [
                { label: 'Actions', prependIcon: 'action_key', route: 'docs/directives/actions' },
                { label: 'Activator', prependIcon: 'touch_long', route: 'docs/directives/activator' },
                { label: 'Append', prependIcon: 'left_panel_close', route: 'docs/directives/append' },
                { label: 'Container', prependIcon: 'border_outer', route: 'docs/directives/container' },
                { label: 'Content', prependIcon: 'amp_stories', route: 'docs/directives/content' },
                { label: 'Divider', prependIcon: 'border_horizontal', route: 'docs/directives/divider' },
                { label: 'Footer', prependIcon: 'page_footer', route: 'docs/directives/footer' },
                { label: 'Header', prependIcon: 'page_header', route: 'docs/directives/header' },
                { label: 'Number', prependIcon: '123', route: 'docs/directives/number' },
                { label: 'Prepend', prependIcon: 'right_panel_close', route: 'docs/directives/prepend' },
                { label: 'Rotate', prependIcon: '3d_rotation', route: 'docs/directives/rotate' },
                {
                    label: 'Table', prependIcon: 'table', expanded: false, expandable: true, children: [
                        { label: 'Caption', prependIcon: 'closed_caption', route: 'docs/directives/table/caption' },
                        { label: 'Column', prependIcon: 'view_column_2', route: 'docs/directives/table/column' },
                        { label: 'Footer', prependIcon: 'border_bottom', route: 'docs/directives/table/footer' },
                    ]
                },
                { label: 'Text', prependIcon: 'text_format', route: 'docs/directives/text' },
                { label: 'Title', prependIcon: 'title', route: 'docs/directives/title' },
                { label: 'Tooltip', prependIcon: 'tooltip_2', route: 'docs/directives/tooltip' },
            ]
        }
    ]

    constructor(public theme: EpThemeService) { }
}
