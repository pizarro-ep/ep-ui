import { Component } from '@angular/core';
import { EpButtonComponent, EpInputComponent, EpCardComponent, EpSelectComponent, EpSelectItemComponent } from "@ep/components";
import { EpTextDirective, EpContentDirective } from '@ep/directives';
import { EpBuildNode, EpDedent } from '@ep/global';
import { AppCode } from "src/app/docs/partial/code";

@Component({
  selector: 'app-home',
  imports: [EpButtonComponent, EpInputComponent, EpTextDirective, EpCardComponent, EpContentDirective, AppCode, EpSelectComponent, EpSelectItemComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  get codeTemplate(): string {
    const code = {
      tag: 'ep-button',
      attrs: {
        color: 'primary',
        size: "lg",
      },
    }
    return EpDedent(EpBuildNode(code));
  }
}
