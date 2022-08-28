import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { BallComponent } from '../ball/ball.component';
import { PaddlePlayer1Component } from '../paddle-player1/paddle-player1.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public ball: any;
  public playerOne: any;
  public computer: any;
  public lastTime: number;
  public playerScoreElem: any;
  public computerScoreElem: any;

  constructor() {
    this.lastTime = 0;
  }

  public ngOnInit(): void {
    this.ball = new BallComponent(
      document.getElementById('ball') as HTMLElement
    );
    this.playerOne = new PaddlePlayer1Component(
      document.getElementById('player-paddle')
    );
	this.computer = new PaddlePlayer1Component(
		document.getElementById('computer-paddle')
	);
	this.playerScoreElem = document.getElementById("player-score");
	this.computerScoreElem = document.getElementById("computer-score");
    this.update(0);
  }

  public update(time: number) {
    if (this.lastTime !== null) {
      const delta = time - this.lastTime;
      this.ball.update(delta, [this.playerOne.rect(), this.computer.rect()]);
      this.computer.update(delta, this.ball.y)
		const hue = parseFloat(
		  getComputedStyle(document.documentElement).getPropertyValue("--hue")
		)
	
		if (this.isLose()) this.handleLose()
    }

    this.lastTime = time as number;
    //window.requestAnimationFrame(this.update.bind(this));
  }

  public isLose() {
	const rect = this.ball.rect()
	return rect.right >= window.innerWidth || rect.left <= 0
  }
  
  public handleLose() {
	const rect = this.ball.rect()
	if (rect.right >= window.innerWidth) {
	  this.playerScoreElem.textContent = parseInt(this.playerScoreElem.textContent) + 1
	} else {
	  this.computerScoreElem.textContent = parseInt(this.computerScoreElem.textContent) + 1
	}
	this.ball.reset()
	this.computer.reset()
  }

  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e) {
	this.playerOne.position = (e.y / window.innerHeight) * 100;
  }
}
