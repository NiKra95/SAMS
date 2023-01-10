import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanySettingsDTO } from 'src/app/companies/company.model';
import { CompanyService } from 'src/app/companies/company.service';
import { SecurityService } from 'src/app/security/security.service';

@Component({
  selector: 'app-form-company-settings',
  templateUrl: './form-company-settings.component.html',
  styleUrls: ['./form-company-settings.component.scss']
})
export class FormCompanySettingsComponent implements OnInit {

  constructor(private securityService: SecurityService,
              private companyService: CompanyService) { }

  form: FormGroup;

  @Input()
  model: CompanySettingsDTO;

  @Output()
  onSaveChanges = new EventEmitter<CompanySettingsDTO>();

  ngOnInit(): void {
    this.form = new FormGroup({
      minimumAnnualLeaveDays: new FormControl('', Validators.required)
    });

    if (this.model !== undefined){
      this.form.patchValue(this.model);
    }
  } 

  resetCompanySettings() {
    this.onSaveChanges.emit(this.form.value);
  }
}
