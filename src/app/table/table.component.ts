import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BallComponent } from '../ball/ball.component';
import { PaddleComponent } from '../paddle/paddle.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild('ball')
  public ballRef: ElementRef;
  public ball: BallComponent;

  @ViewChild('leftPlayer')
  public leftPlayerRef: ElementRef;
  public leftPlayer: PaddleComponent;

  @ViewChild('rightPlayer')
  public rightPlayerRef: ElementRef;
  public rightPlayer: PaddleComponent;

  public lastTime: number;
  public leftPlayerScoreElem: HTMLElement;
  public rightPlayerScoreElem: HTMLElement;
  public isKeyUpPressed: boolean = false;
  public isKeyDownPressed: boolean = false;
  public isMultiplayer: boolean = false;
  public isLeftPlayerUsingMouse: boolean = true;

  constructor() {
    this.lastTime = 0;
  }

  public ngAfterViewInit(): void {
    this.ball = new BallComponent(this.ballRef.nativeElement as HTMLElement);
    this.leftPlayer = new PaddleComponent(this.leftPlayerRef.nativeElement as HTMLElement);
    this.rightPlayer = new PaddleComponent(this.rightPlayerRef.nativeElement as HTMLElement);

	this.update(0);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
	if(this.isLeftPlayerUsingMouse) {
		this.leftPlayer.position = (e.y / window.innerHeight) * 100;
	}
  }

  @HostListener('document:keydown', ['$event'])
  public keyEvent(e: KeyboardEvent): void {
    /* Player One */
    if (e.code === 'KeyW' && this.leftPlayer.position > 5 && !this.isLeftPlayerUsingMouse) {
      this.leftPlayer.position = this.leftPlayer.position - 5;
    }
    if (e.code === 'KeyS' && this.leftPlayer.position < 95 && !this.isLeftPlayerUsingMouse) {
      this.leftPlayer.position = this.leftPlayer.position + 5;
    }

    /* Player Two */
    if (e.code === 'ArrowUp' && this.rightPlayer.position > 5 && this.isMultiplayer) {
      this.rightPlayer.position = this.rightPlayer.position - 5;
    }
    if (
      e.code === 'ArrowDown' && this.rightPlayer.position < 95 && this.isMultiplayer) {
      this.rightPlayer.position = this.rightPlayer.position + 5;
    }
  }

  public ngOnInit(): void {
    this.leftPlayerScoreElem = document.getElementById('left-player-score');
    this.rightPlayerScoreElem = document.getElementById('right-player-score');
  }

  public update(time: number): void {
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
    window.requestAnimationFrame(this.update.bind(this));
  }

  public isLose(): boolean {
    const rect = this.ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0;
  }

  public handleLose(): void {
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

  public onSetMultiplayer(formGroup: FormGroup): void {
	this.isMultiplayer = formGroup.controls['isMultiplayer'].value;
	this.isLeftPlayerUsingMouse = formGroup.controls['isLeftPlayerUsingMouse'].value;
  }
}
