import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  @Output()
  public setMultiplayer = new EventEmitter<FormGroup>();
  
  public settingsFormGroup: FormGroup = new FormGroup({
	isMultiplayer: new FormControl(false),
	isLeftPlayerUsingMouse: new FormControl(true)
  });
  public isSetting: boolean = true;

  constructor(
  ) {
	this.settingsFormGroup.valueChanges.subscribe(res => {
		this.setMultiplayer.next(this.settingsFormGroup);
	})
  }

  public confirmSettings(): void {
	this.isSetting = false;
	this.setMultiplayer.next(this.settingsFormGroup);
  }
}
