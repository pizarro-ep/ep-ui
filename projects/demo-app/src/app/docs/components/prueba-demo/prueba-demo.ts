import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EpInputComponent } from '@ep/components';

@Component({
  selector: 'app-prueba-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EpInputComponent, FormsModule],
  templateUrl: './prueba-demo.html',
  styleUrl: './prueba-demo.css'
})
export class PruebaDemo {
  public formBuild = inject(FormBuilder)
  public form2: FormGroup = this.formBuild.group({
    prueba: ['']
  })
  public prueba2: string = '';
}
