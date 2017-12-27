import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'app';
  charPNG: number;
  PNG: string;
  BRICK: string;
  posX: number;
  posY: number;
  charForward: boolean;
  brickLayout: { brickPosX: number; brickPosY: number}[];
  level: number;
  ngOnInit() {
     this.brickLayout = [];
     this.charPNG = 0;
     this.posX = 0;
     this.posY = 0;
     this.PNG = '/assets/walk' + this.charPNG + '.png';
     this.BRICK = '/assets/brick.png';
     this.charForward = true;
     this.level = 1;
     this.populateBrickLayout(this.level);
  }

  charMove($event) {
    switch ($event.keyCode) {
      case 39:
         {
           if (this.posX <= 1750) {
            if (!this.collision(this.posX + 100, this.posY)) {
              this.posX = this.posX + 10;
            }
            this.charForward = true;
           }
           break;
         }
      case 37:
         {
           if (this.posX >= 100) {
            if (!this.collision(this.posX - 100, this.posY)) {
              this.posX = this.posX - 10;
            }
            this.charForward = false;
           }
           break;
         }
         case 38:
         {
          if (this.posY >= 0) {
            if (!this.collision(this.posX, this.posY - 100)) {
              this.posY = this.posY - 10;
            }
            this.charForward = false;
         }
           break;
         }
         case 40:
         {
          if (this.posY <= 800) {
            if (!this.collision(this.posX, this.posY + 100)) {
              this.posY = this.posY + 10;
            }
            this.charForward = false;
         }
           break;
         }
    }
    this.charPNG = (this.charPNG + 1) % 9;
    this.PNG = '/assets/walk' + this.charPNG + '.png';
  }

  populateBrickLayout(level) {
     for (let i = 1; i < 20; i ++) {
        const x = Math.floor((Math.random() * 18));
        const y = Math.floor((Math.random() * 8));
        this.brickLayout.push({brickPosX: x * 100, brickPosY: y * 100});
     }
     console.log(this.brickLayout);
  }

  collision(positionX, positionY) {
    positionX = Math.trunc(positionX / 100) * 100;
    positionY = Math.trunc(positionY / 100) * 100;
    for (const pos of this.brickLayout) {
        console.log (pos, ' posX:', positionX, ' posY: ', positionY );
        if ((pos.brickPosX  === positionX ) && (pos.brickPosY === positionY )) {
          return true;
        }
    }
    return false;
  }
}

