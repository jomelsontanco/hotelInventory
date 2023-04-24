import { AbstractControl, FormGroup } from "@angular/forms";

export class CustomValidator {

  static ValidateName(control: AbstractControl) {
    const value = control.value as string;
    if (value.includes('test')) {
      return { invalidName :  true }
    }
    return null;
  }

  static ValidateSpecialChar (char: string) {
    return (control: AbstractControl) => {
      const value = control.value as string;
      if (value.includes(char)) {
        return { invalidSpecialChar :  true };
      }
      return null;
    }
  }

  static ValidateDate(formGroup: FormGroup) {
    const checkInDate = new Date(formGroup.get('checkInDate')?.value);
    const checkOutDate = new Date(formGroup.get('checkOutDate')?.value);
    console.log(checkInDate > checkOutDate);
    if ( checkInDate > checkOutDate  ) {
      formGroup.get('checkOutDate')?.setErrors({invalidDate: true,})
      return {
        checkInDateGreaterThanCheckOutDate: true,
      };
    }
    return null;
  }
}
