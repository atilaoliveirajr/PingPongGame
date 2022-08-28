import { Component, Inject, OnInit } from '@angular/core';
import { BallService, IBallService } from '../services/ball.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public lastTime: number;

  constructor(@Inject(BallService) public ball: IBallService) {
	this.lastTime = 0;
  }

  ngOnInit(): void {
	this.update();
  }

  public update(time?: number) {
	if (this.lastTime !== null) {
		const delta = time as number - this.lastTime;
		
	  }

	this.lastTime = time as number;
  }
}
