import { Injectable } from '@angular/core';

export interface IBallService {
  update(delta: any, paddleRects: any): void;
}

@Injectable({ providedIn: 'root' })
export class BallService implements IBallService {
  public readonly INITIAL_VELOCITY: number = 0.025;
  public readonly VELOCITY_INCREASE: number = 0.00001;

  public ballElem: any;
  public velocity: number = 0;
  public direction: { x: number; y: number } = { x: 0, y: 0 };

  constructor() {}

  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--x'));
  }

  set x(value) {
    this.ballElem.style.setProperty('--x', value);
  }

  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--y'));
  }

  set y(value) {
    this.ballElem.style.setProperty('--y', value);
  }

  rect() {
    return this.ballElem.getBoundingClientRect();
  }

  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0, y: 0 };
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    this.velocity = this.INITIAL_VELOCITY;
  }

  public update(delta: number, paddleRects: Array<number>): void {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    this.velocity += this.VELOCITY_INCREASE * delta;
    const rect = this.rect();

    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }

    if (paddleRects.some((r: number) => isCollision(r, rect))) {
      this.direction.x *= -1;
    }
  }
}

function randomNumberBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function isCollision(rect1: any, rect2: any) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  );
}
