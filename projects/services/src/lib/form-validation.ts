import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, NgModel, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class EpFormValidationService {

    /** Obtiene el mensaje del primer error encontrado en un control */
    getErrorMessage(control: AbstractControl | NgModel | null, fieldName?: string): string | null {
        if (!control) return null;

        const errors: ValidationErrors | null =
            (control as AbstractControl).errors ?? (control as NgModel).errors ?? null;

        if (!errors) return null;

        const label = fieldName ? `El campo ${fieldName}` : 'Este campo';

        if (errors['required']) return `${label} es obligatorio.`;
        if (errors['minlength']) return `${label} debe tener al menos ${errors['minlength'].requiredLength} caracteres.`;
        if (errors['maxlength']) return `${label} debe tener máximo ${errors['maxlength'].requiredLength} caracteres.`;
        if (errors['email']) return `${label} debe ser un correo válido.`;
        if (errors['pattern']) return `${label} tiene un formato inválido.`;
        if (errors['min']) return `${label} debe ser mayor o igual a ${errors['min'].min}.`;
        if (errors['max']) return `${label} debe ser menor o igual a ${errors['max'].max}.`;

        return `${label} es inválido.`;
    }

    /** Recorre recursivamente todos los errores del formulario */
    getAllErrors(formGroup: FormGroup): Record<string, any> {
        const errors: Record<string, any> = {};

        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.get(key);

            if (control instanceof FormGroup) {
                const childErrors = this.getAllErrors(control);
                if (Object.keys(childErrors).length > 0) {
                    errors[key] = childErrors;
                }
            } else if (control && control.errors) {
                errors[key] = control.errors;
            }
        });

        if (formGroup.errors) {
            errors['_form'] = formGroup.errors;
        }

        return errors;
    }

    /** Obtiene el primer error del formulario */
    getFirstError(formGroup: FormGroup): { key: string, error: any } | null {
        for (const key of Object.keys(formGroup.controls)) {
            const control = formGroup.get(key);

            if (control instanceof FormGroup) {
                const childError = this.getFirstError(control);
                if (childError) return childError;
            } else if (control && control.errors) {
                return { key, error: control.errors };
            }
        }

        if (formGroup.errors) {
            return { key: '_form', error: formGroup.errors };
        }

        return null;
    }

    /** Retorna el primer mensaje de error legible del formulario */
    getFirstErrorMessage(formGroup: FormGroup): string | null {
        for (const key of Object.keys(formGroup.controls)) {
            const control = formGroup.get(key);
            if (control instanceof FormGroup) {
                const nested = this.getFirstErrorMessage(control);
                if (nested) return nested;
            } else if (control && control.errors) {
                return this.getErrorMessage(control, key);
            }
        }

        if (formGroup.errors) {
            return this.getErrorMessage(formGroup, 'formulario');
        }

        return null;
    }
}
