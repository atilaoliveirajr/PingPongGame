import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { BallComponent } from '../ball/ball.component';
import { PaddleComponent } from '../paddle/paddle.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public ball: BallComponent;
  public leftPlayer: PaddleComponent;
  public rightPlayer: PaddleComponent;
  public lastTime: number;
  public leftPlayerScoreElem: HTMLElement;
  public rightPlayerScoreElem: HTMLElement;
  public isKeyUpPressed: boolean = false;
  public isKeyDownPressed: boolean = false;
  public isMultiplayer: boolean = false;

  constructor() {
    this.lastTime = 0;
  }

  /* @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    this.leftPlayer.position = (e.y / window.innerHeight) * 100;
  } */

  @HostListener('document:keydown', ['$event'])
  keyEventUpDown(e: KeyboardEvent) {
    /* Player One */
    if (e.code === 'KeyW' && this.leftPlayer.position > 5) {
      this.leftPlayer.position = this.leftPlayer.position - 5;
    }
    if (e.code === 'KeyS' && this.leftPlayer.position < 95) {
      this.leftPlayer.position = this.leftPlayer.position + 5;
    }

    /* Player Two */
    if (
      e.code === 'ArrowUp' &&
      this.rightPlayer.position > 5 &&
      this.isMultiplayer
    ) {
      this.rightPlayer.position = this.rightPlayer.position - 5;
    }
    if (
      e.code === 'ArrowDown' &&
      this.rightPlayer.position < 95 &&
      this.isMultiplayer
    ) {
      this.rightPlayer.position = this.rightPlayer.position + 5;
    }
  }

  public ngOnInit(): void {
    this.ball = new BallComponent(
      document.getElementById('ball') as HTMLElement
    );
    this.leftPlayer = new PaddleComponent(
      document.getElementById('pladdle-left')
    );
    this.rightPlayer = new PaddleComponent(
      document.getElementById('paddle-right')
    );
    this.leftPlayerScoreElem = document.getElementById('left-player-score');
    this.rightPlayerScoreElem = document.getElementById('right-player-score');
    this.update(0);
  }

  public update(time: number) {
    if (this.lastTime !== null) {
      const delta = time - this.lastTime;
      this.ball.update(delta, [
        this.leftPlayer.rect(),
        this.rightPlayer.rect(),
      ]);

      if (!this.isMultiplayer) {
        this.rightPlayer.update(delta, this.ball.y);
      }

      if (this.isLose()) this.handleLose();
    }

    this.lastTime = time as number;
    /* Player Btn */
    window.requestAnimationFrame(this.update.bind(this));
  }

  public isLose() {
    const rect = this.ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0;
  }

  public handleLose() {
    const rect = this.ball.rect();
    if (rect.right >= window.innerWidth) {
      this.leftPlayerScoreElem.textContent = (
        parseInt(this.leftPlayerScoreElem.textContent) + 1
      ).toString();
    } else {
      this.rightPlayerScoreElem.textContent = (
        parseInt(this.rightPlayerScoreElem.textContent) + 1
      ).toString();
    }
    this.ball.reset();
    this.rightPlayer.reset();
  }
}
