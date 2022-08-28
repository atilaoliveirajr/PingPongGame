import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-paddle',
  templateUrl: './paddle.component.html',
})
export class PaddleComponent {
	public readonly SPEED: number = 0.015;
	public paddleElem: any;

	constructor(@Inject(String) private paddle: HTMLElement) {
    this.paddleElem = paddle;
    this.reset();
  }

  get position(): number {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue('--position')
    );
  }

  set position(value) {
    this.paddleElem?.style.setProperty('--position', value);
  }

  public rect() {
    return this.paddleElem.getBoundingClientRect();
  }

  public reset(): void {
    this.position = 50;
  }

  /* Computer, the higher the speed the harder to beat the computer */
  public update(delta: number, ballHeight:number): void {
    this.position += this.SPEED * delta * (ballHeight - this.position);
  }
}
