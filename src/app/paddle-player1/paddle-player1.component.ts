import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-paddle-player1',
  templateUrl: './paddle-player1.component.html',
  styleUrls: ['./paddle-player1.component.scss'],
})
export class PaddlePlayer1Component {
	public readonly SPEED: number = 0.02;
	public paddleElem: any;

	constructor(@Inject(String) private paddle: HTMLElement) {
    this.paddleElem = paddle;
    this.reset();
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue('--position')
    );
  }

  set position(value) {
    this.paddleElem.style.setProperty('--position', value);
  }

  rect() {
    return this.paddleElem.getBoundingClientRect();
  }

  reset() {
    this.position = 50;
  }

  update(delta: number, ballHeight:number) {
    this.position += this.SPEED * delta * (ballHeight - this.position);
  }
}
