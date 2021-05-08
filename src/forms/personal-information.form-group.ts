import { FormGroup } from '@angular/forms';
import { RequiredFormControl } from './required-form-control';

export class PersonalInformationFormGroup extends FormGroup {

  constructor() {

    super({
      fullName   : new RequiredFormControl(),
      address    : new RequiredFormControl(),
      phoneNumber: new RequiredFormControl(),
      positionId : new RequiredFormControl(),
    });
  }
}
