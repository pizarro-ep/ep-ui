import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EpThemeService } from '@ep/services';
import { EpAppbarComponent, EpAppbarHeaderComponent, EpButtonComponent } from "@ep/components";
import { EpTooltipDirective, EpAppendDirective, EpContainerDirective } from "@ep/directives";

@Component({
  selector: 'app-layout2',
  imports: [RouterOutlet, EpAppbarComponent, EpAppbarHeaderComponent, EpButtonComponent, EpTooltipDirective, EpAppendDirective, EpContainerDirective],
  templateUrl: './layout2.html',
  styleUrl: './layout2.css'
})
export class Layout2 {
  constructor(public theme: EpThemeService) { }
}
