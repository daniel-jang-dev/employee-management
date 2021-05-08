import { FormControl, Validators } from '@angular/forms';

export class RequiredFormControl extends FormControl {

  constructor(private val: any = null) {
    super(val, Validators.required);
  }
}