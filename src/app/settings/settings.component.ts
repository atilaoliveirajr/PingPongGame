import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  @Output()
  public setMultiplayer = new EventEmitter<FormGroup>();
  
  public settingsFormGroup: FormGroup;
  public isSetting: boolean = true;

  constructor(
	private readonly _formBuilder: UntypedFormBuilder
  ) {    }

  ngOnInit(): void {
    this.declareFormGroup();
  }

  public declareFormGroup(): void {
	this.settingsFormGroup = this._formBuilder.group({
		isMultiplayer: [false],
		isLeftPlayerUsingMouse: [false]
	})
  }

  public confirmSettings(): void {
	this.isSetting = false;
	this.setMultiplayer.next(this.settingsFormGroup);
  }
}
